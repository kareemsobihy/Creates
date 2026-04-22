'use client';
import { useParams } from 'next/navigation';
import { products } from '../../../lib/products';
import { useContext } from 'react';
import { CartContext } from '../../../components/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useContext(CartContext);

  if (!product) return <div className="text-center py-20 text-3xl">المنتج غير موجود</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
      <img src={product.image} alt={product.name} className="rounded-3xl shadow-2xl w-full" />
      <div>
        <h1 className="text-5xl font-bold mb-4">{product.name}</h1>
        <p className="text-4xl text-green-600 font-bold mb-6">{product.price} جنيه</p>
        <p className="text-xl text-gray-600 mb-10">{product.description}</p>
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-2xl rounded-3xl font-bold transition"
        >
          أضف إلى السلة
        </button>
      </div>
    </div>
  );
}