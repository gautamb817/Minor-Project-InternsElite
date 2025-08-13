import { useState, useEffect, useRef } from "react";

/**
 * useLocalStorage(key, initialValue)
 * - Persists value in localStorage
 * - Keeps state in sync across React reloads
 */
export default function useLocalStorage(key, initialValue) {
  const didMount = useRef(false);

  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState(readValue);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota or serialization errors
    }
  }, [key, value]);

  return [value, setValue];
}
