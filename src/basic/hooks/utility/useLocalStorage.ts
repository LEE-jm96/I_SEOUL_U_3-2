import { useState, useEffect } from 'react';

/**
 * 유틸리티 훅: 도메인 무관. key 기준으로 localStorage와 동기화하는 상태를 반환.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    if (saved == null) return initialValue;
    try {
      return JSON.parse(saved) as T;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (value === undefined || value === null) {
      localStorage.removeItem(key);
      return;
    }

    const stringifiedValue = JSON.stringify(value);
    if (stringifiedValue === '[]' || stringifiedValue === '{}' || stringifiedValue === '""') {
       localStorage.removeItem(key);
    } else {
       localStorage.setItem(key, stringifiedValue);
    }
  }, [key, value]);

  return [value, setValue];
}
