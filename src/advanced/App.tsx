import { useState, useCallback } from 'react';

import Header from './components/layout/Header';
import MainContent from './components/layout/MainContent';
import NotificationList from './components/notification';

import type { ProductWithUI } from './constants';
import { formatPriceDisplay } from './utils/formatters';
import { useNotification } from './hooks/notification';
import { useProduct } from './hooks/product';
import { useSearch } from './hooks/utility';
import { useCoupon } from './hooks/coupon';
import { useCart } from './hooks/cart';

const App = () => {
  const [searchTerm, setSearchTerm] = useState(''); // header, product 검색 사용

  const { notifications, setNotifications, addNotification } = useNotification();

  const { products, addProduct, updateProduct, deleteProduct } = useProduct({
    addNotification,
  });

  const getProductSearchText = useCallback((p: ProductWithUI) => `${p.name} ${p.description ?? ''}`, []);
  const {
    debouncedSearchTerm,
    filteredItems: filteredProducts,
  } = useSearch({
    items: products,
    searchTerm,
    getSearchableText: getProductSearchText,
  });

  const {
    coupons,
    addCoupon,
    deleteCoupon,
    selectedCoupon,
    applyCoupon,
    clearSelectedCoupon
  } = useCoupon();

  const [isAdmin, setIsAdmin] = useState(false); // header, main 분기 사용

  const { cart, setCart, totalItemCount, ...cartProps } = useCart({
    products,
    addNotification,
    selectedCoupon,
    clearSelectedCoupon,
  });


  return (
    <div className="min-h-screen bg-gray-50">
      {notifications.length > 0 && (
        <NotificationList notifications={notifications} setNotifications={setNotifications} />
      )}

      <Header
        isAdmin={isAdmin}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setIsAdmin={setIsAdmin}
        cart={cart}
        totalItemCount={totalItemCount} />

      <MainContent
        isAdmin={isAdmin}
        products={products}
        addProduct={addProduct}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
        coupons={coupons}
        addCoupon={addCoupon}
        deleteCoupon={deleteCoupon}
        addNotification={addNotification}
        filteredProducts={filteredProducts}
        debouncedSearchTerm={debouncedSearchTerm}
        cart={cart}
        cartProps={cartProps}
        selectedCoupon={selectedCoupon}
        applyCoupon={applyCoupon}
        clearSelectedCoupon={clearSelectedCoupon}
        formatPriceUser={(price) => formatPriceDisplay(price, 'user')}
      />
    </div>
  );
};

export default App;