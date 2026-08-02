import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, adminCookieOptions, createAdminSession, verifyAdminCredentials } from '@/lib/auth';

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const now = Date.now();
  const record = attempts.get(ip);
  if (record && record.resetAt > now && record.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ success: false, error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 });
  }
  if (record && record.resetAt <= now) attempts.delete(ip);

  try {
    const { email, password } = await request.json();
    if (typeof email !== 'string' || typeof password !== 'string' || !verifyAdminCredentials(email, password)) {
      const current = attempts.get(ip);
      attempts.set(ip, { count: (current?.count || 0) + 1, resetAt: current?.resetAt || now + WINDOW_MS });
      return NextResponse.json({ success: false, error: 'Invalid email or password.' }, { status: 401 });
    }

    attempts.delete(ip);
    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSession(), adminCookieOptions);
    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ success: false, error: 'Login is not configured correctly.' }, { status: 500 });
  }
}
