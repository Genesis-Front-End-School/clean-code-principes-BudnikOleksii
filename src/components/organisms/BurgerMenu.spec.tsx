import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BurgerMenu } from './BurgerMenu';

const renderBurgerMenu = (open?: boolean, onDrawerToggle?: () => void) => {
  return render(
    <MemoryRouter>
      <BurgerMenu open={open} onDrawerToggle={onDrawerToggle || (() => {})} />
    </MemoryRouter>
  );
};

describe('BurgerMenu', () => {
  test('renders the closed drawer when open is false or not provided', () => {
    renderBurgerMenu(false);

    const drawer = screen.queryByRole('presentation');

    expect(drawer).not.toBeInTheDocument();
  });

  test('renders the open drawer when open is true', () => {
    renderBurgerMenu(true);

    const drawer = screen.getByRole('presentation');

    expect(drawer).toBeInTheDocument();
  });

  test('navigates to the main page when the Main page button is clicked', () => {
    renderBurgerMenu(true);

    const mainPageButton = screen.getByRole('button', { name: 'Main page' });
    userEvent.click(mainPageButton);
    const heading = screen.getByRole('heading', { name: /Courses app/i });

    expect(heading).toBeInTheDocument();
  });
});
