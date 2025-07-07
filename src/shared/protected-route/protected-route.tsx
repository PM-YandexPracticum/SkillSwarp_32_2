import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui/preloaderUI';

type TProtectedRoute = {
  isPublic?: boolean;
  children: React.ReactNode;
};

function ProtectedRoute({ children, isPublic = false }: TProtectedRoute) {
  const isAuthCheck = '';
  const userRequest  = '';

  const location = useLocation();
  const from = location.state?.from || { pathname: '/' };

  if (!isAuthCheck && userRequest ) {
    return <Preloader />;
  }

  if (!isAuthCheck && !isPublic) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (isAuthCheck && isPublic) {
    return <Navigate to={from} />;
  }

  return children;
}

export default ProtectedRoute;
