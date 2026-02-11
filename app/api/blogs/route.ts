import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { uploadImage } from '@/lib/utils/cloudinary';

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

