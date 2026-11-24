import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import type { Product, TeaCategory, TeaCollection } from '../../types';
import {
  Shield,
  TrendingUp,
  ShoppingBag,
  Package,
  Plus,
  Edit,
  Trash2,
  Tag,
  Search,
  ArrowLeft
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    coupons,
    updateOrderStatus,
    saveProduct,
    deleteProduct,
    saveCoupon,
    toggleCouponActive,
    setActiveView,
    showToast
  } = useStore();

  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'products' | 'orders' | 'coupons'>('analytics');
  
  // Product Edit Form State
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // New Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponValue, setNewCouponValue] = useState(15);
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');

  // Search in Admin
  const [adminSearch, setAdminSearch] = useState('');

  // Analytics Math
  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'Cancelled' ? sum + o.totalAmount : sum), 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const inStockCount = products.filter((p) => p.inStock).length;

  // Product Save Handler
  const handleSaveProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.price) {
      showToast('Please provide product name and base price.', 'warning');
      return;
    }

    const completeProd: Product = {
      id: editingProduct.id || `tea-${Date.now()}`,
      name: editingProduct.name,
      subtitle: editingProduct.subtitle || 'Handcrafted Organic Tea Blend',
      category: (editingProduct.category as TeaCategory) || 'Black Tea',
      collection: (editingProduct.collection as TeaCollection) || 'Signature',
      price: Number(editingProduct.price),
      rating: editingProduct.rating || 5.0,
      reviewCount: editingProduct.reviewCount || 1,
      image: editingProduct.image || 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      gallery: [editingProduct.image || 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'],
      description: editingProduct.description || 'Organic handcrafted whole leaves sourced from high-altitude estates.',
      origin: editingProduct.origin || 'Assam, India',
      elevation: editingProduct.elevation || '500m',
      flush: editingProduct.flush || 'Second Flush',
      ingredients: editingProduct.ingredients || ['100% Organic Tea Leaves'],
      tasteNotes: editingProduct.tasteNotes || ['Malt', 'Honey'],
      aroma: editingProduct.aroma || 'Rich roasted leaves',
      caffeine: editingProduct.caffeine || 'Medium',
      benefits: editingProduct.benefits || ['Antioxidant Rich', 'Wellness Booster'],
      brewingGuide: editingProduct.brewingGuide || {
        waterTemp: '95°C',
        steepTime: '3 mins',
        timerSeconds: 180,
        servingSize: '2g per 200ml'
      },
      inStock: editingProduct.inStock ?? true,
      stockQuantity: Number(editingProduct.stockQuantity || 30)
    };

    saveProduct(completeProd);
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleCreateCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    saveCoupon({
      id: `c-${Date.now()}`,
      code: newCouponCode.trim().toUpperCase(),
      discountType: newCouponType,
      value: Number(newCouponValue),
      minSpend: 1000,
      active: true
    });
    setNewCouponCode('');
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return (
    <div className="py-10 bg-[#faf7f2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-[#17271f] text-white p-6 sm:p-8 rounded-3xl border border-[#c8a261]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#c8a261] text-[#17271f] flex items-center justify-center font-bold text-2xl shadow-lg shrink-0">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-white">
                  Master Sommelier Portal
                </h1>
                <span className="px-2.5 py-0.5 bg-[#c8a261]/20 text-[#c8a261] text-[10px] uppercase font-bold tracking-widest rounded border border-[#c8a261]/40">
                  F-011 & F-012 Admin
                </span>
              </div>
              <p className="text-xs text-[#faf7f2]/70 font-light mt-0.5">
                Manage product catalog, prices, inventory stock levels, order status fulfillment, and promo codes.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveView('shop')}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-[#c8a261] border border-[#c8a261]/40 text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Customer Storefront</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-3 border-b border-[#c8a261]/20 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={`px-6 py-3 rounded-2xl text-xs font-semibold tracking-wider flex items-center gap-2 transition-all ${
              activeAdminTab === 'analytics'
                ? 'bg-[#17271f] text-[#c8a261] shadow'
                : 'bg-white text-[#17271f]/80 hover:bg-[#faf7f2]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Executive Analytics</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('products')}
            className={`px-6 py-3 rounded-2xl text-xs font-semibold tracking-wider flex items-center gap-2 transition-all ${
              activeAdminTab === 'products'
                ? 'bg-[#17271f] text-[#c8a261] shadow'
                : 'bg-white text-[#17271f]/80 hover:bg-[#faf7f2]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Catalog & Stock ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('orders')}
            className={`px-6 py-3 rounded-2xl text-xs font-semibold tracking-wider flex items-center gap-2 transition-all ${
              activeAdminTab === 'orders'
                ? 'bg-[#17271f] text-[#c8a261] shadow'
                : 'bg-white text-[#17271f]/80 hover:bg-[#faf7f2]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders & Shipping Fulfillment ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('coupons')}
            className={`px-6 py-3 rounded-2xl text-xs font-semibold tracking-wider flex items-center gap-2 transition-all ${
              activeAdminTab === 'coupons'
                ? 'bg-[#17271f] text-[#c8a261] shadow'
                : 'bg-white text-[#17271f]/80 hover:bg-[#faf7f2]'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Promotions & Coupons</span>
          </button>
        </div>

        {/* TAB 1: EXECUTIVE ANALYTICS */}
        {activeAdminTab === 'analytics' && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-[#c8a261]/30 shadow-sm space-y-2">
                <span className="text-xs text-[#8c6747] uppercase font-semibold tracking-wider block">Total Platform Sales</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-serif font-bold text-[#17271f]">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">+18.4%</span>
                </div>
                <span className="text-[11px] text-gray-500 block">Gross revenue across all paid orders</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#c8a261]/30 shadow-sm space-y-2">
                <span className="text-xs text-[#8c6747] uppercase font-semibold tracking-wider block">Total Customer Orders</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-serif font-bold text-[#17271f]">
                    {totalOrdersCount}
                  </span>
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">100% Fulfilled</span>
                </div>
                <span className="text-[11px] text-gray-500 block">Orders received across India</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#c8a261]/30 shadow-sm space-y-2">
                <span className="text-xs text-[#8c6747] uppercase font-semibold tracking-wider block">Average Order Value</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-serif font-bold text-[#17271f]">
                    ₹{avgOrderValue.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#c8a261] font-bold">Luxury Benchmark</span>
                </div>
                <span className="text-[11px] text-gray-500 block">Average spend per transaction</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#c8a261]/30 shadow-sm space-y-2">
                <span className="text-xs text-[#8c6747] uppercase font-semibold tracking-wider block">Active Catalog SKUs</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-serif font-bold text-[#17271f]">
                    {inStockCount} / {products.length}
                  </span>
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">In Stock</span>
                </div>
                <span className="text-[11px] text-gray-500 block">Organic estate tea blends</span>
              </div>

            </div>

            {/* Sales Performance Visual Bar Chart */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#c8a261]/30 shadow-sm space-y-4">
              <h3 className="font-serif text-xl font-semibold text-[#17271f]">
                Monthly Sales Distribution & Revenue Performance
              </h3>

              <div className="h-48 flex items-end justify-between gap-4 pt-8 px-4 border-b border-gray-100">
                {[
                  { month: 'Apr', amount: 45000 },
                  { month: 'May', amount: 62000 },
                  { month: 'Jun', amount: 58000 },
                  { month: 'Jul', amount: 89000 },
                  { month: 'Aug (Current)', amount: 112000 }
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-xs font-bold text-[#17271f] opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </span>
                    <div
                      className="w-full max-w-[40px] bg-[#17271f] group-hover:bg-[#c8a261] rounded-t-lg transition-all duration-500 shadow-md"
                      style={{ height: `${(item.amount / 120000) * 100}%` }}
                    />
                    <span className="text-xs text-[#8c6747] font-medium">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT */}
        {activeAdminTab === 'products' && (
          <div className="space-y-6">
            
            {/* Actions Bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#c8a261]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c6747]" />
                <input
                  type="text"
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  placeholder="Filter products..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#faf7f2] border border-[#17271f]/15 rounded-xl text-xs"
                />
              </div>

              <button
                onClick={() => {
                  setEditingProduct({});
                  setIsProductModalOpen(true);
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#17271f] hover:bg-[#223829] text-[#c8a261] font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Organic Blend</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-[#c8a261]/30 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#17271f] text-[#c8a261] uppercase tracking-wider font-semibold">
                      <th className="p-4">Tea Product</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Base Price</th>
                      <th className="p-4">Stock Level</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#faf7f2] transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-lg shrink-0 border border-black/5" />
                            <div>
                              <span className="font-serif font-bold text-[#17271f] text-sm block">{prod.name}</span>
                              <span className="text-[11px] text-gray-500 font-light truncate max-w-xs block">{prod.subtitle}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-[#17271f]/5 border border-[#c8a261]/30 text-[#8c6747] font-medium rounded-md">
                            {prod.category}
                          </span>
                        </td>
                        <td className="p-4 font-serif font-bold text-[#17271f] text-sm">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 font-bold rounded-md ${
                            prod.stockQuantity > 20
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}>
                            {prod.stockQuantity} units
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-[#c8a261]">
                          ★ {prod.rating}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingProduct(prod);
                              setIsProductModalOpen(true);
                            }}
                            className="p-2 text-[#17271f] hover:text-[#c8a261] transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(prod.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: ORDER FULFILLMENT */}
        {activeAdminTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#c8a261]/30 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#17271f] text-[#c8a261] uppercase tracking-wider font-semibold">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Items Count</th>
                      <th className="p-4">Total Paid</th>
                      <th className="p-4">Fulfillment Status</th>
                      <th className="p-4">Courier Tracking</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#faf7f2] transition-colors">
                        <td className="p-4 font-serif font-bold text-[#17271f]">
                          #{ord.id}
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-[#17271f] block">{ord.customerName}</span>
                          <span className="text-gray-500 text-[11px] block">{ord.customerEmail}</span>
                        </td>
                        <td className="p-4 font-medium">
                          {ord.items.length} item(s)
                        </td>
                        <td className="p-4 font-serif font-bold text-[#17271f]">
                          ₹{ord.totalAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="p-4">
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                            className="px-2.5 py-1 bg-white border border-[#17271f]/20 rounded-lg text-xs font-semibold text-[#17271f] focus:outline-none focus:border-[#c8a261]"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Packed">Packed</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4 text-gray-600 font-mono">
                          {ord.trackingNumber || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROMOTIONS & COUPONS */}
        {activeAdminTab === 'coupons' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Create Coupon Form */}
            <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-[#c8a261]/30 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-semibold text-[#17271f]">Create New Promotional Code</h3>
              <form onSubmit={handleCreateCouponSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="text-[#8c6747] font-semibold block mb-1">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    placeholder="e.g. FESTIVE20"
                    className="w-full px-3.5 py-2 bg-[#faf7f2] border border-[#17271f]/20 rounded-xl font-mono uppercase text-[#17271f]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#8c6747] font-semibold block mb-1">Discount Type</label>
                    <select
                      value={newCouponType}
                      onChange={(e) => setNewCouponType(e.target.value as any)}
                      className="w-full px-3.5 py-2 bg-[#faf7f2] border border-[#17271f]/20 rounded-xl text-[#17271f]"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (₹)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[#8c6747] font-semibold block mb-1">Discount Value</label>
                    <input
                      type="number"
                      required
                      value={newCouponValue}
                      onChange={(e) => setNewCouponValue(Number(e.target.value))}
                      className="w-full px-3.5 py-2 bg-[#faf7f2] border border-[#17271f]/20 rounded-xl text-[#17271f]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#17271f] hover:bg-[#223829] text-[#c8a261] font-semibold rounded-xl tracking-wider uppercase shadow"
                >
                  Create & Activate Promo Code
                </button>
              </form>
            </div>

            {/* Coupons List */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="font-serif text-lg font-semibold text-[#17271f]">Active Promotional Offers</h3>
              <div className="space-y-3">
                {coupons.map((c) => (
                  <div key={c.id} className="bg-white p-4 rounded-2xl border border-[#c8a261]/20 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#17271f] bg-[#faf7f2] px-2 py-0.5 rounded border border-black/10">
                          {c.code}
                        </span>
                        <span className="text-emerald-700 font-semibold">
                          {c.discountType === 'percentage' ? `${c.value}% OFF` : `₹${c.value} OFF`}
                        </span>
                      </div>
                      <span className="text-gray-500 block">Min spend: ₹{c.minSpend}</span>
                    </div>

                    <button
                      onClick={() => toggleCouponActive(c.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        c.active
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {c.active ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Product Add/Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#faf7f2] max-w-lg w-full rounded-3xl p-6 space-y-4 border border-[#c8a261]/30 max-h-[85vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-bold text-[#17271f]">
              {editingProduct?.id ? 'Edit Tea Product' : 'Add New Organic Blend'}
            </h3>

            <form onSubmit={handleSaveProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-[#8c6747] font-semibold block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={editingProduct?.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  placeholder="e.g. Nilgiri Frost Black Tea"
                  className="w-full px-3 py-2 bg-white border border-[#17271f]/20 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[#8c6747] font-semibold block mb-1">Subtitle / Descriptor</label>
                <input
                  type="text"
                  value={editingProduct?.subtitle || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, subtitle: e.target.value })}
                  placeholder="Single estate winter harvest with aromatic citrus finish"
                  className="w-full px-3 py-2 bg-white border border-[#17271f]/20 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8c6747] font-semibold block mb-1">Category</label>
                  <select
                    value={editingProduct?.category || 'Black Tea'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-[#17271f]/20 rounded-xl"
                  >
                    <option value="Black Tea">Black Tea</option>
                    <option value="Green Tea">Green Tea</option>
                    <option value="Herbal Tea">Herbal Tea</option>
                    <option value="White Tea">White Tea</option>
                    <option value="Oolong Tea">Oolong Tea</option>
                    <option value="Wellness Blend">Wellness Blend</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#8c6747] font-semibold block mb-1">Collection</label>
                  <select
                    value={editingProduct?.collection || 'Signature'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, collection: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-[#17271f]/20 rounded-xl"
                  >
                    <option value="Signature">Signature</option>
                    <option value="Single Origin">Single Origin</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Royal Reserve">Royal Reserve</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8c6747] font-semibold block mb-1">Base Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct?.price || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#17271f]/20 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-[#8c6747] font-semibold block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={editingProduct?.stockQuantity || 30}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockQuantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#17271f]/20 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#8c6747] font-semibold block mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingProduct?.image || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-white border border-[#17271f]/20 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-xs text-gray-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#17271f] text-[#c8a261] text-xs font-semibold rounded-xl shadow"
                >
                  Save Product SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
