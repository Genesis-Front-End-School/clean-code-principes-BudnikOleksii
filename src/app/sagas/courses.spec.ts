import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import {
  courseLoadingStart,
  coursesLoadingStart,
  coursesSuccess,
  courseSuccess,
} from '../../features/courses/courses-slice';
import { finishAction, setError } from '../../features/actions-info/actions-info-slice';
import coursesSaga, { coursesWorker, courseWorker } from './courses';
import { getCourse, getCourses } from '../../api/courses-service';
import { throwError } from 'redux-saga-test-plan/providers';
import { mockCourses, mockCourseWithLessons } from '../../mock-data';

jest.mock('../../api/courses-service', () => ({
  getCourse: jest.fn(),
  getCourses: jest.fn(),
}));

describe('coursesSaga', () => {
  const courseId = '1';
  const courseResponse = mockCourseWithLessons;
  const coursesResponse = { courses: mockCourses };
  const error = {
    message: 'Error fetching courses',
    statusCode: 500,
    name: '',
  };

  it('handles coursesLoadingStart action and fetches courses', () => {
    return expectSaga(coursesWorker)
      .provide([[call(getCourses), coursesResponse]])
      .put(coursesSuccess(coursesResponse.courses))
      .put(finishAction(coursesLoadingStart.type))
      .silentRun();
  });

  it('handles courseLoadingStart action and fetches a single course', () => {
    return expectSaga(courseWorker, courseLoadingStart({ courseId }))
      .provide([[call(getCourse, courseId), courseResponse]])
      .put(courseSuccess(courseResponse))
      .put(finishAction(courseLoadingStart.type))
      .silentRun();
  });

  it('handles error during courses fetching', () => {
    return expectSaga(coursesWorker)
      .provide([[call(getCourses), throwError(error)]])
      .put(setError(error))
      .put(finishAction(coursesLoadingStart.type))
      .silentRun();
  });

  it('handles error during single course fetching', () => {
    return expectSaga(courseWorker, courseLoadingStart({ courseId }))
      .provide([[call(getCourse, courseId), throwError(error)]])
      .put(setError(error))
      .put(finishAction(courseLoadingStart.type))
      .silentRun();
  });

  it('runs the coursesSaga', () => {
    testSaga(coursesSaga)
      .next()
      .takeEvery(coursesLoadingStart.type, coursesWorker)
      .next()
      .takeEvery(courseLoadingStart.type, courseWorker)
      .next()
      .isDone();
  });
});
