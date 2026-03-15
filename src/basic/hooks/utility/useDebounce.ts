import { useState, useEffect } from 'react';

/**
 * 유틸리티 훅: 도메인 무관. value를 delay(ms)만큼 지연해 반환.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
