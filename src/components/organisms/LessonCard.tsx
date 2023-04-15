import { FC } from 'react';
import { ILesson } from '../../types/course';
import { CardItem } from '../atoms/CardItem';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ListItemText from '@mui/material/ListItemText';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ArticleIcon from '@mui/icons-material/Article';
import Box from '@mui/material/Box';
import { previewPlaceholder } from '../../constants';

type Props = {
  lesson: ILesson;
};

export const LessonCard: FC<Props> = ({ lesson }) => {
  const { previewImageLink, title, order, type, duration, status } = lesson;

  return (
    <CardItem>
      <CardMedia
        component="img"
        image={type === 'video' ? `${previewImageLink}/lesson-${order}.webp` : previewPlaceholder}
        alt={title}
        sx={{ width: { xs: '100%', lg: '50%' } }}
      />

      <Box sx={{ width: { xs: '100%', lg: '50%' } }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {title}
          </Typography>

          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <HourglassTopIcon />
              </ListItemIcon>

              <ListItemText primary={`Duration: ${duration}`} />
            </ListItem>

            <ListItem disablePadding>
              <ListItemIcon>{status === 'locked' ? <LockIcon /> : <LockOpenIcon />}</ListItemIcon>

              <ListItemText primary={`Status: ${status}`} />
            </ListItem>

            <ListItem disablePadding>
              <ListItemIcon>
                {type === 'video' ? <OndemandVideoIcon /> : <ArticleIcon />}
              </ListItemIcon>

              <ListItemText primary={`Type: ${type}`} />
            </ListItem>
          </List>
        </CardContent>
      </Box>
    </CardItem>
  );
};
