import { screen } from '@testing-library/react';
import { NotificationBlock } from './NotificationBlock';
import { renderWithProviders } from '../../utils/test-utils';
import {
  registerAction,
  setError,
  setSuccessMessage,
} from '../../features/actions-info/actions-info-slice';
import { store } from '../../app/store';
import { waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const renderNotificationBlock = (store: any) => {
  return renderWithProviders(<NotificationBlock />, { store });
};

describe('NotificationBlock', () => {
  test('renders the LinearProgress when actions are in progress', () => {
    const testStore = store;
    testStore.dispatch(registerAction('testAction'));

    renderNotificationBlock(testStore);

    const linearProgress = screen.getByRole('progressbar');
    expect(linearProgress).toBeInTheDocument();
  });

  test('renders the success notification when there is a success message', () => {
    const testStore = store;
    testStore.dispatch(setSuccessMessage('Success notification'));

    renderNotificationBlock(testStore);

    const successNotification = screen.getByText(/success notification/i);
    expect(successNotification).toBeInTheDocument();
  });

  test('renders the error notification when there is an error message', () => {
    const testStore = store;
    testStore.dispatch(setError({ message: 'Error notification', statusCode: 400 }));

    renderNotificationBlock(testStore);

    const errorNotification = screen.getByText(/Error notification/i);
    expect(errorNotification).toBeInTheDocument();
  });

  test('calls handleCloseNotification when the close button is clicked', async () => {
    const testStore = store;
    testStore.dispatch(setSuccessMessage('Success notification'));

    renderNotificationBlock(testStore);

    const closeButton = screen.getByText(/Success notification/i);
    userEvent.click(closeButton);

    await waitForElementToBeRemoved(() => screen.getByText(/success notification/i));

    const { successMessage } = testStore.getState().actionsInfo;
    expect(successMessage).toBe(null);
  });
});
