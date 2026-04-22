'use client';
import { useContext } from 'react';
import { CartContext } from './CartContext';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col h-full relative">
      
      {/* الصورة */}
      <Link href={`/product/${product.id}`} className="relative block h-60 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* السعر في أعلى اليمين */}
        <div className="absolute top-3 right-3 bg-white text-red-600 font-bold px-4 py-1.5 rounded-2xl shadow text-lg">
          {product.price} ج
        </div>
      </Link>

      {/* المحتوى */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg leading-tight mb-3 text-gray-800 line-clamp-2 min-h-[52px]">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-1">
          {product.description || "منتج عالي الجودة من أهرام هايبر ماركت"}
        </p>

        {/* الزر - يظهر فقط عند الـ Hover */}
        <div className="mt-auto opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white py-4 rounded-2xl font-semibold text-base shadow-sm flex items-center justify-center gap-2"
          >
            <img src="/uploads/hero-image.jpg" alt="أضف إلى السلة" className="w-5 h-5" />
            أضف إلى السلة
          </button>
        </div>
      </div>
    </div>
  );
}