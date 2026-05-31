// src/components/RoleGuard.jsx
// Protects routes by user role.
// Usage in App.jsx:
//   <Route path="/add-property" element={<RoleGuard allowed={['owner','admin']}><AddProperty/></RoleGuard>} />
//   <Route path="/favorites"    element={<RoleGuard allowed={['user']}><Favorites/></RoleGuard>} />
//   <Route path="/my-bookings"  element={<RoleGuard allowed={['user','owner','admin']}><MyBookings/></RoleGuard>} />
//   <Route path="/admin"        element={<RoleGuard allowed={['admin']}><AdminDashboard/></RoleGuard>} />

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function RoleGuard({ allowed, children, redirectTo = '/' }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (!allowed.includes(user.role)) return <Navigate to={redirectTo} replace />;
  return children;
}

export default RoleGuard;