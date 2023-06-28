import { render, screen, fireEvent } from '@testing-library/react';
import { LessonInfo } from './LessonInfo';
import { ILesson } from '../../types/course';
import { mockLessons } from '../../mock-data';

jest.mock('@mui/icons-material/Lock', () => {
  return {
    __esModule: true,
    default: () => <span data-testid="locked-icon">Mocked LockIcon</span>,
  };
});

const renderLessonInfo = (
  lesson: ILesson,
  activeLessonId: string,
  onCurrentChange: (lesson: ILesson) => void
) => {
  render(
    <LessonInfo lesson={lesson} activeLessonId={activeLessonId} onCurrentChange={onCurrentChange} />
  );
};

describe('LessonInfo', () => {
  test('renders the correct text content and locked/unlocked status based on the provided lesson', () => {
    const lesson = mockLessons[0];
    renderLessonInfo(lesson, lesson.id, () => {});

    expect(screen.getByText(`${lesson.order}) ${lesson.title}`)).toBeInTheDocument();
    const lockIcon = screen.queryByRole('img', { name: 'Lock icon' });
    if (lesson.status === 'locked') {
      expect(lockIcon).toBeInTheDocument();
    } else {
      expect(lockIcon).not.toBeInTheDocument();
    }
  });

  test('calls the onCurrentChange callback when the list item text is clicked and the lesson type is video and not locked', () => {
    const videoLesson = mockLessons.find(
      (lesson) => lesson.type === 'video' && lesson.status !== 'locked'
    )!;
    const onCurrentChange = jest.fn();
    renderLessonInfo(videoLesson, videoLesson.id, onCurrentChange);

    fireEvent.click(screen.getByText(`${videoLesson.order}) ${videoLesson.title}`));
    expect(onCurrentChange).toHaveBeenCalledWith(videoLesson);
  });

  test('opens a new window with the correct link when the list item text is clicked and the lesson type is not video and not locked', () => {
    const articleLesson = mockLessons.find(
      (lesson) => lesson.type !== 'video' && lesson.status !== 'locked'
    )!;
    const onCurrentChange = jest.fn();
    renderLessonInfo(articleLesson, articleLesson.id, onCurrentChange);

    window.open = jest.fn();

    fireEvent.click(screen.getByText(`${articleLesson.order}) ${articleLesson.title}`));
    expect(window.open).toHaveBeenCalledWith(articleLesson.link);
  });

  test('opens the modal with the correct information when the "Info" button is clicked', () => {
    const lesson = mockLessons[0];
    renderLessonInfo(lesson, lesson.id, () => {});

    fireEvent.click(screen.getByText('Info'));
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    expect(screen.getByText(lesson.title)).toBeInTheDocument();
  });
});
