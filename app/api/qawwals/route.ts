import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Qawwal from '@/lib/models/Qawwal';
import { uploadImage, uploadMultipleImages, deleteMultipleImages } from '@/lib/utils/cloudinary';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const qawwals = await Qawwal.find({})
      .select('_id name slug image createdAt updatedAt')
      .sort({ createdAt: -1 })
      .lean();
    
    // Convert _id to string for consistency
    const formattedQawwals = qawwals.map((qawwal: any) => ({
      ...qawwal,
      _id: qawwal._id?.toString() || qawwal._id,
    }));
    
    return NextResponse.json(
      { success: true, data: formattedQawwals },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching qawwals:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch qawwals' },
      { status: 500 }
    );
  }
}

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

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { ids } = body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'IDs array is required' },
        { status: 400 }
      );
    }
    
    // Fetch qawwals first to get image URLs
    const qawwals = await Qawwal.find({ _id: { $in: ids } });
    
    // Collect all image URLs
    const imageUrls: string[] = [];
    qawwals.forEach(qawwal => {
      if (qawwal.image) imageUrls.push(qawwal.image);
      if (qawwal.gallery && Array.isArray(qawwal.gallery)) {
        imageUrls.push(...qawwal.gallery);
      }
    });
    
    // Delete from database
    const result = await Qawwal.deleteMany({ _id: { $in: ids } });
    
    // Delete images from Cloudinary (don't wait, fire and forget)
    if (imageUrls.length > 0) {
      deleteMultipleImages(imageUrls).catch(error => {
        console.error('Error deleting images from Cloudinary:', error);
      });
    }
    
    return NextResponse.json(
      { success: true, deletedCount: result.deletedCount },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting qawwals:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete qawwals' },
      { status: 500 }
    );
  }
}

