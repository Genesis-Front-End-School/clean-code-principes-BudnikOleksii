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
});
