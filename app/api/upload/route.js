import { writeFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ error: "لم يتم اختيار صورة" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // إنشاء اسم فريد للصورة
    const fileName = Date.now() + '-' + file.name.replace(/[^a-zA-Z0-9.]/g, '');
    const uploadDir = join(process.cwd(), 'public/uploads');
    
    // حفظ الصورة في مجلد public/uploads
    const filePath = join(uploadDir, fileName);
    
    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`;

    return NextResponse.json({ 
      success: true, 
      imageUrl 
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "حدث خطأ أثناء رفع الصورة" }, { status: 500 });
  }
}