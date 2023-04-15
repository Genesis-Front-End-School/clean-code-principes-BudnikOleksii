import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { NotificationBlock } from '../organisms/NotificationBlock';
import { NavMenu } from '../organisms/NavMenu';
import { BurgerMenu } from '../organisms/BurgerMenu';
import { ContentContainer } from '../atoms/ContentContainer';

export const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  return (
    <Box>
      <NotificationBlock />
      <NavMenu onDrawerToggle={handleDrawerToggle} />
      <BurgerMenu open={mobileOpen} onDrawerToggle={handleDrawerToggle} />

      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </Box>
  );
};
