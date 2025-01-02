// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const accessToken = localStorage.getItem('Token'); 

//   // If there is no access token, navigate to the login page
//   if (!accessToken) {
//     return <Navigate to="/" replace />;
//   }

//   // If access token exists, render the children components
//   return children; 
// };

// export default ProtectedRoute;

// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = () => {
//   const accessToken = localStorage.getItem('Token');


//   if (!accessToken) {
//     return <Navigate to="/" replace />;
//   }


//   return <Outlet />;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const accessToken = localStorage.getItem("Token");
  const userRole = localStorage.getItem("UserRole"); // Fetch userRole
  const role = localStorage.getItem("role"); // Fetch role
  const location = useLocation();

  // If the token is missing, redirect to the login page
  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  const isAllowed = allowedRoles.some(
    (allowed) =>
      allowed.userRole === userRole && allowed.role === role
  );

  if (!isAllowed) {
    return (
      <Navigate
        to="/unauthorized"
        state={{
          from: location,
          userRole,
          role,
          allowedRoles,
        }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
