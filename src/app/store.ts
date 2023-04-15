import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import actionsInfoReducer from '../features/actions-info/actions-info-slice';
import coursesReducer from '../features/courses/courses-slice';
import createSagaMiddleware from 'redux-saga';
import IndexSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    actionsInfo: actionsInfoReducer,
    courses: coursesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(IndexSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
