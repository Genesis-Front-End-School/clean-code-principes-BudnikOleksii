import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CourseContent } from './CourseContent';
import { mockLessons } from '../../mock-data';

jest.mock('./VideoBlock');
jest.mock('./LessonInfo');

const renderCourseContent = (lessons = mockLessons) => {
  render(<CourseContent lessons={mockLessons} />);
};

describe('CourseContent', () => {
  test('renders the initial content', () => {
    renderCourseContent();

    expect(screen.getByText(/Video Block/)).toBeInTheDocument();
    expect(screen.getAllByText('Mocked LessonInfo')).toHaveLength(mockLessons.length);
  });

  test('changes the current lesson when a LessonInfo is clicked', () => {
    renderCourseContent();

    const lessonInfos = screen.getAllByTestId('lesson-info');
    userEvent.click(lessonInfos[1]);

    const videoBlocks = screen.getAllByTestId('video-block');
    expect(videoBlocks.length).toBe(1);
    expect(videoBlocks[0]).toHaveTextContent('Video Block for');
  });
});
