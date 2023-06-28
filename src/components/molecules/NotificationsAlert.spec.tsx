import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationsAlert } from './NotificationsAlert';

describe('NotificationsAlert', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockReset();
  });

  test('renders NotificationsAlert with a message and correct severity', () => {
    const message = 'Test Alert Message';
    const type = 'error';

    render(<NotificationsAlert type={type} message={message} onClose={onCloseMock} />);

    const alert = screen.getByText(message);
    expect(alert).toBeInTheDocument();
  });

  test('closes NotificationsAlert when onClose is called', () => {
    const message = 'Test Alert Message';
    const type = 'error';

    render(<NotificationsAlert type={type} message={message} onClose={onCloseMock} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
