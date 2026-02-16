import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { uploadImage, deleteMultipleImages } from '@/lib/utils/cloudinary';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const blogs = await BlogPost.find({})
      .select('_id title slug image date author category createdAt updatedAt')
      .sort({ createdAt: -1 })
      .lean();
    
    // Convert _id to string for consistency
    const formattedBlogs = blogs.map((blog: any) => ({
      ...blog,
      _id: blog._id?.toString() || blog._id,
    }));
    
    return NextResponse.json(
      { success: true, data: formattedBlogs },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const data = JSON.parse(formData.get('data') as string);
    const imageFile = formData.get('image') as File | null;

    // Upload image
    let imageUrl = data.image || '';
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile);
    }

    // Build blog post object
    const blogData = {
      ...data,
      image: imageUrl,
    };

    // Save to database
    const blogPost = new BlogPost(blogData);
    await blogPost.save();

    return NextResponse.json(
      { success: true, data: blogPost.toObject() },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create blog post' },
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
    
    // Fetch blogs first to get image URLs
    const blogs = await BlogPost.find({ _id: { $in: ids } });
    
    // Collect all image URLs
    const imageUrls: string[] = [];
    blogs.forEach(blog => {
      if (blog.image) imageUrls.push(blog.image);
    });
    
    // Delete from database
    const result = await BlogPost.deleteMany({ _id: { $in: ids } });
    
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
    console.error('Error deleting blogs:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete blogs' },
      { status: 500 }
    );
  }
}

