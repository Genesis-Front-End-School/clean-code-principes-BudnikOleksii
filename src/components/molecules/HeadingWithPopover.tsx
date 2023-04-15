import React, { FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Popover } from '@mui/material';
import { VideoPreview } from '../organisms/VideoPreview';
import { ICourseVideoPreview } from '../../types/course';

type Props = {
  title: string;
  courseVideoPreview?: ICourseVideoPreview;
};

export const HeadingWithPopover: FC<Props> = ({ title, courseVideoPreview }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleOpenPreview = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget as HTMLDivElement);
  };

  const handleClosePreview = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Typography
        gutterBottom
        variant="h5"
        component="h2"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handleOpenPreview}
        onMouseLeave={handleClosePreview}
      >
        {title}
      </Typography>

      {courseVideoPreview && (
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handleClosePreview}
          disableRestoreFocus
        >
          <VideoPreview link={courseVideoPreview.link} />
        </Popover>
      )}
    </>
  );
};
