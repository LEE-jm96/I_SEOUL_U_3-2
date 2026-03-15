import React from 'react';
import ProductManagementTab from './ProductManagementTab';
import CouponManagementTab from './CouponManagementTab';
import { Coupon } from '../../../types';
import type { ProductWithUI } from '../../constants';

interface AdminTabContentProps {
  activeTab: 'products' | 'coupons';
  products: ProductWithUI[];
  coupons: Coupon[];
  showProductForm: boolean;
  editingProduct: string | null;
  productForm: any;
  showCouponForm: boolean;
  couponForm: any;
  setEditingProduct: (id: string | null) => void;
  setProductForm: (form: any) => void;
  setShowProductForm: (show: boolean) => void;
  startEditProduct: (product: ProductWithUI) => void;
  deleteProduct: (productId: string) => void;
  handleProductSubmit: (e: React.FormEvent) => void;
  setShowCouponForm: (show: boolean) => void;
  setCouponForm: (form: any) => void;
  deleteCoupon: (couponCode: string, addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void) => void;
  handleCouponSubmit: (e: React.FormEvent) => void;
  addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void;
}

const AdminTabContent = ({
  activeTab,
  products,
  coupons,
  showProductForm,
  editingProduct,
  productForm,
  showCouponForm,
  couponForm,
  setEditingProduct,
  setProductForm,
  setShowProductForm,
  startEditProduct,
  deleteProduct,
  handleProductSubmit,
  setShowCouponForm,
  setCouponForm,
  deleteCoupon,
  handleCouponSubmit,
  addNotification,
}: AdminTabContentProps) => {
  if (activeTab === 'products') {
    return (
      <ProductManagementTab
        products={products}
        showProductForm={showProductForm}
        editingProduct={editingProduct}
        productForm={productForm}
        setEditingProduct={setEditingProduct}
        setProductForm={setProductForm}
        setShowProductForm={setShowProductForm}
        startEditProduct={startEditProduct}
        deleteProduct={deleteProduct}
        handleProductSubmit={handleProductSubmit}
        addNotification={addNotification}
      />
    );
  }

  return (
    <CouponManagementTab
      coupons={coupons}
      showCouponForm={showCouponForm}
      couponForm={couponForm}
      setShowCouponForm={setShowCouponForm}
      setCouponForm={setCouponForm}
      deleteCoupon={deleteCoupon}
      handleCouponSubmit={handleCouponSubmit}
      addNotification={addNotification}
    />
  );
};

export default AdminTabContent;
