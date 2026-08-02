import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Product from '@/lib/models/Product';
import { deleteMultipleImages, uploadImage, uploadMultipleImages } from '@/lib/utils/cloudinary';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ featured: -1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: products.map((item: any) => ({ ...item, _id: String(item._id) })) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = requireAdmin(request); if (unauthorized) return unauthorized;
  try {
    await connectDB();
    const formData = await request.formData();
    const rawData = formData.get('data');
    if (typeof rawData !== 'string') return NextResponse.json({ success: false, error: 'Product data is required' }, { status: 400 });
    const data = JSON.parse(rawData);
    const imageFile = formData.get('image');
    const image = imageFile instanceof File && imageFile.size > 0 ? await uploadImage(imageFile) : data.image;
    const galleryFiles = formData.getAll('gallery').filter((item): item is File => item instanceof File && item.size > 0);
    const uploadedGallery = galleryFiles.length ? await uploadMultipleImages(galleryFiles) : [];
    const gallery = [...(Array.isArray(data.gallery) ? data.gallery : []), ...uploadedGallery];
    const product = await Product.create({ ...data, price: Number(data.price), image, gallery });
    return NextResponse.json({ success: true, data: product.toObject(), galleryCount: product.gallery.length }, { status: 201 });
  } catch (error: any) {
    const status = error?.code === 11000 ? 409 : 500;
    return NextResponse.json({ success: false, error: error?.code === 11000 ? 'This slug is already in use' : error.message || 'Failed to create product' }, { status });
  }
}

export async function DELETE(request: NextRequest) {
  const unauthorized = requireAdmin(request); if (unauthorized) return unauthorized;
  try {
    await connectDB();
    const { ids } = await request.json();
    if (!Array.isArray(ids) || ids.length === 0) return NextResponse.json({ success: false, error: 'IDs array is required' }, { status: 400 });
    const products = await Product.find({ _id: { $in: ids } }).select('image gallery');
    const result = await Product.deleteMany({ _id: { $in: ids } });
    const images = products.flatMap((item) => [item.image, ...(item.gallery || [])]).filter(Boolean);
    if (images.length) void deleteMultipleImages(images);
    return NextResponse.json({ success: true, deletedCount: result.deletedCount });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to delete products' }, { status: 500 });
  }
}
