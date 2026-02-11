import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Qawwal from '@/lib/models/Qawwal';
import { uploadImage, uploadMultipleImages } from '@/lib/utils/cloudinary';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const data = JSON.parse(formData.get('data') as string);
    const mainImageFile = formData.get('mainImage') as File | null;
    const galleryFiles = formData.getAll('gallery') as File[];

    // Upload main image
    let mainImageUrl = data.image || '';
    if (mainImageFile && mainImageFile.size > 0) {
      mainImageUrl = await uploadImage(mainImageFile);
    }

    // Upload gallery images
    let galleryUrls: string[] = [];
    if (galleryFiles.length > 0 && galleryFiles[0].size > 0) {
      galleryUrls = await uploadMultipleImages(galleryFiles);
    }

    // Build qawwal object
    const qawwalData = {
      ...data,
      image: mainImageUrl,
      gallery: galleryUrls.length > 0 ? galleryUrls : (data.gallery || []),
    };

    // Save to database
    const qawwal = new Qawwal(qawwalData);
    await qawwal.save();

    return NextResponse.json(
      { success: true, data: qawwal.toObject() },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating qawwal:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create qawwal' },
      { status: 500 }
    );
  }
}

