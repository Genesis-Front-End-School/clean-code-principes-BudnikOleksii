import { RootState } from '../app/store';
import { mockCourses, mockCourseWithLessons } from './courses';

export const mockActionType = 'ACTION_TYPE_1';
export const mockActionType2 = 'ACTION_TYPE_2';
export const mockCoursesState = {
  courses: mockCourses,
  selectedCourse: mockCourseWithLessons,
};
export const mockActionsState = {
  error: null,
  actions: [mockActionType, mockActionType2],
  successMessage: null,
};

export const mockState: RootState = {
  courses: mockCoursesState,
  actionsInfo: mockActionsState,
};
