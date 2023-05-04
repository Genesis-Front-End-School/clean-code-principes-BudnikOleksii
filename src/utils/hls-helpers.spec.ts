import Hls from 'hls.js';
import { initHls } from './hls-helpers';

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
});
