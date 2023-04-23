import { FC, useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import Box from '@mui/material/Box';
import { CHANGE_RATE_HOTKEYS, ERROR_PLACEHOLDER, VIDEO_RATE } from '../../constants';
import { ILesson } from '../../types/course';
import { useAppDispatch } from '../../app/hooks';
import { updateCurrentTime } from '../../features/courses/courses-slice';
import Typography from '@mui/material/Typography';
import { hlsErrorHandler, initHls } from '../../utils/hls-helpers';

type Props = {
  lesson: ILesson;
};

export const VideoBlock: FC<Props> = ({ lesson }) => {
  const { link, currentTime = 0 } = lesson;
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isError, setIsError] = useState(false);

  const handleChangeSpeed = (event: KeyboardEvent) => {
    const video = videoRef.current;

    if (!event.altKey || !video) {
      return;
    }

    const rate = video.playbackRate;

    switch (event.key) {
      case CHANGE_RATE_HOTKEYS.increase:
        video.playbackRate = rate >= VIDEO_RATE.maxRate ? rate : rate + VIDEO_RATE.rateStep;
        break;
      case CHANGE_RATE_HOTKEYS.decrease:
        video.playbackRate = rate <= VIDEO_RATE.minRate ? rate : rate - VIDEO_RATE.rateStep;
        break;
      default:
        break;
    }
  };

  const handlePause = () => {
    dispatch(updateCurrentTime({ ...lesson, currentTime: videoRef.current!.currentTime }));
  };

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const video = videoRef.current;
      const hls = initHls(link, video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.currentTime = currentTime;
      });
      hls.on(Hls.Events.ERROR, hlsErrorHandler(hls, setIsError));

      video.addEventListener('pause', handlePause);
      window.addEventListener('keydown', handleChangeSpeed);

      return () => {
        video.removeEventListener('pause', handlePause);
        window.removeEventListener('keydown', handleChangeSpeed);
        hls.destroy();
      };
    }
  }, [link]);

  return (
    <Box>
      {isError ? (
        <img src={ERROR_PLACEHOLDER} alt="error" />
      ) : (
        <>
          <Typography gutterBottom variant="h5" component="p">
            You can increase video speed by pressing alt + p and decrease with alt + m
          </Typography>
          <video ref={videoRef} controls={true} style={{ width: '100%' }} />
        </>
      )}
    </Box>
  );
};
