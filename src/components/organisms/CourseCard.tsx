import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICourse } from '../../types/course';
import { CardItem } from '../../lib/dist';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import NumbersIcon from '@mui/icons-material/Numbers';
import EventIcon from '@mui/icons-material/Event';
import { getLocalDate } from '../../utils/date-helpers';
import { PATHS } from '../../constants';
import { SkillsBlock } from '../molecules/SkillsBlock';
import { HeadingWithPopover } from '../molecules/HeadingWithPopover';

interface Props {
  course: ICourse;
  isWithLink?: boolean;
}

export const CourseCard: FC<Props> = ({ course, isWithLink }) => {
  const {
    title,
    id,
    description,
    duration,
    lessonsCount,
    previewImageLink,
    rating,
    launchDate,
    meta,
  } = course;
  const { skills, courseVideoPreview } = meta;
  const navigate = useNavigate();

  const handleOpenCourse = () => {
    navigate(`${PATHS.courses}/${id}`);
  };

  return (
    <Grid item>
      <CardItem>
        <CardMedia
          component="img"
          image={previewImageLink + '/cover.webp'}
          alt={title}
          sx={{ width: { xs: '100%', lg: '50%' } }}
        />

        <Box>
          <CardContent>
            <HeadingWithPopover title={title} courseVideoPreview={courseVideoPreview} />

            <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />

            <Typography gutterBottom variant="subtitle1" component="p">
              {description}
            </Typography>

            <List sx={{ display: 'flex' }}>
              <ListItem disablePadding>
                <ListItemIcon>
                  <HourglassTopIcon />
                </ListItemIcon>

                <ListItemText primary={`Duration: ${duration}`} />
              </ListItem>

              <ListItem disablePadding>
                <ListItemIcon>
                  <NumbersIcon />
                </ListItemIcon>

                <ListItemText primary={`Lessons: ${lessonsCount || 'Unknown'}`} />
              </ListItem>

              <ListItem disablePadding>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>

                <ListItemText primary={`Date: ${getLocalDate(launchDate)}`} />
              </ListItem>
            </List>

            {skills && skills.length > 0 && <SkillsBlock skills={skills} />}
          </CardContent>

          {isWithLink && (
            <CardActions sx={{ marginTop: 'auto' }}>
              <Button color="info" onClick={handleOpenCourse} size="large">
                Details
              </Button>
            </CardActions>
          )}
        </Box>
      </CardItem>
    </Grid>
  );
};
