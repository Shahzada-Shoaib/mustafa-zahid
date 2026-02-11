import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Class from '@/lib/models/Class';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const classDoc = await Class.findOne({ slug: params.slug }).lean();

    if (!classDoc) {
      return NextResponse.json(
        { success: false, error: 'Class not found' },
        { status: 404 }
      );
    }

    // Remove MongoDB internal fields
    const { _id, __v, createdAt, updatedAt, ...classData } = classDoc as any;

    return NextResponse.json(
      { success: true, data: classData },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching class:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch class' },
      { status: 500 }
    );
  }
}

