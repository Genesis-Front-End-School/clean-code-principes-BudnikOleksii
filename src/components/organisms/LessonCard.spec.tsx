import { render, screen } from '@testing-library/react';
import { LessonCard } from './LessonCard';
import { mockLesson, mockLesson2, mockLessons } from '../../mock-data';
import { PREVIEW_PLACEHOLDER } from '../../constants';
import { ILesson } from '../../types/course';

jest.mock('@mui/icons-material/Lock', () => {
  return {
    __esModule: true,
    default: () => <span data-testid="locked-icon">Mocked LockIcon</span>,
  };
});

jest.mock('@mui/icons-material/LockOpen', () => {
  return {
    __esModule: true,
    default: () => <span data-testid="unlocked-icon">Mocked LockOpenIcon</span>,
  };
});

jest.mock('@mui/icons-material/OndemandVideo', () => {
  return {
    __esModule: true,
    default: () => <span data-testid="video-icon">Mocked OndemandVideoIcon</span>,
  };
});

jest.mock('@mui/icons-material/Article', () => {
  return {
    __esModule: true,
    default: () => <span data-testid="article-icon">Mocked ArticleIcon</span>,
  };
});

const renderLessonCard = (lesson: ILesson) => {
  render(<LessonCard lesson={lesson} />);
};

describe('LessonCard', () => {
  test('renders the title correctly', () => {
    renderLessonCard(mockLesson);

    const title = screen.getByRole('heading', { name: mockLesson.title });
    expect(title).toBeInTheDocument();
  });

  test('renders the duration correctly', () => {
    renderLessonCard(mockLesson);

    const durationText = screen.getByText(`Duration: ${mockLesson.duration}`);
    expect(durationText).toBeInTheDocument();
  });

  test('renders the status correctly', () => {
    renderLessonCard(mockLesson);

    const statusText = screen.getByText(`Status: ${mockLesson.status}`);
    expect(statusText).toBeInTheDocument();
  });

  test('renders the type correctly', () => {
    renderLessonCard(mockLesson);

    const typeText = screen.getByText(`Type: ${mockLesson.type}`);
    expect(typeText).toBeInTheDocument();
  });

  test('renders the correct icons for type and status', () => {
    renderLessonCard(mockLesson);

    const typeIconTestId = 'video-icon';
    const typeIcon = screen.getByTestId(typeIconTestId);
    expect(typeIcon).toBeInTheDocument();

    const statusIconTestId = 'unlocked-icon';
    const statusIcon = screen.getByTestId(statusIconTestId);
    expect(statusIcon).toBeInTheDocument();
  });

  test('renders the correct icons for type and status', () => {
    renderLessonCard(mockLesson2);

    const typeIconTestId = 'article-icon';
    const typeIcon = screen.getByTestId(typeIconTestId);
    expect(typeIcon).toBeInTheDocument();

    const statusIconTestId = 'locked-icon';
    const statusIcon = screen.getByTestId(statusIconTestId);
    expect(statusIcon).toBeInTheDocument();
  });

  test('renders the image correctly', () => {
    const lesson = mockLesson2;
    renderLessonCard(lesson);

    const image = screen.getByRole('img', { name: lesson.title });
    expect(image).toHaveAttribute(
      'src',
      lesson.type === 'video'
        ? `${lesson.previewImageLink}/lesson-${lesson.order}.webp`
        : PREVIEW_PLACEHOLDER
    );
  });
});
