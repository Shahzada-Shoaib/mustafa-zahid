import { createHmac, scryptSync, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const ADMIN_SESSION_COOKIE = 'mz_admin_session';
const SESSION_DURATION_SECONDS = 60 * 60 * 12;

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET?.trim();
  if (!secret || secret.length < 32) throw new Error('AUTH_SECRET must be at least 32 characters.');
  return secret;
}

function sign(value: string) {
  return createHmac('sha256', getAuthSecret()).update(value).digest('base64url');
}

export function verifyAdminCredentials(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const storedPassword = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (!adminEmail || !storedPassword) throw new Error('Admin credentials are not configured.');
  if (email.trim().toLowerCase() !== adminEmail || password.length > 256) return false;

  const [salt, expectedHash] = storedPassword.split(':');
  if (!salt || !expectedHash) throw new Error('ADMIN_PASSWORD_HASH has an invalid format.');
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHash, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function createAdminSession() {
  const payload = Buffer.from(JSON.stringify({ role: 'admin', exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSession(token?: string | null) {
  if (!token) return false;
  try {
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return false;
    const actualSignature = Buffer.from(signature);
    const expectedSignature = Buffer.from(sign(payload));
    if (actualSignature.length !== expectedSignature.length || !timingSafeEqual(actualSignature, expectedSignature)) return false;
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { role?: string; exp?: number };
    return session.role === 'admin' && typeof session.exp === 'number' && session.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export function isAdminRequest(request: NextRequest) {
  return verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

export function requireAdmin(request: NextRequest): NextResponse | null {
  return isAdminRequest(request) ? null : NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
}

export const adminCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
  maxAge: SESSION_DURATION_SECONDS,
};
