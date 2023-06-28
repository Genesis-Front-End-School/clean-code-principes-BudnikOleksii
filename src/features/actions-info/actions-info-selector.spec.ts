import { selectNotificationInfo, selectIsActionInProcess } from './actions-info-selector';
import { mockActionType, mockState } from '../../mock-data';

describe('ActionsInfo selectors', () => {
  it('should return the actionsInfo state', () => {
    const result = selectNotificationInfo(mockState);

    expect(result).toEqual(mockState.actionsInfo);
  });

  it('should return true if action is in process', () => {
    const isActionInProcess = selectIsActionInProcess(mockActionType)(mockState);

    expect(isActionInProcess).toBe(true);
  });

  it('should return false if action is not in process', () => {
    const isActionInProcess = selectIsActionInProcess('ACTION_TYPE_NOT_IN_PROCESS')(mockState);

    expect(isActionInProcess).toBe(false);
  });
});
