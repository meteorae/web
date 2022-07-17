import isFunction from 'lodash-es/isFunction';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useLocalStorage(key: string, initialValue: any) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setValue = (value: never | ((args: any) => never)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = isFunction(value) ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
