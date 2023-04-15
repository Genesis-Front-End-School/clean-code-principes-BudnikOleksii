import { createSlice } from '@reduxjs/toolkit';
import { IError, Maybe } from '../../types/helper-types';

interface ActionsInfo {
  error: Maybe<IError>;
  actions: string[];
  successMessage: Maybe<string>;
}

const initialState: ActionsInfo = {
  error: null,
  actions: [],
  successMessage: null,
};

const actionsInfoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    registerAction: (state, action) => {
      state.actions.push(action.payload);
    },
    finishAction: (state, action) => {
      state.actions = state.actions.filter((act) => act !== action.payload);
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setDefaultStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const { registerAction, finishAction, setSuccessMessage, setError, setDefaultStatus } =
  actionsInfoSlice.actions;

export default actionsInfoSlice.reducer;
