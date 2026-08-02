import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';

export default async function MigrationLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) redirect('/admin/login');
  return children;
}
