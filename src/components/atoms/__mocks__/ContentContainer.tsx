import { Outlet } from 'react-router-dom';

export const ContentContainer = () => (
  <div data-testid="content-container">
    Mocked ContentContainer
    <Outlet />
  </div>
);
