import Image from 'next/image';
export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-yellow-500 to-black text-yellow-300 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-bold mb-4 ">مرحباً بك في هايبر الاهرام</h1>
        <p className="text-3xl mb-8">أجود المنتجات • أسعار لا تُقاوم • توصيل في ساعة</p>
<Image 
  src="/uploads/hero-image.jpg"
  alt="صورة البطل"
  width={500}
  height={300}
  className="mx-auto my-10 w-full max-w-md rounded-lg shadow-lg"
  priority
  style={{ objectFit: 'cover' }}   // مهم عشان الصورة تبقى متناسقة
/>
        <a
          href="/shop"
          className="inline-block bg-white text-black px-10 py-4 rounded-full text-2xl font-semibold hover:bg-yellow-300 transition"
        >
          تسوق الآن
        </a>
     </div>
    </div>
  );
}