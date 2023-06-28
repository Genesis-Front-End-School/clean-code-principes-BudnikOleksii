import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { PATHS } from '../../constants';

interface Props {
  open?: boolean;
  onDrawerToggle: () => void;
}

const drawerWidth = 240;

export const BurgerMenu: FC<Props> = memo(({ open, onDrawerToggle }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`${PATHS.courses}`);
  };

  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={open}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Box onClick={onDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            Courses app
          </Typography>

          <Divider />
          <List>
            <Button onClick={handleNavigate}>Main page</Button>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
});
