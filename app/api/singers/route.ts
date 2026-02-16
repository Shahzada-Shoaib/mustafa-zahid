import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Singer from '@/lib/models/Singer';
import { uploadImage, uploadMultipleImages } from '@/lib/utils/cloudinary';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const singers = await Singer.find({})
      .select('_id name slug image createdAt updatedAt')
      .sort({ createdAt: -1 })
      .lean();
    
    // Convert _id to string for consistency
    const formattedSingers = singers.map((singer: any) => ({
      ...singer,
      _id: singer._id?.toString() || singer._id,
    }));
    
    return NextResponse.json(
      { success: true, data: formattedSingers },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching singers:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch singers' },
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

    // Build singer object
    const singerData = {
      ...data,
      image: mainImageUrl,
      gallery: galleryUrls.length > 0 ? galleryUrls : (data.gallery || []),
    };

    // Save to database
    const singer = new Singer(singerData);
    await singer.save();

    return NextResponse.json(
      { success: true, data: singer.toObject() },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating singer:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create singer' },
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
    
    const result = await Singer.deleteMany({ _id: { $in: ids } });
    
    return NextResponse.json(
      { success: true, deletedCount: result.deletedCount },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting singers:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete singers' },
      { status: 500 }
    );
  }
}

