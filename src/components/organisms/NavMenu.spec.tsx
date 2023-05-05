import { render, screen, fireEvent } from '@testing-library/react';
import { NavMenu } from './NavMenu';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">Route: {location.pathname}</div>;
};

const renderNavMenu = (onDrawerToggle: () => void) => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <NavMenu onDrawerToggle={onDrawerToggle} />
              <LocationDisplay />
            </>
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

describe('NavMenu', () => {
  test('renders the correct static text content', () => {
    renderNavMenu(() => {});

    expect(screen.getByText('Courses app')).toBeInTheDocument();
    expect(screen.getByText('Main page')).toBeInTheDocument();
  });

  test('calls onDrawerToggle when the menu icon is clicked', () => {
    const onDrawerToggle = jest.fn();
    renderNavMenu(onDrawerToggle);

    fireEvent.click(screen.getByLabelText('open drawer'));
    expect(onDrawerToggle).toHaveBeenCalled();
  });

  test('navigates to the main page when the "Main page" button is clicked', () => {
    const onDrawerToggle = jest.fn();
    renderNavMenu(onDrawerToggle);

    fireEvent.click(screen.getByText('Main page'));
    // This assertion checks if the URL pathname changed to '/courses'
    expect(screen.getByTestId('location-display')).toHaveTextContent('/courses');
  });
});
