import { useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../../../context/admin/AdminContext';

export function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAdmin();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated && location.pathname !== '/admin/login') {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate, location]);

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