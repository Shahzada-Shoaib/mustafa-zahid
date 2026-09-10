import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { uploadImage, deleteMultipleImages } from '@/lib/utils/cloudinary';
import mongoose from 'mongoose';
import { requireAdmin } from '@/lib/auth';
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

function normalizeContent(value: unknown, fallback = ''): string {
  if (value === undefined) return fallback;
  if (value === null) return '';
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

function cleanupImages(imageUrls: string[], context: string) {
  const uniqueUrls = [...new Set(imageUrls.filter(Boolean))];
  if (uniqueUrls.length === 0) return;

  deleteMultipleImages(uniqueUrls).catch(error => {
    console.error(`Error ${context}:`, error);
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const unauthorized = requireAdmin(request); if (unauthorized) return unauthorized;
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
  const unauthorized = requireAdmin(request); if (unauthorized) return unauthorized;
  const uploadedImageUrls: string[] = [];
  let blogUpdated = false;

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
    const data = parseBlogData(formData);
    const existingSections = normalizeBlogSections(existingBlog.sections);
    const sections = data.sections === undefined
      ? existingSections
      : normalizeBlogSections(data.sections);
    const existingSectionsById = new Map(
      existingSections.map(section => [section.id, section])
    );
    const sectionsWithExplicitImageValue = new Set(
      Array.isArray(data.sections)
        ? data.sections
            .filter((section): section is Record<string, unknown> => (
              typeof section === 'object' && section !== null && !Array.isArray(section)
            ))
            .filter(section => Object.prototype.hasOwnProperty.call(section, 'image'))
            .map(section => typeof section.id === 'string' ? section.id.trim() : '')
            .filter(Boolean)
        : []
    );
    const imageFile = getImageFile(formData, 'image');
    const content = normalizeContent(data.content, existingBlog.content || '');
    
    // Upload image if new one provided
    let imageUrl = existingBlog.image || '';
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
      uploadedImageUrls.push(imageUrl);
    } else if (data.image !== undefined) {
      // An empty submitted value must not accidentally discard the current hero.
      imageUrl = normalizeImageUrl(data.image) || imageUrl;
    }

    for (const section of sections) {
      const existingSection = existingSectionsById.get(section.id);
      const sectionImageFile = getImageFile(formData, `sectionImage:${section.id}`);

      if (sectionImageFile) {
        section.image = await uploadImage(sectionImageFile);
        uploadedImageUrls.push(section.image);
      } else if (
        data.sections !== undefined &&
        !sectionsWithExplicitImageValue.has(section.id) &&
        existingSection?.image
      ) {
        section.image = existingSection.image;
      }
    }
    
    // Build blog object
    const blogData = {
      ...data,
      content,
      sections,
      image: imageUrl,
    };
    
    // Update in database
    const updatedBlog = await BlogPost.findByIdAndUpdate(
      id,
      blogData,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      throw new Error('Blog disappeared before it could be updated');
    }
    blogUpdated = true;

    // Only clean old assets after MongoDB accepts the update. Comparing final
    // references prevents deleting a URL that was moved to another section.
    const previousImageUrls = collectBlogImageUrls({
      image: existingBlog.image,
      sections: existingBlog.sections,
      content: existingBlog.content,
    });
    const finalImageUrls = new Set(collectBlogImageUrls({
      image: imageUrl,
      sections,
      content,
    }));
    const retiredImageUrls = previousImageUrls.filter(url => !finalImageUrls.has(url));
    cleanupImages(retiredImageUrls, 'deleting replaced blog images from Cloudinary');
    
    return NextResponse.json(
      { success: true, data: updatedBlog.toObject() },
      { status: 200 }
    );
  } catch (error: any) {
    if (!blogUpdated) {
      cleanupImages(uploadedImageUrls, 'cleaning up newly uploaded blog images');
    }
    console.error('Error updating blog:', error);

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
      { success: false, error: error.message || 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const unauthorized = requireAdmin(request); if (unauthorized) return unauthorized;
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
    
    // Fetch the blog first to get image URL
    const blog = await BlogPost.findById(id);
    
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    const imageUrls = collectBlogImageUrls({
      image: blog.image,
      sections: blog.sections,
      content: blog.content,
    });
    
    // Delete from database
    await BlogPost.findByIdAndDelete(id);
    
    // Delete all owned images from Cloudinary (don't wait, fire and forget).
    cleanupImages(imageUrls, 'deleting blog images from Cloudinary');
    
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
