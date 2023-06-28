import { all } from 'redux-saga/effects';
import coursesSaga from './courses';

export default function* IndexSaga() {
  yield all([coursesSaga()]);
}
