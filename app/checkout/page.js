'use client';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../components/CartContext';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const { cart, getTotal, clearCart } = useContext(CartContext);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data.user) {
          router.push('/login');
        } else {
          setUser(data.user);
          setLoading(false);
        }
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  if (loading) {
    return <div className="text-center py-20 text-2xl">جاري التحقق من تسجيل الدخول...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">السلة فارغة</h2>
        <button onClick={() => router.push('/shop')} className="text-green-600 text-2xl underline">
          الذهاب للمتجر
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ تم إتمام الطلب بنجاح!\nسيتم التوصيل إلى ${user.name}`);
    clearCart();
    router.push('/');
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-10">إتمام الطلب</h1>
      
      <div className="bg-white p-8 rounded-3xl shadow mb-8">
        <h3 className="text-2xl font-bold mb-4">مرحباً، {user?.name}</h3>
        <p className="text-gray-600">سيتم توصيل الطلب إليك</p>
      </div>

      {/* باقي كود الـ checkout القديم (الفورم) */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ... (حط هنا باقي حقول العنوان ورقم التليفون من الكود القديم) */}

        <div className="bg-white p-8 rounded-3xl shadow">
          <h3 className="text-2xl font-bold mb-4">ملخص الطلب</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} × {item.quantity}</span>
              <span>{item.price * item.quantity} ج</span>
            </div>
          ))}
          <div className="h-px bg-gray-200 my-6"></div>
          <div className="flex justify-between text-3xl font-bold">
            <span>الإجمالي</span>
            <span>{getTotal()} جنيه</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-7 text-3xl rounded-3xl font-bold"
        >
          تأكيد وإتمام الطلب
        </button>
      </form>
    </div>
  );
}