import $api, { ENDPOINTS } from './index';

export const getCourses = () => {
  return $api.get(ENDPOINTS.coursesPreview);
};

export const getCourse = (id: string) => {
  return $api.get(ENDPOINTS.coursePreview(id));
};
