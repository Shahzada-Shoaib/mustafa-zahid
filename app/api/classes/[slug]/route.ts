import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Class from '@/lib/models/Class';
import { uploadImage, deleteMultipleImages } from '@/lib/utils/cloudinary';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    await connectDB();

    // Handle both sync and async params (Next.js 15+)
    const resolvedParams = params instanceof Promise ? await params : params;
    const slug = resolvedParams.slug;

    // Check if slug is a valid MongoDB ObjectId (for dashboard edit)
    const isObjectId = mongoose.Types.ObjectId.isValid(slug);
    let classDoc;
    
    if (isObjectId) {
      // Query by _id for dashboard
      classDoc = await Class.findById(slug).lean();
    } else {
      // Query by slug for frontend pages
      classDoc = await Class.findOne({ slug }).lean();
    }

    if (!classDoc) {
      return NextResponse.json(
        { success: false, error: 'Class not found' },
        { status: 404 }
      );
    }

    // For frontend pages, remove MongoDB internal fields
    // For dashboard, keep all fields including _id (convert ObjectId to string)
    if (isObjectId) {
      // Convert _id to string for consistency
      const classData = {
        ...classDoc,
        _id: (classDoc as any)._id?.toString() || (classDoc as any)._id,
      };
      return NextResponse.json(
        { success: true, data: classData },
        { status: 200 }
      );
    } else {
      const { _id, __v, createdAt, updatedAt, ...classData } = classDoc as any;
      return NextResponse.json(
        { success: true, data: classData },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error('Error fetching class:', error);
    const errorMessage = error?.message || error?.toString() || 'Failed to fetch class';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    await connectDB();
    
    // Handle both sync and async params (Next.js 15+)
    const resolvedParams = params instanceof Promise ? await params : params;
    const slug = resolvedParams.slug;
    
    console.log('PUT request received:', { 
      slug, 
      slugType: typeof slug, 
      slugLength: slug?.length,
      isValid: mongoose.Types.ObjectId.isValid(slug)
    });
    
    // Only allow updates by ID (for dashboard)
    // Use mongoose validation (more reliable)
    if (!mongoose.Types.ObjectId.isValid(slug)) {
      const errorMsg = `Invalid ID format. Received: "${slug}" (type: ${typeof slug}, length: ${slug?.length}). Updates only allowed by valid MongoDB ObjectId.`;
      console.error('Invalid ID format:', errorMsg);
      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: 400 }
      );
    }
    
    const existingClass = await Class.findById(slug);
    if (!existingClass) {
      return NextResponse.json(
        { success: false, error: 'Class not found' },
        { status: 404 }
      );
    }
    
    const formData = await request.formData();
    const data = JSON.parse(formData.get('data') as string);
    const heroImageFile = formData.get('heroImage') as File | null;
    const curriculumImageFile = formData.get('curriculumImage') as File | null;
    const teachingImageFile = formData.get('teachingImage') as File | null;
    
    // Upload images if new ones provided
    let heroImageUrl = existingClass.hero?.heroImage || existingClass.images?.heroImage || '';
    if (heroImageFile && heroImageFile.size > 0) {
      heroImageUrl = await uploadImage(heroImageFile);
    } else if (data.hero?.heroImage || data.images?.heroImage) {
      heroImageUrl = data.hero?.heroImage || data.images?.heroImage;
    }
    
    let curriculumImageUrl = existingClass.images?.curriculumImage || '';
    if (curriculumImageFile && curriculumImageFile.size > 0) {
      curriculumImageUrl = await uploadImage(curriculumImageFile);
    } else if (data.images?.curriculumImage) {
      curriculumImageUrl = data.images.curriculumImage;
    }
    
    let teachingImageUrl = existingClass.images?.teachingImage || '';
    if (teachingImageFile && teachingImageFile.size > 0) {
      teachingImageUrl = await uploadImage(teachingImageFile);
    } else if (data.images?.teachingImage) {
      teachingImageUrl = data.images.teachingImage;
    }
    
    // Validate required fields
    if (data.features && Array.isArray(data.features)) {
      for (let i = 0; i < data.features.length; i++) {
        const feature = data.features[i];
        if (!feature.icon || feature.icon.trim() === '') {
          return NextResponse.json(
            { success: false, error: `Feature ${i + 1}: Icon is required` },
            { status: 400 }
          );
        }
        if (!feature.title || feature.title.trim() === '') {
          return NextResponse.json(
            { success: false, error: `Feature ${i + 1}: Title is required` },
            { status: 400 }
          );
        }
      }
    }
    
    if (data.benefits && Array.isArray(data.benefits)) {
      for (let i = 0; i < data.benefits.length; i++) {
        const benefit = data.benefits[i];
        if (!benefit.icon || benefit.icon.trim() === '') {
          return NextResponse.json(
            { success: false, error: `Benefit ${i + 1}: Icon is required` },
            { status: 400 }
          );
        }
        if (!benefit.title || benefit.title.trim() === '') {
          return NextResponse.json(
            { success: false, error: `Benefit ${i + 1}: Title is required` },
            { status: 400 }
          );
        }
      }
    }
    
    // Build class object
    const classData = {
      ...data,
      hero: {
        ...data.hero,
        heroImage: heroImageUrl,
      },
      images: {
        heroImage: heroImageUrl,
        curriculumImage: curriculumImageUrl,
        teachingImage: teachingImageUrl,
      },
    };
    
    // Update in database
    const updatedClass = await Class.findByIdAndUpdate(
      slug,
      classData,
      { new: true, runValidators: true }
    );
    
    return NextResponse.json(
      { success: true, data: updatedClass?.toObject() },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating class:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update class' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    await connectDB();
    
    // Handle both sync and async params (Next.js 15+)
    const resolvedParams = params instanceof Promise ? await params : params;
    const slug = resolvedParams.slug;
    
    // Only allow deletes by ID (for dashboard)
    if (!mongoose.Types.ObjectId.isValid(slug)) {
      return NextResponse.json(
        { success: false, error: `Invalid ID format: ${slug}. Deletes only allowed by ID.` },
        { status: 400 }
      );
    }
    
    // Fetch the class first to get image URLs
    const classDoc = await Class.findById(slug);
    
    if (!classDoc) {
      return NextResponse.json(
        { success: false, error: 'Class not found' },
        { status: 404 }
      );
    }
    
    // Collect all image URLs from class
    const imageUrls: string[] = [];
    if (classDoc.hero?.heroImage) imageUrls.push(classDoc.hero.heroImage);
    if (classDoc.images?.heroImage) imageUrls.push(classDoc.images.heroImage);
    if (classDoc.images?.curriculumImage) imageUrls.push(classDoc.images.curriculumImage);
    if (classDoc.images?.teachingImage) imageUrls.push(classDoc.images.teachingImage);
    
    // Remove duplicates
    const uniqueImageUrls = [...new Set(imageUrls)];
    
    // Delete from database
    await Class.findByIdAndDelete(slug);
    
    // Delete images from Cloudinary (don't wait, fire and forget)
    if (uniqueImageUrls.length > 0) {
      deleteMultipleImages(uniqueImageUrls).catch(error => {
        console.error('Error deleting images from Cloudinary:', error);
      });
    }
    
    return NextResponse.json(
      { success: true, message: 'Class deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting class:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete class' },
      { status: 500 }
    );
  }
}

