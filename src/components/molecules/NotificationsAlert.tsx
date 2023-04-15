import { FC } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface Props {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  onClose: () => void;
}

export const NotificationsAlert: FC<Props> = ({ type, message, onClose }) => {
  return (
    <Snackbar open={!!message} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
