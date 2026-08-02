import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import mongoose from 'mongoose';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request); if (unauthorized) return unauthorized;
  try {
    await connectDB();
    return NextResponse.json({ 
      message: 'Database connected successfully',
      dbName: mongoose.connection.db?.databaseName
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Database connection failed',
      details: error.message 
    }, { status: 500 });
  }
}
