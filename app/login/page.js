'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('تم تسجيل الدخول بنجاح! 🎉');
        router.push('/');        // يرجع للصفحة الرئيسية
        router.refresh();        // يحدث الـ Navbar
      } else {
        setError(data.error || 'الإيميل أو كلمة السر غلط');
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال، حاول مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-700">تسجيل الدخول</h1>
          <p className="text-gray-600 mt-3">مرحباً بعودتك إلى أهرام هايبر ماركت</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ahmed@ahram.com"
              className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-green-600 text-lg"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">كلمة السر</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-green-600 text-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 rounded-3xl text-xl font-bold transition"
          >
            {loading ? 'جاري تسجيل الدخول...' : 'دخول'}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            ليس لديك حساب؟{' '}
            <Link href="/register" className="text-green-600 font-semibold hover:underline">
              إنشاء حساب جديد
            </Link>
          </p>
        </div>

        {/* بيانات تجريبية */}
        <div className="mt-10 p-4 bg-yellow-50 rounded-2xl text-sm">
          <p className="font-semibold mb-2">تجربة سريعة:</p>
          <p>الإيميل: <span className="font-mono">ahmed@ahram.com</span></p>
          <p>كلمة السر: <span className="font-mono">123456</span></p>
        </div>
      </div>
    </div>
  );
}