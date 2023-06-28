export const NavMenu = ({ onDrawerToggle }: { onDrawerToggle: () => void }) => (
  <div data-testid="nav-menu">
    Mocked NavMenu
    <button data-testid="nav-menu-burger-button" onClick={onDrawerToggle} />
  </div>
);
