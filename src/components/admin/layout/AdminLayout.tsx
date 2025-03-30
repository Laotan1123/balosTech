import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAdmin } from '../../../context/admin/AdminContext';

export function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAdmin();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated && router.pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // or loading spinner
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {children}
      {/* Your existing layout code */}
    </div>
  );
} 