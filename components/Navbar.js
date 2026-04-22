'use client';
import Link from 'next/link';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data?.user || null))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold flex items-center gap-2 text-yellow-300 hover:text-yellow-400 transition">
            <span> 🛒هايبرالاهرام</span>
          </Link>

          <div className="flex items-center gap-8 text-lg">
            <Link href="/" className="hover:underline">الرئيسية</Link>
            <Link href="/shop" className="hover:underline">المتجر</Link>
            <Link href="/cart" className="hover:underline">السلة</Link>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/cart" className="relative flex items-center gap-1 hover:scale-110 transition">
              <ShoppingCart size={28} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">مرحباً، {user.name}</span>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-200 hover:text-white transition"
                >
                  <LogOut size={24} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-2 hover:scale-110 transition">
                <User size={28} />
                <span className="text-sm">تسجيل الدخول</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}