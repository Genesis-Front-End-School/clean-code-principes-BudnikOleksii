import { call, put, takeEvery } from 'redux-saga/effects';
import { getCourse, getCourses } from '../../api/courses-service';
import {
  courseLoadingStart,
  coursesLoadingStart,
  coursesSuccess,
  courseSuccess,
} from '../../features/courses/courses-slice';
import {
  finishAction,
  setError,
} from '../../features/actions-info/actions-info-slice';
import { ICourseResponse, ICoursesResponse } from '../../types/course';

function* coursesWorker() {
  try {
    const { courses } = (yield call(getCourses)) as ICoursesResponse;

    yield put(coursesSuccess(courses));
  } catch (error) {
    yield put(setError(error));
  } finally {
    yield put(finishAction(coursesLoadingStart.type));
  }
}

function* courseWorker({ payload }: ReturnType<typeof courseLoadingStart>) {
  try {
    const course = (yield call(getCourse, payload.courseId)) as ICourseResponse;

    yield put(courseSuccess(course));
  } catch (error) {
    yield put(setError(error));
  } finally {
    yield put(finishAction(courseLoadingStart.type));
  }
}

function* coursesSaga() {
  yield takeEvery(coursesLoadingStart.type, coursesWorker);
  yield takeEvery(courseLoadingStart.type, courseWorker);
}

export default coursesSaga;
