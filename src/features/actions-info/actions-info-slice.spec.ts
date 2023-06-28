import actionsInfoReducer, {
  finishAction,
  registerAction,
  setDefaultStatus,
  setError,
  setSuccessMessage,
} from './actions-info-slice';
import { mockActionsState, mockActionType, mockActionType2 } from '../../mock-data';

describe('actionsInfoSlice', () => {
  const error = { message: 'Error occurred', statusCode: 404 };
  const successMessage = 'Success!';

  it('should handle registerAction', () => {
    const newAction = 'ACTION_TYPE_NEW';
    const action = registerAction(newAction);
    const nextState = actionsInfoReducer(mockActionsState, action);

    expect(nextState.actions).toEqual(mockActionsState.actions.concat(newAction));
  });

  it('should handle finishAction', () => {
    const action = finishAction(mockActionType);
    const nextState = actionsInfoReducer(mockActionsState, action);

    expect(nextState.actions).toEqual([mockActionType2]);
  });

  it('should handle setSuccessMessage', () => {
    const action = setSuccessMessage(successMessage);
    const nextState = actionsInfoReducer(mockActionsState, action);

    expect(nextState.successMessage).toEqual(successMessage);
  });

  it('should handle setError', () => {
    const action = setError(error);
    const nextState = actionsInfoReducer(mockActionsState, action);

    expect(nextState.error).toEqual(error);
  });

  it('should handle setDefaultStatus', () => {
    const initialState = {
      error,
      actions: mockActionsState.actions,
      successMessage,
    };
    const action = setDefaultStatus();
    const nextState = actionsInfoReducer(initialState, action);

    expect(nextState.error).toBeNull();
    expect(nextState.successMessage).toBeNull();
  });
});
