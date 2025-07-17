import { PreloaderUI } from '@/shared/ui';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
type TProtectedRoute = {
  isPublic?: boolean;
  children: React.ReactNode;
};

export function ProtectedRoute({ children, isPublic = false }: TProtectedRoute) {
  const isAuthCheck = '';
  const userRequest = '';

  const location = useLocation();
  const from = location.state?.from || { pathname: '/' };

  if (!isAuthCheck && userRequest) {
    return <PreloaderUI />;
  }

  if (!isAuthCheck && !isPublic) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (isAuthCheck && isPublic) {
    return <Navigate to={from} />;
  }

  return children;
}
