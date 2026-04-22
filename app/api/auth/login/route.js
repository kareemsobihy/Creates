import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "ahram-hyper-secret-key-2026";

const users = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@ahram.com",
    password: "123456",
    role: "user"
  }
];

export async function POST(request) {
  try {
    // طريقة صحيحة 100% لقراءة الـ body في Next.js App Router
    const { email, password } = await request.json();

    console.log("✅ Received:", { email, password });

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json({ error: "الإيميل أو كلمة السر غلط" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({ 
      success: true, 
      message: "تم تسجيل الدخول بنجاح ✅",
      user: { id: user.id, name: user.name, email: user.email }
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60
    });

    return response;

  } catch (error) {
    console.error("❌ Login Error:", error.message);
    return NextResponse.json({ error: "حدث خطأ في السيرفر" }, { status: 500 });
  }
}