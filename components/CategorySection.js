import Link from 'next/link';
import { categories } from '../lib/products';

export default function CategorySection() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900">الأقسام</h2>
          <p className="text-gray-600 mt-3 text-lg">اختر القسم اللي يناسبك</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.name}`}
              className="group"
            >
              <div className={`h-40 rounded-3xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 shadow-md hover:shadow-xl ${cat.color}`}>
                <div className="text-6xl mb-4 transition-transform group-hover:scale-110">
                  {cat.emoji}
                </div>
                <h3 className="text-xl font-semibold text-center px-4">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}