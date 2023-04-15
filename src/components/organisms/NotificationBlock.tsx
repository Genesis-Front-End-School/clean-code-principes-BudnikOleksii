import LinearProgress from '@mui/material/LinearProgress';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectNotificationInfo } from '../../features/actions-info/actions-info-selector';
import { setDefaultStatus } from '../../features/actions-info/actions-info-slice';
import { NotificationsAlert } from '../molecules/NotificationsAlert';
import { MATERIAL_NAV_Z_INDEX } from '../../constants';

export const NotificationBlock = () => {
  const dispatch = useAppDispatch();
  const { error, actions, successMessage } = useAppSelector(selectNotificationInfo);

  const handleCloseNotification = () => dispatch(setDefaultStatus());

  return (
    <>
      {actions.length > 0 && (
        <LinearProgress
          color="secondary"
          sx={{ position: 'fixed', top: '0', zIndex: MATERIAL_NAV_Z_INDEX + 1, width: '100vw' }}
        />
      )}

      {successMessage && (
        <NotificationsAlert
          type="success"
          message={successMessage}
          onClose={handleCloseNotification}
        />
      )}

      {error && (
        <NotificationsAlert
          type="error"
          message={error.message}
          onClose={handleCloseNotification}
        />
      )}
    </>
  );
};
