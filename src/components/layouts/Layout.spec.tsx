import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import React from 'react';

jest.mock('../organisms/NotificationBlock');
jest.mock('../organisms/NavMenu');
jest.mock('../organisms/BurgerMenu');
jest.mock('../atoms/ContentContainer');

describe('Layout', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div>Test Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  });

  test('renders NotificationBlock', () => {
    const notificationBlock = screen.getByTestId('notification-block');
    expect(notificationBlock).toBeInTheDocument();
  });

  test('renders NavMenu', () => {
    const navMenu = screen.getByTestId('nav-menu');
    expect(navMenu).toBeInTheDocument();
  });

  test('renders BurgerMenu', () => {
    const burgerMenu = screen.getByTestId('burger-menu');
    expect(burgerMenu).toBeInTheDocument();
  });

  test('toggles BurgerMenu on NavMenu button click', () => {
    const navMenuBurgerButton = screen.getByTestId('nav-menu-burger-button');
    const burgerMenu = screen.getByTestId('burger-menu');

    expect(burgerMenu).toHaveAttribute('aria-hidden', 'true');

    fireEvent.click(navMenuBurgerButton);
    expect(burgerMenu).toHaveAttribute('aria-hidden', 'false');

    fireEvent.click(navMenuBurgerButton);
    expect(burgerMenu).toHaveAttribute('aria-hidden', 'true');
  });

  test('renders Outlet', () => {
    const outlet = screen.getByText('Test Page');
    expect(outlet).toBeInTheDocument();
  });
});
