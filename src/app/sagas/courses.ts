import { call, put, takeEvery, StrictEffect } from 'redux-saga/effects';
import { getCourse, getCourses } from '../../api/courses-service';
import {
  courseLoadingStart,
  coursesLoadingStart,
  coursesSuccess,
  courseSuccess,
} from '../../features/courses/courses-slice';
import { finishAction, setError } from '../../features/actions-info/actions-info-slice';
import { ICourseResponse, ICoursesResponse } from '../../types/course';
import { IError } from '../../types/helper-types';

function* coursesWorker(): Generator<StrictEffect, void, ICoursesResponse> {
  try {
    const { courses } = yield call(getCourses);

    yield put(coursesSuccess(courses));
  } catch (error) {
    yield put(setError(error as IError));
  } finally {
    yield put(finishAction(coursesLoadingStart.type));
  }
}

function* courseWorker(
  action: ReturnType<typeof courseLoadingStart>
): Generator<StrictEffect, void, ICourseResponse> {
  try {
    const course = yield call(getCourse, action.payload.courseId);

    yield put(courseSuccess(course));
  } catch (error) {
    yield put(setError(error as IError));
  } finally {
    yield put(finishAction(courseLoadingStart.type));
  }
}

function* coursesSaga() {
  yield takeEvery(coursesLoadingStart.type, coursesWorker);
  yield takeEvery(courseLoadingStart.type, courseWorker);
}

export default coursesSaga;
