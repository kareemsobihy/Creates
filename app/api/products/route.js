import { products } from '../../../lib/products';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  return Response.json(products);
}

export async function POST(request) {
  try {
    const newProduct = await request.json();
    newProduct.id = Date.now(); // id فريد

    products.push(newProduct);

    await saveProductsToFile();
    return Response.json({ success: true, product: newProduct });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...updatedData } = await request.json();
    
    const index = products.findIndex(p => p.id === Number(id));
    if (index === -1) {
      return Response.json({ success: false, error: "المنتج غير موجود" }, { status: 404 });
    }

    products[index] = { ...products[index], ...updatedData };

    await saveProductsToFile();
    return Response.json({ success: true, product: products[index] });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const index = products.findIndex(p => p.id === Number(id));
    if (index === -1) {
      return Response.json({ success: false, error: "المنتج غير موجود" }, { status: 404 });
    }

    products.splice(index, 1);

    await saveProductsToFile();
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

async function saveProductsToFile() {
  const filePath = join(process.cwd(), 'lib/products.js');
  const content = `export const products = ${JSON.stringify(products, null, 2)};\n\nexport const categories = ${JSON.stringify(require('../../../lib/products').categories || [], null, 2)};`;
  await writeFile(filePath, content);
}