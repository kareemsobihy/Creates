import Link from 'next/link';

export default function CategoryCard({ name, image, category }) {
  return (
    <Link href={`/shop?category=${category}`} className="block">
      <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4 text-center font-semibold text-lg">{name}</div>
      </div>
    </Link>
  );
}