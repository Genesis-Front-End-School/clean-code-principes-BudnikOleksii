import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { PATHS } from '../../constants';
import { ThemeSwitch } from '../atoms/ThemeSwitch';

interface Props {
  onDrawerToggle: () => void;
}

export const NavMenu: FC<Props> = memo(({ onDrawerToggle }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`${PATHS.courses}`);
  };

  return (
    <AppBar component="nav">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Courses app
        </Typography>

        <ThemeSwitch />

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button onClick={handleNavigate} sx={{ color: '#fff' }}>
            Main page
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
});
