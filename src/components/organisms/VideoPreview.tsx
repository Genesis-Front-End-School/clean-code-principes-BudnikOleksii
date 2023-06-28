import { FC, useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import Box from '@mui/material/Box';
import { ERROR_PLACEHOLDER } from '../../constants';
import { hlsErrorHandler, initHls } from '../../utils/hls-helpers';

type Props = {
  link: string;
};

export const VideoPreview: FC<Props> = ({ link }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const video = videoRef.current;
      const hls = initHls(link, video);

      hls.on(Hls.Events.ERROR, hlsErrorHandler(hls, setIsError));

      return () => {
        hls.destroy();
      };
    }
  }, [link]);

  return (
    <Box>
      {isError ? (
        <img src={ERROR_PLACEHOLDER} alt="error" style={{ width: '300px' }} />
      ) : (
        <video
          ref={videoRef}
          muted
          loop
          autoPlay
          style={{ width: '300px' }}
          data-testid="video-element"
        />
      )}
    </Box>
  );
};
