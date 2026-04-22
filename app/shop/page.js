'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import { products, categories } from '../../lib/products';
import { Search, SlidersHorizontal, X } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('default');
  };

  return (
    <>
      {/* شريط البحث والفلاتر - نفس الكود السابق */}
      <div className="bg-white rounded-3xl shadow p-6 mb-10">
        {/* ... (البحث والأقسام والترتيب) ... */}
        {/* يمكنك لصق باقي كود الفلاتر من النسخة السابقة هنا */}
      </div>

      {/* عرض المنتجات */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={`${product.id}-${index}`} 
              product={product} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">لا يوجد منتجات مطابقة للبحث</p>
          <button onClick={clearFilters} className="mt-6 text-green-600 underline">
            مسح الفلاتر وعرض كل المنتجات
          </button>
        </div>
      )}
    </>
  );
}

export default function ShopPage() {
  return (
    <div className="bg-yellow-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-12">المتجر</h1>
        
        <Suspense fallback={<div className="text-center py-20">جاري تحميل المتجر...</div>}>
          <ShopContent />
        </Suspense>
      </div>
    </div>
  );
}