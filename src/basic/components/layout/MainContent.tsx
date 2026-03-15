import Admin from '../admin';
import ProductList from '../product';
import type { ProductWithUI } from '../../constants';
import { CartItem, Coupon } from '../../../types';

interface MainContentProps {
  isAdmin: boolean;
  products: ProductWithUI[];
  addProduct: (product: any) => void;
  updateProduct: (id: string, updates: any) => void;
  deleteProduct: (id: string) => void;
  coupons: Coupon[];
  addCoupon: (coupon: Coupon, addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void) => void;
  deleteCoupon: (code: string, addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void) => void;
  addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void;
  filteredProducts: ProductWithUI[];
  debouncedSearchTerm: string;
  cart: CartItem[];
  cartProps: any;
  selectedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon, cartTotal: number, addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void) => void;
  clearSelectedCoupon: () => void;
  formatPriceUser: (price: number) => string;
}

const MainContent = ({
  isAdmin,
  products,
  addProduct,
  updateProduct,
  deleteProduct,
  coupons,
  addCoupon,
  deleteCoupon,
  addNotification,
  filteredProducts,
  debouncedSearchTerm,
  cart,
  cartProps,
  selectedCoupon,
  applyCoupon,
  clearSelectedCoupon,
  formatPriceUser,
}: MainContentProps) => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {isAdmin ? (
        <Admin
          products={products}
          addProduct={addProduct}
          updateProduct={updateProduct}
          deleteProduct={deleteProduct}
          coupons={coupons}
          addCoupon={addCoupon}
          deleteCoupon={deleteCoupon}
          addNotification={addNotification}
        />
      ) : (
        <ProductList
          products={products}
          filteredProducts={filteredProducts}
          debouncedSearchTerm={debouncedSearchTerm}
          cart={cart}
          selectedCoupon={selectedCoupon}
          applyCoupon={applyCoupon}
          clearSelectedCoupon={clearSelectedCoupon}
          coupons={coupons}
          formatPriceUser={formatPriceUser}
          addNotification={addNotification}
          {...cartProps}
        />
      )}
    </main>
  );
};

export default MainContent;
