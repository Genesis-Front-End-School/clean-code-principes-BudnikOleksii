import { screen } from '@testing-library/react';
import { mockCourse } from '../../mock-data';
import { renderWithProviders } from '../../utils/test-utils';
import { VideoPreview } from './VideoPreview';

jest.mock('hls.js');
jest.mock('../../app/hooks');

describe('VideoPreview', () => {
  test('renders the video preview component', () => {
    renderWithProviders(<VideoPreview link={mockCourse.meta.courseVideoPreview!.link} />);

    const videoElement = screen.getByTestId('video-element');

    expect(videoElement).toBeInTheDocument();
  });
});
