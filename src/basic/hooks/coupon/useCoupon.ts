import { useCallback, useState } from 'react';
import { Coupon } from '../../../types';
import { initialCoupons } from '../../constants';
import { useLocalStorage } from '../utility/useLocalStorage';

/**
 * 상태/기능 훅: 쿠폰 도메인. 
 * 쿠폰 상태 로컬 스토리지 연동 및 등록/조회
 */
export function useCoupon() {
  const [coupons, setCoupons] = useLocalStorage<Coupon[]>('coupons', initialCoupons);

  const addCoupon = useCallback((newCoupon: Coupon, addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void) => {
    const exists = coupons.some(c => c.code === newCoupon.code);
    if (exists) {
      addNotification('이미 존재하는 쿠폰 코드입니다.', 'error');
      return;
    }
    setCoupons(prev => [...prev, newCoupon]);
    addNotification('쿠폰이 추가되었습니다.', 'success');
  }, [coupons, setCoupons]);

  const deleteCoupon = useCallback((couponCode: string, addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void) => {
    setCoupons(prev => prev.filter(c => c.code !== couponCode));
    addNotification('쿠폰이 삭제되었습니다.', 'success');
  }, [setCoupons]);

  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const applyCoupon = useCallback(
    (coupon: Coupon, currentCartTotal: number, addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void) => {
      if (currentCartTotal < 10000 && coupon.discountType === 'percentage') {
        addNotification('percentage 쿠폰은 10,000원 이상 구매 시 사용 가능합니다.', 'error');
        return;
      }
      setSelectedCoupon(coupon);
      addNotification('쿠폰이 적용되었습니다.', 'success');
    },
    []
  );

  const clearSelectedCoupon = useCallback(() => {
    setSelectedCoupon(null);
  }, []);

  return {
    coupons,
    addCoupon,
    deleteCoupon,
    selectedCoupon,
    applyCoupon,
    clearSelectedCoupon,
  };
}
