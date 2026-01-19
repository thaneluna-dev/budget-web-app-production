import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Function to get the initial value from localStorage or use the provided initialValue
  const getStoredValue = () => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  };

  const [value, setValue] = useState(getStoredValue);

  // useEffect to update localStorage whenever the state 'value' changes
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;