import $api, { ENDPOINTS } from './index';
import { ICourseResponse, ICoursesResponse } from '../types/course';
import { Id } from '../types/helper-types';

export const getCourses = (): Promise<ICoursesResponse> => {
  return $api.get(ENDPOINTS.coursesPreview);
};

export const getCourse = (id: Id): Promise<ICourseResponse> => {
  return $api.get(ENDPOINTS.coursePreview(id));
};
