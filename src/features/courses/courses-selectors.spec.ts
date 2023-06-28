import { selectCourses } from './courses-selectors';
import { mockState } from '../../mock-data';

describe('Courses selectors', () => {
  it('should return the courses state', () => {
    const result = selectCourses(mockState);

    expect(result).toEqual(mockState.courses);
  });
});
