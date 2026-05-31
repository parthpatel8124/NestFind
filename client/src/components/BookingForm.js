// import React, { useState } from 'react';
// import api from '../utils/api';

// function BookingForm({ propertyId, onClose }) {

//   const [form, setForm] = useState({
//     name: '',
//     phone: '',
//     userType: 'Student',
//     startDate: '',
//     endDate: ''
//   });

//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setForm(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async () => {
//     try {

//       // 🔥 CHECK CONFLICT FIRST
//       const check = await api.post('/api/bookings/check', {
//         propertyId,
//         startDate: form.startDate,
//         endDate: form.endDate
//       });

//       if (check.data.conflict) {
//         return setError("Already booked for selected dates");
//       }

//       // 🔥 CREATE BOOKING
//       await api.post('/api/bookings', {
//         ...form,
//         propertyId
//       });

//       alert("Booking successful");
//       onClose();

//     } catch {
//       setError("Booking failed");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

//       <div className="bg-white p-6 rounded w-[400px] space-y-3">

//         <h2 className="text-lg font-bold">Book Property</h2>

//         {error && <p className="text-red-500">{error}</p>}

//         <input name="name" placeholder="Name" onChange={handleChange} className="w-full border p-2"/>
//         <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full border p-2"/>

//         <select name="userType" onChange={handleChange} className="w-full border p-2">
//           <option>Student</option>
//           <option>Employee</option>
//         </select>

//         <input type="date" name="startDate" onChange={handleChange} className="w-full border p-2"/>
//         <input type="date" name="endDate" onChange={handleChange} className="w-full border p-2"/>

//         <div className="flex gap-2">
//           <button onClick={handleSubmit} className="bg-blue-600 text-white px-3 py-1 rounded">
//             Book
//           </button>
//           <button onClick={onClose} className="bg-gray-300 px-3 py-1 rounded">
//             Cancel
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default BookingForm;

// import React, { useState } from "react";
// import api from "../utils/api";

// function BookingForm({ propertyId, onClose }) {
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     userType: "Student",
//     startDate: "",
//     endDate: ""
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       if (!form.startDate || !form.endDate) {
//         setLoading(false);
//         return setError("Please select dates");
//       }

//       if (form.endDate < form.startDate) {
//         setLoading(false);
//         return setError("End date must be after start date");
//       }

//       const check = await api.post("/api/bookings/check", {
//         propertyId,
//         startDate: form.startDate,
//         endDate: form.endDate
//       });

//       if (check.data.conflict) {
//         setLoading(false);
//         return setError("Already booked for selected dates");
//       }

//       await api.post("/api/bookings", {
//         ...form,
//         propertyId
//       });

//       alert("Booking successful");
//       onClose();
//     } catch {
//       setError("Booking failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bk-overlay">
//       <div className="bk-modal">

//         <div className="bk-header">
//           <h2>Book Your Stay</h2>
//           <button onClick={onClose} className="bk-close">×</button>
//         </div>

//         {error && <p className="bk-error">{error}</p>}

//         {/* Name */}
//         <div className="bk-field">
//           <label>Name</label>
//           <input
//             name="name"
//             placeholder="Enter your name"
//             onChange={handleChange}
//             className="bk-input"
//           />
//         </div>

//         {/* Phone */}
//         <div className="bk-field">
//           <label>Phone</label>
//           <input
//             name="phone"
//             placeholder="Enter phone number"
//             onChange={handleChange}
//             className="bk-input"
//           />
//         </div>

//         {/* Role Toggle */}
//         <div className="bk-field">
//           <label>I am a</label>
//           <div className="bk-role-wrap">
//             {["Student", "Employee"].map((role) => (
//               <button
//                 key={role}
//                 type="button"
//                 className={`bk-role-btn ${
//                   form.userType === role ? "active" : ""
//                 }`}
//                 onClick={() =>
//                   setForm((prev) => ({ ...prev, userType: role }))
//                 }
//               >
//                 {role}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Date Range */}
//         <div className="bk-field">
//           <label>Stay Duration</label>
//           <div className="bk-date-wrap">
//             <div className="bk-date-box">
//               <span>Start</span>
//               <input
//                 type="date"
//                 name="startDate"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="bk-date-sep">→</div>

//             <div className="bk-date-box">
//               <span>End</span>
//               <input
//                 type="date"
//                 name="endDate"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="bk-actions">
//           <button onClick={handleSubmit} className="bk-submit" disabled={loading}>
//             {loading ? <span className="bk-spinner" /> : "Confirm Booking"}
//           </button>

//           <button onClick={onClose} className="bk-cancel">
//             Cancel
//           </button>
//         </div>

//       </div>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

//         .bk-overlay {
//           position: fixed;
//           inset: 0;
//           background: rgba(0,0,0,0.45);
//           backdrop-filter: blur(5px);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 50;
//         }

//         .bk-modal {
//           width: 100%;
//           max-width: 460px;
//           background: #fff;
//           border-radius: 22px;
//           padding: 26px;
//           border: 1.5px solid #d1fae5;
//           box-shadow: 0 20px 40px rgba(5,150,105,0.15);
//           font-family: 'DM Sans', sans-serif;
//           animation: fadeIn 0.3s ease;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .bk-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 14px;
//         }

//         .bk-header h2 {
//           font-family: 'Syne', sans-serif;
//           font-size: 1.4rem;
//           font-weight: 800;
//           color: #0f2d1a;
//         }

//         .bk-close {
//           background: none;
//           border: none;
//           font-size: 1.4rem;
//           cursor: pointer;
//           color: #6b7280;
//         }

//         .bk-error {
//           color: #ef4444;
//           font-size: 0.85rem;
//           margin-bottom: 10px;
//         }

//         .bk-field {
//           margin-bottom: 14px;
//         }

//         .bk-field label {
//           font-size: 0.78rem;
//           font-weight: 600;
//           color: #6b7280;
//           display: block;
//           margin-bottom: 5px;
//         }

//        /* ✅ Restore your original soft theme inputs */
// .bk-input {
//   width: 100%;
//   padding: 11px 13px;
//   border-radius: 11px;
//   border: 1.5px solid #e5e7eb;
//   background: #f9fafb;
//   font-size: 0.9rem;
//   color: #0f2d1a; /* your original soft dark green, NOT black */
//   outline: none;
//   transition: all 0.2s ease;
// }

// .bk-input::placeholder {
//   color: #9ca3af;
// }

// .bk-input:focus {
//   border-color: #34d399;
//   background: #f0fdf4;
//   box-shadow: 0 0 0 3px rgba(52,211,153,0.15);
// }

//         /* Role buttons */
//         .bk-role-wrap {
//           display: flex;
//           gap: 10px;
//         }

//         .bk-role-btn {
//           flex: 1;
//           padding: 10px;
//           border-radius: 10px;
//           border: 1.5px solid #e5e7eb;
//           background: #f9fafb;
//           cursor: pointer;
//           transition: 0.2s;
//         }

//         .bk-role-btn.active {
//           background: #ecfdf5;
//           border-color: #34d399;
//           color: #059669;
//           box-shadow: 0 0 0 3px rgba(52,211,153,0.1);
//         }

//         /* Date */
//         .bk-date-wrap {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }

//         .bk-date-box {
//   flex: 1;
//   background: #f9fafb;
//   border: 1.5px solid #e5e7eb;
//   border-radius: 11px;
//   padding: 8px 10px;
//   transition: all 0.2s ease;
// }

// .bk-date-box:focus-within {
//   border-color: #34d399;
//   background: #f0fdf4;
//   box-shadow: 0 0 0 3px rgba(52,211,153,0.15);
// }

// .bk-date-box input {
//   border: none;
//   outline: none;
//   width: 100%;
//   background: transparent;
//   color: #0f2d1a; /* match input */
// }

//         .bk-date-box span {
//           font-size: 0.7rem;
//           color: #6b7280;
//         }

        
//         .bk-date-sep {
//           font-size: 1.2rem;
//           color: #9ca3af;
//         }

//         /* Buttons */
//         .bk-actions {
//           display: flex;
//           gap: 10px;
//           margin-top: 16px;
//         }

//         .bk-submit {
//           flex: 1;
//           background: linear-gradient(135deg, #059669, #047857);
//           color: white;
//           border: none;
//           padding: 11px;
//           border-radius: 10px;
//           cursor: pointer;
//           font-weight: 600;
//         }

//         .bk-submit:hover {
//           transform: translateY(-1px);
//         }

//         .bk-submit:active {
//           transform: scale(0.96);
//         }

//         .bk-cancel {
//           flex: 1;
//           background: #f3f4f6;
//           border: none;
//           border-radius: 10px;
//           cursor: pointer;
//         }

//         .bk-spinner {
//           width: 16px;
//           height: 16px;
//           border: 2px solid rgba(255,255,255,0.3);
//           border-top-color: white;
//           border-radius: 50%;
//           animation: spin 0.7s linear infinite;
//         }

//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default BookingForm;


// import React, { useState } from 'react';
// import api from '../utils/api';
// import { X, User, Phone, CalendarDays, ArrowRight, GraduationCap, Briefcase, CheckCircle } from 'lucide-react';

// function BookingForm({ propertyId, onClose }) {
//   const [form, setForm] = useState({
//     name: '',
//     phone: '',
//     userType: 'Student',
//     startDate: '',
//     endDate: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async () => {
//     setError('');
//     if (!form.name || !form.phone || !form.startDate || !form.endDate) {
//       return setError('Please fill in all fields');
//     }
//     setLoading(true);
//     try {
//       const check = await api.post('/api/bookings/check', {
//         propertyId,
//         startDate: form.startDate,
//         endDate: form.endDate
//       });
//       if (check.data.conflict) {
//         setLoading(false);
//         return setError('Already booked for selected dates');
//       }
//       await api.post('/api/bookings', { ...form, propertyId });
//       alert('Booking successful! 🎉');
//       onClose();
//     } catch {
//       setError('Booking failed. Please try again.');
//     } finally { setLoading(false); }
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
//         * { box-sizing: border-box; }

//         .bf-overlay {
//           position: fixed; inset: 0;
//           background: rgba(6, 78, 59, 0.45);
//           backdrop-filter: blur(6px);
//           display: flex; align-items: center; justify-content: center;
//           z-index: 1000; padding: 20px;
//           animation: bfFadeIn 0.2s ease;
//         }
//         @keyframes bfFadeIn { from { opacity:0; } to { opacity:1; } }

//         .bf-modal {
//           font-family: 'DM Sans', sans-serif;
//           background: #fff;
//           border-radius: 22px;
//           width: 100%; max-width: 420px;
//           border: 1.5px solid #d1fae5;
//           box-shadow: 0 24px 60px rgba(6,78,59,0.2), 0 8px 24px rgba(0,0,0,0.1);
//           overflow: hidden;
//           animation: bfSlide 0.3s cubic-bezier(0.34,1.56,0.64,1);
//         }
//         @keyframes bfSlide {
//           from { opacity:0; transform:translateY(24px) scale(0.95); }
//           to { opacity:1; transform:translateY(0) scale(1); }
//         }

//         /* Modal header */
//         .bf-header {
//           background: linear-gradient(135deg, #064e3b, #065f46);
//           padding: 20px 22px;
//           display: flex; align-items: center; justify-content: space-between;
//           position: relative; overflow: hidden;
//         }
//         .bf-header::before {
//           content: ''; position: absolute; inset: 0;
//           background-image:
//             linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
//           background-size: 28px 28px; pointer-events: none;
//         }
//         .bf-header-left { position: relative; z-index: 1; }
//         .bf-header-title {
//           font-family: 'Syne', sans-serif;
//           font-size: 1.15rem; font-weight: 800;
//           color: #fff; margin-bottom: 2px;
//           letter-spacing: -0.4px;
//         }
//         .bf-header-sub { font-size: 0.78rem; color: #a7f3d0; }
//         .bf-close {
//           position: relative; z-index: 1;
//           background: rgba(255,255,255,0.1);
//           border: 1px solid rgba(255,255,255,0.2);
//           border-radius: 10px; padding: 7px;
//           color: #d1fae5; cursor: pointer; transition: all 0.18s;
//           display: flex; align-items: center; justify-content: center;
//         }
//         .bf-close:hover { background: rgba(255,255,255,0.2); color: #fff; }

//         /* Body */
//         .bf-body { padding: 22px; }

//         /* Error */
//         .bf-error {
//           background: #fff1f2; border: 1.5px solid #fecdd3;
//           border-radius: 10px; padding: 10px 14px;
//           color: #be123c; font-size: 0.82rem; font-weight: 600;
//           margin-bottom: 16px;
//         }

//         .bf-field { margin-bottom: 14px; }
//         .bf-label {
//           display: block; font-size: 0.75rem; font-weight: 700;
//           color: #6b7280; margin-bottom: 6px;
//           text-transform: uppercase; letter-spacing: 0.3px;
//         }
//         .bf-input-wrap { position: relative; }
//         .bf-input-icon {
//           position: absolute; left: 12px; top: 50%;
//           transform: translateY(-50%); color: #9ca3af; pointer-events: none;
//         }
//         .bf-input {
//           width: 100%; background: #f9fafb;
//           border: 1.5px solid #e5e7eb; border-radius: 11px;
//           padding: 11px 13px 11px 38px; font-size: 0.88rem;
//           font-family: 'DM Sans', sans-serif; color: #0f2d1a;
//           outline: none; transition: all 0.18s;
//         }
//         .bf-input::placeholder { color: #9ca3af; }
//         .bf-input:focus {
//           border-color: #34d399; background: #f0fdf4;
//           box-shadow: 0 0 0 3px rgba(52,211,153,0.15);
//         }
//         .bf-input-no-icon { padding-left: 13px; }

//         /* User type pills */
//         .bf-pill-group { display: flex; gap: 8px; }
//         .bf-pill {
//           flex: 1; padding: 9px 12px; border-radius: 10px;
//           font-size: 0.845rem; font-weight: 600;
//           border: 1.5px solid #e5e7eb; background: #f9fafb; color: #6b7280;
//           cursor: pointer; transition: all 0.18s;
//           font-family: 'DM Sans', sans-serif; text-align: center;
//           display: flex; align-items: center; justify-content: center; gap: 5px;
//         }
//         .bf-pill.bf-pill-active {
//           background: #ecfdf5; border-color: #34d399; color: #059669;
//           box-shadow: 0 0 0 2px rgba(52,211,153,0.15);
//         }

//         /* Date row */
//         .bf-date-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

//         /* Submit */
//         .bf-footer { padding: 0 22px 22px; }
//         .bf-submit {
//           width: 100%;
//           background: linear-gradient(135deg, #059669, #047857);
//           color: #fff; font-family: 'DM Sans', sans-serif;
//           font-size: 0.95rem; font-weight: 700;
//           padding: 13px 24px; border-radius: 12px; border: none;
//           cursor: pointer; transition: all 0.2s;
//           display: flex; align-items: center; justify-content: center; gap: 8px;
//           box-shadow: 0 6px 20px rgba(5,150,105,0.3);
//         }
//         .bf-submit:hover:not(:disabled) {
//           box-shadow: 0 8px 28px rgba(5,150,105,0.42); transform: translateY(-1px);
//         }
//         .bf-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
//         .bf-spinner {
//           width: 16px; height: 16px;
//           border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
//           border-radius: 50%; animation: bfSpin 0.7s linear infinite;
//         }
//         @keyframes bfSpin { to { transform: rotate(360deg); } }

//         .bf-cancel {
//           width: 100%; margin-top: 10px;
//           background: transparent; border: none;
//           color: #9ca3af; font-size: 0.85rem; font-weight: 600;
//           cursor: pointer; padding: 8px;
//           font-family: 'DM Sans', sans-serif;
//           transition: color 0.18s;
//         }
//         .bf-cancel:hover { color: #6b7280; }
//       `}</style>

//       <div className="bf-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
//         <div className="bf-modal">

//           {/* Header */}
//           <div className="bf-header">
//             <div className="bf-header-left">
//               <div className="bf-header-title">📅 Book Property</div>
//               <div className="bf-header-sub">Fill in your details to send a booking request</div>
//             </div>
//             <button onClick={onClose} className="bf-close"><X size={18} /></button>
//           </div>

//           {/* Body */}
//           <div className="bf-body">

//             {error && <div className="bf-error">{error}</div>}

//             <div className="bf-field">
//               <label className="bf-label">Full Name</label>
//               <div className="bf-input-wrap">
//                 <User size={15} className="bf-input-icon" />
//                 <input name="name" value={form.name} onChange={handleChange}
//                   placeholder="Your full name" className="bf-input" />
//               </div>
//             </div>

//             <div className="bf-field">
//               <label className="bf-label">Phone Number</label>
//               <div className="bf-input-wrap">
//                 <Phone size={15} className="bf-input-icon" />
//                 <input name="phone" value={form.phone} onChange={handleChange}
//                   placeholder="+91 98765 43210" className="bf-input" />
//               </div>
//             </div>

//             <div className="bf-field">
//               <label className="bf-label">I am a</label>
//               <div className="bf-pill-group">
//                 {[
//                   { val: 'Student', label: '🎓 Student', icon: GraduationCap },
//                   { val: 'Employee', label: '💼 Employee', icon: Briefcase }
//                 ].map(opt => (
//                   <button key={opt.val} type="button"
//                     className={`bf-pill ${form.userType === opt.val ? 'bf-pill-active' : ''}`}
//                     onClick={() => setForm(p => ({ ...p, userType: opt.val }))}>
//                     {opt.label}
//                   </button>
//                 ))}
//               </div>
//               <select name="userType" value={form.userType} onChange={handleChange} style={{ display: 'none' }}>
//                 <option>Student</option>
//                 <option>Employee</option>
//               </select>
//             </div>

//             <div className="bf-field">
//               <label className="bf-label">Stay Duration</label>
//               <div className="bf-date-row">
//                 <div className="bf-input-wrap">
//                   <CalendarDays size={15} className="bf-input-icon" />
//                   <input type="date" name="startDate" value={form.startDate}
//                     onChange={handleChange} className="bf-input" />
//                 </div>
//                 <div className="bf-input-wrap">
//                   <CalendarDays size={15} className="bf-input-icon" />
//                   <input type="date" name="endDate" value={form.endDate}
//                     onChange={handleChange} className="bf-input" />
//                 </div>
//               </div>
//             </div>

//           </div>

//           <div className="bf-footer">
//             <button onClick={handleSubmit} disabled={loading} className="bf-submit">
//               {loading
//                 ? <><div className="bf-spinner" /> Checking availability…</>
//                 : <><CheckCircle size={16} /> Confirm Booking</>
//               }
//             </button>
//             <button onClick={onClose} className="bf-cancel">Cancel</button>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

// export default BookingForm;

// src/components/BookingForm.jsx
// Shows after user clicks "Book Now" on PropertyDetails.
// On success: shows toast + generates a downloadable PDF invoice.
// Props: propertyId, propertyTitle, propertyPrice, propertyCity, ownerName, onClose

import React, { useState, useContext } from 'react';
import { X, Calendar, User, Phone, CheckCircle, Download, FileText } from 'lucide-react';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';
import { useToast } from './Toast';

// ── Inline PDF invoice generator (no extra library needed) ──
function generateInvoiceHTML(data) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Booking Invoice</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'DM Sans',sans-serif;background:#f0faf4;padding:40px;color:#0f2d1a;}
  .page{background:#fff;max-width:680px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.1);}
  .header{background:linear-gradient(135deg,#064e3b,#047857);padding:32px 36px;color:#fff;}
  .brand{font-size:1.5rem;font-weight:800;letter-spacing:-0.5px;margin-bottom:4px;}
  .brand em{color:#6ee7b7;font-style:normal;}
  .header-sub{color:#a7f3d0;font-size:0.85rem;}
  .invoice-num{margin-top:16px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:8px;display:inline-block;padding:6px 14px;font-size:0.8rem;font-weight:600;color:#d1fae5;}
  .body{padding:32px 36px;}
  .status-badge{display:inline-flex;align-items:center;gap:6px;background:#dcfce7;border:1.5px solid #a7f3d0;border-radius:100px;padding:6px 16px;font-size:0.82rem;font-weight:700;color:#166534;margin-bottom:24px;}
  .section-title{font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;color:#9ca3af;margin-bottom:10px;}
  .detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px;}
  .detail-item{background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:12px 14px;}
  .detail-label{font-size:0.72rem;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.3px;margin-bottom:4px;}
  .detail-value{font-size:0.9rem;font-weight:700;color:#0f2d1a;}
  .price-box{background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1.5px solid #a7f3d0;border-radius:12px;padding:16px 20px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;}
  .price-label{font-size:0.82rem;color:#065f46;}
  .price-value{font-size:1.4rem;font-weight:800;color:#064e3b;}
  .note{background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:12px 16px;font-size:0.8rem;color:#92400e;line-height:1.5;}
  .footer{background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 36px;font-size:0.75rem;color:#9ca3af;text-align:center;}
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="brand">Nest<em>Find</em></div>
    <div class="header-sub">Property Booking Confirmation</div>
    <div class="invoice-num">Invoice #NF-${data.invoiceNo}</div>
  </div>
  <div class="body">
    <div class="status-badge">✓ Booking Request Submitted</div>

    <div class="section-title">Property Details</div>
    <div class="detail-grid">
      <div class="detail-item" style="grid-column:1/-1"><div class="detail-label">Property</div><div class="detail-value">${data.propertyTitle}</div></div>
      <div class="detail-item"><div class="detail-label">Location</div><div class="detail-value">${data.propertyCity || '—'}</div></div>
      <div class="detail-item"><div class="detail-label">Owner</div><div class="detail-value">${data.ownerName || '—'}</div></div>
    </div>

    <div class="section-title">Booking Details</div>
    <div class="detail-grid">
      <div class="detail-item"><div class="detail-label">Tenant Name</div><div class="detail-value">${data.name}</div></div>
      <div class="detail-item"><div class="detail-label">Phone</div><div class="detail-value">${data.phone}</div></div>
      <div class="detail-item"><div class="detail-label">Move-in Date</div><div class="detail-value">${new Date(data.startDate).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</div></div>
      <div class="detail-item"><div class="detail-label">Move-out Date</div><div class="detail-value">${new Date(data.endDate).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</div></div>
      <div class="detail-item"><div class="detail-label">Tenant Type</div><div class="detail-value">${data.userType}</div></div>
      <div class="detail-item"><div class="detail-label">Submitted On</div><div class="detail-value">${new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</div></div>
    </div>

    ${data.price ? `<div class="price-box"><div><div class="price-label">Monthly Rent</div></div><div class="price-value">₹${Number(data.price).toLocaleString('en-IN')}/mo</div></div>` : ''}

    <div class="note">⚠️ This is a booking request, not a confirmed booking. The owner will review and approve or decline your request. You will be notified once the owner responds.</div>
  </div>
  <div class="footer">NestFind · Zero broker fees · 100% Verified Listings · Generated ${new Date().toLocaleString('en-IN')}</div>
</div>
</body>
</html>`;
}

function downloadInvoice(data) {
  const html = generateInvoiceHTML(data);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `NestFind_Booking_${data.invoiceNo}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function BookingForm({ propertyId, propertyTitle, propertyPrice, propertyCity, ownerName, onClose }) {
  const { user } = useContext(AuthContext);
  const toast = useToast();

  const [form, setForm] = useState({
    name: user?.fullName || '',
    phone: user?.phone || '',
    userType: 'Student',
    startDate: '',
    endDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.startDate || !form.endDate) {
      toast.warning('Missing fields', 'Please fill in all required fields');
      return;
    }
    if (new Date(form.endDate) <= new Date(form.startDate)) {
      toast.warning('Invalid dates', 'Move-out date must be after move-in date');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/bookings', {
        propertyId,
        name: form.name,
        phone: form.phone,
        userType: form.userType,
        startDate: form.startDate,
        endDate: form.endDate,
      });

      const inv = {
        invoiceNo: Math.random().toString(36).slice(2,8).toUpperCase(),
        propertyTitle, propertyCity, propertyPrice: propertyPrice || 0,
        ownerName, price: propertyPrice,
        name: form.name, phone: form.phone,
        userType: form.userType,
        startDate: form.startDate, endDate: form.endDate,
      };
      setInvoiceData(inv);
      setDone(true);

      toast.success('Booking request sent! 🎉', 'The owner will review and respond shortly');
    } catch (err) {
      toast.error('Booking failed', err.response?.data?.message || 'Please try again');
    } finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;}
        .bf-overlay{position:fixed;inset:0;z-index:500;background:rgba(6,78,59,0.4);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;animation:bfFade .2s ease;}
        @keyframes bfFade{from{opacity:0}to{opacity:1}}
        .bf-modal{background:#fff;border-radius:22px;width:100%;max-width:480px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(6,78,59,0.25);animation:bfSlide .35s cubic-bezier(.34,1.56,.64,1);font-family:'DM Sans',sans-serif;}
        @keyframes bfSlide{from{opacity:0;transform:scale(.94) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
        .bf-header{background:linear-gradient(135deg,#064e3b,#065f46);padding:20px 22px;display:flex;align-items:center;justify-content:space-between;border-radius:22px 22px 0 0;}
        .bf-h-left{display:flex;align-items:center;gap:10px;}
        .bf-h-ico{width:36px;height:36px;background:rgba(255,255,255,0.12);border-radius:9px;display:flex;align-items:center;justify-content:center;}
        .bf-h-title{font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:800;color:#fff;}
        .bf-h-sub{font-size:0.75rem;color:#a7f3d0;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:220px;}
        .bf-close{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:6px;color:#d1fae5;cursor:pointer;transition:all .18s;display:flex;}
        .bf-close:hover{background:rgba(255,255,255,0.2);}
        .bf-body{padding:22px 22px 8px;}
        .bf-field{margin-bottom:14px;}
        .bf-label{font-size:0.73rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.35px;margin-bottom:6px;display:block;}
        .bf-input{width:100%;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:10px;padding:10px 13px;font-size:0.875rem;font-family:'DM Sans',sans-serif;color:#0f2d1a;outline:none;transition:all .18s;}
        .bf-input::placeholder{color:#9ca3af;}
        .bf-input:focus{border-color:#34d399;background:#f0fdf4;box-shadow:0 0 0 3px rgba(52,211,153,0.12);}
        .bf-pills{display:flex;gap:8px;}
        .bf-pill{flex:1;text-align:center;padding:9px;border-radius:10px;border:1.5px solid #e5e7eb;font-size:0.82rem;font-weight:600;color:#6b7280;cursor:pointer;transition:all .18s;background:#f9fafb;}
        .bf-pill.on{border-color:#34d399;background:#ecfdf5;color:#065f46;}
        .bf-row2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
        .bf-footer{padding:16px 22px 22px;}
        .bf-submit{width:100%;background:linear-gradient(135deg,#059669,#047857);color:#fff;font-family:'DM Sans',sans-serif;font-size:0.92rem;font-weight:700;padding:13px 24px;border-radius:11px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .2s;box-shadow:0 6px 18px rgba(5,150,105,0.28);}
        .bf-submit:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 24px rgba(5,150,105,0.42);}
        .bf-submit:disabled{opacity:.6;cursor:not-allowed;transform:none;}
        .bf-spin{width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:bfSpn .7s linear infinite;}
        @keyframes bfSpn{to{transform:rotate(360deg);}}
        /* Success state */
        .bf-success{padding:32px 24px;text-align:center;}
        .bf-success-ico{width:64px;height:64px;background:linear-gradient(135deg,#d1fae5,#a7f3d0);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;box-shadow:0 8px 24px rgba(5,150,105,0.2);}
        .bf-success-title{font-family:'Syne',sans-serif;font-size:1.35rem;font-weight:800;color:#0f2d1a;margin-bottom:6px;}
        .bf-success-sub{color:#6b7280;font-size:0.875rem;line-height:1.55;margin-bottom:22px;}
        .bf-dl-btn{display:inline-flex;align-items:center;gap:7px;background:#ecfdf5;border:1.5px solid #a7f3d0;border-radius:11px;padding:10px 20px;font-size:0.875rem;font-weight:700;color:#065f46;cursor:pointer;transition:all .18s;font-family:'DM Sans',sans-serif;margin-bottom:10px;}
        .bf-dl-btn:hover{background:#d1fae5;}
        .bf-done-btn{width:100%;background:linear-gradient(135deg,#059669,#047857);color:#fff;font-family:'DM Sans',sans-serif;font-size:0.9rem;font-weight:700;padding:12px;border-radius:11px;border:none;cursor:pointer;box-shadow:0 4px 14px rgba(5,150,105,0.28);transition:all .18s;}
        .bf-done-btn:hover{transform:translateY(-1px);}
      `}</style>

      <div className="bf-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="bf-modal">
          <div className="bf-header">
            <div className="bf-h-left">
              <div className="bf-h-ico"><Calendar size={17} color="#6ee7b7"/></div>
              <div>
                <div className="bf-h-title">{done ? 'Booking Confirmed!' : 'Book Property'}</div>
                <div className="bf-h-sub">{propertyTitle || 'Property'}</div>
              </div>
            </div>
            <button onClick={onClose} className="bf-close"><X size={16}/></button>
          </div>

          {done ? (
            <div className="bf-success">
              <div className="bf-success-ico"><CheckCircle size={30} color="#059669"/></div>
              <div className="bf-success-title">Request Sent! 🎉</div>
              <p className="bf-success-sub">
                Your booking request has been submitted successfully.<br/>
                The owner will review and respond shortly.<br/>
                You can track the status in <strong>My Bookings</strong>.
              </p>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
                <button className="bf-dl-btn" onClick={() => downloadInvoice(invoiceData)}>
                  <Download size={15}/> Download Invoice (HTML)
                </button>
                <button className="bf-done-btn" onClick={onClose}>Done</button>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={submit}>
                <div className="bf-body">
                  <div className="bf-field">
                    <label className="bf-label">Your Name</label>
                    <input name="name" value={form.name} onChange={handle} placeholder="Full name" className="bf-input"/>
                  </div>
                  <div className="bf-field">
                    <label className="bf-label">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handle} placeholder="+91 98765 43210" className="bf-input"/>
                  </div>
                  <div className="bf-field">
                    <label className="bf-label">I am a…</label>
                    <div className="bf-pills">
                      {['Student','Working Professional','Family','Other'].map(t => (
                        <div key={t} className={`bf-pill ${form.userType===t?'on':''}`} onClick={()=>setForm(p=>({...p,userType:t}))}>{t}</div>
                      ))}
                    </div>
                  </div>
                  <div className="bf-field">
                    <label className="bf-label">Move-in & Move-out Dates</label>
                    <div className="bf-row2">
                      <input type="date" name="startDate" value={form.startDate} onChange={handle} min={new Date().toISOString().split('T')[0]} className="bf-input"/>
                      <input type="date" name="endDate" value={form.endDate} onChange={handle} min={form.startDate || new Date().toISOString().split('T')[0]} className="bf-input"/>
                    </div>
                  </div>
                </div>
                <div className="bf-footer">
                  <button type="submit" disabled={loading} className="bf-submit">
                    {loading ? <><div className="bf-spin"/> Submitting…</> : <><Calendar size={15}/> Submit Booking Request</>}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}