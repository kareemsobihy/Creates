import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "ahram-hyper-secret-key-2026";

export async function GET(request) {
  try {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    
    return NextResponse.json({ 
      user: {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role
      }
    });

  } catch (error) {
    return NextResponse.json({ user: null });
  }
}