import { useState } from "react";

export const useLocalStorage = (key, initialValue = 'empty value') => {
  const [storageValue, setStorageValue] = useState(()=>{
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // console.log(error);
      return initialValue
    }
  });

  const setValue = (value) => {
    try {
      setStorageValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storageValue, setValue];
};
