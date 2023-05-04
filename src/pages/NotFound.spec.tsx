import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './NotFound';
import { renderWithProviders } from '../utils/test-utils';

jest.mock('../components/templates/ErrorPage');

const MainPage = () => <div data-testid="main-page">Main Page</div>;

function render(ui: React.ReactElement, { route = '/', ...renderOptions } = {}) {
  window.history.pushState({}, 'Test page', route);

  interface Props {
    children: React.ReactNode;
  }
  const Wrapper: React.FC<Props> = ({ children }) => (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
      </Routes>
      {children}
    </MemoryRouter>
  );

  return renderWithProviders(ui, { wrapper: Wrapper, ...renderOptions });
}

describe('NotFoundPage', () => {
  test('renders the ErrorPage and the Go to main button', () => {
    render(<NotFoundPage />, { route: '/not-found' });

    const errorPage = screen.getByTestId('error-page');
    const goToMainButton = screen.getByRole('button', { name: /go to main/i });

    expect(errorPage).toBeInTheDocument();
    expect(goToMainButton).toBeInTheDocument();
  });

  test('navigates to the main page when the Go to main button is clicked', () => {
    render(<NotFoundPage />, { route: '/not-found' });

    const goToMainButton = screen.getByRole('button', { name: /go to main/i });
    userEvent.click(goToMainButton);

    const mainPage = screen.getByTestId('main-page');
    expect(mainPage).toBeInTheDocument();
  });
});
