import { AuthContext } from 'pages/authentication/auth-context';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
