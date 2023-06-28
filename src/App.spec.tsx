import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('./components/layouts/Layout');
jest.mock('./pages/Courses');
jest.mock('./pages/Course');
jest.mock('./pages/NotFound');

const renderWithRouter = (route: string) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
};

describe('App', () => {
  test('renders Layout on the root route', () => {
    renderWithRouter('/');

    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  test('renders Courses on the root route', () => {
    renderWithRouter('/');

    expect(screen.getByTestId('courses')).toBeInTheDocument();
  });

  test('renders Courses on the courses route', () => {
    renderWithRouter('/courses');
    expect(screen.getByTestId('courses')).toBeInTheDocument();
  });

  test('renders Course on the specific course route', () => {
    const courseId = '1';
    renderWithRouter(`/courses/${courseId}`);
    expect(screen.getByTestId('course')).toBeInTheDocument();
  });

  test('renders NotFound on a non-existing route', () => {
    renderWithRouter('/non-existing-route');
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
