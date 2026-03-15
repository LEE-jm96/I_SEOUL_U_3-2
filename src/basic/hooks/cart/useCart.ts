import { useState, useCallback } from 'react';
import { CartItem, Coupon } from '../../../types';
import type { ProductWithUI } from '../../constants';
import { getRemainingStock } from '../../utils/cart';

export interface UseCartParams {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  products: ProductWithUI[];
  addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void;
}

/**
 * 상태/기능 훅: 장바구니 도메인. 카트 상태·쿠폰·합계·추가/삭제/수량/결제 로직.
 */
export function useCart({ cart, setCart, products, addNotification }: UseCartParams) {
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const getMaxApplicableDiscount = useCallback((item: CartItem): number => {
    const { discounts } = item.product;
    const { quantity } = item;

    const baseDiscount = discounts.reduce((maxDiscount, discount) => {
      return quantity >= discount.quantity && discount.rate > maxDiscount
        ? discount.rate
        : maxDiscount;
    }, 0);

    const hasBulkPurchase = cart.some((cartItem) => cartItem.quantity >= 10);
    if (hasBulkPurchase) {
      return Math.min(baseDiscount + 0.05, 0.5);
    }

    return baseDiscount;
  }, [cart]);

  const calculateItemTotal = useCallback((item: CartItem): number => {
    const { price } = item.product;
    const { quantity } = item;
    const discount = getMaxApplicableDiscount(item);
    return Math.round(price * quantity * (1 - discount));
  }, [getMaxApplicableDiscount]);

  const calculateCartTotal = useCallback((): {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
  } => {
    let totalBeforeDiscount = 0;
    let totalAfterDiscount = 0;

    cart.forEach((item) => {
      const itemPrice = item.product.price * item.quantity;
      totalBeforeDiscount += itemPrice;
      totalAfterDiscount += calculateItemTotal(item);
    });

    if (selectedCoupon) {
      if (selectedCoupon.discountType === 'amount') {
        totalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
      } else {
        totalAfterDiscount = Math.round(
          totalAfterDiscount * (1 - selectedCoupon.discountValue / 100)
        );
      }
    }

    return {
      totalBeforeDiscount: Math.round(totalBeforeDiscount),
      totalAfterDiscount: Math.round(totalAfterDiscount),
    };
  }, [cart, selectedCoupon, calculateItemTotal]);

  const totals = calculateCartTotal();

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

          return prevCart.map((item) =>
            item.product.id === product.id ? { ...item, quantity: newQuantity } : item
          );
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

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    },
    [products, setCart, removeFromCart, addNotification]
  );

  const applyCoupon = useCallback(
    (coupon: Coupon) => {
      const currentTotal = calculateCartTotal().totalAfterDiscount;

      if (currentTotal < 10000 && coupon.discountType === 'percentage') {
        addNotification('percentage 쿠폰은 10,000원 이상 구매 시 사용 가능합니다.', 'error');
        return;
      }

      setSelectedCoupon(coupon);
      addNotification('쿠폰이 적용되었습니다.', 'success');
    },
    [addNotification, calculateCartTotal]
  );

  const completeOrder = useCallback(() => {
    const orderNumber = `ORD-${Date.now()}`;
    addNotification(`주문이 완료되었습니다. 주문번호: ${orderNumber}`, 'success');
    setCart([]);
    setSelectedCoupon(null);
  }, [addNotification, setCart]);

  return {
    selectedCoupon,
    setSelectedCoupon,
    totals,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    completeOrder,
    calculateItemTotal,
  };
}
