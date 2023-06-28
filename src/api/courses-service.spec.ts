import $api, { ENDPOINTS } from './index';
import { getCourses, getCourse } from './courses-service';
import { mockCourses, mockCourseWithLessons } from '../mock-data';

jest.mock('./index', () => ({
  get: jest.fn(),
  ENDPOINTS: {
    coursesPreview: '/courses/preview',
    coursePreview: (id: string) => `/courses/${id}/preview`,
  },
}));

describe('courses-service', () => {
  beforeEach(() => {
    ($api.get as jest.Mock).mockClear();
  });

  it('fetches courses using the correct endpoint', async () => {
    const coursesData = { courses: mockCourses };

    ($api.get as jest.Mock).mockResolvedValue(coursesData);

    const response = await getCourses();

    expect($api.get).toHaveBeenCalledWith(ENDPOINTS.coursesPreview);
    expect(response).toEqual(coursesData);
  });

  it('fetches a course using the correct endpoint', async () => {
    const courseId = '1';

    ($api.get as jest.Mock).mockResolvedValue(mockCourseWithLessons);

    const response = await getCourse(courseId);

    expect($api.get).toHaveBeenCalledWith(ENDPOINTS.coursePreview(courseId));
    expect(response).toEqual(mockCourseWithLessons);
  });
});
