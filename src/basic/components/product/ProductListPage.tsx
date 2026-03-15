import { CartItem, Coupon } from '../../../types';
import type { ProductWithUI } from '../../constants';
import { getRemainingStock } from '../../models/cart';
import ProductCard from './ProductCard';
import Cart from '../cart/Cart';

interface ProductListPageProps {
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

const ProductListPage = ({
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
}: ProductListPageProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <section>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">전체 상품</h2>
            <div className="text-sm text-gray-600">
              총 {products.length}개 상품
            </div>
          </div>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">"{debouncedSearchTerm}"에 대한 검색 결과가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  remainingStock={getRemainingStock(product, cart)}
                  addToCart={addToCart}
                  formatPriceUser={formatPriceUser}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="lg:col-span-1">
        <Cart
          cart={cart}
          coupons={coupons}
          selectedCoupon={selectedCoupon}
          totals={totals}
          calculateItemTotal={calculateItemTotal}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          applyCoupon={applyCoupon}
          clearSelectedCoupon={clearSelectedCoupon}
          completeOrder={completeOrder}
          addNotification={addNotification}
        />
      </div>
    </div>
  );
};

export default ProductListPage;
