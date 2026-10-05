import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Failed to read localStorage key "${key}"`, error);
    }
  }, [key]);

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const nextValue =
        typeof value === "function"
          ? (value as (prev: T) => T)(initialValue)
          : value;

      setStoredValue(nextValue);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(nextValue));
      }
    } catch (error) {
      console.warn(`Failed to set localStorage key "${key}"`, error);
    }
  };

  return [storedValue, setValue] as const;
}
