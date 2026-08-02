import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import LoginForm from './LoginForm';

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect('/dashboard');
  return <LoginForm />;
}
