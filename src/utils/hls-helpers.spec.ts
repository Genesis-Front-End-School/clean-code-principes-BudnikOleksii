import Hls, { ErrorData, Events } from 'hls.js';
import { hlsErrorHandler, initHls } from './hls-helpers';

jest.mock('hls.js');

describe('Hls helper', () => {
  let videoRef: HTMLVideoElement;
  let hlsInstance: Hls;

  beforeEach(() => {
    videoRef = document.createElement('video');
    hlsInstance = initHls('https://example.com/video.m3u8', videoRef);
    // @ts-expect-error
    Hls.ErrorTypes = {
      NETWORK_ERROR: 'networkError',
      MEDIA_ERROR: 'mediaError',
      KEY_SYSTEM_ERROR: 'keySystemError',
      MUX_ERROR: 'muxError',
      OTHER_ERROR: 'otherError',
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('initHls initializes Hls with a given link and videoRef', () => {
    expect(Hls).toHaveBeenCalledTimes(1);
    expect(hlsInstance.loadSource).toHaveBeenCalledWith('https://example.com/video.m3u8');
    expect(hlsInstance.attachMedia).toHaveBeenCalledWith(videoRef);
  });

  describe('hlsErrorHandler', () => {
    const onError = jest.fn();
    let initializedHandler: ReturnType<typeof hlsErrorHandler>;

    beforeEach(() => {
      initializedHandler = hlsErrorHandler(hlsInstance, onError);
    });

    it('should call onError if a NETWORK_ERROR occurred', () => {
      const errorData = {
        fatal: true,
        type: Hls.ErrorTypes.NETWORK_ERROR,
      } as ErrorData;

      initializedHandler({} as Events.ERROR, errorData);

      expect(onError).toHaveBeenCalledWith(true);
    });

    it('should call hls.recoverMediaError if a MEDIA_ERROR occurred', () => {
      const errorData = {
        fatal: true,
        type: Hls.ErrorTypes.MEDIA_ERROR,
      } as ErrorData;

      initializedHandler({} as Events.ERROR, errorData);

      expect(hlsInstance.recoverMediaError).toHaveBeenCalled();
    });

    it('should call hls.destroy if some other error occurred', () => {
      const errorData = {
        fatal: true,
        type: Hls.ErrorTypes.OTHER_ERROR,
      } as ErrorData;

      initializedHandler({} as Events.ERROR, errorData);

      expect(hlsInstance.destroy).toHaveBeenCalled();
    });

    it('should not do anything if error is not fatal', () => {
      const errorData = {
        fatal: false,
        type: Hls.ErrorTypes.OTHER_ERROR,
      } as ErrorData;

      initializedHandler({} as Events.ERROR, errorData);

      expect(onError).not.toHaveBeenCalled();
      expect(hlsInstance.destroy).not.toHaveBeenCalled();
      expect(hlsInstance.recoverMediaError).not.toHaveBeenCalled();
    });
  });
});
