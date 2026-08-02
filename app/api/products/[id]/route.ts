import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/db/mongodb';
import Product from '@/lib/models/Product';
import { deleteImage, deleteMultipleImages, uploadImage, uploadMultipleImages } from '@/lib/utils/cloudinary';
import { requireAdmin } from '@/lib/auth';

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Context) {
  const unauthorized = requireAdmin(_request); if (unauthorized) return unauthorized;
  try {
    await connectDB();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });
    const product = await Product.findById(id).lean();
    if (!product) return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: { ...product, _id: String((product as any)._id) } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Context) {
  const unauthorized = requireAdmin(request); if (unauthorized) return unauthorized;
  try {
    await connectDB();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });
    const existing = await Product.findById(id);
    if (!existing) return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    const formData = await request.formData();
    const rawData = formData.get('data');
    if (typeof rawData !== 'string') return NextResponse.json({ success: false, error: 'Product data is required' }, { status: 400 });
    const data = JSON.parse(rawData);
    const imageFile = formData.get('image');
    let image = existing.image;
    if (imageFile instanceof File && imageFile.size > 0) {
      image = await uploadImage(imageFile);
      if (existing.image) void deleteImage(existing.image);
    }
    const retainedGallery = Array.isArray(data.gallery) ? data.gallery : (existing.gallery || []);
    const removedGallery = (existing.gallery || []).filter((url: string) => !retainedGallery.includes(url));
    const galleryFiles = formData.getAll('gallery').filter((item): item is File => item instanceof File && item.size > 0);
    const uploadedGallery = galleryFiles.length ? await uploadMultipleImages(galleryFiles) : [];
    const gallery = [...retainedGallery, ...uploadedGallery];
    if (removedGallery.length) void deleteMultipleImages(removedGallery);
    const product = await Product.findByIdAndUpdate(id, { ...data, price: Number(data.price), image, gallery }, { new: true, runValidators: true });
    return NextResponse.json({ success: true, data: product?.toObject(), galleryCount: product?.gallery?.length || 0 });
  } catch (error: any) {
    const status = error?.code === 11000 ? 409 : 500;
    return NextResponse.json({ success: false, error: error?.code === 11000 ? 'This slug is already in use' : error.message || 'Failed to update product' }, { status });
  }
}

export async function DELETE(_request: NextRequest, { params }: Context) {
  const unauthorized = requireAdmin(_request); if (unauthorized) return unauthorized;
  try {
    await connectDB();
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });
    const product = await Product.findByIdAndDelete(id);
    if (!product) return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    const images = [product.image, ...(product.gallery || [])].filter(Boolean);
    if (images.length) void deleteMultipleImages(images);
    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to delete product' }, { status: 500 });
  }
}
