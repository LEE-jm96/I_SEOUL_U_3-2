import { useCallback } from 'react';
import { CartItem, Coupon } from '../../../types';
import type { ProductWithUI } from '../../constants';
import {
  calculateCartTotal,
  calculateItemTotal,
  updateCartItemQuantity,
  getRemainingStock,
} from '../../models/cart';

import { useLocalStorage } from '../utility/useLocalStorage';

export interface UseCartParams {
  products: ProductWithUI[];
  addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void;
  selectedCoupon: Coupon | null;
  clearSelectedCoupon?: () => void;
}

/**
 * 상태/기능 훅: 장바구니 도메인. 카트 상태·쿠폰·합계·추가/삭제/수량/결제 로직.
 */
export function useCart({ products, addNotification, selectedCoupon, clearSelectedCoupon }: UseCartParams) {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);

  const totals = calculateCartTotal(cart, selectedCoupon);

  const addToCart = useCallback(
    (product: ProductWithUI) => {
      const remainingStock = getRemainingStock(product, cart);
      if (remainingStock <= 0) {
        addNotification('재고가 부족합니다!', 'error');
        return;
      }

      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.product.id === product.id);

        if (existingItem) {
          const newQuantity = existingItem.quantity + 1;

          if (newQuantity > product.stock) {
            addNotification(`재고는 ${product.stock}개까지만 있습니다.`, 'error');
            return prevCart;
          }

          return updateCartItemQuantity(prevCart, product.id, newQuantity);
        }

        return [...prevCart, { product, quantity: 1 }];
      });

      addNotification('장바구니에 담았습니다', 'success');
    },
    [cart, setCart, addNotification]
  );

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  }, [setCart]);

  const updateQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
      }

      const product = products.find((p) => p.id === productId);
      if (!product) return;

      const maxStock = product.stock;
      if (newQuantity > maxStock) {
        addNotification(`재고는 ${maxStock}개까지만 있습니다.`, 'error');
        return;
      }

      setCart((prevCart) => updateCartItemQuantity(prevCart, productId, newQuantity));

    },
    [products, setCart, removeFromCart, addNotification]
  );

  const completeOrder = useCallback(() => {
    const orderNumber = `ORD-${Date.now()}`;
    addNotification(`주문이 완료되었습니다. 주문번호: ${orderNumber}`, 'success');
    setCart([]);
    clearSelectedCoupon?.();
  }, [addNotification, setCart, clearSelectedCoupon]);
  return {
    cart,
    setCart,
    totals,
    addToCart,
    removeFromCart,
    updateQuantity,
    completeOrder,
    calculateItemTotal: (item: CartItem) => calculateItemTotal(item, cart),
  };
}
