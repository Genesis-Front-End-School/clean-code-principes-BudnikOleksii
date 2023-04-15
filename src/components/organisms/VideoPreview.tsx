import { FC, useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import Box from '@mui/material/Box';
import { errorPlaceholder } from '../../constants';

type Props = {
  link: string;
};

export const VideoPreview: FC<Props> = ({ link }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      if (Hls.isSupported()) {
        const hls = new Hls();

        hls.loadSource(link);
        hls.attachMedia(video);

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

        return () => {
          hls.destroy();
        };
      }
    }
  }, [link]);

  return (
    <Box>
      {isError ? (
        <img src={errorPlaceholder} alt="error" style={{ width: '300px' }} />
      ) : (
        <video ref={videoRef} muted loop autoPlay style={{ width: '300px' }} />
      )}
    </Box>
  );
};
