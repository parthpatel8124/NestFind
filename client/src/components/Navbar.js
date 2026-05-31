// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Home, Plus, Eye, Menu, X, Heart, LogIn, UserPlus, LogOut, Shield } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import AuthContext from '../context/AuthContext';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const navItems = [
//     { path: '/', label: 'Home', icon: Home },
//     { path: '/add-property', label: 'Add Property', icon: Plus },
//     { path: '/roommates', label: 'Roommates', icon: Eye },
//     { path: '/favorites', label: 'Favorites', icon: Heart },

//     // ✅ NEW (ONLY ADDED)
//     { path: '/my-bookings', label: 'My Bookings', icon: Eye },
//   ];

//   const navigate = useNavigate();
//   const { user, logout } = useContext(AuthContext);

//   if (user && user.role === 'admin') {
//     navItems.push({ path: '/admin', label: 'Admin', icon: Shield });
//   }

//   const isLoggedIn = Boolean(user);

//   const authItems = isLoggedIn
//     ? [{ path: '/logout', label: `Logout (${user.fullName.split(' ')[0]})`, icon: LogOut, action: logout }]
//     : [{ path: '/login', label: 'Login', icon: LogIn }, { path: '/register', label: 'Register', icon: UserPlus }];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center h-16">

//           <Link to="/" className="flex items-center space-x-2 font-bold text-xl hover:text-blue-100 transition">
//             <Home size={28} />
//             <span className="hidden sm:inline">Real Estate</span>
//           </Link>

//           <div className="hidden md:flex items-center space-x-2">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition ${
//                   isActive(item.path)
//                     ? 'bg-white text-blue-600'
//                     : 'hover:bg-blue-500'
//                 }`}
//               >
//                 <item.icon size={18} />
//                 <span>{item.label}</span>
//               </Link>
//             ))}

//             <div className="flex space-x-2 ml-4 border-l border-blue-400 pl-4">
//               {authItems.map((item) => (
//                 item.action ? (
//                   <button key={item.label} onClick={item.action} className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-blue-500">
//                     <item.icon size={18} />
//                     <span>{item.label}</span>
//                   </button>
//                 ) : (
//                   <Link
//                     key={item.path}
//                     to={item.path}
//                     className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition ${
//                       isActive(item.path)
//                         ? 'bg-white text-blue-600'
//                         : 'hover:bg-blue-500'
//                     }`}
//                   >
//                     <item.icon size={18} />
//                     <span>{item.label}</span>
//                   </Link>
//                 )
//               ))}
//             </div>
//           </div>

//           <button
//             className="md:hidden"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {isOpen && (
//           <div className="md:hidden pb-4 space-y-2">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => setIsOpen(false)}
//                 className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition block ${
//                   isActive(item.path)
//                     ? 'bg-white text-blue-600'
//                     : 'hover:bg-blue-500'
//                 }`}
//               >
//                 <item.icon size={18} />
//                 <span>{item.label}</span>
//               </Link>
//             ))}
//             <div className="border-t border-blue-400 pt-2 mt-2">
//               {authItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   onClick={() => setIsOpen(false)}
//                   className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition block ${
//                     isActive(item.path)
//                       ? 'bg-white text-blue-600'
//                       : 'hover:bg-blue-500'
//                   }`}
//                 >
//                   <item.icon size={18} />
//                   <span>{item.label}</span>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Home, Plus, Eye, Menu, X, Heart, LogIn, UserPlus, LogOut, Shield, BookOpen } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import AuthContext from '../context/AuthContext';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   const navItems = [
//     { path: '/', label: 'Home', icon: Home },
//     { path: '/add-property', label: 'Add Property', icon: Plus },
//     { path: '/roommates', label: 'Roommates', icon: Eye },
//     { path: '/favorites', label: 'Favorites', icon: Heart },
//     { path: '/my-bookings', label: 'My Bookings', icon: BookOpen },
//   ];

//   const navigate = useNavigate();
//   const { user, logout } = useContext(AuthContext);

//   if (user && user.role === 'admin') {
//     navItems.push({ path: '/admin', label: 'Admin', icon: Shield });
//   }

//   const isLoggedIn = Boolean(user);

//   const authItems = isLoggedIn
//     ? [{ path: '/logout', label: `Logout (${user.fullName.split(' ')[0]})`, icon: LogOut, action: logout }]
//     : [{ path: '/login', label: 'Login', icon: LogIn }, { path: '/register', label: 'Register', icon: UserPlus }];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

//         .navbar-root {
//           font-family: 'DM Sans', sans-serif;
//           position: sticky;
//           top: 0;
//           z-index: 100;
//           transition: all 0.3s ease;
//         }
//         .navbar-root.scrolled {
//           backdrop-filter: blur(20px);
//           -webkit-backdrop-filter: blur(20px);
//           background: rgba(10, 25, 15, 0.88) !important;
//           box-shadow: 0 4px 30px rgba(52, 211, 153, 0.15);
//         }
//         .navbar-bg {
//           background: linear-gradient(135deg, #0a2e1a 0%, #0f3d22 50%, #0a2e1a 100%);
//         }
//         .logo-text {
//           font-family: 'Syne', sans-serif;
//           font-weight: 800;
//           font-size: 1.3rem;
//           background: linear-gradient(90deg, #34d399, #6ee7b7, #a7f3d0);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           letter-spacing: -0.5px;
//         }
//         .logo-dot {
//           width: 8px;
//           height: 8px;
//           background: #34d399;
//           border-radius: 50%;
//           display: inline-block;
//           margin-left: 2px;
//           animation: pulse-dot 2s ease-in-out infinite;
//           vertical-align: middle;
//           margin-bottom: 2px;
//         }
//         @keyframes pulse-dot {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(0.7); }
//         }
//         .nav-link {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           padding: 8px 14px;
//           border-radius: 12px;
//           font-size: 0.875rem;
//           font-weight: 500;
//           color: #a7f3d0;
//           transition: all 0.2s ease;
//           position: relative;
//           text-decoration: none;
//           white-space: nowrap;
//         }
//         .nav-link:hover {
//           background: rgba(52, 211, 153, 0.12);
//           color: #fff;
//           transform: translateY(-1px);
//         }
//         .nav-link.active {
//           background: linear-gradient(135deg, #34d399, #10b981);
//           color: #fff;
//           font-weight: 600;
//           box-shadow: 0 4px 15px rgba(52, 211, 153, 0.35);
//         }
//         .nav-link.active svg {
//           filter: drop-shadow(0 0 4px rgba(255,255,255,0.5));
//         }
//         .auth-divider {
//           width: 1px;
//           height: 28px;
//           background: linear-gradient(to bottom, transparent, rgba(52,211,153,0.4), transparent);
//           margin: 0 8px;
//         }
//         .btn-login {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           padding: 8px 16px;
//           border-radius: 12px;
//           font-size: 0.875rem;
//           font-weight: 500;
//           color: #34d399;
//           border: 1.5px solid rgba(52, 211, 153, 0.35);
//           transition: all 0.2s ease;
//           text-decoration: none;
//           background: transparent;
//           cursor: pointer;
//         }
//         .btn-login:hover {
//           background: rgba(52, 211, 153, 0.1);
//           border-color: #34d399;
//           color: #6ee7b7;
//         }
//         .btn-register {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           padding: 8px 16px;
//           border-radius: 12px;
//           font-size: 0.875rem;
//           font-weight: 600;
//           color: #0a2e1a;
//           background: linear-gradient(135deg, #34d399, #10b981);
//           transition: all 0.2s ease;
//           text-decoration: none;
//           cursor: pointer;
//           border: none;
//           box-shadow: 0 4px 14px rgba(52, 211, 153, 0.3);
//         }
//         .btn-register:hover {
//           background: linear-gradient(135deg, #6ee7b7, #34d399);
//           box-shadow: 0 6px 20px rgba(52, 211, 153, 0.45);
//           transform: translateY(-1px);
//         }
//         .btn-logout {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           padding: 8px 14px;
//           border-radius: 12px;
//           font-size: 0.875rem;
//           font-weight: 500;
//           color: #fca5a5;
//           background: rgba(239, 68, 68, 0.08);
//           border: 1px solid rgba(239, 68, 68, 0.2);
//           transition: all 0.2s ease;
//           cursor: pointer;
//         }
//         .btn-logout:hover {
//           background: rgba(239, 68, 68, 0.15);
//           color: #f87171;
//         }
//         .hamburger-btn {
//           background: rgba(52, 211, 153, 0.1);
//           border: 1px solid rgba(52, 211, 153, 0.25);
//           border-radius: 10px;
//           padding: 8px;
//           color: #34d399;
//           cursor: pointer;
//           transition: all 0.2s ease;
//         }
//         .hamburger-btn:hover {
//           background: rgba(52, 211, 153, 0.2);
//         }
//         .mobile-menu {
//           background: rgba(10, 25, 15, 0.97);
//           backdrop-filter: blur(20px);
//           border-top: 1px solid rgba(52, 211, 153, 0.15);
//           padding: 12px 16px 20px;
//           animation: slideDown 0.25s ease;
//         }
//         @keyframes slideDown {
//           from { opacity: 0; transform: translateY(-8px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .mobile-nav-link {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           padding: 11px 14px;
//           border-radius: 12px;
//           font-size: 0.9rem;
//           font-weight: 500;
//           color: #a7f3d0;
//           text-decoration: none;
//           transition: all 0.2s ease;
//           margin-bottom: 4px;
//         }
//         .mobile-nav-link:hover, .mobile-nav-link.active {
//           background: rgba(52, 211, 153, 0.12);
//           color: #fff;
//         }
//         .mobile-nav-link.active {
//           background: linear-gradient(135deg, rgba(52,211,153,0.2), rgba(16,185,129,0.1));
//           border-left: 3px solid #34d399;
//         }
//         .mobile-divider {
//           border: none;
//           border-top: 1px solid rgba(52, 211, 153, 0.12);
//           margin: 10px 0;
//         }
//         .logo-icon-wrap {
//           background: linear-gradient(135deg, #34d399, #10b981);
//           border-radius: 10px;
//           padding: 6px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           box-shadow: 0 4px 12px rgba(52,211,153,0.3);
//         }
//       `}</style>

//       <nav className={`navbar-root navbar-bg ${scrolled ? 'scrolled' : ''}`}>
//         <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>

//             {/* Logo */}
//             <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
//               <div className="logo-icon-wrap">
//                 <Home size={18} color="#0a2e1a" strokeWidth={2.5} />
//               </div>
//               <span className="logo-text">
//                 NestFind<span className="logo-dot" />
//               </span>
//             </Link>

//             {/* Desktop Nav */}
//             <div style={{ display: 'none', alignItems: 'center', gap: '4px' }} className="desktop-nav">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
//                 >
//                   <item.icon size={16} />
//                   <span>{item.label}</span>
//                 </Link>
//               ))}

//               <div className="auth-divider" />

//               {authItems.map((item) =>
//                 item.action ? (
//                   <button key={item.label} onClick={item.action} className="btn-logout">
//                     <item.icon size={16} />
//                     <span>{item.label}</span>
//                   </button>
//                 ) : item.path === '/register' ? (
//                   <Link key={item.path} to={item.path} className="btn-register">
//                     <item.icon size={16} />
//                     <span>{item.label}</span>
//                   </Link>
//                 ) : (
//                   <Link key={item.path} to={item.path} className="btn-login">
//                     <item.icon size={16} />
//                     <span>{item.label}</span>
//                   </Link>
//                 )
//               )}
//             </div>

//             {/* Mobile hamburger */}
//             <button className="hamburger-btn mobile-only" onClick={() => setIsOpen(!isOpen)}>
//               {isOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="mobile-menu">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => setIsOpen(false)}
//                 className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
//               >
//                 <item.icon size={18} />
//                 <span>{item.label}</span>
//               </Link>
//             ))}
//             <hr className="mobile-divider" />
//             {authItems.map((item) =>
//               item.action ? (
//                 <button
//                   key={item.label}
//                   onClick={() => { item.action(); setIsOpen(false); }}
//                   className="mobile-nav-link btn-logout"
//                   style={{ width: '100%', border: 'none', textAlign: 'left' }}
//                 >
//                   <item.icon size={18} />
//                   <span>{item.label}</span>
//                 </button>
//               ) : (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   onClick={() => setIsOpen(false)}
//                   className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
//                 >
//                   <item.icon size={18} />
//                   <span>{item.label}</span>
//                 </Link>
//               )
//             )}
//           </div>
//         )}
//       </nav>

//       {/* Responsive styles injected inline */}
//       <style>{`
//         @media (min-width: 768px) {
//           .desktop-nav { display: flex !important; }
//           .mobile-only { display: none !important; }
//         }
//         @media (max-width: 767px) {
//           .desktop-nav { display: none !important; }
//         }
//       `}</style>
//     </>
//   );
// }

// export default Navbar;


// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Home, Plus, Eye, Menu, X, Heart, LogIn, UserPlus, LogOut, Shield, BookOpen,MessageSquare } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import AuthContext from '../context/AuthContext';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   const navItems = [
//     { path: '/', label: 'Home', icon: Home },
//     { path: '/add-property', label: 'Add Property', icon: Plus },
//     { path: '/roommates', label: 'Roommates', icon: Eye },
//     { path: '/favorites', label: 'Favorites', icon: Heart },
//     { path: '/my-bookings', label: 'My Bookings', icon: BookOpen },
//     { path: '/messages', label: 'Messages', icon: MessageSquare },
//   ];

//   const navigate = useNavigate();
//   const { user, logout } = useContext(AuthContext);

//   if (user && user.role === 'admin') {
//     navItems.push({ path: '/admin', label: 'Admin', icon: Shield });
//   }

//   const isLoggedIn = Boolean(user);
//   const authItems = isLoggedIn
//     ? [{ path: '/logout', label: `Logout (${user.fullName.split(' ')[0]})`, icon: LogOut, action: logout }]
//     : [{ path: '/login', label: 'Login', icon: LogIn }, { path: '/register', label: 'Register', icon: UserPlus }];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <>
//       {/* <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

//         .nb-root {
//           font-family: 'DM Sans', sans-serif;
//           position: sticky;
//           top: 0;
//           z-index: 100;
//           background: #064e3b;
//           transition: box-shadow 0.3s ease, background 0.3s ease;
//         }
//         .nb-root.nb-scrolled {
//           background: rgba(6, 78, 59, 0.96);
//           box-shadow: 0 4px 24px rgba(6, 78, 59, 0.2);
//           backdrop-filter: blur(14px);
//         }

//         .nb-inner {
//           max-width: 1280px;
//           margin: 0 auto;
//           padding: 0 24px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           height: 66px;
//         }

//         .nb-logo {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           text-decoration: none;
//           flex-shrink: 0;
//         }
//         .nb-logo-icon {
//           background: linear-gradient(135deg, #6ee7b7, #059669);
//           border-radius: 11px;
//           width: 38px; height: 38px;
//           display: flex; align-items: center; justify-content: center;
//           box-shadow: 0 4px 14px rgba(52,211,153,0.4);
//         }
//         .nb-logo-text {
//           font-family: 'Syne', sans-serif;
//           font-weight: 800;
//           font-size: 1.22rem;
//           color: #fff;
//           letter-spacing: -0.5px;
//         }
//         .nb-logo-text em {
//           font-style: normal;
//           color: #6ee7b7;
//         }

//         .nb-links {
//           display: flex;
//           align-items: center;
//           gap: 2px;
//         }
//         .nb-link {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           padding: 8px 12px;
//           border-radius: 10px;
//           font-size: 0.855rem;
//           font-weight: 500;
//           color: #a7f3d0;
//           text-decoration: none;
//           transition: all 0.18s ease;
//           white-space: nowrap;
//         }
//         .nb-link:hover {
//           background: rgba(255,255,255,0.1);
//           color: #fff;
//         }
//         .nb-link.nb-active {
//           background: rgba(255,255,255,0.14);
//           color: #fff;
//           font-weight: 600;
//         }
//         .nb-link.nb-active svg { color: #6ee7b7; }

//         .nb-auth {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           margin-left: 10px;
//           padding-left: 10px;
//           border-left: 1px solid rgba(255,255,255,0.14);
//           flex-shrink: 0;
//         }
//         .nb-btn-ghost {
//           display: flex; align-items: center; gap: 6px;
//           padding: 7px 15px;
//           border-radius: 10px;
//           font-size: 0.855rem; font-weight: 500;
//           color: #d1fae5;
//           border: 1.5px solid rgba(255,255,255,0.2);
//           background: transparent;
//           text-decoration: none; cursor: pointer;
//           transition: all 0.18s ease;
//           font-family: 'DM Sans', sans-serif;
//         }
//         .nb-btn-ghost:hover {
//           background: rgba(255,255,255,0.1);
//           border-color: rgba(255,255,255,0.35);
//           color: #fff;
//         }
//         .nb-btn-solid {
//           display: flex; align-items: center; gap: 6px;
//           padding: 7px 16px;
//           border-radius: 10px;
//           font-size: 0.855rem; font-weight: 700;
//           color: #064e3b;
//           background: linear-gradient(135deg, #6ee7b7, #34d399);
//           text-decoration: none; cursor: pointer; border: none;
//           transition: all 0.18s ease;
//           box-shadow: 0 4px 14px rgba(52,211,153,0.35);
//           font-family: 'DM Sans', sans-serif;
//         }
//         .nb-btn-solid:hover {
//           transform: translateY(-1px);
//           box-shadow: 0 6px 20px rgba(52,211,153,0.5);
//         }
//         .nb-btn-logout {
//           display: flex; align-items: center; gap: 6px;
//           padding: 7px 13px;
//           border-radius: 10px;
//           font-size: 0.855rem; font-weight: 500;
//           color: #fca5a5;
//           background: rgba(239,68,68,0.1);
//           border: 1px solid rgba(239,68,68,0.2);
//           cursor: pointer; transition: all 0.18s ease;
//           font-family: 'DM Sans', sans-serif;
//         }
//         .nb-btn-logout:hover { background: rgba(239,68,68,0.18); }

//         .nb-hamburger {
//           background: rgba(255,255,255,0.1);
//           border: 1px solid rgba(255,255,255,0.2);
//           border-radius: 10px;
//           padding: 8px;
//           color: #fff; cursor: pointer;
//           transition: all 0.18s ease;
//           display: none;
//         }
//         .nb-hamburger:hover { background: rgba(255,255,255,0.18); }

//         .nb-mobile {
//           background: #054035;
//           border-top: 1px solid rgba(255,255,255,0.07);
//           padding: 12px 20px 20px;
//           animation: nbSlide 0.22s ease;
//         }
//         @keyframes nbSlide {
//           from { opacity: 0; transform: translateY(-6px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .nb-mobile-link {
//           display: flex; align-items: center; gap: 10px;
//           padding: 11px 14px; border-radius: 10px;
//           font-size: 0.9rem; font-weight: 500;
//           color: #a7f3d0; text-decoration: none;
//           transition: all 0.18s ease;
//           margin-bottom: 3px; width: 100%;
//           border: none; background: transparent;
//           cursor: pointer; font-family: 'DM Sans', sans-serif;
//           text-align: left;
//         }
//         .nb-mobile-link:hover, .nb-mobile-link.nb-active {
//           background: rgba(255,255,255,0.08); color: #fff;
//         }
//         .nb-mobile-divider {
//           border: none;
//           border-top: 1px solid rgba(255,255,255,0.08);
//           margin: 10px 0;
//         }

//         @media (max-width: 900px) {
//           .nb-links { display: none !important; }
//           .nb-auth { display: none !important; }
//           .nb-hamburger { display: flex !important; }
//         }
//         @media (min-width: 901px) {
//           .nb-hamburger { display: none !important; }
//           .nb-mobile { display: none !important; }
//         }
//       `}</style> */}
//       <style>{`
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

//   .nb-root {
//     font-family: 'DM Sans', sans-serif;
//     position: sticky;
//     top: 0;
//     z-index: 100;
//     background: #064e3b;
//     transition: all 0.3s ease;
//   }

//   .nb-root.nb-scrolled {
//     background: rgba(6, 78, 59, 0.96);
//     box-shadow: 0 6px 28px rgba(6, 78, 59, 0.25);
//     backdrop-filter: blur(14px);
//   }

//   .nb-inner {
//     max-width: 1280px;
//     margin: 0 auto;
//     padding: 0 24px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     height: 66px;
//   }

//   /* LOGO */
//   .nb-logo {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     text-decoration: none;
//     transition: transform 0.2s ease;
//   }
//   .nb-logo:hover {
//     transform: scale(1.03);
//   }

//   .nb-logo-icon {
//     background: linear-gradient(135deg, #6ee7b7, #059669);
//     border-radius: 11px;
//     width: 38px; height: 38px;
//     display: flex; align-items: center; justify-content: center;
//     box-shadow: 0 4px 14px rgba(52,211,153,0.4);
//     transition: transform 0.25s ease;
//   }
//   .nb-logo:hover .nb-logo-icon {
//     transform: rotate(-8deg) scale(1.08);
//   }

//   .nb-logo-text {
//     font-family: 'Syne', sans-serif;
//     font-weight: 800;
//     font-size: 1.22rem;
//     color: #fff;
//   }
//     .logo-dot {
//   width: 8px;
//   height: 8px;
//   background: #34d399;
//   border-radius: 50%;
//   display: inline-block;
//   margin-right: 0px;
//   animation: pulse-dot 2s ease-in-out infinite;
//   vertical-align: middle;
//   margin-top: 4px;
// }

// @keyframes pulse-dot {
//   0%, 100% { opacity: 1; transform: scale(3); }
//   50% { opacity: 0.5; transform: scale(0.7); }
// }

//   .nb-logo-text em {
//     font-style: normal;
//     color: #6ee7b7;
//   }

//   /* LINKS */
//   .nb-links {
//     display: flex;
//     align-items: center;
//     gap: 4px;
//   }

//   .nb-link {
//     position: relative;
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     padding: 8px 12px;
//     border-radius: 10px;
//     font-size: 0.85rem;
//     font-weight: 500;
//     color: #a7f3d0;
//     text-decoration: none;
//     transition: all 0.2s ease;
//   }

//   /* underline animation */
//   .nb-link::after {
//     content: "";
//     position: absolute;
//     bottom: 4px;
//     left: 50%;
//     width: 0%;
//     height: 2px;
//     background: #6ee7b7;
//     transition: all 0.25s ease;
//     transform: translateX(-50%);
//   }

//   .nb-link:hover::after {
//     width: 70%;
//   }

//   .nb-link:hover {
//     background: rgba(255,255,255,0.08);
//     color: #fff;
//     transform: translateY(-1px);
//   }

//   .nb-link svg {
//     transition: transform 0.2s ease;
//   }

//   .nb-link:hover svg {
//     transform: scale(1.15);
//   }

//   /* ACTIVE */
//   .nb-link.nb-active {
//     background: rgba(255,255,255,0.14);
//     color: #fff;
//     font-weight: 600;
//     transform: scale(1.05);
//   }

//   .nb-link.nb-active::after {
//     width: 80%;
//   }

//   .nb-link.nb-active svg {
//     color: #6ee7b7;
//   }

//   /* AUTH */
//   .nb-auth {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     margin-left: 10px;
//     padding-left: 10px;
//     border-left: 1px solid rgba(255,255,255,0.14);
//   }

//   // .nb-btn-ghost,
//   // .nb-btn-solid,
//   // .nb-btn-logout {
//   //   position: relative;
//   //   overflow: hidden;
//   //   transition: all 0.2s ease;
//   // }

//   // .nb-btn-ghost:active,
//   // .nb-btn-solid:active,
//   // .nb-btn-logout:active {
//   //   transform: scale(0.96);
//   // }

//   // .nb-btn-ghost:hover {
//   //   background: rgba(255,255,255,0.12);
//   // }

//   // .nb-btn-solid:hover {
//   //   transform: translateY(-2px) scale(1.03);
//   // }

//   // .nb-btn-logout:hover {
//   //   background: rgba(239,68,68,0.18);
//   //   transform: scale(1.05);
//   // }

//   /* LOGOUT BUTTON (same level as login/register) */
// .nb-btn-logout {
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   padding: 7px 13px;
//   border-radius: 10px;
//   font-size: 0.855rem;
//   font-weight: 500;
//   color: #fca5a5;
//   background: rgba(239,68,68,0.1);
//   border: 1px solid rgba(239,68,68,0.2);
//   cursor: pointer;
//   font-family: 'DM Sans', sans-serif;

//   position: relative;
//   overflow: hidden;
//   transition: all 0.25s ease;
// }

// /* shine sweep (same like others) */
// .nb-btn-logout::before {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: -120%;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(
//     120deg,
//     transparent,
//     rgba(255,255,255,0.25),
//     transparent
//   );
//   transition: all 0.5s ease;
// }

// .nb-btn-logout:hover::before {
//   left: 120%;
// }

// /* glow pulse (like register but subtle) */
// .nb-btn-logout::after {
//   content: "";
//   position: absolute;
//   inset: 0;
//   border-radius: inherit;
//   box-shadow: 0 0 0 rgba(239,68,68,0.5);
//   opacity: 0;
//   transition: all 0.3s ease;
// }

// .nb-btn-logout:hover::after {
//   opacity: 1;
//   box-shadow: 0 0 14px rgba(239,68,68,0.5);
// }

// /* hover */
// .nb-btn-logout:hover {
//   background: rgba(239,68,68,0.18);
//   transform: translateY(-2px) scale(1.04);
// }

// /* icon animation */
// .nb-btn-logout svg {
//   transition: transform 0.2s ease;
// }

// .nb-btn-logout:hover svg {
//   transform: rotate(-10deg) scale(1.1);
// }

// /* click */
// .nb-btn-logout:active {
//   transform: scale(0.95);
// }
//   /* HAMBURGER */
//   .nb-hamburger {
//     background: rgba(255,255,255,0.1);
//     border: 1px solid rgba(255,255,255,0.2);
//     border-radius: 10px;
//     padding: 8px;
//     color: #fff;
//     cursor: pointer;
//     transition: all 0.2s ease;
//   }

//   .nb-hamburger:hover {
//     background: rgba(255,255,255,0.18);
//     transform: rotate(90deg);
//   }

//   /* MOBILE */
//   .nb-mobile {
//     background: #054035;
//     border-top: 1px solid rgba(255,255,255,0.07);
//     padding: 12px 20px 20px;
//     animation: slideFade 0.25s ease;
//   }

//   @keyframes slideFade {
//     from {
//       opacity: 0;
//       transform: translateY(-12px);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }

//   .nb-mobile-link {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     padding: 11px 14px;
//     border-radius: 10px;
//     font-size: 0.9rem;
//     font-weight: 500;
//     color: #a7f3d0;
//     text-decoration: none;
//     transition: all 0.2s ease;
//   }

//   .nb-mobile-link:hover {
//     background: rgba(255,255,255,0.1);
//     transform: translateX(5px);
//     color: #fff;
//   }

//   .nb-mobile-link.nb-active {
//     background: rgba(255,255,255,0.12);
//     color: #fff;
//   }

//   @media (max-width: 900px) {
//     .nb-links { display: none !important; }
//     .nb-auth { display: none !important; }
//     .nb-hamburger { display: flex !important; }
//   }

//   @media (min-width: 901px) {
//     .nb-hamburger { display: none !important; }
//     .nb-mobile { display: none !important; }
//   }
//     /* GHOST BUTTON (Login) */
// .nb-btn-ghost {
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   padding: 7px 15px;
//   border-radius: 10px;
//   font-size: 0.855rem;
//   font-weight: 500;
//   color: #d1fae5;
//   border: 1.5px solid rgba(255,255,255,0.2);
//   background: transparent;
//   text-decoration: none;
//   cursor: pointer;
//   font-family: 'DM Sans', sans-serif;

//   position: relative;
//   overflow: hidden;
//   transition: all 0.25s ease;
// }

// /* shine effect */
// .nb-btn-ghost::before {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: -120%;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(
//     120deg,
//     transparent,
//     rgba(255,255,255,0.25),
//     transparent
//   );
//   transition: all 0.5s ease;
// }

// .nb-btn-ghost:hover::before {
//   left: 120%;
// }

// .nb-btn-ghost:hover {
//   background: rgba(255,255,255,0.12);
//   border-color: rgba(255,255,255,0.35);
//   color: #fff;
//   transform: translateY(-2px);
// }

// .nb-btn-ghost svg {
//   transition: transform 0.2s ease;
// }

// .nb-btn-ghost:hover svg {
//   transform: translateX(2px);
// }

// .nb-btn-ghost:active {
//   transform: scale(0.95);
// }


// /* SOLID BUTTON (Register) */
// .nb-btn-solid {
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   padding: 7px 16px;
//   border-radius: 10px;
//   font-size: 0.855rem;
//   font-weight: 700;
//   color: #064e3b;
//   background: linear-gradient(135deg, #6ee7b7, #34d399);
//   text-decoration: none;
//   cursor: pointer;
//   border: none;
//   font-family: 'DM Sans', sans-serif;

//   position: relative;
//   overflow: hidden;
//   transition: all 0.25s ease;
// }

// /* glowing pulse */
// .nb-btn-solid::after {
//   content: "";
//   position: absolute;
//   inset: 0;
//   border-radius: inherit;
//   box-shadow: 0 0 0 rgba(52,211,153,0.6);
//   opacity: 0;
//   transition: all 0.3s ease;
// }

// .nb-btn-solid:hover::after {
//   opacity: 1;
//   box-shadow: 0 0 18px rgba(52,211,153,0.6);
// }

// /* shine sweep */
// .nb-btn-solid::before {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: -120%;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(
//     120deg,
//     transparent,
//     rgba(255,255,255,0.35),
//     transparent
//   );
//   transition: all 0.5s ease;
// }

// .nb-btn-solid:hover::before {
//   left: 120%;
// }

// .nb-btn-solid:hover {
//   transform: translateY(-2px) scale(1.04);
//   box-shadow: 0 6px 20px rgba(52,211,153,0.5);
// }

// .nb-btn-solid svg {
//   transition: transform 0.2s ease;
// }

// .nb-btn-solid:hover svg {
//   transform: rotate(10deg) scale(1.1);
// }

// .nb-btn-solid:active {
//   transform: scale(0.95);
// }


// `}</style>

//       <nav className={`nb-root ${scrolled ? 'nb-scrolled' : ''}`}>
//         <div className="nb-inner">

//           <Link to="/" className="nb-logo">
//             <div className="nb-logo-icon">
//               <Home size={18} color="#fff" strokeWidth={2.5} />
//             </div>
//             <span className="nb-logo-text">Nest<em>Find</em></span>
//             <span className="logo-dot" />
//           </Link>

//           <div className="nb-links">
//             {navItems.map((item) => (
//               <Link key={item.path} to={item.path}
//                 className={`nb-link ${isActive(item.path) ? 'nb-active' : ''}`}>
//                 <item.icon size={16} />
//                 <span>{item.label}</span>
//               </Link>
//             ))}
//           </div>

//           <div className="nb-auth">
//             {authItems.map((item) =>
//               item.action ? (
//                 <button key={item.label} onClick={item.action} className="nb-btn-logout">
//                   <item.icon size={16} /><span>{item.label}</span>
//                 </button>
//               ) : item.path === '/register' ? (
//                 <Link key={item.path} to={item.path} className="nb-btn-solid">
//                   <item.icon size={16} /><span>{item.label}</span>
//                 </Link>
//               ) : (
//                 <Link key={item.path} to={item.path} className="nb-btn-ghost">
//                   <item.icon size={16} /><span>{item.label}</span>
//                 </Link>
//               )
//             )}
//           </div>

//           <button className="nb-hamburger" onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>

//         {isOpen && (
//           <div className="nb-mobile">
//             {navItems.map((item) => (
//               <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}
//                 className={`nb-mobile-link ${isActive(item.path) ? 'nb-active' : ''}`}>
//                 <item.icon size={18} /><span>{item.label}</span>
//               </Link>
//             ))}
//             <hr className="nb-mobile-divider" />
//             {authItems.map((item) =>
//               item.action ? (
//                 <button key={item.label} onClick={() => { item.action(); setIsOpen(false); }}
//                   className="nb-mobile-link">
//                   <item.icon size={18} /><span>{item.label}</span>
//                 </button>
//               ) : (
//                 <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}
//                   className={`nb-mobile-link ${isActive(item.path) ? 'nb-active' : ''}`}>
//                   <item.icon size={18} /><span>{item.label}</span>
//                 </Link>
//               )
//             )}
//           </div>
//         )}
//       </nav>
//     </>
//   );
// }

// export default Navbar;


// src/components/Navbar.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import {
//   Home, Plus, Menu, X, Heart, LogIn, UserPlus,
//   LogOut, Shield, BookOpen, Users, MessageSquare, Search
// } from 'lucide-react';
// import AuthContext from '../context/AuthContext';
// import api from '../utils/api';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [unread, setUnread] = useState(0);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logout } = useContext(AuthContext);
//   const role = user?.role;

//   useEffect(() => {
//     const handler = () => setScrolled(window.scrollY > 8);
//     window.addEventListener('scroll', handler);
//     return () => window.removeEventListener('scroll', handler);
//   }, []);

//   // Fetch unread message count for badge
//   useEffect(() => {
//     if (!user) return;
//     const fetchUnread = async () => {
//       try {
//         const res = await api.get('/api/messages/unread-count');
//         setUnread(res.data.count || 0);
//       } catch {}
//     };
//     fetchUnread();
//     const interval = setInterval(fetchUnread, 30000);
//     return () => clearInterval(interval);
//   }, [user]);

//   // Nav items per role
//   const navItems = (() => {
//     const base = [{ path: '/', label: 'Home', icon: Home }];
//     if (!user) return [...base, { path: '/roommates', label: 'Roommates', icon: Users }];
//     if (role === 'user') return [
//       ...base,
//       { path: '/roommates',   label: 'Roommates',   icon: Users },
//       { path: '/favorites',   label: 'Favourites',  icon: Heart },
//       { path: '/messages',    label: 'Messages',    icon: MessageSquare, badge: unread },
//       { path: '/my-bookings', label: 'My Bookings', icon: BookOpen },
//     ];
//     if (role === 'owner') return [
//       ...base,
//       { path: '/add-property', label: 'Add Property', icon: Plus },
//       { path: '/roommates',    label: 'Roommates',    icon: Users },
//       { path: '/messages',     label: 'Messages',     icon: MessageSquare, badge: unread },
//       { path: '/my-bookings',  label: 'Dashboard',    icon: BookOpen },
//     ];
//     if (role === 'admin') return [
//       ...base,
//       { path: '/add-property', label: 'Add Property', icon: Plus },
//       { path: '/roommates',    label: 'Roommates',    icon: Users },
//       { path: '/favorites',    label: 'Favourites',   icon: Heart },
//       { path: '/messages',     label: 'Messages',     icon: MessageSquare, badge: unread },
//       { path: '/my-bookings',  label: 'Dashboard',    icon: BookOpen },
//       { path: '/admin',        label: 'Admin',        icon: Shield },
//     ];
//     return base;
//   })();

//   const roleBadge = { user: { label: 'Seeker', bg: 'rgba(110,231,183,0.2)', color: '#6ee7b7' }, owner: { label: 'Owner', bg: 'rgba(251,191,36,0.2)', color: '#fbbf24' }, admin: { label: 'Admin', bg: 'rgba(251,113,133,0.2)', color: '#f472b6' } }[role];
//   const isActive = p => location.pathname === p;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
//         .nb{font-family:'DM Sans',sans-serif;position:sticky;top:0;z-index:200;background:#064e3b;transition:box-shadow .3s,background .3s;}
//         .nb.scrolled{background:rgba(6,78,59,0.97);box-shadow:0 4px 24px rgba(6,78,59,0.25);backdrop-filter:blur(14px);}
//         .nb-inner{max-width:1280px;margin:0 auto;padding:0 24px;display:flex;justify-content:space-between;align-items:center;height:64px;}
//         .nb-logo{display:flex;align-items:center;gap:9px;text-decoration:none;flex-shrink:0;}
//         .nb-logo-ico{background:linear-gradient(135deg,#6ee7b7,#059669);border-radius:10px;width:36px;height:36px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(52,211,153,0.4);}
//         .nb-logo-txt{font-family:'Syne',sans-serif;font-weight:800;font-size:1.18rem;color:#fff;letter-spacing:-0.5px;}
//         .nb-logo-txt em{font-style:normal;color:#6ee7b7;}
//         .nb-badge{font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:100px;letter-spacing:0.3px;text-transform:uppercase;margin-left:5px;}
//         .nb-links{display:flex;align-items:center;gap:2px;}
//         .nb-link{display:flex;align-items:center;gap:6px;padding:7px 11px;border-radius:9px;font-size:0.845rem;font-weight:500;color:#a7f3d0;text-decoration:none;transition:all .18s;white-space:nowrap;position:relative;}
//         .nb-link:hover{background:rgba(255,255,255,0.1);color:#fff;}
//         .nb-link.active{background:rgba(255,255,255,0.14);color:#fff;font-weight:600;}
//         .nb-link.active svg{color:#6ee7b7;}
//         .nb-dot{position:absolute;top:4px;right:4px;min-width:16px;height:16px;background:#ef4444;border-radius:100px;font-size:0.6rem;font-weight:800;color:#fff;display:flex;align-items:center;justify-content:center;padding:0 4px;border:2px solid #064e3b;}
//         .nb-auth{display:flex;align-items:center;gap:8px;margin-left:10px;padding-left:10px;border-left:1px solid rgba(255,255,255,0.12);flex-shrink:0;}
//         .nb-ghost{display:flex;align-items:center;gap:6px;padding:7px 14px;border-radius:9px;font-size:0.845rem;font-weight:500;color:#d1fae5;border:1.5px solid rgba(255,255,255,0.2);background:transparent;text-decoration:none;cursor:pointer;transition:all .18s;font-family:'DM Sans',sans-serif;}
//         .nb-ghost:hover{background:rgba(255,255,255,0.1);}
//         .nb-solid{display:flex;align-items:center;gap:6px;padding:7px 15px;border-radius:9px;font-size:0.845rem;font-weight:700;color:#064e3b;background:linear-gradient(135deg,#6ee7b7,#34d399);text-decoration:none;cursor:pointer;border:none;transition:all .18s;box-shadow:0 4px 12px rgba(52,211,153,0.35);font-family:'DM Sans',sans-serif;}
//         .nb-solid:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(52,211,153,0.5);}
//         .nb-logout{display:flex;align-items:center;gap:6px;padding:7px 12px;border-radius:9px;font-size:0.845rem;font-weight:500;color:#fca5a5;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);cursor:pointer;transition:all .18s;font-family:'DM Sans',sans-serif;}
//         .nb-logout:hover{background:rgba(239,68,68,0.18);}
//         .nb-ham{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:9px;padding:7px;color:#fff;cursor:pointer;transition:all .18s;display:none;}
//         .nb-ham:hover{background:rgba(255,255,255,0.18);}
//         .nb-mob{background:#054035;border-top:1px solid rgba(255,255,255,0.07);padding:10px 18px 18px;animation:nbSlide .2s ease;}
//         @keyframes nbSlide{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
//         .nb-mob-link{display:flex;align-items:center;gap:10px;padding:10px 13px;border-radius:9px;font-size:0.88rem;font-weight:500;color:#a7f3d0;text-decoration:none;transition:all .18s;margin-bottom:2px;width:100%;border:none;background:transparent;cursor:pointer;font-family:'DM Sans',sans-serif;position:relative;}
//         .nb-mob-link:hover,.nb-mob-link.active{background:rgba(255,255,255,0.08);color:#fff;}
//         .nb-mob-hr{border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;}
//         @media(max-width:900px){.nb-links{display:none!important;}.nb-auth{display:none!important;}.nb-ham{display:flex!important;}}
//         @media(min-width:901px){.nb-ham{display:none!important;}.nb-mob{display:none!important;}}
//       `}</style>

//       <nav className={`nb ${scrolled ? 'scrolled' : ''}`}>
//         <div className="nb-inner">
//           <Link to="/" className="nb-logo">
//             <div className="nb-logo-ico"><Home size={17} color="#fff" strokeWidth={2.5}/></div>
//             <span className="nb-logo-txt">Nest<em>Find</em></span>
//             {roleBadge && <span className="nb-badge" style={{ background: roleBadge.bg, color: roleBadge.color }}>{roleBadge.label}</span>}
//           </Link>

//           <div className="nb-links">
//             {navItems.map(item => (
//               <Link key={item.path} to={item.path} className={`nb-link ${isActive(item.path) ? 'active' : ''}`}>
//                 <item.icon size={15}/>
//                 <span>{item.label}</span>
//                 {item.badge > 0 && <span className="nb-dot">{item.badge > 9 ? '9+' : item.badge}</span>}
//               </Link>
//             ))}
//           </div>

//           <div className="nb-auth">
//             {user ? (
//               <button onClick={() => { logout(); navigate('/login'); }} className="nb-logout">
//                 <LogOut size={15}/> Logout
//               </button>
//             ) : (
//               <>
//                 <Link to="/login" className="nb-ghost"><LogIn size={15}/> Login</Link>
//                 <Link to="/register" className="nb-solid"><UserPlus size={15}/> Register</Link>
//               </>
//             )}
//           </div>

//           <button className="nb-ham" onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <X size={19}/> : <Menu size={19}/>}
//           </button>
//         </div>

//         {isOpen && (
//           <div className="nb-mob">
//             {navItems.map(item => (
//               <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}
//                 className={`nb-mob-link ${isActive(item.path) ? 'active' : ''}`}>
//                 <item.icon size={17}/>{item.label}
//                 {item.badge > 0 && <span style={{ marginLeft: 'auto', background: '#ef4444', color: '#fff', borderRadius: 100, fontSize: '0.65rem', fontWeight: 800, padding: '1px 7px' }}>{item.badge}</span>}
//               </Link>
//             ))}
//             <hr className="nb-mob-hr"/>
//             {user ? (
//               <button onClick={() => { logout(); navigate('/login'); setIsOpen(false); }} className="nb-mob-link">
//                 <LogOut size={17}/> Logout ({user.fullName?.split(' ')[0]})
//               </button>
//             ) : (
//               <>
//                 <Link to="/login" onClick={() => setIsOpen(false)} className="nb-mob-link"><LogIn size={17}/> Login</Link>
//                 <Link to="/register" onClick={() => setIsOpen(false)} className="nb-mob-link"><UserPlus size={17}/> Register</Link>
//               </>
//             )}
//           </div>
//         )}
//       </nav>
//     </>
//   );
// }


// src/components/Navbar.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, Plus, Menu, X, Heart, LogIn, UserPlus,
  LogOut, Shield, BookOpen, Users, MessageSquare, User
} from 'lucide-react';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [unread,   setUnread]   = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const role = user?.role;

  // Scroll shadow
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Unread badge — poll every 30s
  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      try { const r = await api.get('/api/messages/unread-count'); setUnread(r.data.count||0); } catch {}
    };
    fetch();
    const t = setInterval(fetch, 30000);
    return () => clearInterval(t);
  }, [user]);

  // Nav items per role
  const navItems = (() => {
    const home = { path:'/', label:'Home', icon:Home };
    if (!user) return [home, { path:'/roommates', label:'Roommates', icon:Users }];
    if (role==='user') return [
      home,
      { path:'/roommates',   label:'Roommates',   icon:Users },
      { path:'/favorites',   label:'Favourites',  icon:Heart },
      { path:'/messages',    label:'Messages',    icon:MessageSquare, badge:unread },
      { path:'/my-bookings', label:'My Bookings', icon:BookOpen },
    ];
    if (role==='owner') return [
      home,
      { path:'/add-property', label:'Add Property', icon:Plus },
      { path:'/roommates',    label:'Roommates',    icon:Users },
      { path:'/messages',     label:'Messages',     icon:MessageSquare, badge:unread },
      { path:'/my-bookings',  label:'Dashboard',    icon:BookOpen },
    ];
    if (role==='admin') return [
      home,
      { path:'/add-property', label:'Add Property', icon:Plus },
      { path:'/roommates',    label:'Roommates',    icon:Users },
      // { path:'/favorites',    label:'Favourites',   icon:Heart },
      { path:'/messages',     label:'Messages',     icon:MessageSquare, badge:unread },
      { path:'/my-bookings',  label:'Dashboard',    icon:BookOpen },
      { path:'/admin',        label:'Admin',        icon:Shield },
    ];
    return [home];
  })();

  // Role badge config
  const roleBadge = {
    user:  { label:'Seeker', bg:'rgba(110,231,183,0.2)',  color:'#6ee7b7'  },
    owner: { label:'Owner',  bg:'rgba(251,191,36,0.2)',   color:'#fbbf24'  },
    admin: { label:'Admin',  bg:'rgba(251,113,133,0.2)',  color:'#f472b6'  },
  }[role];

  // First name for greeting
  const firstName = user?.fullName?.split(' ')[0] || user?.name?.split(' ')[0] || '';

  const initials =
  (user?.fullName || '')
    .trim()
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?';

  const isActive = p => location.pathname === p;

  const handleLogout = () => { logout(); navigate('/login'); setIsOpen(false); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

        .nb { font-family:'DM Sans',sans-serif; position:sticky; top:0; z-index:200;
          background:#064e3b; transition:box-shadow .3s, background .3s; }
        .nb.sc { background:rgba(6,78,59,0.97); box-shadow:0 4px 24px rgba(6,78,59,0.25); backdrop-filter:blur(14px); }

        .nb-inner { max-width:1280px; margin:0 auto; padding:0 24px;
          display:flex; justify-content:space-between; align-items:center; height:64px; }

        /* Logo */
        .nb-logo { display:flex; align-items:center; gap:9px; text-decoration:none; flex-shrink:0; }
        .nb-logo-ico { background:linear-gradient(135deg,#6ee7b7,#059669); border-radius:10px;
          width:36px; height:36px; display:flex; align-items:center; justify-content:center;
          box-shadow:0 4px 12px rgba(52,211,153,0.4); }
        .nb-logo-txt { font-family:'Syne',sans-serif; font-weight:800; font-size:1.18rem; color:#fff; letter-spacing:-0.5px; }
        .nb-logo-txt em { font-style:normal; color:#6ee7b7; }
        .nb-role-badge { font-size:0.65rem; font-weight:700; padding:2px 8px; border-radius:100px;
          letter-spacing:0.3px; text-transform:uppercase; margin-left:4px; }

        /* Nav links */
        .nb-links { display:flex; align-items:center; gap:2px; }
        .nb-link { display:flex; align-items:center; gap:6px; padding:7px 11px; border-radius:9px;
          font-size:0.84rem; font-weight:500; color:#a7f3d0; text-decoration:none;
          transition:all .18s; white-space:nowrap; position:relative; }
        .nb-link:hover { background:rgba(255,255,255,0.1); color:#fff; }
        .nb-link.act { background:rgba(255,255,255,0.14); color:#fff; font-weight:600; }
        .nb-link.act svg { color:#6ee7b7; }
        .nb-badge { position:absolute; top:3px; right:3px; min-width:16px; height:16px;
          background:#ef4444; border-radius:100px; font-size:0.6rem; font-weight:800;
          color:#fff; display:flex; align-items:center; justify-content:center;
          padding:0 4px; border:2px solid #064e3b; }

        /* Auth section */
        .nb-auth { display:flex; align-items:center; gap:8px; margin-left:10px;
          padding-left:10px; border-left:1px solid rgba(255,255,255,0.12); flex-shrink:0; }

        /* User info pill (shows name + avatar before logout) */
        .nb-user-pill { display:flex; align-items:center; gap:8px;
          background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.14);
          border-radius:100px; padding:4px 12px 4px 5px; }
        .nb-user-avatar { width:28px; height:28px; border-radius:50%;
          background:linear-gradient(135deg,#6ee7b7,#34d399);
          display:flex; align-items:center; justify-content:center;
          font-family:'Syne',sans-serif; font-size:0.72rem; font-weight:800;
          color:#064e3b; flex-shrink:0; }
        .nb-user-name { font-size:0.82rem; font-weight:600; color:#d1fae5; max-width:100px;
          white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

        .nb-logout { display:flex; align-items:center; gap:6px; padding:7px 12px;
          border-radius:9px; font-size:0.84rem; font-weight:500; color:#fca5a5;
          background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.2);
          cursor:pointer; transition:all .18s; font-family:'DM Sans',sans-serif; }
        .nb-logout:hover { background:rgba(239,68,68,0.2); }

        .nb-ghost { display:flex; align-items:center; gap:6px; padding:7px 14px; border-radius:9px;
          font-size:0.84rem; font-weight:500; color:#d1fae5; border:1.5px solid rgba(255,255,255,0.2);
          background:transparent; text-decoration:none; cursor:pointer; transition:all .18s;
          font-family:'DM Sans',sans-serif; }
        .nb-ghost:hover { background:rgba(255,255,255,0.1); }

        .nb-solid { display:flex; align-items:center; gap:6px; padding:7px 16px; border-radius:9px;
          font-size:0.84rem; font-weight:700; color:#064e3b;
          background:linear-gradient(135deg,#6ee7b7,#34d399);
          text-decoration:none; cursor:pointer; border:none; transition:all .18s;
          box-shadow:0 4px 12px rgba(52,211,153,0.35); font-family:'DM Sans',sans-serif; }
        .nb-solid:hover { transform:translateY(-1px); box-shadow:0 6px 18px rgba(52,211,153,0.5); }

        /* Hamburger */
        .nb-ham { background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2);
          border-radius:9px; padding:7px; color:#fff; cursor:pointer; transition:all .18s;
          display:none; }
        .nb-ham:hover { background:rgba(255,255,255,0.18); }

        /* Mobile menu */
        .nb-mob { background:#054035; border-top:1px solid rgba(255,255,255,0.07);
          padding:10px 18px 18px; animation:nbSlide .2s ease; }
        @keyframes nbSlide { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }

        .nb-mob-user { display:flex; align-items:center; gap:10px; padding:12px 14px;
          background:rgba(255,255,255,0.06); border-radius:10px; margin-bottom:8px; }
        .nb-mob-avatar { width:34px; height:34px; border-radius:50%;
          background:linear-gradient(135deg,#6ee7b7,#34d399);
          display:flex; align-items:center; justify-content:center;
          font-family:'Syne',sans-serif; font-size:0.8rem; font-weight:800; color:#064e3b; }
        .nb-mob-name { font-size:0.875rem; font-weight:600; color:#fff; }
        .nb-mob-role { font-size:0.72rem; color:#6ee7b7; font-weight:500; }

        .nb-mob-link { display:flex; align-items:center; gap:10px; padding:10px 13px;
          border-radius:9px; font-size:0.88rem; font-weight:500; color:#a7f3d0;
          text-decoration:none; transition:all .18s; margin-bottom:2px;
          width:100%; border:none; background:transparent; cursor:pointer;
          font-family:'DM Sans',sans-serif; position:relative; }
        .nb-mob-link:hover, .nb-mob-link.act { background:rgba(255,255,255,0.08); color:#fff; }
        .nb-mob-hr { border:none; border-top:1px solid rgba(255,255,255,0.08); margin:8px 0; }

        @media(max-width:940px) {
          .nb-links { display:none!important; }
          .nb-auth  { display:none!important; }
          .nb-ham   { display:flex!important; }
        }
        @media(min-width:941px) {
          .nb-ham { display:none!important; }
          .nb-mob { display:none!important; }
        }
      `}</style>

      <nav className={`nb ${scrolled?'sc':''}`}>
        <div className="nb-inner">

          {/* Logo */}
          <Link to="/" className="nb-logo">
            <div className="nb-logo-ico"><Home size={17} color="#fff" strokeWidth={2.5}/></div>
            <span className="nb-logo-txt">Nest<em>Find</em></span>
            {roleBadge && (
              <span className="nb-role-badge" style={{ background:roleBadge.bg, color:roleBadge.color }}>
                {roleBadge.label}
              </span>
            )}
          </Link>

          {/* Desktop nav links */}
          <div className="nb-links">
            {navItems.map(item => (
              <Link key={item.path} to={item.path}
                className={`nb-link ${isActive(item.path)?'act':''}`}>
                <item.icon size={15}/>
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span className="nb-badge">{item.badge > 9 ? '9+' : item.badge}</span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          

          <div className="nb-auth">
  {user ? (
    <div style={{ display:'flex', alignItems:'center', gap:10 }}>

      <Link
        to="/profile"
        style={{
          display:'flex',
          alignItems:'center',
          gap:8,
          background:'rgba(255,255,255,0.1)',
          border:'1px solid rgba(255,255,255,0.18)',
          borderRadius:100,
          padding:'5px 13px 5px 6px',
          textDecoration:'none'
        }}
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.fullName}
            style={{
              width:28,
              height:28,
              borderRadius:'50%',
              objectFit:'cover'
            }}
          />
        ) : (
          <div
            style={{
              width:28,
              height:28,
              borderRadius:'50%',
              background:'linear-gradient(135deg,#34d399,#059669)',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              fontSize:'.7rem',
              fontWeight:800,
              color:'#fff'
            }}
          >
            {initials}
          </div>
        )}

        <span style={{
          fontSize:'.82rem',
          fontWeight:600,
          color:'#d1fae5',
          maxWidth:100,
          overflow:'hidden',
          textOverflow:'ellipsis',
          whiteSpace:'nowrap'
        }}>
          {firstName || 'Account'}
        </span>
      </Link>

      <button
        onClick={handleLogout}
        style={{
          background:'rgba(255,255,255,0.08)',
          border:'1px solid rgba(255,255,255,0.15)',
          borderRadius:9,
          padding:'6px 13px',
          fontSize:'.82rem',
          fontWeight:600,
          color:'#a7f3d0',
          cursor:'pointer'
        }}
      >
        Logout
      </button>

    </div>
  ) : (
    <>
      <Link to="/login" className="nb-ghost">
        <LogIn size={15}/> Login
      </Link>
      <Link to="/register" className="nb-solid">
        <UserPlus size={15}/> Register
      </Link>
    </>
  )}
</div>

          {/* Hamburger */}
          <button className="nb-ham" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={19}/> : <Menu size={19}/>}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="nb-mob">

            {/* User info block at top of mobile menu */}
            {user && (
              <div className="nb-mob-user">
                <div className="nb-mob-avatar">{firstName.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="nb-mob-name">{user.fullName || user.name || firstName}</div>
                  <div className="nb-mob-role">{roleBadge?.label || 'User'}</div>
                </div>
              </div>
            )}

            {navItems.map(item => (
              <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}
                className={`nb-mob-link ${isActive(item.path)?'act':''}`}>
                <item.icon size={17}/> {item.label}
                {item.badge > 0 && (
                  <span style={{ marginLeft:'auto', background:'#ef4444', color:'#fff', borderRadius:100, fontSize:'0.62rem', fontWeight:800, padding:'1px 7px' }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}

            <hr className="nb-mob-hr"/>

            {user ? (
              <button onClick={handleLogout} className="nb-mob-link" style={{ color:'#fca5a5' }}>
                <LogOut size={17}/> Logout
              </button>
            ) : (
              <>
                <Link to="/login"    onClick={() => setIsOpen(false)} className="nb-mob-link"><LogIn    size={17}/> Login</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="nb-mob-link"><UserPlus size={17}/> Register</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}