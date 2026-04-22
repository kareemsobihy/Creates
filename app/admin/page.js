'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  const router = useRouter();

  const handleAdminLogin = () => {
    if (adminPassword === "admin123") {
      setIsLoggedIn(true);
      loadProducts();
    } else {
      alert("كلمة السر غلط! الباسورد: admin123");
    }
  };

  const loadProducts = async () => {
    const res = await fetch('/api/products', { cache: 'no-store' });
    const data = await res.json();
    setProducts(data);
  };

  // إضافة منتج جديد
  const addProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert("يرجى ملء الاسم والسعر والقسم");
      return;
    }

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newProduct,
        price: Number(newProduct.price)
      })
    });

    if (res.ok) {
      alert("✅ تم إضافة المنتج بنجاح");
      setNewProduct({ name: '', price: '', category: '', description: '', image: '' });
      loadProducts();
    } else {
      alert("❌ حدث خطأ أثناء الإضافة");
    }
  };

  // حذف منتج
  const deleteProduct = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;

    const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert("✅ تم حذف المنتج");
      loadProducts();
    } else {
      alert("❌ حدث خطأ أثناء الحذف");
    }
  };

  // بدء تعديل
  const startEditing = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description || '',
      image: product.image || ''
    });
  };

  // حفظ التعديل
  const saveEdit = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    const res = await fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editingProduct.id,
        ...newProduct,
        price: Number(newProduct.price)
      })
    });

    if (res.ok) {
      alert("✅ تم تعديل المنتج بنجاح");
      setEditingProduct(null);
      setNewProduct({ name: '', price: '', category: '', description: '', image: '' });
      loadProducts();
    } else {
      alert("❌ حدث خطأ أثناء التعديل");
    }
  };

  // تسجيل الخروج
  const logout = () => {
    setIsLoggedIn(false);
    setAdminPassword('');
    router.push('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">لوحة تحكم الإدارة</h1>
          <input
            type="password"
            placeholder="كلمة سر الإدارة"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="w-full px-6 py-4 border rounded-2xl text-lg mb-6"
          />
          <button
            onClick={handleAdminLogin}
            className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-2xl text-xl font-bold"
          >
            دخول كـ Admin
          </button>
          <p className="text-center text-sm text-gray-500 mt-6">الباسورد: admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">لوحة التحكم - أهرام هايبر</h1>
          <div className="flex gap-4">
            <button onClick={logout} className="bg-red-600 text-white px-6 py-3 rounded-2xl hover:bg-red-700">
              تسجيل الخروج
            </button>
            <button onClick={() => router.push('/')} className="bg-gray-800 text-white px-6 py-3 rounded-2xl hover:bg-gray-700">
              العودة للموقع
            </button>
          </div>
        </div>

        {/* نموذج إضافة / تعديل */}
        <div className="bg-white rounded-3xl shadow p-8 mb-10">
          <h2 className="text-2xl font-bold mb-6">
            {editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
          </h2>

          <form onSubmit={editingProduct ? saveEdit : addProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="اسم المنتج" value={newProduct.name || ''} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} className="border p-4 rounded-2xl" required />
            <input type="number" placeholder="السعر" value={newProduct.price || ''} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} className="border p-4 rounded-2xl" required />
            <input type="text" placeholder="القسم" value={newProduct.category || ''} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} className="border p-4 rounded-2xl md:col-span-2" required />

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">رابط الصورة أو رفع صورة</label>
              <input type="text" placeholder="https://..." value={newProduct.image || ''} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} className="border p-4 rounded-2xl w-full" />
            </div>

            <textarea placeholder="وصف المنتج" value={newProduct.description || ''} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} className="border p-4 rounded-2xl md:col-span-2 h-28" />

            <div className="md:col-span-2 flex gap-4">
              <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold">
                {editingProduct ? "حفظ التعديل" : "إضافة المنتج"}
              </button>
              {editingProduct && (
                <button type="button" onClick={() => { setEditingProduct(null); setNewProduct({ name: '', price: '', category: '', description: '', image: '' }); }} className="flex-1 bg-gray-500 text-white py-4 rounded-2xl font-bold">
                  إلغاء
                </button>
              )}
            </div>
          </form>
        </div>

        {/* جدول المنتجات */}
        <div className="bg-white rounded-3xl shadow overflow-hidden">
          <div className="p-8 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold">جميع المنتجات ({products.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-right">الصورة</th>
                  <th className="p-4 text-right">الاسم</th>
                  <th className="p-4 text-right">القسم</th>
                  <th className="p-4 text-right">السعر</th>
                  <th className="p-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={`${product.id}-${index}`} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                    </td>
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4 text-gray-600">{product.category}</td>
                    <td className="p-4 font-semibold text-green-600">{product.price} جنيه</td>
                    <td className="p-4 text-center space-x-3">
                      <button onClick={() => startEditing(product)} className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700">تعديل</button>
                      <button onClick={() => deleteProduct(product.id)} className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700">حذف</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}