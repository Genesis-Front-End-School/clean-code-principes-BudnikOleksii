import Hls, { ErrorData, ErrorTypes, Events } from 'hls.js';
import { initHls, hlsErrorHandler } from './hls-helpers';

jest.mock('hls.js');

describe('Hls helper', () => {
  let videoRef: HTMLVideoElement;
  let hlsInstance: Hls;

  beforeEach(() => {
    videoRef = document.createElement('video');
    hlsInstance = initHls('https://example.com/video.m3u8', videoRef);
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
    let onError: jest.Mock;

    // it('calls onError when receiving a network error', () => {
    //   hlsInstance.trigger(Events.ERROR, {
    //     fatal: true,
    //     type: Hls.ErrorTypes.NETWORK_ERROR,
    //   } as ErrorData);
    //   expect(onError).toHaveBeenCalledWith(true);
    // });

    // it('calls recoverMediaError when receiving a media error', () => {
    //   hlsInstance.trigger(Events.ERROR, {
    //     fatal: true,
    //     type: Hls.ErrorTypes.MEDIA_ERROR,
    //   } as ErrorData);
    //   expect(hlsInstance.recoverMediaError).toHaveBeenCalled();
    // });
    //
    // it('calls destroy when receiving an unknown fatal error', () => {
    //   hlsInstance.trigger(Events.ERROR, {
    //     fatal: true,
    //     type: 'unknown' as ErrorTypes,
    //   } as ErrorData);
    //   expect(hlsInstance.destroy).toHaveBeenCalled();
    // });
    //
    // it('does not take any action when receiving a non-fatal error', () => {
    //   hlsInstance.trigger(Events.ERROR, {
    //     fatal: false,
    //     type: Hls.ErrorTypes.NETWORK_ERROR,
    //   } as ErrorData);
    //   expect(onError).not.toHaveBeenCalled();
    //   expect(hlsInstance.recoverMediaError).not.toHaveBeenCalled();
    //   expect(hlsInstance.destroy).not.toHaveBeenCalled();
    // });
  });
});
