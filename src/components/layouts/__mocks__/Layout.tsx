import { Outlet } from 'react-router-dom';

export const Layout = () => (
  <div data-testid="layout">
    Mocked Layout
    <Outlet />
  </div>
);
