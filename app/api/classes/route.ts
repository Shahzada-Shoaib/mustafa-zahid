import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Class from '@/lib/models/Class';
import { uploadImage } from '@/lib/utils/cloudinary';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const data = JSON.parse(formData.get('data') as string);
    const heroImageFile = formData.get('heroImage') as File | null;
    const curriculumImageFile = formData.get('curriculumImage') as File | null;
    const teachingImageFile = formData.get('teachingImage') as File | null;

    // Upload images
    let heroImageUrl = data.hero?.heroImage || data.images?.heroImage || '';
    if (heroImageFile && heroImageFile.size > 0) {
      heroImageUrl = await uploadImage(heroImageFile);
    }

    let curriculumImageUrl = data.images?.curriculumImage || '';
    if (curriculumImageFile && curriculumImageFile.size > 0) {
      curriculumImageUrl = await uploadImage(curriculumImageFile);
    }

    let teachingImageUrl = data.images?.teachingImage || '';
    if (teachingImageFile && teachingImageFile.size > 0) {
      teachingImageUrl = await uploadImage(teachingImageFile);
    }

    // Validate required fields before saving
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

    // Save to database
    const classDoc = new Class(classData);
    await classDoc.save();

    return NextResponse.json(
      { success: true, data: classDoc.toObject() },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating class:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create class' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const url = new URL(request.url);
    const forDashboard = url.searchParams.get('forDashboard') === 'true';
    
    const classes = await Class.find({})
      .select(forDashboard ? '_id slug title type instrument createdAt updatedAt' : 'slug title type instrument')
      .sort({ createdAt: -1 })
      .lean();
    
    if (!classes || !Array.isArray(classes)) {
      return NextResponse.json({ success: true, data: [] }, { status: 200 });
    }
    
    // Format for header dropdown (default behavior for backward compatibility)
    if (!forDashboard) {
      const formattedClasses = classes.map((classItem: any) => ({
        href: `/music-classes/${classItem.slug}`,
        label: classItem.title,
        slug: classItem.slug,
        type: classItem.type,
        instrument: classItem.instrument,
      }));
      
      return NextResponse.json(
        { success: true, data: formattedClasses },
        { status: 200 }
      );
    }
    
    // Return raw data for dashboard (convert _id to string)
    const formattedClasses = classes.map((classItem: any) => ({
      ...classItem,
      _id: classItem._id?.toString() || classItem._id,
    }));
    
    return NextResponse.json(
      { success: true, data: formattedClasses },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching classes:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch classes' },
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
    
    const result = await Class.deleteMany({ _id: { $in: ids } });
    
    return NextResponse.json(
      { success: true, deletedCount: result.deletedCount },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting classes:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete classes' },
      { status: 500 }
    );
  }
}

