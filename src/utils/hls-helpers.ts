import Hls, { ErrorData, Events } from 'hls.js';

export const initHls = (link: string, videoRef: HTMLVideoElement) => {
  const hls = new Hls();

  hls.loadSource(link);
  hls.attachMedia(videoRef);

  return hls;
};

export const hlsErrorHandler = (hls: Hls, onError: (isError: boolean) => void) => {
  return (_: Events.ERROR, data: ErrorData) => {
    if (data.fatal) {
      switch (data.type) {
        case Hls.ErrorTypes.NETWORK_ERROR:
          onError(true);
          break;
        case Hls.ErrorTypes.MEDIA_ERROR:
          hls.recoverMediaError();
          break;
        default:
          hls.destroy();
          break;
      }
    }
  };
};
