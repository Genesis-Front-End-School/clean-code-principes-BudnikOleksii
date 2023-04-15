import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ErrorPage } from '../components/templates/ErrorPage';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <ErrorPage
      errorNumber={404}
      text="Page not found"
      image="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
    >
      <Button variant="contained" onClick={() => navigate('/')}>
        Go to main
      </Button>
    </ErrorPage>
  );
};

export default NotFoundPage;
