'use client';
import { useContext, useState } from 'react';
import { CartContext } from '../../components/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useContext(CartContext);
  
  // حالة جديدة لحفظ العنوان
  const [address, setAddress] = useState('');

  const sendToWhatsApp = () => {
    if (cart.length === 0) {
      alert("السلة فارغة!");
      return;
    }

    if (!address.trim()) {
      alert("يرجى كتابة عنوان التوصيل أولاً");
      return;
    }

    let message = "مرحبا، عايز أطلب من أهرام هايبر ماركت:\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} × ${item.quantity} = ${item.price * item.quantity} جنيه\n`;
    });

    message += `\nالإجمالي: ${getTotal()} جنيه\n\n`;
    message += `عنوان التوصيل: ${address}\n`;
    message += "يرجى التأكيد والتوصيل في أسرع وقت\n";
    message += "شكراً";

    const phoneNumber = "201283073739";   // ←←← غير الرقم ده برقم واتسابك

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">السلة فارغة</h2>
        <Link href="/shop" className="text-green-600 text-2xl underline">تسوق الآن</Link>
        <img 
          src="/uploads/hero-image.jpg" 
          alt="Empty Cart" 
          className="mx-auto mt-10 w-64 h-64 object-contain opacity-70"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">سلتك</h1>

     <div className="space-y-6">
  {cart.map((item) => (
    <div 
      key={`${item.id}-${item.quantity}`}
      className="flex gap-6 bg-white p-6 rounded-3xl shadow"
    >
      <img src={item.image} alt="" className="w-28 h-28 object-cover rounded-2xl" />
      <div className="flex-1">
        <h3 className="text-2xl font-bold">{item.name}</h3>
        <p className="text-green-600 text-xl">
          {item.price} × {item.quantity} = {item.price * item.quantity} جنيه
        </p>
        <div className="flex items-center gap-4 mt-4">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)} 
            className="w-8 h-8 border rounded-lg text-xl"
          >
            -
          </button>
          <span className="text-xl font-semibold">{item.quantity}</span>
          
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
            className="w-8 h-8 border rounded-lg text-xl"
          >
            +
          </button>
          <button 
            onClick={() => removeFromCart(item.id)} 
            className="text-red-500 text-sm ml-auto"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
      {/* منطقة الإجمالي + العنوان + زر الواتساب */}
      <div className="mt-12 bg-white p-8 rounded-3xl shadow max-w-md ml-auto">
        <div className="flex justify-between text-3xl font-bold mb-6">
          <span>الإجمالي</span>
          <span>{getTotal()} جنيه</span>
         

        </div>

        {/* حقل العنوان */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">عنوان التوصيل</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="اكتب عنوانك بالتفصيل (الشارع - رقم العمارة - الدور...)"
            className="w-full border border-gray-300 rounded-2xl p-4 text-lg h-28 focus:outline-none focus:border-green-500"
            required
          />
        </div>

        {/* زر واتساب */}
        <button
          onClick={sendToWhatsApp}
          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-6 rounded-3xl font-bold text-2xl flex items-center justify-center gap-3 transition"
        >
          <img
            src="/uploads/hero-image.jpg"
            alt="WhatsApp Icon"
            className="w-10 h-10"
          />
          اطلب على واتساب الآن
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          هيفتح واتساب ويبعت الطلب كامل مع العنوان
        </p>
      </div>
    </div>
  );
}