import { CartItem, Coupon } from '../../../types';
import type { ProductWithUI } from '../../constants';
import ProductListPage from './ProductListPage';

export interface ProductListProps {
  products: ProductWithUI[];
  filteredProducts: ProductWithUI[];
  debouncedSearchTerm: string;
  cart: CartItem[];
  addToCart: (product: ProductWithUI) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  calculateItemTotal: (item: CartItem) => number;
  selectedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon, totalBeforeDiscount: number, addNotification: (msg: string, type?: 'error' | 'success' | 'warning') => void) => void;
  clearSelectedCoupon: () => void;
  completeOrder: () => void;
  totals: { totalBeforeDiscount: number; totalAfterDiscount: number };
  coupons: Coupon[];
  formatPriceUser: (price: number) => string;
  addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void;
}

const ProductList = ({
  products,
  filteredProducts,
  debouncedSearchTerm,
  cart,
  addToCart,
  removeFromCart,
  updateQuantity,
  calculateItemTotal,
  selectedCoupon,
  applyCoupon,
  clearSelectedCoupon,
  completeOrder,
  totals,
  coupons,
  formatPriceUser,
  addNotification,
}: ProductListProps) => {

  return (
    <ProductListPage
      products={products}
      filteredProducts={filteredProducts}
      debouncedSearchTerm={debouncedSearchTerm}
      cart={cart}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      updateQuantity={updateQuantity}
      calculateItemTotal={calculateItemTotal}
      selectedCoupon={selectedCoupon}
      applyCoupon={applyCoupon}
      clearSelectedCoupon={clearSelectedCoupon}
      completeOrder={completeOrder}
      totals={totals}
      coupons={coupons}
      formatPriceUser={formatPriceUser}
      addNotification={addNotification}
    />
  );
};

export default ProductList;
