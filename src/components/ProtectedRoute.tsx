import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/context/AuthStore';

type ProtectedRouteProps = {
  children: React.ReactNode;
  path?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, path }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={path || '/'} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;