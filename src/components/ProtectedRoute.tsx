import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  path?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, path }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={path || '/'} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;