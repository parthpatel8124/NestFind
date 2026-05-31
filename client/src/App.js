// // import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import PropertyDetails from './pages/PropertyDetails';
// import AddProperty from './pages/AddProperty';
// import NotFound from './pages/NotFound';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Favorites from './pages/Favorites';
// import Roommates from './pages/Roommates';
// import AddRoommate from './pages/AddRoommate';
// import RoommateDetails from './pages/RoommateDetails';
// import AdminDashboard from './pages/AdminDashboard';
// import './App.css';
// import RequireAuth from './components/RequireAuth';
// import MyBookings from './pages/MyBookings';
// import Logout from './pages/Logout';
// import Messages from './pages/Messages';


// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Navbar />
//         <main className="min-h-screen bg-gray-50">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/property/:id" element={<PropertyDetails />} />
//             <Route path="/add-property" element={<RequireAuth><AddProperty /></RequireAuth>} />
//             <Route path="/roommates" element={<Roommates />} />
//             <Route path="/roommates/new" element={<RequireAuth><AddRoommate /></RequireAuth>} />
//             <Route path="/roommates/:id" element={<RoommateDetails />} />
//             <Route path="/favorites" element={<Favorites />} />
//             <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="*" element={<NotFound />} />
//             <Route path="/my-bookings" element={<MyBookings />} />
//             <Route path="/logout" element={<Logout />} />
//             <Route path="/messages" element={<Messages />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import AddProperty from './pages/AddProperty';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';
import Roommates from './pages/Roommates';
import AddRoommate from './pages/AddRoommate';
import RoommateDetails from './pages/RoommateDetails';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';
import MyBookings from './pages/MyBookings';
import Messages from './pages/Messages';
import RoleGuard from './components/RoleGuard';
import ScrollToTop from './components/ScrollToTop';
import ProfilePage from './pages/ProfilePage';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
  <ScrollToTop />
        <main className="min-h-screen bg-gray-50">
          <Routes>
             <Route path="/"               element={<Home />} />
  <Route path="/login"          element={<Login />} />
  <Route path="/register"       element={<Register />} />
  <Route path="/property/:id"   element={<PropertyDetails />} />
  <Route path="/roommates"      element={<Roommates />} />
  <Route path="/roommates/:id"  element={<RoommateDetails />} />
  <Route path="/roommates/new"  element={<AddRoommate />} />
  <Route path="/messages"       element={<Messages />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="*" element={<NotFound />} />

 
  {/* ── Seeker only (role === 'user') ── */}
  <Route path="/favorites" element={
    <RoleGuard allowed={['user']}>
      <Favorites />
    </RoleGuard>
  } />
 
  {/* ── Owner + Admin only ── */}
  <Route path="/add-property" element={
    <RoleGuard allowed={['owner', 'admin']}>
      <AddProperty />
    </RoleGuard>
  } />
 
  {/* ── All logged-in users ── */}
  <Route path="/my-bookings" element={
    <RoleGuard allowed={['user', 'owner', 'admin']}>
      <MyBookings />
    </RoleGuard>
  } />
 
  {/* ── Admin only ── */}
  <Route path="/admin" element={
    <RoleGuard allowed={['admin']}>
      <AdminDashboard />
    </RoleGuard>
  } />
 
  {/* ── Catch-all ── */}
      
  </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
