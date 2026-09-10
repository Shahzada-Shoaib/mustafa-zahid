import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { uploadImage, deleteMultipleImages } from '@/lib/utils/cloudinary';
import { requireAdmin } from '@/lib/auth';
import mongoose from 'mongoose';
import {
  BlogContentValidationError,
  collectBlogImageUrls,
  normalizeBlogSections,
} from '@/lib/utils/blogContent';

function parseBlogData(formData: FormData): Record<string, unknown> {
  const rawData = formData.get('data');
  if (typeof rawData !== 'string') {
    throw new BlogContentValidationError('Blog data is required');
  }

  let data: unknown;
  try {
    data = JSON.parse(rawData);
  } catch {
    throw new BlogContentValidationError('Blog data must be valid JSON');
  }

  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw new BlogContentValidationError('Blog data must be an object');
  }

  return data as Record<string, unknown>;
}

function getImageFile(formData: FormData, key: string): File | null {
  const value = formData.get(key);
  return value && typeof value !== 'string' && value.size > 0 ? value : null;
}

function normalizeContent(value: unknown): string {
  if (value === undefined || value === null) return '';
  if (typeof value !== 'string') {
    throw new BlogContentValidationError('content must be a string');
  }
  return value;
}

function normalizeImageUrl(value: unknown): string {
  if (value === undefined || value === null) return '';
  if (typeof value !== 'string') {
    throw new BlogContentValidationError('image must be a string');
  }
  return value.trim();
}

function cleanupUploadedImages(imageUrls: string[]) {
  if (imageUrls.length === 0) return;
  deleteMultipleImages([...new Set(imageUrls)]).catch(error => {
    console.error('Error cleaning up newly uploaded blog images:', error);
  });
}

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
  const unauthorized = requireAdmin(request); if (unauthorized) return unauthorized;
  const uploadedImageUrls: string[] = [];
  let blogSaved = false;

  try {
    await connectDB();

    const formData = await request.formData();
    const data = parseBlogData(formData);
    const sections = normalizeBlogSections(data.sections);
    const content = normalizeContent(data.content);
    const imageFile = getImageFile(formData, 'image');

    // Upload the hero and section images using stable section IDs. Sequential
    // uploads keep the association deterministic and make partial cleanup safe.
    let imageUrl = normalizeImageUrl(data.image);
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
      uploadedImageUrls.push(imageUrl);
    }

    for (const section of sections) {
      const sectionImageFile = getImageFile(formData, `sectionImage:${section.id}`);
      if (!sectionImageFile) continue;

      section.image = await uploadImage(sectionImageFile);
      uploadedImageUrls.push(section.image);
    }

    // Build blog post object
    const blogData = {
      ...data,
      content,
      sections,
      image: imageUrl,
    };

    // Save to database
    const blogPost = new BlogPost(blogData);
    await blogPost.save();
    blogSaved = true;

    return NextResponse.json(
      { success: true, data: blogPost.toObject() },
      { status: 201 }
    );
  } catch (error: any) {
    if (!blogSaved) cleanupUploadedImages(uploadedImageUrls);
    console.error('Error creating blog post:', error);

    if (error instanceof BlogContentValidationError || error?.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    if (error?.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'A blog with this slug already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const unauthorized = requireAdmin(request); if (unauthorized) return unauthorized;
  try {
    await connectDB();
    
    const body = await request.json();
    const { ids } = body;
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'IDs array is required' },
        { status: 400 }
      );
    }

    if (!ids.every(id => typeof id === 'string' && mongoose.Types.ObjectId.isValid(id))) {
      return NextResponse.json(
        { success: false, error: 'Every blog ID must be a valid ObjectId' },
        { status: 400 }
      );
    }
    
    // Fetch blogs first to get image URLs
    const blogs = await BlogPost.find({ _id: { $in: ids } });
    
    // Collect all image URLs
    const imageUrls = [...new Set(blogs.flatMap(blog => collectBlogImageUrls({
      image: blog.image,
      sections: blog.sections,
      content: blog.content,
    })))];
    
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
