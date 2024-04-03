import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  console.log(isAuthenticated , localStorage.getItem('isAuthenticated'))
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Component {...rest} />;
}

export default PublicRoute;
