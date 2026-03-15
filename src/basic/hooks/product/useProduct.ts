import { useCallback } from 'react';
import { initialProducts } from '../../constants';
import type { ProductWithUI } from '../../constants';
import { useLocalStorage } from '../utility/useLocalStorage';
import { generateProductId } from '../../utils/idGenerator';

export interface UseProductParams {
  addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void;
}

/**
 * 상태/기능 훅: 상품 도메인.
 * - 전체 상품 조회(상태)
 * - Admin용 상품 CRUD (addProduct, updateProduct, deleteProduct)
 * - 검색/필터는 useSearch 훅 사용
 */
export function useProduct({ addNotification }: UseProductParams) {
  const [products, setProducts] = useLocalStorage<ProductWithUI[]>('products', initialProducts);

  const addProduct = useCallback(
    (newProduct: Omit<ProductWithUI, 'id'>) => {
      const product: ProductWithUI = {
        ...newProduct,
        id: generateProductId(),
      };
      setProducts((prev) => [...prev, product]);
      addNotification('상품이 추가되었습니다.', 'success');
    },
    [setProducts, addNotification]
  );

  const updateProduct = useCallback(
    (productId: string, updates: Partial<ProductWithUI>) => {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId ? { ...product, ...updates } : product
        )
      );
      addNotification('상품이 수정되었습니다.', 'success');
    },
    [setProducts, addNotification]
  );

  const deleteProduct = useCallback(
    (productId: string) => {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      addNotification('상품이 삭제되었습니다.', 'success');
    },
    [setProducts, addNotification]
  );

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
