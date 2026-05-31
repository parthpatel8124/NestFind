// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../utils/api';
// import { useContext } from 'react';
// import AuthContext from '../context/AuthContext';
// import { setAuthToken } from '../utils/api';
// import Alert from '../components/Alert';
// import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (!email || !password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await api.post('/api/auth/login', {
//         email,
//         password,
//       });

//       // persist via context
//       login(response.data.token, response.data.user);
//       navigate('/');
//     } catch (error) {
//       console.error('[login] error:', error);
//       // Show full server message when available for debugging
//       const serverMsg = error.response?.data?.message || (error.response?.data ? JSON.stringify(error.response.data) : null);
//       setError(serverMsg || error.message || 'Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center px-4">
//       <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
//         <p className="text-gray-600 mb-6">Sign in to your account</p>

//         {error && <Alert type="error" message={error} onClose={() => setError('')} />}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
//           >
//             {loading ? 'Signing in...' : 'Sign In'}
//           </button>
//         </form>

//         {/* Register Link */}
//         <p className="text-center text-gray-600 mt-4">
//           Don't have an account?{' '}
//           <Link to="/register" className="text-blue-600 hover:underline font-semibold">
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;


// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../utils/api';
// import { useContext } from 'react';
// import AuthContext from '../context/AuthContext';
// import { setAuthToken } from '../utils/api';
// import Alert from '../components/Alert';
// import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!email || !password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await api.post('/api/auth/login', { email, password });
//       login(response.data.token, response.data.user);
//       navigate('/');
//     } catch (error) {
//       console.error('[login] error:', error);
//       const serverMsg = error.response?.data?.message || (error.response?.data ? JSON.stringify(error.response.data) : null);
//       setError(serverMsg || error.message || 'Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

//         .login-root {
//           font-family: 'DM Sans', sans-serif;
//           min-height: 100vh;
//           background: #060f09;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 24px;
//           position: relative;
//           overflow: hidden;
//         }

//         /* Animated blobs */
//         .blob {
//           position: absolute;
//           border-radius: 50%;
//           filter: blur(80px);
//           opacity: 0.25;
//           animation: blobFloat 8s ease-in-out infinite;
//         }
//         .blob-1 {
//           width: 420px; height: 420px;
//           background: radial-gradient(circle, #34d399, #059669);
//           top: -80px; left: -100px;
//           animation-delay: 0s;
//         }
//         .blob-2 {
//           width: 320px; height: 320px;
//           background: radial-gradient(circle, #6ee7b7, #10b981);
//           bottom: -60px; right: -80px;
//           animation-delay: -3s;
//         }
//         .blob-3 {
//           width: 200px; height: 200px;
//           background: radial-gradient(circle, #a7f3d0, #34d399);
//           top: 50%; left: 50%;
//           transform: translate(-50%, -50%);
//           animation-delay: -6s;
//           opacity: 0.1;
//         }
//         @keyframes blobFloat {
//           0%, 100% { transform: translateY(0) scale(1); }
//           33% { transform: translateY(-20px) scale(1.05); }
//           66% { transform: translateY(10px) scale(0.97); }
//         }

//         /* Grid overlay */
//         .grid-overlay {
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(52,211,153,0.04) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(52,211,153,0.04) 1px, transparent 1px);
//           background-size: 40px 40px;
//           pointer-events: none;
//         }

//         .login-card {
//           position: relative;
//           z-index: 2;
//           background: rgba(15, 30, 20, 0.8);
//           backdrop-filter: blur(24px);
//           -webkit-backdrop-filter: blur(24px);
//           border: 1px solid rgba(52, 211, 153, 0.18);
//           border-radius: 24px;
//           padding: 40px 36px;
//           width: 100%;
//           max-width: 440px;
//           box-shadow:
//             0 0 0 1px rgba(52,211,153,0.06),
//             0 24px 60px rgba(0,0,0,0.5),
//             inset 0 1px 0 rgba(52,211,153,0.1);
//           animation: cardEntrance 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
//         }
//         @keyframes cardEntrance {
//           from { opacity: 0; transform: translateY(24px) scale(0.96); }
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }

//         .badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           background: rgba(52,211,153,0.12);
//           border: 1px solid rgba(52,211,153,0.25);
//           border-radius: 100px;
//           padding: 4px 12px;
//           font-size: 0.75rem;
//           font-weight: 600;
//           color: #34d399;
//           letter-spacing: 0.5px;
//           text-transform: uppercase;
//           margin-bottom: 16px;
//         }

//         .login-title {
//           font-family: 'Syne', sans-serif;
//           font-size: 2.1rem;
//           font-weight: 800;
//           color: #fff;
//           line-height: 1.1;
//           margin-bottom: 6px;
//           letter-spacing: -1px;
//         }
//         .login-title span {
//           background: linear-gradient(90deg, #34d399, #6ee7b7);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }
//         .login-sub {
//           color: #6b7280;
//           font-size: 0.9rem;
//           margin-bottom: 28px;
//         }

//         .form-group {
//           margin-bottom: 18px;
//         }
//         .form-label {
//           display: block;
//           font-size: 0.82rem;
//           font-weight: 600;
//           color: #9ca3af;
//           margin-bottom: 8px;
//           letter-spacing: 0.3px;
//           text-transform: uppercase;
//         }
//         .input-wrap {
//           position: relative;
//         }
//         .input-icon {
//           position: absolute;
//           left: 14px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #4b5563;
//           pointer-events: none;
//           transition: color 0.2s;
//         }
//         .form-input {
//           width: 100%;
//           background: rgba(255,255,255,0.04);
//           border: 1.5px solid rgba(255,255,255,0.08);
//           border-radius: 14px;
//           padding: 13px 14px 13px 42px;
//           font-size: 0.93rem;
//           font-family: 'DM Sans', sans-serif;
//           color: #fff;
//           transition: all 0.2s ease;
//           outline: none;
//           box-sizing: border-box;
//         }
//         .form-input::placeholder { color: #4b5563; }
//         .form-input:focus {
//           border-color: #34d399;
//           background: rgba(52,211,153,0.05);
//           box-shadow: 0 0 0 3px rgba(52,211,153,0.12);
//         }
//         .form-input:focus + .focus-label,
//         .input-wrap:focus-within .input-icon {
//           color: #34d399;
//         }
//         .eye-btn {
//           position: absolute;
//           right: 14px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           color: #4b5563;
//           cursor: pointer;
//           padding: 2px;
//           transition: color 0.2s;
//         }
//         .eye-btn:hover { color: #34d399; }

//         .submit-btn {
//           width: 100%;
//           background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
//           color: #0a2e1a;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 0.97rem;
//           font-weight: 700;
//           padding: 14px 24px;
//           border-radius: 14px;
//           border: none;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 8px;
//           transition: all 0.2s ease;
//           margin-top: 24px;
//           box-shadow: 0 8px 24px rgba(52,211,153,0.3);
//           letter-spacing: 0.3px;
//         }
//         .submit-btn:hover:not(:disabled) {
//           background: linear-gradient(135deg, #6ee7b7 0%, #34d399 100%);
//           box-shadow: 0 12px 32px rgba(52,211,153,0.45);
//           transform: translateY(-2px);
//         }
//         .submit-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//           transform: none;
//         }
//         .submit-btn .spinner {
//           width: 18px; height: 18px;
//           border: 2px solid rgba(10,46,26,0.3);
//           border-top-color: #0a2e1a;
//           border-radius: 50%;
//           animation: spin 0.7s linear infinite;
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }

//         .divider {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           margin: 24px 0 0;
//         }
//         .divider-line {
//           flex: 1;
//           height: 1px;
//           background: rgba(255,255,255,0.07);
//         }
//         .divider-text {
//           font-size: 0.78rem;
//           color: #4b5563;
//           font-weight: 500;
//         }

//         .register-link-wrap {
//           text-align: center;
//           margin-top: 20px;
//           font-size: 0.88rem;
//           color: #6b7280;
//         }
//         .register-link {
//           color: #34d399;
//           font-weight: 600;
//           text-decoration: none;
//           transition: color 0.2s;
//         }
//         .register-link:hover { color: #6ee7b7; }
//       `}</style>

//       <div className="login-root">
//         {/* Background effects */}
//         <div className="blob blob-1" />
//         <div className="blob blob-2" />
//         <div className="blob blob-3" />
//         <div className="grid-overlay" />

//         <div className="login-card">
//           <div className="badge">
//             <Sparkles size={11} />
//             NestFind
//           </div>

//           <h1 className="login-title">
//             Welcome<br /><span>back! 👋</span>
//           </h1>
//           <p className="login-sub">Sign in to find your perfect PG or flat</p>

//           {error && <Alert type="error" message={error} onClose={() => setError('')} />}

//           <form onSubmit={handleSubmit}>
//             {/* Email */}
//             <div className="form-group">
//               <label className="form-label">Email Address</label>
//               <div className="input-wrap">
//                 <Mail size={17} className="input-icon" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="you@example.com"
//                   className="form-input"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="form-group">
//               <label className="form-label">Password</label>
//               <div className="input-wrap">
//                 <Lock size={17} className="input-icon" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="form-input"
//                   style={{ paddingRight: '44px' }}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="eye-btn"
//                 >
//                   {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
//                 </button>
//               </div>
//             </div>

//             <button type="submit" disabled={loading} className="submit-btn">
//               {loading ? (
//                 <><div className="spinner" /> Signing in...</>
//               ) : (
//                 <>Sign In <ArrowRight size={17} /></>
//               )}
//             </button>
//           </form>

//           <div className="divider">
//             <div className="divider-line" />
//             <span className="divider-text">new here?</span>
//             <div className="divider-line" />
//           </div>

//           <p className="register-link-wrap">
//             Don't have an account?{' '}
//             <Link to="/register" className="register-link">Create one free →</Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { setAuthToken } from '../utils/api';
import Alert from '../components/Alert';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Home } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    try {
      const response = await api.post('/api/auth/login', { email, password });
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (error) {
      console.error('[login] error:', error);
      const serverMsg = error.response?.data?.message || (error.response?.data ? JSON.stringify(error.response.data) : null);
      setError(serverMsg || error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }

        .lg-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          background: #f0faf4;
        }

        /* ── Left panel ── */
        .lg-left {
          display: none;
          width: 45%;
          background: linear-gradient(160deg, #064e3b 0%, #065f46 60%, #047857 100%);
          position: relative;
          overflow: hidden;
          padding: 48px 44px;
          flex-direction: column;
          justify-content: space-between;
        }
        @media (min-width: 900px) {
          .lg-left { display: flex; }
          .lg-right { width: 55% !important; }
        }

        .lg-left-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .lg-left-blob {
          position: absolute;
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(110,231,183,0.22), transparent 65%);
          bottom: -80px; right: -60px;
          border-radius: 50%; pointer-events: none;
        }
        .lg-left-blob2 {
          position: absolute;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(52,211,153,0.15), transparent 65%);
          top: 60px; left: -40px;
          border-radius: 50%; pointer-events: none;
        }

        .lg-brand {
          position: relative; z-index: 2;
          display: flex; align-items: center; gap: 10px;
        }
        .lg-brand-icon {
          background: linear-gradient(135deg, #6ee7b7, #059669);
          border-radius: 11px;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(52,211,153,0.4);
        }
        .lg-brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 1.3rem;
          color: #fff; letter-spacing: -0.5px;
        }
        .lg-brand-name em { font-style: normal; color: #6ee7b7; }

        .lg-left-content {
          position: relative; z-index: 2;
        }
        .lg-left-title {
          font-family: 'Syne', sans-serif;
          font-size: 2.2rem; font-weight: 800;
          line-height: 1.15; letter-spacing: -1px;
          color: #fff; margin-bottom: 14px;
        }
        .lg-left-title em {
          font-style: normal;
          background: linear-gradient(90deg, #6ee7b7, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .lg-left-sub {
          color: #a7f3d0; font-size: 0.95rem;
          line-height: 1.65; margin-bottom: 32px;
        }

        .lg-feature-list {
          display: flex; flex-direction: column; gap: 12px;
          list-style: none; padding: 0; margin: 0;
        }
        .lg-feature-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.875rem; color: #d1fae5;
        }
        .lg-feature-dot {
          width: 8px; height: 8px;
          background: #34d399; border-radius: 50%; flex-shrink: 0;
        }

        .lg-left-footer {
          position: relative; z-index: 2;
          font-size: 0.78rem; color: #6ee7b7; opacity: 0.7;
        }

        /* ── Right panel ── */
        .lg-right {
          width: 100%;
          display: flex; align-items: center; justify-content: center;
          padding: 40px 24px;
          background: #f0faf4;
        }

        .lg-card {
          width: 100%; max-width: 420px;
          background: #fff;
          border-radius: 24px;
          padding: 40px 36px;
          box-shadow:
            0 4px 6px rgba(0,0,0,0.04),
            0 20px 40px rgba(5,150,105,0.1);
          border: 1.5px solid #d1fae5;
          animation: lgEntrance 0.45s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes lgEntrance {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Mobile brand */
        .lg-mobile-brand {
          display: flex; align-items: center; gap: 9px;
          margin-bottom: 28px;
        }
        @media (min-width: 900px) {
          .lg-mobile-brand { display: none; }
        }
        .lg-mobile-brand-icon {
          background: linear-gradient(135deg, #6ee7b7, #059669);
          border-radius: 9px;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
        }
        .lg-mobile-brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 1.1rem;
          color: #064e3b; letter-spacing: -0.3px;
        }
        .lg-mobile-brand-name em { font-style: normal; color: #059669; }

        .lg-greeting {
          font-family: 'Syne', sans-serif;
          font-size: 1.85rem; font-weight: 800;
          letter-spacing: -0.8px; color: #0f2d1a;
          margin-bottom: 4px;
          line-height: 1.15;
        }
        .lg-subtext {
          color: #6b7280; font-size: 0.9rem;
          margin-bottom: 28px;
        }

        .lg-label {
          display: block;
          font-size: 0.8rem; font-weight: 600;
          color: #6b7280; margin-bottom: 7px;
          text-transform: uppercase; letter-spacing: 0.3px;
        }
        .lg-field { margin-bottom: 18px; }
        .lg-input-wrap { position: relative; }
        .lg-input-icon {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%); color: #9ca3af;
          pointer-events: none; transition: color 0.2s;
        }
        .lg-input {
          width: 100%;
          background: #f9fafb;
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          padding: 13px 14px 13px 42px;
          font-size: 0.93rem;
          font-family: 'DM Sans', sans-serif;
          color: #0f2d1a; outline: none;
          transition: all 0.2s ease;
        }
        .lg-input::placeholder { color: #9ca3af; }
        .lg-input:focus {
          border-color: #34d399;
          background: #f0fdf4;
          box-shadow: 0 0 0 3px rgba(52,211,153,0.15);
        }
        .lg-input:focus ~ .lg-input-icon { color: #059669; }
        .lg-eye {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          color: #9ca3af; cursor: pointer; padding: 2px;
          transition: color 0.2s;
        }
        .lg-eye:hover { color: #059669; }

        .lg-submit {
          width: 100%;
          background: linear-gradient(135deg, #059669, #047857);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.97rem; font-weight: 700;
          padding: 14px 24px;
          border-radius: 12px; border: none; cursor: pointer;
          display: flex; align-items: center;
          justify-content: center; gap: 8px;
          transition: all 0.2s ease; margin-top: 24px;
          box-shadow: 0 6px 20px rgba(5,150,105,0.3);
          letter-spacing: 0.2px;
        }
        .lg-submit:hover:not(:disabled) {
          background: linear-gradient(135deg, #047857, #065f46);
          box-shadow: 0 8px 28px rgba(5,150,105,0.42);
          transform: translateY(-1px);
        }
        .lg-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .lg-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: lgSpin 0.7s linear infinite;
        }
        @keyframes lgSpin { to { transform: rotate(360deg); } }

        .lg-divider {
          display: flex; align-items: center; gap: 12px;
          margin: 22px 0 0;
        }
        .lg-div-line { flex: 1; height: 1px; background: #e5e7eb; }
        .lg-div-text { font-size: 0.78rem; color: #9ca3af; font-weight: 500; }

        .lg-register-row {
          text-align: center; margin-top: 18px;
          font-size: 0.875rem; color: #6b7280;
        }
        .lg-register-link {
          color: #059669; font-weight: 700;
          text-decoration: none; transition: color 0.2s;
        }
        .lg-register-link:hover { color: #047857; }

        /* ===== REAL INTERACTIVITY (NO UI CHANGE) ===== */

/* 1. Input typing feel */
.lg-input {
  caret-color: #059669;
}

/* 2. Press feedback (very natural) */
.lg-input:active {
  transform: scale(0.995);
}

.lg-submit:active {
  transform: scale(0.97);
}

.lg-eye:active {
  transform: scale(0.9);
}

/* 3. Focus highlight ripple feel */
.lg-input:focus {
  animation: lgFocusPop 0.2s ease;
}

@keyframes lgFocusPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.01); }
  100% { transform: scale(1); }
}

/* 4. Button click ripple (like real apps) */
.lg-submit {
  position: relative;
  overflow: hidden;
}

.lg-submit::after {
  content: "";
  position: absolute;
  width: 120%;
  height: 120%;
  top: 50%;
  left: 50%;
  background: rgba(255,255,255,0.15);
  transform: translate(-50%, -50%) scale(0);
  border-radius: 50%;
  opacity: 0;
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.lg-submit:active::after {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

/* 5. Field active state */
.lg-field:focus-within .lg-label {
  color: #059669;
}

/* 6. Cursor feedback */
.lg-submit,
.lg-eye,
.lg-register-link {
  cursor: pointer;
}

/* 7. Smooth everything (global feel improvement) */
.lg-card,
.lg-input,
.lg-submit,
.lg-eye {
  will-change: transform;
}

/* 8. Subtle hover intent (no visible change, just smoothness) */
.lg-submit,
.lg-input,
.lg-eye {
  transition: all 0.18s ease;
}
      `}</style>

      <div className="lg-root">

        {/* Left decorative panel */}
        <div className="lg-left">
          <div className="lg-left-grid" />
          <div className="lg-left-blob" />
          <div className="lg-left-blob2" />

          <div className="lg-brand">
            <div className="lg-brand-icon">
              <Home size={19} color="#fff" strokeWidth={2.5} />
            </div>
            <span className="lg-brand-name">Nest<em>Find</em></span>
          </div>

          <div className="lg-left-content">
            <h2 className="lg-left-title">
              Your next home<br />
              is just a<br />
              <em>search away</em>
            </h2>
            <p className="lg-left-sub">
              Thousands of verified PGs, flats and rooms for students and freshers across India.
            </p>
            <ul className="lg-feature-list">
              <li className="lg-feature-item"><span className="lg-feature-dot" />Zero broker fees, always</li>
              <li className="lg-feature-item"><span className="lg-feature-dot" />100% verified listings</li>
              <li className="lg-feature-item"><span className="lg-feature-dot" />Direct contact with owners</li>
              <li className="lg-feature-item"><span className="lg-feature-dot" />Safe & gender-preference filters</li>
            </ul>
          </div>

          <div className="lg-left-footer">© 2025 NestFind · Built for students</div>
        </div>

        {/* Right form panel */}
        <div className="lg-right">
          <div className="lg-card">

            {/* Mobile brand */}
            <div className="lg-mobile-brand">
              <div className="lg-mobile-brand-icon">
                <Home size={16} color="#fff" strokeWidth={2.5} />
              </div>
              <span className="lg-mobile-brand-name">Nest<em>Find</em></span>
            </div>

            <h1 className="lg-greeting">Welcome back 👋</h1>
            <p className="lg-subtext">Sign in to continue finding your perfect place</p>

            {error && <Alert type="error" message={error} onClose={() => setError('')} />}

            <form onSubmit={handleSubmit}>
              <div className="lg-field">
                <label className="lg-label">Email Address</label>
                <div className="lg-input-wrap">
                  <Mail size={17} className="lg-input-icon" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="lg-input"
                  />
                </div>
              </div>

              <div className="lg-field">
                <label className="lg-label">Password</label>
                <div className="lg-input-wrap">
                  <Lock size={17} className="lg-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="lg-input"
                    style={{ paddingRight: '44px' }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="lg-eye">
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="lg-submit">
                {loading
                  ? <><div className="lg-spinner" /> Signing in…</>
                  : <>Sign In <ArrowRight size={16} /></>
                }
              </button>
            </form>

            <div className="lg-divider">
              <div className="lg-div-line" />
              <span className="lg-div-text">new here?</span>
              <div className="lg-div-line" />
            </div>

            <p className="lg-register-row">
              Don't have an account?{' '}
              <Link to="/register" className="lg-register-link">Create one free →</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;