import { FC, useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import Box from '@mui/material/Box';
import { errorPlaceholder } from '../../constants';
import { ILesson } from '../../types/course';
import { useAppDispatch } from '../../app/hooks';
import { updateCurrentTime } from '../../features/courses/courses-slice';
import Typography from '@mui/material/Typography';

type Props = {
  lesson: ILesson;
};

export const VideoBlock: FC<Props> = ({ lesson }) => {
  const { link, currentTime = 0 } = lesson;
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      if (Hls.isSupported()) {
        const hls = new Hls();

        hls.loadSource(link);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.currentTime = currentTime;
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                setIsError(true);
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                break;
            }
          }
        });
      }
      const handlePause = () => {
        dispatch(updateCurrentTime({ ...lesson, currentTime: video.currentTime }));
      };

      const handleChangeSpeed = (event: KeyboardEvent) => {
        if (!event.altKey) {
          return;
        }

        const rate = video.playbackRate;

        switch (event.key) {
          case 'p':
            video.playbackRate = rate >= 2 ? rate : rate + 0.25;
            break;
          case 'm':
            video.playbackRate = rate <= 0.25 ? rate : rate - 0.25;
            break;
          default:
            break;
        }
      };

      video.addEventListener('pause', handlePause);
      window.addEventListener('keydown', handleChangeSpeed);

      return () => {
        video.removeEventListener('pause', handlePause);
        window.removeEventListener('keydown', handleChangeSpeed);
      };
    }
  }, [link]);

  return (
    <Box>
      {isError ? (
        <img src={errorPlaceholder} alt="error" />
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
