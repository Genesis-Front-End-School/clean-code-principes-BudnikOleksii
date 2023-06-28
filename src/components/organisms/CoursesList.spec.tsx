import { render, screen } from '@testing-library/react';
import { CoursesList } from './CoursesList';
import { mockCourses } from '../../mock-data';
import { ICourse } from '../../types/course';

jest.mock('./CourseCard');

const renderCoursesList = (courses: ICourse[]) => {
  render(<CoursesList courses={courses} />);
};

describe('CoursesList', () => {
  test('renders the correct number of CourseCard components', () => {
    renderCoursesList(mockCourses);

    const courseCards = screen.getAllByTestId('course-card');
    expect(courseCards.length).toBe(mockCourses.length);
  });

  test('renders no CourseCard components when courses is an empty array', () => {
    renderCoursesList([]);

    const courseCards = screen.queryAllByTestId('course-card');
    expect(courseCards.length).toBe(0);
  });

  test('renders the correct course information in the CourseCard components', () => {
    renderCoursesList(mockCourses);

    mockCourses.forEach((course) => {
      const courseTitle = screen.getByText(`Mocked CourseCard for ${course.title}`);
      expect(courseTitle).toBeInTheDocument();
    });
  });
});
