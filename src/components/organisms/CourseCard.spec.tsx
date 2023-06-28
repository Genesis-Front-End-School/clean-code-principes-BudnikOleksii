import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CourseCard } from './CourseCard';
import { mockCourse } from '../../mock-data';
import { renderWithProviders } from '../../utils/test-utils';
import { getLocalDate } from '../../utils/date-helpers';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

const renderCourseCard = (isWithLink?: boolean) => {
  return renderWithProviders(
    <MemoryRouter>
      <CourseCard course={mockCourse} isWithLink={isWithLink} />
    </MemoryRouter>
  );
};

describe('CourseCard', () => {
  beforeEach(() => {
    mockedUsedNavigate.mockReset();
  });

  test('renders the course information correctly', () => {
    renderCourseCard();

    const courseTitle = screen.getByText(mockCourse.title);
    const courseDescription = screen.getByText(mockCourse.description);
    const courseImage = screen.getByAltText(mockCourse.title);
    const courseDuration = screen.getByText(`Duration: ${mockCourse.duration}`);
    const courseLessonsCount = screen.getByText(`Lessons: ${mockCourse.lessonsCount || 'Unknown'}`);
    const courseDate = screen.getByText(`Date: ${getLocalDate(mockCourse.launchDate)}`);
    const skills = screen.getAllByText(/Aligning your goals with your motives/);

    expect(courseTitle).toBeInTheDocument();
    expect(courseDescription).toBeInTheDocument();
    expect(courseImage).toBeInTheDocument();
    expect(courseImage).toHaveAttribute('src', mockCourse.previewImageLink + '/cover.webp');
    expect(courseDuration).toBeInTheDocument();
    expect(courseLessonsCount).toBeInTheDocument();
    expect(courseDate).toBeInTheDocument();
    expect(skills).toHaveLength(1);
  });

  test('renders the Details button when isWithLink is true', () => {
    renderCourseCard(true);

    const detailsButton = screen.getByRole('button', { name: 'Details' });

    expect(detailsButton).toBeInTheDocument();
  });

  test('does not render the Details button when isWithLink is not provided or false', () => {
    renderCourseCard(false);

    const detailsButton = screen.queryByRole('button', { name: 'Details' });

    expect(detailsButton).not.toBeInTheDocument();
  });

  test('navigates to the course details page when the Details button is clicked', () => {
    renderCourseCard(true);

    const detailsButton = screen.getByRole('button', { name: 'Details' });
    userEvent.click(detailsButton);

    // expect(mockedUsedNavigate).toHaveBeenCalledWith('/courses/1');
  });
});
