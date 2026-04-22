import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import ProductCard from '../components/ProductCard';
import { products } from '../lib/products';

export default function Home() {
  const featured = products.slice(0, 8);

  return (
    <div className="bg-yellow-50 min-h-screen">
      
      {/* Hero Section */}
      <Hero />

      {/* التصنيفات */}
      <CategorySection />

      {/* المنتجات المميزة */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">
          منتجات مميزة
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((product, index) => (
            <ProductCard 
              key={`${product.id}-${index}`} 
              product={product} 
            />
          ))}
        </div>
      </div>

    </div>
  );
}