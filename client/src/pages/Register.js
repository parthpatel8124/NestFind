// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../utils/api';
// import Alert from '../components/Alert';
// import { User, Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react';

// function Register() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     role: 'user',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
//       setError('Please fill in all required fields');
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);
//     try {
//       await api.post('/api/auth/register', {
//         fullName: formData.fullName,
//         email: formData.email,
//         phone: formData.phone,
//         password: formData.password,
//         role: formData.role,
//       });

//       navigate('/login');
//     } catch (error) {
//       setError(error.response?.data?.message || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center px-4 py-8">
//       <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
//         <p className="text-gray-600 mb-6">Join us to find your dream property</p>

//         {error && <Alert type="error" message={error} onClose={() => setError('')} />}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Full Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Full Name
//             </label>
//             <div className="relative">
//               <User size={18} className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 placeholder="John Doe"
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="you@example.com"
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Phone Number (Optional)
//             </label>
//             <div className="relative">
//               <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="+1 (555) 123-4567"
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Role */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Role
//             </label>
//             <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//               <option value="user">User</option>
//               <option value="owner">Owner</option>
//             </select>
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
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
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

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-semibold"
//           >
//             {loading ? 'Creating Account...' : 'Create Account'}
//           </button>
//         </form>

//         {/* Login Link */}
//         <p className="text-center text-gray-600 mt-4">
//           Already have an account?{' '}
//           <Link to="/login" className="text-blue-600 hover:underline font-semibold">
//             Sign in here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;


// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../utils/api';
// import Alert from '../components/Alert';
// import { User, Mail, Lock, Eye, EyeOff, Phone, ArrowRight, Home, CheckCircle } from 'lucide-react';

// function Register() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     role: 'user',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
//       setError('Please fill in all required fields');
//       return;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);
//     try {
//       await api.post('/api/auth/register', {
//         fullName: formData.fullName,
//         email: formData.email,
//         phone: formData.phone,
//         password: formData.password,
//         role: formData.role,
//       });
//       navigate('/login');
//     } catch (error) {
//       setError(error.response?.data?.message || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const perks = [
//     'Zero broker fees, always',
//     '100% verified listings',
//     'Direct contact with owners',
//     'Gender-preference filters',
//   ];

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
//         * { box-sizing: border-box; }

//         .rg-root {
//           font-family: 'DM Sans', sans-serif;
//           min-height: 100vh;
//           display: flex;
//           background: #f0faf4;
//         }

//         /* ── Left panel ── */
//         .rg-left {
//           display: none;
//           width: 42%;
//           background: linear-gradient(160deg, #064e3b 0%, #065f46 60%, #047857 100%);
//           position: relative;
//           overflow: hidden;
//           padding: 48px 44px;
//           flex-direction: column;
//           justify-content: space-between;
//         }
//         @media (min-width: 900px) {
//           .rg-left { display: flex; }
//           .rg-right { width: 58% !important; }
//         }

//         .rg-grid {
//           position: absolute; inset: 0;
//           background-image:
//             linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
//           background-size: 40px 40px; pointer-events: none;
//         }
//         .rg-blob1 {
//           position: absolute; width: 360px; height: 360px;
//           background: radial-gradient(circle, rgba(110,231,183,0.2), transparent 65%);
//           bottom: -60px; right: -60px; border-radius: 50%; pointer-events: none;
//         }
//         .rg-blob2 {
//           position: absolute; width: 200px; height: 200px;
//           background: radial-gradient(circle, rgba(52,211,153,0.15), transparent 65%);
//           top: 80px; left: -40px; border-radius: 50%; pointer-events: none;
//         }

//         .rg-brand {
//           position: relative; z-index: 2;
//           display: flex; align-items: center; gap: 10px; text-decoration: none;
//         }
//         .rg-brand-icon {
//           background: linear-gradient(135deg, #6ee7b7, #059669);
//           border-radius: 11px; width: 40px; height: 40px;
//           display: flex; align-items: center; justify-content: center;
//           box-shadow: 0 4px 14px rgba(52,211,153,0.4);
//         }
//         .rg-brand-name {
//           font-family: 'Syne', sans-serif;
//           font-weight: 800; font-size: 1.3rem;
//           color: #fff; letter-spacing: -0.5px;
//         }
//         .rg-brand-name em { font-style: normal; color: #6ee7b7; }

//         .rg-left-body { position: relative; z-index: 2; }
//         .rg-left-title {
//           font-family: 'Syne', sans-serif;
//           font-size: 2rem; font-weight: 800;
//           line-height: 1.18; letter-spacing: -1px;
//           color: #fff; margin-bottom: 12px;
//         }
//         .rg-left-title em {
//           font-style: normal;
//           background: linear-gradient(90deg, #6ee7b7, #34d399);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }
//         .rg-left-sub {
//           color: #a7f3d0; font-size: 0.92rem;
//           line-height: 1.65; margin-bottom: 28px;
//         }
//         .rg-perks { display: flex; flex-direction: column; gap: 11px; }
//         .rg-perk {
//           display: flex; align-items: center; gap: 10px;
//           font-size: 0.875rem; color: #d1fae5;
//         }
//         .rg-perk-icon {
//           width: 22px; height: 22px;
//           background: rgba(52,211,153,0.18);
//           border-radius: 50%;
//           display: flex; align-items: center; justify-content: center;
//           flex-shrink: 0;
//         }

//         .rg-left-footer {
//           position: relative; z-index: 2;
//           font-size: 0.78rem; color: #6ee7b7; opacity: 0.7;
//         }

//         /* ── Right panel ── */
//         .rg-right {
//           width: 100%;
//           display: flex; align-items: flex-start; justify-content: center;
//           padding: 40px 24px;
//           background: #f0faf4;
//           overflow-y: auto;
//         }

//         .rg-card {
//           width: 100%; max-width: 460px;
//           background: #fff;
//           border-radius: 24px;
//           padding: 36px 34px;
//           box-shadow:
//             0 4px 6px rgba(0,0,0,0.04),
//             0 20px 40px rgba(5,150,105,0.1);
//           border: 1.5px solid #d1fae5;
//           animation: rgEntrance 0.45s cubic-bezier(0.34,1.56,0.64,1) both;
//         }
//         @keyframes rgEntrance {
//           from { opacity: 0; transform: translateY(20px) scale(0.97); }
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }

//         /* Mobile brand */
//         .rg-mobile-brand {
//           display: flex; align-items: center; gap: 9px; margin-bottom: 24px;
//         }
//         @media (min-width: 900px) { .rg-mobile-brand { display: none; } }
//         .rg-mob-icon {
//           background: linear-gradient(135deg, #6ee7b7, #059669);
//           border-radius: 9px; width: 32px; height: 32px;
//           display: flex; align-items: center; justify-content: center;
//         }
//         .rg-mob-name {
//           font-family: 'Syne', sans-serif;
//           font-weight: 800; font-size: 1.1rem;
//           color: #064e3b; letter-spacing: -0.3px;
//         }
//         .rg-mob-name em { font-style: normal; color: #059669; }

//         .rg-heading {
//           font-family: 'Syne', sans-serif;
//           font-size: 1.75rem; font-weight: 800;
//           letter-spacing: -0.8px; color: #0f2d1a;
//           margin-bottom: 4px; line-height: 1.15;
//         }
//         .rg-subtext { color: #6b7280; font-size: 0.88rem; margin-bottom: 24px; }

//         /* Two-column grid for fields */
//         .rg-grid-form {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 14px;
//         }
//         .rg-full { grid-column: 1 / -1; }

//         .rg-field { margin-bottom: 0; }
//         .rg-label {
//           display: block;
//           font-size: 0.78rem; font-weight: 600;
//           color: #6b7280; margin-bottom: 6px;
//           text-transform: uppercase; letter-spacing: 0.3px;
//         }
//         .rg-input-wrap { position: relative; }
//         .rg-input-icon {
//           position: absolute; left: 13px; top: 50%;
//           transform: translateY(-50%); color: #9ca3af;
//           pointer-events: none; transition: color 0.2s;
//         }
//         .rg-input {
//           width: 100%;
//           background: #f9fafb;
//           border: 1.5px solid #e5e7eb;
//           border-radius: 11px;
//           padding: 11px 13px 11px 40px;
//           font-size: 0.9rem;
//           font-family: 'DM Sans', sans-serif;
//           color: #0f2d1a; outline: none;
//           transition: all 0.2s ease;
//         }
//         .rg-input::placeholder { color: #9ca3af; }
//         .rg-input:focus {
//           border-color: #34d399;
//           background: #f0fdf4;
//           box-shadow: 0 0 0 3px rgba(52,211,153,0.15);
//         }
//         .rg-eye {
//           position: absolute; right: 12px; top: 50%;
//           transform: translateY(-50%);
//           background: none; border: none;
//           color: #9ca3af; cursor: pointer; padding: 2px;
//           transition: color 0.2s;
//         }
//         .rg-eye:hover { color: #059669; }

//         /* Role toggle pills */
//         .rg-role-wrap {
//           display: flex; gap: 10px;
//         }
//         .rg-role-btn {
//           flex: 1; padding: 10px 12px;
//           border-radius: 11px;
//           font-size: 0.875rem; font-weight: 600;
//           border: 1.5px solid #e5e7eb;
//           background: #f9fafb; color: #6b7280;
//           cursor: pointer; transition: all 0.18s ease;
//           font-family: 'DM Sans', sans-serif;
//           text-align: center;
//         }
//         .rg-role-btn.rg-role-active {
//           background: #ecfdf5;
//           border-color: #34d399;
//           color: #059669;
//           box-shadow: 0 0 0 3px rgba(52,211,153,0.12);
//         }

//         .rg-select {
//           width: 100%;
//           background: #f9fafb;
//           border: 1.5px solid #e5e7eb;
//           border-radius: 11px;
//           padding: 11px 32px 11px 13px;
//           font-size: 0.9rem;
//           font-family: 'DM Sans', sans-serif;
//           color: #0f2d1a; outline: none; cursor: pointer;
//           transition: all 0.2s; appearance: none;
//           background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
//           background-repeat: no-repeat;
//           background-position: right 12px center;
//         }
//         .rg-select:focus {
//           border-color: #34d399;
//           background-color: #f0fdf4;
//           box-shadow: 0 0 0 3px rgba(52,211,153,0.15);
//         }

//         .rg-submit {
//           width: 100%; margin-top: 20px;
//           background: linear-gradient(135deg, #059669, #047857);
//           color: #fff;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 0.97rem; font-weight: 700;
//           padding: 13px 24px;
//           border-radius: 12px; border: none; cursor: pointer;
//           display: flex; align-items: center;
//           justify-content: center; gap: 8px;
//           transition: all 0.2s ease;
//           box-shadow: 0 6px 20px rgba(5,150,105,0.3);
//         }
//         .rg-submit:hover:not(:disabled) {
//           background: linear-gradient(135deg, #047857, #065f46);
//           box-shadow: 0 8px 28px rgba(5,150,105,0.42);
//           transform: translateY(-1px);
//         }
//         .rg-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
//         .rg-spinner {
//           width: 17px; height: 17px;
//           border: 2px solid rgba(255,255,255,0.3);
//           border-top-color: #fff;
//           border-radius: 50%;
//           animation: rgSpin 0.7s linear infinite;
//         }
//         @keyframes rgSpin { to { transform: rotate(360deg); } }

//         .rg-divider {
//           display: flex; align-items: center; gap: 12px; margin: 18px 0 0;
//         }
//         .rg-div-line { flex: 1; height: 1px; background: #e5e7eb; }
//         .rg-div-text { font-size: 0.78rem; color: #9ca3af; font-weight: 500; }

//         .rg-login-row {
//           text-align: center; margin-top: 16px;
//           font-size: 0.875rem; color: #6b7280;
//         }
//         .rg-login-link {
//           color: #059669; font-weight: 700;
//           text-decoration: none; transition: color 0.2s;
//         }
//         .rg-login-link:hover { color: #047857; }

//         /* ===== INTERACTIVITY ONLY (REGISTER PAGE) ===== */

// /* Input feel */
// .rg-input {
//   caret-color: #059669;
// }

// /* Press feedback */
// .rg-input:active {
//   transform: scale(0.995);
// }

// .rg-submit:active {
//   transform: scale(0.97);
// }

// .rg-eye:active {
//   transform: scale(0.9);
// }

// /* Focus micro animation */
// .rg-input:focus,
// .rg-select:focus {
//   animation: rgFocusPop 0.2s ease;
// }

// @keyframes rgFocusPop {
//   0% { transform: scale(1); }
//   50% { transform: scale(1.01); }
//   100% { transform: scale(1); }
// }

// /* Role button click feel */
// .rg-role-btn:active {
//   transform: scale(0.96);
// }

// /* Slight hover feedback (no visual change) */
// .rg-role-btn:hover {
//   transform: translateY(-1px);
// }

// /* Button ripple effect */
// .rg-submit {
//   position: relative;
//   overflow: hidden;
// }

// .rg-submit::after {
//   content: "";
//   position: absolute;
//   width: 120%;
//   height: 120%;
//   top: 50%;
//   left: 50%;
//   background: rgba(255,255,255,0.15);
//   transform: translate(-50%, -50%) scale(0);
//   border-radius: 50%;
//   opacity: 0;
//   transition: transform 0.4s ease, opacity 0.4s ease;
// }

// .rg-submit:active::after {
//   transform: translate(-50%, -50%) scale(1);
//   opacity: 1;
// }

// /* Label reacts on focus */
// .rg-field:focus-within .rg-label {
//   color: #059669;
// }

// /* Link click feel */
// .rg-login-link:active {
//   opacity: 0.7;
// }

// /* Smooth interactions */
// .rg-card,
// .rg-input,
// .rg-submit,
// .rg-role-btn,
// .rg-select {
//   transition: all 0.18s ease;
// }
//       `}</style>

//       <div className="rg-root">

//         {/* Left panel */}
//         <div className="rg-left">
//           <div className="rg-grid" />
//           <div className="rg-blob1" />
//           <div className="rg-blob2" />

//           <div className="rg-brand">
//             <div className="rg-brand-icon">
//               <Home size={19} color="#fff" strokeWidth={2.5} />
//             </div>
//             <span className="rg-brand-name">Nest<em>Find</em></span>
//           </div>

//           <div className="rg-left-body">
//             <h2 className="rg-left-title">
//               Start your<br />
//               <em>home search</em><br />
//               today
//             </h2>
//             <p className="rg-left-sub">
//               Join thousands of students and freshers finding the perfect PG, flat or room with zero hassle.
//             </p>
//             <div className="rg-perks">
//               {perks.map((p, i) => (
//                 <div key={i} className="rg-perk">
//                   <div className="rg-perk-icon">
//                     <CheckCircle size={13} color="#34d399" />
//                   </div>
//                   {p}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="rg-left-footer">© 2025 NestFind · Built for students</div>
//         </div>

//         {/* Right panel */}
//         <div className="rg-right">
//           <div className="rg-card">

//             <div className="rg-mobile-brand">
//               <div className="rg-mob-icon">
//                 <Home size={16} color="#fff" strokeWidth={2.5} />
//               </div>
//               <span className="rg-mob-name">Nest<em>Find</em></span>
//             </div>

//             <h1 className="rg-heading">Create account ✨</h1>
//             <p className="rg-subtext">Find your next home in minutes</p>

//             {error && <Alert type="error" message={error} onClose={() => setError('')} />}

//             <form onSubmit={handleSubmit}>
//               <div className="rg-grid-form">

//                 {/* Full Name */}
//                 <div className="rg-field rg-full">
//                   <label className="rg-label">Full Name</label>
//                   <div className="rg-input-wrap">
//                     <User size={16} className="rg-input-icon" />
//                     <input type="text" name="fullName" value={formData.fullName}
//                       onChange={handleChange} placeholder="John Doe" className="rg-input" />
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div className="rg-field rg-full">
//                   <label className="rg-label">Email Address</label>
//                   <div className="rg-input-wrap">
//                     <Mail size={16} className="rg-input-icon" />
//                     <input type="email" name="email" value={formData.email}
//                       onChange={handleChange} placeholder="you@example.com" className="rg-input" />
//                   </div>
//                 </div>

//                 {/* Phone */}
//                 <div className="rg-field rg-full">
//                   <label className="rg-label">Phone <span style={{ color: '#9ca3af', fontWeight: 400 }}>(optional)</span></label>
//                   <div className="rg-input-wrap">
//                     <Phone size={16} className="rg-input-icon" />
//                     <input type="tel" name="phone" value={formData.phone}
//                       onChange={handleChange} placeholder="+91 98765 43210" className="rg-input" />
//                   </div>
//                 </div>

//                 {/* Role toggle */}
//                 <div className="rg-field rg-full">
//                   <label className="rg-label">I am a</label>
//                   <div className="rg-role-wrap">
//                     <button type="button"
//                       className={`rg-role-btn ${formData.role === 'user' ? 'rg-role-active' : ''}`}
//                       onClick={() => setFormData(p => ({ ...p, role: 'user' }))}>
//                       🔍 Looking for a place
//                     </button>
//                     <button type="button"
//                       className={`rg-role-btn ${formData.role === 'owner' ? 'rg-role-active' : ''}`}
//                       onClick={() => setFormData(p => ({ ...p, role: 'owner' }))}>
//                       🏠 Property Owner
//                     </button>
//                   </div>
//                   {/* hidden select to keep original name/value for form submit */}
//                   <select name="role" value={formData.role} onChange={handleChange}
//                     style={{ display: 'none' }}>
//                     <option value="user">User</option>
//                     <option value="owner">Owner</option>
//                   </select>
//                 </div>

//                 {/* Password */}
//                 <div className="rg-field">
//                   <label className="rg-label">Password</label>
//                   <div className="rg-input-wrap">
//                     <Lock size={16} className="rg-input-icon" />
//                     <input type={showPassword ? 'text' : 'password'}
//                       name="password" value={formData.password}
//                       onChange={handleChange} placeholder="••••••••"
//                       className="rg-input" style={{ paddingRight: '40px' }} />
//                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="rg-eye">
//                       {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Confirm Password */}
//                 <div className="rg-field">
//                   <label className="rg-label">Confirm</label>
//                   <div className="rg-input-wrap">
//                     <Lock size={16} className="rg-input-icon" />
//                     <input type={showPassword ? 'text' : 'password'}
//                       name="confirmPassword" value={formData.confirmPassword}
//                       onChange={handleChange} placeholder="••••••••" className="rg-input" />
//                   </div>
//                 </div>

//               </div>

//               <button type="submit" disabled={loading} className="rg-submit">
//                 {loading
//                   ? <><div className="rg-spinner" /> Creating account…</>
//                   : <>Create Account <ArrowRight size={16} /></>
//                 }
//               </button>
//             </form>

//             <div className="rg-divider">
//               <div className="rg-div-line" />
//               <span className="rg-div-text">already a member?</span>
//               <div className="rg-div-line" />
//             </div>

//             <p className="rg-login-row">
//               Already have an account?{' '}
//               <Link to="/login" className="rg-login-link">Sign in →</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Register;

// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import Alert from '../components/Alert';
import { User, Mail, Lock, Eye, EyeOff, Phone, ArrowRight, Home, CheckCircle, Search, Building2 } from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '', role: 'user' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setError('');
    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) return setError('Please fill all required fields');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      await api.post('/api/auth/register', { fullName: form.fullName, email: form.email, phone: form.phone, password: form.password, role: form.role });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  const seekerFeats = ['Browse verified PG, Flat & Rooms', 'Save favourites', 'Book properties directly', 'Chat with owners', 'Find roommates'];
  const ownerFeats  = ['List your properties', 'Manage booking requests', 'Chat with tenants', 'Track your analytics', 'Owner dashboard'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;}
        .rg{font-family:'DM Sans',sans-serif;min-height:100vh;display:flex;background:#f0faf4;}
        .rg-left{display:none;width:40%;background:linear-gradient(160deg,#064e3b 0%,#065f46 60%,#047857 100%);position:relative;overflow:hidden;padding:44px 40px;flex-direction:column;justify-content:space-between;}
        @media(min-width:900px){.rg-left{display:flex;}.rg-right{width:60%!important;}}
        .rg-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px);background-size:40px 40px;pointer-events:none;}
        .rg-blob{position:absolute;border-radius:50%;pointer-events:none;}
        .rg-brand{position:relative;z-index:2;display:flex;align-items:center;gap:9px;text-decoration:none;}
        .rg-brand-ico{background:linear-gradient(135deg,#6ee7b7,#059669);border-radius:10px;width:38px;height:38px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(52,211,153,0.4);}
        .rg-brand-nm{font-family:'Syne',sans-serif;font-weight:800;font-size:1.25rem;color:#fff;letter-spacing:-0.5px;}
        .rg-brand-nm em{font-style:normal;color:#6ee7b7;}
        .rg-ltitle{font-family:'Syne',sans-serif;font-size:1.9rem;font-weight:800;line-height:1.18;letter-spacing:-1px;color:#fff;margin-bottom:12px;}
        .rg-ltitle em{font-style:normal;background:linear-gradient(90deg,#6ee7b7,#34d399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .rg-lsub{color:#a7f3d0;font-size:0.9rem;line-height:1.65;margin-bottom:26px;}
        .rg-perks{display:flex;flex-direction:column;gap:10px;}
        .rg-perk{display:flex;align-items:center;gap:10px;font-size:0.875rem;color:#d1fae5;}
        .rg-perk-ico{width:22px;height:22px;background:rgba(52,211,153,0.18);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .rg-lfooter{position:relative;z-index:2;font-size:0.75rem;color:#6ee7b7;opacity:.7;}
        .rg-right{width:100%;display:flex;align-items:flex-start;justify-content:center;padding:36px 24px;overflow-y:auto;}
        .rg-card{width:100%;max-width:500px;background:#fff;border-radius:22px;padding:34px 30px;box-shadow:0 4px 6px rgba(0,0,0,0.04),0 20px 40px rgba(5,150,105,0.1);border:1.5px solid #d1fae5;animation:rgIn .45s cubic-bezier(.34,1.56,.64,1) both;}
        @keyframes rgIn{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        .rg-mob-brand{display:flex;align-items:center;gap:8px;margin-bottom:20px;}
        @media(min-width:900px){.rg-mob-brand{display:none;}}
        .rg-mob-ico{background:linear-gradient(135deg,#6ee7b7,#059669);border-radius:8px;width:30px;height:30px;display:flex;align-items:center;justify-content:center;}
        .rg-mob-nm{font-family:'Syne',sans-serif;font-weight:800;font-size:1.05rem;color:#064e3b;}
        .rg-mob-nm em{font-style:normal;color:#059669;}
        .rg-heading{font-family:'Syne',sans-serif;font-size:1.65rem;font-weight:800;letter-spacing:-.8px;color:#0f2d1a;margin-bottom:3px;}
        .rg-sub{color:#6b7280;font-size:0.85rem;margin-bottom:22px;}
        .rg-rl{font-size:0.74rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.4px;margin-bottom:9px;}
        .rg-role-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;}
        .rg-rc{border:2px solid #e5e7eb;border-radius:13px;padding:13px 13px 11px;cursor:pointer;transition:all .2s;background:#f9fafb;}
        .rg-rc:hover{border-color:#a7f3d0;background:#f0fdf4;}
        .rg-rc.sel{border-color:#34d399;background:#ecfdf5;box-shadow:0 0 0 3px rgba(52,211,153,0.12);}
        .rg-rc-icon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;margin-bottom:7px;}
        .rg-rc-title{font-family:'Syne',sans-serif;font-size:0.9rem;font-weight:800;color:#0f2d1a;margin-bottom:2px;}
        .rg-rc-desc{font-size:0.72rem;color:#6b7280;line-height:1.35;margin-bottom:7px;}
        .rg-rc-feat{font-size:0.7rem;display:flex;align-items:center;gap:4px;color:#9ca3af;margin-top:3px;}
        .rg-rc-feat.on{color:#065f46;}
        .rg-fgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .rg-full{grid-column:1/-1;}
        .rg-field{display:flex;flex-direction:column;gap:5px;}
        .rg-lbl{font-size:0.73rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.3px;}
        .rg-iw{position:relative;}
        .rg-iico{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#9ca3af;pointer-events:none;}
        .rg-inp{width:100%;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:10px;padding:10px 12px 10px 38px;font-size:0.875rem;font-family:'DM Sans',sans-serif;color:#0f2d1a;outline:none;transition:all .18s;}
        .rg-inp::placeholder{color:#9ca3af;}
        .rg-inp:focus{border-color:#34d399;background:#f0fdf4;box-shadow:0 0 0 3px rgba(52,211,153,0.12);}
        .rg-eye{position:absolute;right:11px;top:50%;transform:translateY(-50%);background:none;border:none;color:#9ca3af;cursor:pointer;padding:2px;transition:color .18s;}
        .rg-eye:hover{color:#059669;}
        .rg-submit{width:100%;background:linear-gradient(135deg,#059669,#047857);color:#fff;font-family:'DM Sans',sans-serif;font-size:0.95rem;font-weight:700;padding:13px 24px;border-radius:11px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .2s;margin-top:20px;box-shadow:0 6px 18px rgba(5,150,105,0.28);}
        .rg-submit:hover:not(:disabled){box-shadow:0 8px 26px rgba(5,150,105,0.42);transform:translateY(-1px);}
        .rg-submit:disabled{opacity:.6;cursor:not-allowed;transform:none;}
        .rg-spin{width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:rgSpn .7s linear infinite;}
        @keyframes rgSpn{to{transform:rotate(360deg);}}
        .rg-login{text-align:center;margin-top:18px;font-size:0.855rem;color:#6b7280;}
        .rg-login a{color:#059669;font-weight:700;text-decoration:none;}
        .rg-login a:hover{color:#047857;}
      `}</style>

      <div className="rg">
        <div className="rg-left">
          <div className="rg-grid"/>
          <div className="rg-blob" style={{ width:360,height:360,background:'radial-gradient(circle,rgba(110,231,183,0.2),transparent 65%)',bottom:-60,right:-60 }}/>
          <div className="rg-blob" style={{ width:200,height:200,background:'radial-gradient(circle,rgba(52,211,153,0.15),transparent 65%)',top:80,left:-40 }}/>
          <div className="rg-brand" style={{ position:'relative',zIndex:2 }}>
            <div className="rg-brand-ico"><Home size={18} color="#fff" strokeWidth={2.5}/></div>
            <span className="rg-brand-nm">Nest<em>Find</em></span>
          </div>
          <div style={{ position:'relative',zIndex:2 }}>
            <h2 className="rg-ltitle">Find your<br/><em>perfect home</em><br/>stress-free</h2>
            <p className="rg-lsub">Join thousands of students and freshers finding verified PGs and flats with zero broker fees.</p>
            <div className="rg-perks">
              {['Zero broker fees, always','100% verified listings','Direct chat with owners','Safe gender-preference filters'].map((p,i)=>(
                <div key={i} className="rg-perk"><div className="rg-perk-ico"><CheckCircle size={12} color="#34d399"/></div>{p}</div>
              ))}
            </div>
          </div>
          <div className="rg-lfooter">© 2025 NestFind · Built for students</div>
        </div>

        <div className="rg-right">
          <div className="rg-card">
            <div className="rg-mob-brand">
              <div className="rg-mob-ico"><Home size={15} color="#fff" strokeWidth={2.5}/></div>
              <span className="rg-mob-nm">Nest<em>Find</em></span>
            </div>

            <h1 className="rg-heading">Create account ✨</h1>
            <p className="rg-sub">Tell us who you are — we'll personalise your experience</p>

            {error && <Alert type="error" message={error} onClose={() => setError('')}/>}

            <form onSubmit={submit}>
              <div className="rg-rl">I am a…</div>
              <div className="rg-role-grid">
                {/* Seeker */}
                <div className={`rg-rc ${form.role==='user'?'sel':''}`} onClick={()=>setForm(p=>({...p,role:'user'}))}>
                  <div className="rg-rc-icon" style={{background:form.role==='user'?'#d1fae5':'#f3f4f6'}}>
                    <Search size={17} color={form.role==='user'?'#059669':'#9ca3af'}/>
                  </div>
                  <div className="rg-rc-title">Property Seeker</div>
                  <div className="rg-rc-desc">Looking for PG, flat or room</div>
                  {seekerFeats.slice(0,3).map((f,i)=>(
                    <div key={i} className={`rg-rc-feat ${form.role==='user'?'on':''}`}><CheckCircle size={10}/>{f}</div>
                  ))}
                </div>
                {/* Owner */}
                <div className={`rg-rc ${form.role==='owner'?'sel':''}`} onClick={()=>setForm(p=>({...p,role:'owner'}))}>
                  <div className="rg-rc-icon" style={{background:form.role==='owner'?'#fef9c3':'#f3f4f6'}}>
                    <Building2 size={17} color={form.role==='owner'?'#d97706':'#9ca3af'}/>
                  </div>
                  <div className="rg-rc-title">Property Owner</div>
                  <div className="rg-rc-desc">I own and want to list property</div>
                  {ownerFeats.slice(0,3).map((f,i)=>(
                    <div key={i} className={`rg-rc-feat ${form.role==='owner'?'on':''}`}><CheckCircle size={10}/>{f}</div>
                  ))}
                </div>
              </div>

              <div className="rg-fgrid">
                <div className="rg-field rg-full">
                  <label className="rg-lbl">Full Name</label>
                  <div className="rg-iw"><User size={15} className="rg-iico"/><input type="text" name="fullName" value={form.fullName} onChange={handle} placeholder="John Doe" className="rg-inp"/></div>
                </div>
                <div className="rg-field rg-full">
                  <label className="rg-lbl">Email Address</label>
                  <div className="rg-iw"><Mail size={15} className="rg-iico"/><input type="email" name="email" value={form.email} onChange={handle} placeholder="you@example.com" className="rg-inp"/></div>
                </div>
                <div className="rg-field rg-full">
                  <label className="rg-lbl">Phone <span style={{color:'#9ca3af',fontWeight:400,textTransform:'none'}}>(optional)</span></label>
                  <div className="rg-iw"><Phone size={15} className="rg-iico"/><input type="tel" name="phone" value={form.phone} onChange={handle} placeholder="+91 98765 43210" className="rg-inp"/></div>
                </div>
                <div className="rg-field">
                  <label className="rg-lbl">Password</label>
                  <div className="rg-iw"><Lock size={15} className="rg-iico"/><input type={showPass?'text':'password'} name="password" value={form.password} onChange={handle} placeholder="••••••••" className="rg-inp" style={{paddingRight:38}}/><button type="button" onClick={()=>setShowPass(!showPass)} className="rg-eye">{showPass?<EyeOff size={15}/>:<Eye size={15}/>}</button></div>
                </div>
                <div className="rg-field">
                  <label className="rg-lbl">Confirm</label>
                  <div className="rg-iw"><Lock size={15} className="rg-iico"/><input type={showPass?'text':'password'} name="confirmPassword" value={form.confirmPassword} onChange={handle} placeholder="••••••••" className="rg-inp"/></div>
                </div>
              </div>

              <button type="submit" disabled={loading} className="rg-submit">
                {loading ? <><div className="rg-spin"/> Creating account…</> : <>Create Account <ArrowRight size={15}/></>}
              </button>
            </form>

            <p className="rg-login">Already have an account? <Link to="/login">Sign in →</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}