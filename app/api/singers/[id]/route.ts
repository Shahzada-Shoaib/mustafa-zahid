import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Singer from '@/lib/models/Singer';
import { uploadImage, uploadMultipleImages, deleteMultipleImages } from '@/lib/utils/cloudinary';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await connectDB();
    
    // Handle both sync and async params (Next.js 15+)
    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;
    
    // Validate ObjectId using mongoose
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID format' },
        { status: 400 }
      );
    }
    
    const singer = await Singer.findById(id).lean();
    
    if (!singer) {
      return NextResponse.json(
        { success: false, error: 'Singer not found' },
        { status: 404 }
      );
    }
    
    // Convert _id to string for consistency
    const singerData = {
      ...singer,
      _id: (singer as any)._id?.toString() || (singer as any)._id,
    };
    
    return NextResponse.json(
      { success: true, data: singerData },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching singer:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch singer' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await connectDB();
    
    // Handle both sync and async params (Next.js 15+)
    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;
    
    console.log('PUT request received:', { 
      id, 
      idType: typeof id, 
      idLength: id?.length,
      isValid: mongoose.Types.ObjectId.isValid(id)
    });
    
    // Validate ObjectId using mongoose
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const errorMsg = `Invalid ID format. Received: "${id}" (type: ${typeof id}, length: ${id?.length}). Updates only allowed by valid MongoDB ObjectId.`;
      console.error('Invalid ID format:', errorMsg);
      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: 400 }
      );
    }
    
    const existingSinger = await Singer.findById(id);
    if (!existingSinger) {
      return NextResponse.json(
        { success: false, error: 'Singer not found' },
        { status: 404 }
      );
    }
    
    const formData = await request.formData();
    const data = JSON.parse(formData.get('data') as string);
    const mainImageFile = formData.get('mainImage') as File | null;
    const galleryFiles = formData.getAll('gallery') as File[];
    
    // Upload main image if new one provided
    let mainImageUrl = existingSinger.image;
    if (mainImageFile && mainImageFile.size > 0) {
      mainImageUrl = await uploadImage(mainImageFile);
    } else if (data.image) {
      mainImageUrl = data.image;
    }
    
    // Upload gallery images if new ones provided
    let galleryUrls: string[] = existingSinger.gallery || [];
    if (galleryFiles.length > 0 && galleryFiles[0].size > 0) {
      const newGalleryUrls = await uploadMultipleImages(galleryFiles);
      galleryUrls = [...galleryUrls, ...newGalleryUrls];
    } else if (data.gallery && Array.isArray(data.gallery)) {
      galleryUrls = data.gallery;
    }
    
    // Build singer object
    const singerData = {
      ...data,
      image: mainImageUrl,
      gallery: galleryUrls,
    };
    
    // Update in database
    const updatedSinger = await Singer.findByIdAndUpdate(
      id,
      singerData,
      { new: true, runValidators: true }
    );
    
    return NextResponse.json(
      { success: true, data: updatedSinger?.toObject() },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating singer:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update singer' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await connectDB();
    
    // Handle both sync and async params (Next.js 15+)
    const resolvedParams = params instanceof Promise ? await params : params;
    const { id } = resolvedParams;
    
    // Validate ObjectId using mongoose
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID format' },
        { status: 400 }
      );
    }
    
    // Fetch the singer first to get image URLs
    const singer = await Singer.findById(id);
    
    if (!singer) {
      return NextResponse.json(
        { success: false, error: 'Singer not found' },
        { status: 404 }
      );
    }
    
    // Collect all image URLs
    const imageUrls: string[] = [];
    if (singer.image) imageUrls.push(singer.image);
    if (singer.gallery && Array.isArray(singer.gallery)) {
      imageUrls.push(...singer.gallery);
    }
    
    // Delete from database
    await Singer.findByIdAndDelete(id);
    
    // Delete images from Cloudinary (don't wait, fire and forget)
    if (imageUrls.length > 0) {
      deleteMultipleImages(imageUrls).catch(error => {
        console.error('Error deleting images from Cloudinary:', error);
      });
    }
    
    return NextResponse.json(
      { success: true, message: 'Singer deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting singer:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete singer' },
      { status: 500 }
    );
  }
}

