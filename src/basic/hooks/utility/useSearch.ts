import { useMemo } from 'react';
import { useDebounce } from './useDebounce';

export interface UseSearchParams<T> {
  items: T[];
  searchTerm: string;
  getSearchableText: (item: T) => string;
  delay?: number;
}

/**
 * 유틸리티 훅: 도메인 무관. 목록 + 검색어 → 디바운스 + 필터된 목록.
 */
export function useSearch<T>({
  items,
  searchTerm,
  getSearchableText,
  delay = 500,
}: UseSearchParams<T>) {
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  const filteredItems = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return items;
    const lower = debouncedSearchTerm.toLowerCase();
    return items.filter((item) =>
      getSearchableText(item).toLowerCase().includes(lower)
    );
  }, [items, debouncedSearchTerm, getSearchableText]);

  return { debouncedSearchTerm, filteredItems };
}
