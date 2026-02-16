import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { uploadImage } from '@/lib/utils/cloudinary';
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
    
    const blog = await BlogPost.findById(id).lean();
    
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    // Convert _id to string for consistency
    const blogData = {
      ...blog,
      _id: (blog as any)._id?.toString() || (blog as any)._id,
    };
    
    return NextResponse.json(
      { success: true, data: blogData },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blog' },
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
    
    const existingBlog = await BlogPost.findById(id);
    if (!existingBlog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    const formData = await request.formData();
    const data = JSON.parse(formData.get('data') as string);
    const imageFile = formData.get('image') as File | null;
    
    // Upload image if new one provided
    let imageUrl = existingBlog.image;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile);
    } else if (data.image) {
      imageUrl = data.image;
    }
    
    // Build blog object
    const blogData = {
      ...data,
      image: imageUrl,
    };
    
    // Update in database
    const updatedBlog = await BlogPost.findByIdAndUpdate(
      id,
      blogData,
      { new: true, runValidators: true }
    );
    
    return NextResponse.json(
      { success: true, data: updatedBlog?.toObject() },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update blog' },
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
    
    const result = await BlogPost.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Blog deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete blog' },
      { status: 500 }
    );
  }
}

