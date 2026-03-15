import React from 'react';
import { Coupon } from '../../../types';
import type { ProductWithUI } from '../../constants';
import AdminTabContent from './AdminTabContent';

interface AdminPageProps {
  // State
  activeTab: 'products' | 'coupons';
  showProductForm: boolean;
  editingProduct: string | null;
  productForm: {
    name: string;
    price: number;
    stock: number;
    description: string;
    discounts: Array<{ quantity: number; rate: number }>;
  };
  showCouponForm: boolean;
  couponForm: {
    name: string;
    code: string;
    discountType: 'amount' | 'percentage';
    discountValue: number;
  };

  // Props from Parent (App)
  products: ProductWithUI[];
  coupons: Coupon[];

  // Handlers
  setActiveTab: (tab: 'products' | 'coupons') => void;
  setShowProductForm: (show: boolean) => void;
  setEditingProduct: (id: string | null) => void;
  setProductForm: (form: any) => void;
  setShowCouponForm: (show: boolean) => void;
  setCouponForm: (form: any) => void;
  handleProductSubmit: (e: React.FormEvent) => void;
  handleCouponSubmit: (e: React.FormEvent) => void;
  startEditProduct: (product: ProductWithUI) => void;
  deleteProduct: (productId: string) => void;
  deleteCoupon: (couponCode: string, addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void) => void;
  addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void;
}

const AdminPage = ({
  activeTab,
  showProductForm,
  editingProduct,
  productForm,
  showCouponForm,
  couponForm,
  products,
  coupons,
  setActiveTab,
  setShowProductForm,
  setEditingProduct,
  setProductForm,
  setShowCouponForm,
  setCouponForm,
  handleProductSubmit,
  handleCouponSubmit,
  startEditProduct,
  deleteProduct,
  deleteCoupon,
  addNotification
}: AdminPageProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
        <p className="text-gray-600 mt-1">상품과 쿠폰을 관리할 수 있습니다</p>
      </div>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'products'
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            상품 관리
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'coupons'
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            쿠폰 관리
          </button>
        </nav>
      </div>

      <AdminTabContent
        activeTab={activeTab}
        products={products}
        coupons={coupons}
        showProductForm={showProductForm}
        editingProduct={editingProduct}
        productForm={productForm}
        showCouponForm={showCouponForm}
        couponForm={couponForm}
        setEditingProduct={setEditingProduct}
        setProductForm={setProductForm}
        setShowProductForm={setShowProductForm}
        startEditProduct={startEditProduct}
        deleteProduct={deleteProduct}
        handleProductSubmit={handleProductSubmit}
        setShowCouponForm={setShowCouponForm}
        setCouponForm={setCouponForm}
        deleteCoupon={deleteCoupon}
        handleCouponSubmit={handleCouponSubmit}
        addNotification={addNotification}
      />
    </div>
  );
};

export default AdminPage;
