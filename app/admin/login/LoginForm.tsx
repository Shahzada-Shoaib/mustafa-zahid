'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.get('email'), password: form.get('password') }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Login failed.');
      router.replace('/dashboard');
      router.refresh();
    } catch (loginError: any) {
      setError(loginError.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808] px-4 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(220,38,38,0.18),_transparent_45%)]" />
      <form onSubmit={submit} className="glass-card relative w-full max-w-md rounded-3xl p-7 shadow-2xl shadow-red-950/30 sm:p-10">
        <div className="mb-7 text-center">
          <Image src="/mz-logo.png" alt="Mustafa Zahid" width={88} height={88} priority className="mx-auto h-20 w-20 object-contain" />
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-red-400">Secure access</p>
          <h1 className="font-display mt-2 text-3xl font-bold">Admin Login</h1>
        </div>
        {error && <p role="alert" className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
        <div className="space-y-4">
          <label className="block"><span className="mb-2 block text-sm text-white/65">Email</span><input name="email" type="email" autoComplete="username" required autoFocus className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 outline-none transition focus:border-red-500" /></label>
          <label className="block"><span className="mb-2 block text-sm text-white/65">Password</span><input name="password" type="password" autoComplete="current-password" required className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 outline-none transition focus:border-red-500" /></label>
        </div>
        <button disabled={loading} className="mt-6 w-full rounded-full bg-gradient-to-r from-red-600 to-red-700 px-6 py-3.5 font-semibold transition hover:from-red-500 hover:to-red-600 disabled:cursor-wait disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </main>
  );
}
