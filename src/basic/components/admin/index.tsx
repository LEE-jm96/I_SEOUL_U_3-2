import { useState } from 'react';
import { Coupon } from '../../../types';
import type { ProductWithUI } from '../../constants';
import AdminPage from './AdminPage';

export interface AdminProps {
  products: ProductWithUI[];
  addProduct: (newProduct: Omit<ProductWithUI, 'id'>) => void;
  updateProduct: (productId: string, updates: Partial<ProductWithUI>) => void;
  deleteProduct: (productId: string) => void;
  coupons: Coupon[];
  addCoupon: (newCoupon: Coupon, addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void) => void;
  deleteCoupon: (couponCode: string, addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void) => void;
  addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void;
}

const Admin = ({
  products,
  addProduct,
  updateProduct,
  deleteProduct,
  coupons,
  addCoupon,
  deleteCoupon,
  addNotification,
}: AdminProps) => {
  const [activeTab, setActiveTab] = useState<'products' | 'coupons'>('products');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    discounts: [] as Array<{ quantity: number; rate: number }>,
  });

  const [showCouponForm, setShowCouponForm] = useState(false);
  const [couponForm, setCouponForm] = useState({
    name: '',
    code: '',
    discountType: 'amount' as 'amount' | 'percentage',
    discountValue: 0,
  });

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct && editingProduct !== 'new') {
      updateProduct(editingProduct, productForm);
      setEditingProduct(null);
    } else {
      addProduct({
        ...productForm,
        discounts: productForm.discounts,
      });
    }
    setProductForm({ name: '', price: 0, stock: 0, description: '', discounts: [] });
    setEditingProduct(null);
    setShowProductForm(false);
  };

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCoupon(couponForm, addNotification);
    setCouponForm({
      name: '',
      code: '',
      discountType: 'amount',
      discountValue: 0,
    });
    setShowCouponForm(false);
  };

  const startEditProduct = (product: ProductWithUI) => {
    setEditingProduct(product.id);
    setProductForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description || '',
      discounts: product.discounts || [],
    });
    setShowProductForm(true);
  };


  return (
    <AdminPage
      activeTab={activeTab}
      showProductForm={showProductForm}
      editingProduct={editingProduct}
      productForm={productForm}
      showCouponForm={showCouponForm}
      couponForm={couponForm}
      products={products}
      coupons={coupons}
      setActiveTab={setActiveTab}
      setShowProductForm={setShowProductForm}
      setEditingProduct={setEditingProduct}
      setProductForm={setProductForm}
      setShowCouponForm={setShowCouponForm}
      setCouponForm={setCouponForm}
      handleProductSubmit={handleProductSubmit}
      handleCouponSubmit={handleCouponSubmit}
      startEditProduct={startEditProduct}
      deleteProduct={deleteProduct}
      deleteCoupon={deleteCoupon}
      addNotification={addNotification}
    />
  );
};

export default Admin;
