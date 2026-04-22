import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const users = []; // نفس اللي فوق، هنضيف فيه المستخدمين الجدد

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // تحقق لو الإيميل موجود
    if (users.find(u => u.email === email)) {
      return NextResponse.json({ error: "الإيميل مستخدم بالفعل" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      role: "user"
    };

    users.push(newUser);

    return NextResponse.json({ 
      success: true, 
      message: "تم إنشاء الحساب بنجاح، سجل دخول الآن" 
    });

  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}