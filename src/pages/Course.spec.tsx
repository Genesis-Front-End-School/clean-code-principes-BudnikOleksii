import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen } from '@testing-library/react';
import Course from './Course';
import { renderWithProviders } from '../utils/test-utils';
import { mockCourse } from '../mock-data';

jest.mock('./NotFound');

jest.mock('../components/organisms/CourseCard', () => ({
  CourseCard: () => <div data-testid="course-card">Mocked CourseCard</div>,
}));

jest.mock('../components/organisms/CourseContent', () => ({
  CourseContent: () => <div data-testid="course-content">Mocked CourseContent</div>,
}));

describe('Course', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const useSelectorMock = jest.spyOn(require('../app/hooks'), 'useAppSelector');
  const courseId = '1';

  const renderWithRouter = (route: string) => {
    renderWithProviders(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/courses/:courseId" element={<Course />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('renders the CourseCard and CourseContent components when a course is selected', async () => {
    useSelectorMock.mockImplementationOnce(() => ({ selectedCourse: mockCourse }));
    useSelectorMock.mockImplementationOnce(() => false);

    renderWithRouter(`/courses/${courseId}`);

    const courseCard = await screen.findByTestId('course-card');
    const courseContent = await screen.findByTestId('course-content');

    expect(courseCard).toBeInTheDocument();
    expect(courseContent).toBeInTheDocument();
  });

  test('renders the NotFound component when no course is selected', () => {
    useSelectorMock.mockImplementationOnce(() => ({ selectedCourse: null }));
    useSelectorMock.mockImplementationOnce(() => false);

    renderWithRouter(`/courses/${courseId}`);

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
