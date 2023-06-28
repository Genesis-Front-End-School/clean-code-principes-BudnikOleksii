import coursesReducer, { coursesSuccess, courseSuccess, updateCurrentTime } from './courses-slice';
import {
  mockCourses,
  mockCoursesState,
  mockCourseWithLessons,
  mockLesson,
  mockLesson2,
  mockLesson3,
} from '../../mock-data';

describe('courses reducer', function () {
  it('should handle initial state', function () {
    expect(coursesReducer(undefined, { type: 'unknown' })).toEqual({
      courses: null,
      selectedCourse: null,
    });
  });

  it('should update state with an array of courses', function () {
    const actual = coursesReducer(mockCoursesState, coursesSuccess(mockCourses));
    expect(actual.courses).toEqual(mockCourses);
  });

  it('should update state with selected course', function () {
    const actual = coursesReducer(mockCoursesState, courseSuccess(mockCourseWithLessons));
    expect(actual.selectedCourse).toEqual(mockCourseWithLessons);
  });

  it('should update current time for selectedCourse', function () {
    const updatedLesson = {
      ...mockLesson,
      currentTime: 50,
    };
    const actual = coursesReducer(mockCoursesState, updateCurrentTime(updatedLesson));
    expect(actual.selectedCourse!.lessons).toEqual([updatedLesson, mockLesson2, mockLesson3]);
  });
});
