import { FC, useState } from 'react';
import { ILesson } from '../../types/course';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import LockIcon from '@mui/icons-material/Lock';
import { LessonCard } from './LessonCard';
import { purple } from '@mui/material/colors';
import { ModalStyle } from '../../constants';

type Props = {
  lesson: ILesson;
  onCurrentChange: (lesson: ILesson) => void;
  activeLessonId: string;
};

export const LessonInfo: FC<Props> = ({ lesson, activeLessonId, onCurrentChange }) => {
  const [open, setOpen] = useState(false);
  const isVideo = lesson.type === 'video';
  const isSelected = lesson.id === activeLessonId;
  const isLocked = lesson.status === 'locked';

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenLesson = () => {
    if (isLocked) {
      return;
    }

    if (isVideo) {
      onCurrentChange(lesson);
    } else {
      window.open(lesson.link);
    }
  };

  return (
    <ListItem
      sx={{
        bgcolor: isLocked ? '#999' : isSelected ? purple[500] : '#fff',
        marginBottom: '3px',
        borderRadius: '10px',
        color: isSelected ? '#fff' : '#000',
      }}
    >
      <ListItemText
        onClick={handleOpenLesson}
        primary={`${lesson.order}) ${lesson.title}`}
        sx={{ cursor: 'pointer' }}
      />

      <Button size="small" onClick={handleOpen}>
        {isLocked ? <LockIcon /> : 'Info'}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-lesson-info"
        aria-describedby="modal-lesson-description"
      >
        <Box sx={ModalStyle}>
          <LessonCard lesson={lesson} />
        </Box>
      </Modal>
    </ListItem>
  );
};
