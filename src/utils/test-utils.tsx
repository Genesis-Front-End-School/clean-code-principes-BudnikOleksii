import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import actionsInfoReducer from '../features/actions-info/actions-info-slice';
import coursesReducer from '../features/courses/courses-slice';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: typeof store;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    store = configureStore({
      reducer: {
        actionsInfo: actionsInfoReducer,
        courses: coursesReducer,
      },
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
