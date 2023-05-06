import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { VideoBlock } from './VideoBlock';
import { mockLesson } from '../../mock-data';
import { renderWithProviders } from '../../utils/test-utils';

jest.mock('hls.js');
jest.mock('../../app/hooks');

describe('VideoBlock', () => {
  test('renders the video block component', () => {
    renderWithProviders(<VideoBlock lesson={mockLesson} />);

    const videoElement = screen.getByTestId('video-element');

    expect(videoElement).toBeInTheDocument();
  });

  // test('renders the error placeholder when an error occurs', () => {
  //   renderWithProviders(<VideoBlock lesson={mockLesson} />);
  //   const videoElement = screen.getByTestId('video-element');
  //
  //   const hlsInstance = (Hls as any).instances[0];
  //   hlsInstance.trigger(Hls.Events.ERROR, {
  //     type: Hls.ErrorTypes.MEDIA_ERROR,
  //   });
  //
  //   const errorImage = screen.getByAltText('error');
  //   expect(errorImage).toBeInTheDocument();
  //   expect(videoElement).not.toBeInTheDocument();
  // });

  // test('handles change playback speed with hotkeys', async () => {
  //   renderWithProviders(<VideoBlock lesson={mockLesson} />);
  //   const videoElement = screen.getByTestId('video-element') as HTMLVideoElement;
  //
  //   fireEvent.keyDown(window, { key: 'p', altKey: true });
  //   await waitFor(() => expect(videoElement.playbackRate).toBe(1));
  //
  //   fireEvent.keyDown(window, { key: 'm', altKey: true });
  //   await waitFor(() => expect(videoElement.playbackRate).toBe(1));
  // });
});
