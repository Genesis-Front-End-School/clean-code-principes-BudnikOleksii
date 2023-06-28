import { screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Courses from './Courses';
import { renderWithProviders } from '../utils/test-utils';
import { mockCourses } from '../mock-data';

jest.mock('../components/molecules/Heading');
jest.mock('../components/organisms/CoursesList');

jest.mock('@mui/material/Typography', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="typography">{props.children}</div>,
}));

jest.mock('@mui/material/Pagination', () => ({
  __esModule: true,
  default: () => <div data-testid="pagination">Mocked Pagination</div>,
}));

describe('Courses', () => {
  const setup = (initialPath = '/courses') => {
    renderWithProviders(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders the Heading, CoursesList, and Pagination components', () => {
    jest.spyOn(require('../app/hooks'), 'useAppSelector').mockImplementation(() => ({
      courses: mockCourses,
    }));

    setup();

    expect(screen.getByTestId('heading')).toBeInTheDocument();
    expect(screen.getByTestId('courses-list')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('renders the "There no courses yet" message when there are no courses', () => {
    jest.spyOn(require('../app/hooks'), 'useAppSelector').mockImplementation(() => ({
      courses: [],
    }));

    setup();

    const typography = screen.getByTestId('typography');
    expect(typography).toBeInTheDocument();
    expect(within(typography).getByText('There no courses yet')).toBeInTheDocument();
  });
});
