import { getItemFromLocalStorage, setItemToLocalStorage } from './localstorage-helpers';

describe('localStorageHelpers', () => {
  const key = 'testKey';
  const value = { test: 'value' };

  beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('setItemToLocalStorage correctly sets an item to localStorage', () => {
    setItemToLocalStorage(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  test('getItemFromLocalStorage retrieves an item from localStorage', () => {
    // @ts-expect-error
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(value));

    const retrievedValue = getItemFromLocalStorage(key);
    expect(retrievedValue).toEqual(value);
    expect(localStorage.getItem).toHaveBeenCalledWith(key);
  });

  test('getItemFromLocalStorage returns null if the key does not exist', () => {
    // @ts-expect-error
    localStorage.getItem.mockReturnValueOnce(null);

    const nonExistingKey = 'nonExistingKey';
    const retrievedValue = getItemFromLocalStorage(nonExistingKey);
    expect(retrievedValue).toBeNull();
    expect(localStorage.getItem).toHaveBeenCalledWith(nonExistingKey);
  });
});
