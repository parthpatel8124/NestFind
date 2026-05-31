// import React, { useState } from 'react';
// import api from '../utils/api';
// import { useNavigate } from 'react-router-dom';

// function AddRoommate() {

//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     city: '',
//     area: '',
//     preferredGender: 'Any',
//     budgetMin: '',
//     budgetMax: '',
//     contact: ''
//   });

//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {

//     e.preventDefault();
//     setError('');

//     if (!form.title || !form.city) {
//       return setError('Title and City are required');
//     }

//     setLoading(true);

//     try {

//       const payload = {
//         ...form,
//         budgetMin: form.budgetMin ? Number(form.budgetMin) : undefined,
//         budgetMax: form.budgetMax ? Number(form.budgetMax) : undefined
//       };

//       await api.post('/api/roommates', payload);

//       navigate('/roommates');

//     } catch (err) {

//       setError(err.response?.data?.message || 'Failed to post roommate');

//     } finally {

//       setLoading(false);

//     }

//   };

//   return (

//     <div className="min-h-screen bg-gray-50 py-8">

//       <div className="max-w-2xl mx-auto px-4">

//         <h1 className="text-2xl font-bold mb-4">
//           Post Roommate Request
//         </h1>

//         {error && (
//           <div className="mb-4 text-red-600">
//             {error}
//           </div>
//         )}

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-4 bg-white p-6 rounded shadow"
//         >

//           <input
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             placeholder="Title"
//             className="w-full p-2 border rounded"
//           />

//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Description"
//             className="w-full p-2 border rounded"
//           />

//           <input
//             name="city"
//             value={form.city}
//             onChange={handleChange}
//             placeholder="City"
//             className="w-full p-2 border rounded"
//           />

//           <input
//             name="area"
//             value={form.area}
//             onChange={handleChange}
//             placeholder="Area (optional)"
//             className="w-full p-2 border rounded"
//           />

//           <select
//             name="preferredGender"
//             value={form.preferredGender}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           >
//             <option value="Any">Any</option>
//             <option value="Boys">Boys</option>
//             <option value="Girls">Girls</option>
//           </select>

//           <div className="flex gap-2">

//             <input
//               name="budgetMin"
//               value={form.budgetMin}
//               onChange={handleChange}
//               placeholder="Min Budget"
//               className="w-1/2 p-2 border rounded"
//             />

//             <input
//               name="budgetMax"
//               value={form.budgetMax}
//               onChange={handleChange}
//               placeholder="Max Budget"
//               className="w-1/2 p-2 border rounded"
//             />

//           </div>

//           <input
//             name="contact"
//             value={form.contact}
//             onChange={handleChange}
//             placeholder="Contact Number"
//             className="w-full p-2 border rounded"
//           />

//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//             disabled={loading}
//           >
//             {loading ? 'Posting...' : 'Post'}
//           </button>

//         </form>

//       </div>

//     </div>

//   );
// }

// export default AddRoommate;

// import React, { useState } from "react";
// import api from "../utils/api";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// function AddRoommate() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     city: "",
//     area: "",
//     preferredGender: "Any",
//     budgetMin: "",
//     budgetMax: "",
//     contact: ""
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!form.title || !form.city) {
//       return setError("Title and City are required");
//     }

//     setLoading(true);

//     try {
//       const payload = {
//         ...form,
//         budgetMin: form.budgetMin ? Number(form.budgetMin) : undefined,
//         budgetMax: form.budgetMax ? Number(form.budgetMax) : undefined
//       };

//       await api.post("/api/roommates", payload);
//       navigate("/roommates");
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to post roommate");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="rm-root">
//       <div className="rm-container">
//         <button className="rm-back" onClick={() => navigate(-1)}>
//         <ArrowLeft size={16} /> Back
//         </button>

//         <h1 className="rm-title">Find a Roommate</h1>
//         <p className="rm-sub">Post your requirement and connect instantly</p>

//         {error && <div className="rm-error">{error}</div>}

//         <form onSubmit={handleSubmit} className="rm-form">

//           {/* Title */}
//           <div className="rm-field">
//             <label>Title</label>
//             <input
//               name="title"
//               value={form.title}
//               onChange={handleChange}
//               placeholder="Looking for roommate near college..."
//               className="rm-input"
//             />
//           </div>

//           {/* Description */}
//           <div className="rm-field">
//             <label>Description</label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               placeholder="Add details like rent, habits, preferences..."
//               className="rm-input rm-textarea"
//             />
//           </div>

//           {/* Location */}
//           <div className="rm-row">
//             <div className="rm-field">
//               <label>City</label>
//               <input
//                 name="city"
//                 value={form.city}
//                 onChange={handleChange}
//                 placeholder="City"
//                 className="rm-input"
//               />
//             </div>

//             <div className="rm-field">
//               <label>Area</label>
//               <input
//                 name="area"
//                 value={form.area}
//                 onChange={handleChange}
//                 placeholder="Area (optional)"
//                 className="rm-input"
//               />
//             </div>
//           </div>

//           {/* Gender Toggle */}
//           <div className="rm-field">
//             <label>Preferred Gender</label>
//             <div className="rm-toggle">
//               {["Any", "Boys", "Girls"].map((g) => (
//                 <button
//                   type="button"
//                   key={g}
//                   className={`rm-toggle-btn ${
//                     form.preferredGender === g ? "active" : ""
//                   }`}
//                   onClick={() =>
//                     setForm((prev) => ({ ...prev, preferredGender: g }))
//                   }
//                 >
//                   {g}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Budget */}
//           <div className="rm-field">
//             <label>Budget Range</label>
//             <div className="rm-budget">
//               <input
//                 name="budgetMin"
//                 value={form.budgetMin}
//                 onChange={handleChange}
//                 placeholder="Min ₹"
//                 className="rm-input"
//               />
//               <span className="rm-sep">—</span>
//               <input
//                 name="budgetMax"
//                 value={form.budgetMax}
//                 onChange={handleChange}
//                 placeholder="Max ₹"
//                 className="rm-input"
//               />
//             </div>
//           </div>

//           {/* Contact */}
//           <div className="rm-field">
//             <label>Contact</label>
//             <input
//               name="contact"
//               value={form.contact}
//               onChange={handleChange}
//               placeholder="Phone number"
//               className="rm-input"
//             />
//           </div>

//           {/* Submit */}
//           <button className="rm-submit" disabled={loading}>
//             {loading ? <span className="rm-spinner" /> : "Post Request"}
//           </button>

//         </form>
//       </div>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

//         .rm-root {
//           min-height: 100vh;
//           background: #f0faf4;
//           display: flex;
//           justify-content: center;
//           padding: 40px 20px;
//           font-family: 'DM Sans', sans-serif;
//         }

//         .rm-container {
//           width: 100%;
//           max-width: 600px;
//         }

//         .rm-title {
//           font-family: 'Syne', sans-serif;
//           font-size: 1.8rem;
//           font-weight: 800;
//           color: #0f2d1a;
//         }

//         .rm-sub {
//           color: #6b7280;
//           font-size: 0.9rem;
//           margin-bottom: 20px;
//         }

//         .rm-error {
//           color: #ef4444;
//           margin-bottom: 10px;
//         }

//         .rm-form {
//           background: #fff;
//           padding: 26px;
//           border-radius: 20px;
//           border: 1.5px solid #d1fae5;
//           box-shadow: 0 20px 40px rgba(5,150,105,0.1);
//         }

//         .rm-field {
//           margin-bottom: 14px;
//         }

//         .rm-field label {
//           font-size: 0.78rem;
//           font-weight: 600;
//           color: #6b7280;
//           margin-bottom: 5px;
//           display: block;
//         }

//         .rm-input {
//           width: 100%;
//           padding: 11px 13px;
//           border-radius: 11px;
//           border: 1.5px solid #e5e7eb;
//           background: #f9fafb;
//           color: #0f2d1a;
//           outline: none;
//           transition: 0.2s;
//         }

//         .rm-input:focus {
//           border-color: #34d399;
//           background: #f0fdf4;
//           box-shadow: 0 0 0 3px rgba(52,211,153,0.15);
//         }

//         .rm-textarea {
//           min-height: 80px;
//           resize: none;
//         }

//         .rm-row {
//           display: flex;
//           gap: 10px;
//         }

//         .rm-toggle {
//           display: flex;
//           gap: 10px;
//         }

//         .rm-toggle-btn {
//           flex: 1;
//           padding: 10px;
//           border-radius: 10px;
//           border: 1.5px solid #e5e7eb;
//           background: #f9fafb;
//           cursor: pointer;
//         }

//         .rm-toggle-btn.active {
//           background: #ecfdf5;
//           border-color: #34d399;
//           color: #059669;
//         }

//         .rm-budget {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .rm-sep {
//           color: #9ca3af;
//         }

//         .rm-submit {
//           width: 100%;
//           margin-top: 10px;
//           background: linear-gradient(135deg, #059669, #047857);
//           color: white;
//           padding: 12px;
//           border-radius: 12px;
//           border: none;
//           font-weight: 600;
//           cursor: pointer;
//         }

//         .rm-submit:hover {
//           transform: translateY(-1px);
//         }

//         .rm-submit:active {
//           transform: scale(0.96);
//         }

//         .rm-spinner {
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
//         .rm-back {
//   background: transparent;
//   border: none;
//   color: #059669;
//   font-weight: 600;
//   cursor: pointer;
//   margin-bottom: 10px;
//   font-size: 0.9rem;
//   display: inline-flex;
//   align-items: center;
//   gap: 6px;
//   transition: 0.2s;
// }

// .rm-back:hover {
//   color: #047857;
//   transform: translateX(-3px);
// }

// .rm-back:active {
//   transform: scale(0.95);
// }
//       `}</style>
//     </div>
//   );
// }

// export default AddRoommate;

import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, IndianRupee, Phone, CheckCircle } from 'lucide-react';

function AddRoommate() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    city: '',
    area: '',
    preferredGender: 'Any',
    budgetMin: '',
    budgetMax: '',
    contact: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title || !form.city) return setError('Title and City are required');
    setLoading(true);
    try {
      const payload = {
        ...form,
        budgetMin: form.budgetMin ? Number(form.budgetMin) : undefined,
        budgetMax: form.budgetMax ? Number(form.budgetMax) : undefined
      };
      await api.post('/api/roommates', payload);
      navigate('/roommates');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post roommate');
    } finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .ar-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #f0faf4;
          padding: 32px 0 60px;
        }

        /* ── wider container ── */
        .ar-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Back button */
        .ar-back {
          display: inline-flex; align-items: center; gap: 6px;
          background: #fff; border: 1.5px solid #d1fae5;
          border-radius: 10px; padding: 8px 16px;
          font-size: 0.875rem; font-weight: 600; color: #059669;
          cursor: pointer; transition: all 0.18s; margin-bottom: 24px;
          font-family: 'DM Sans', sans-serif;
        }
        .ar-back:hover { background: #ecfdf5; border-color: #34d399; transform: translateX(-2px); }

        /* Header */
        .ar-header { margin-bottom: 24px; }
        .ar-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #d1fae5; border: 1px solid #a7f3d0;
          border-radius: 100px; padding: 4px 13px;
          font-size: 0.75rem; font-weight: 700; color: #065f46;
          text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 10px;
        }
        .ar-title {
          font-family: 'Syne', sans-serif;
          font-size: 2.1rem; font-weight: 800;
          color: #0f2d1a; letter-spacing: -1px; margin-bottom: 4px;
        }
        .ar-sub { color: #6b7280; font-size: 0.9rem; }

        /* Card */
        .ar-card {
          background: #fff;
          border-radius: 24px;
          border: 1.5px solid #e6f7ef;
          box-shadow: 0 4px 6px rgba(0,0,0,0.03), 0 20px 40px rgba(5,150,105,0.07);
          overflow: hidden;
        }

        /* Two-column form layout */
        .ar-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        @media (max-width: 680px) {
          .ar-form-grid { grid-template-columns: 1fr; }
          .ar-col-divider { display: none; }
        }

        .ar-col { padding: 28px 32px; }
        .ar-col-divider {
          width: 1px;
          background: linear-gradient(to bottom, transparent, #d1fae5 20%, #d1fae5 80%, transparent);
          margin: 24px 0;
          flex-shrink: 0;
        }

        /* Section title */
        .ar-section-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem; font-weight: 800; color: #065f46;
          margin-bottom: 18px;
          display: flex; align-items: center; gap: 8px;
        }
        .ar-section-title::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(to right, #d1fae5, transparent);
        }

        /* Field */
        .ar-field { margin-bottom: 16px; }
        .ar-label {
          display: block; font-size: 0.76rem; font-weight: 700;
          color: #6b7280; margin-bottom: 6px;
          text-transform: uppercase; letter-spacing: 0.3px;
        }
        .ar-input-wrap { position: relative; }
        .ar-input-icon {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%); color: #9ca3af; pointer-events: none;
        }
        .ar-input {
          width: 100%; background: #f9fafb;
          border: 1.5px solid #e5e7eb; border-radius: 12px;
          padding: 11px 14px; font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif; color: #0f2d1a;
          outline: none; transition: all 0.18s;
        }
        .ar-input.ar-with-icon { padding-left: 40px; }
        .ar-input::placeholder { color: #9ca3af; }
        .ar-input:focus {
          border-color: #34d399; background: #f0fdf4;
          box-shadow: 0 0 0 3px rgba(52,211,153,0.15);
        }
        .ar-textarea {
          width: 100%; resize: vertical; min-height: 120px;
          background: #f9fafb; border: 1.5px solid #e5e7eb;
          border-radius: 12px; padding: 11px 14px;
          font-size: 0.9rem; font-family: 'DM Sans', sans-serif;
          color: #0f2d1a; outline: none; transition: all 0.18s;
        }
        .ar-textarea::placeholder { color: #9ca3af; }
        .ar-textarea:focus {
          border-color: #34d399; background: #f0fdf4;
          box-shadow: 0 0 0 3px rgba(52,211,153,0.15);
        }

        .ar-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        /* Pills */
        .ar-pill-group { display: flex; gap: 8px; flex-wrap: wrap; }
        .ar-pill {
          padding: 8px 16px; border-radius: 100px;
          font-size: 0.83rem; font-weight: 600;
          border: 1.5px solid #e5e7eb; background: #f9fafb; color: #6b7280;
          cursor: pointer; transition: all 0.18s; font-family: 'DM Sans', sans-serif;
        }
        .ar-pill.ar-pill-active {
          background: #ecfdf5; border-color: #34d399; color: #059669;
          box-shadow: 0 0 0 2px rgba(52,211,153,0.15);
        }

        /* Error */
        .ar-error {
          background: #fff1f2; border: 1.5px solid #fecdd3;
          border-radius: 12px; padding: 11px 15px;
          color: #be123c; font-size: 0.875rem; font-weight: 600;
          margin: 20px 32px 0;
        }

        /* Submit */
        .ar-submit-wrap {
          padding: 0 32px 32px;
          border-top: 1px solid #f0fdf4;
          padding-top: 24px;
        }
        .ar-submit-inner {
          display: flex; align-items: center; gap: 14px;
          flex-wrap: wrap;
        }
        .ar-submit {
          flex: 1; min-width: 200px;
          background: linear-gradient(135deg, #059669, #047857);
          color: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 0.97rem; font-weight: 700;
          padding: 14px 24px; border-radius: 13px; border: none;
          cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 6px 20px rgba(5,150,105,0.3);
        }
        .ar-submit:hover:not(:disabled) {
          box-shadow: 0 8px 28px rgba(5,150,105,0.42); transform: translateY(-1px);
        }
        .ar-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .ar-cancel {
          padding: 14px 22px; border-radius: 13px;
          background: #f9fafb; border: 1.5px solid #e5e7eb;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; font-weight: 600; color: #6b7280;
          cursor: pointer; transition: all 0.18s;
        }
        .ar-cancel:hover { background: #ecfdf5; border-color: #a7f3d0; color: #059669; }
        .ar-spinner {
          width: 17px; height: 17px;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
          border-radius: 50%; animation: arSpin 0.7s linear infinite;
        }
        @keyframes arSpin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="ar-root">
        <div className="ar-container">

          {/* Back button */}
          <button onClick={() => navigate('/roommates')} className="ar-back">
            <ArrowLeft size={15} /> Back to Roommates
          </button>

          {/* Header */}
          <div className="ar-header">
            <div className="ar-badge">👥 Roommates</div>
            <h1 className="ar-title">Post Roommate Request</h1>
            <p className="ar-sub">Let others know you're looking for a roommate</p>
          </div>

          <div className="ar-card">

            {error && <div className="ar-error">{error}</div>}

            <form onSubmit={handleSubmit}>

              {/* Two-column layout */}
              <div className="ar-form-grid">

                {/* LEFT — About & Description */}
                <div className="ar-col">
                  <div className="ar-section-title">📋 About the Request</div>

                  <div className="ar-field">
                    <label className="ar-label">Request Title *</label>
                    <input name="title" value={form.title} onChange={handleChange}
                      placeholder="e.g. Looking for roommate near SV College"
                      className="ar-input" />
                  </div>

                  <div className="ar-field">
                    <label className="ar-label">Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange}
                      placeholder="About yourself — your lifestyle, work/study schedule, habits, what you're looking for in a roommate…"
                      className="ar-textarea" />
                  </div>

                  <div className="ar-field">
                    <label className="ar-label">Contact Number</label>
                    <div className="ar-input-wrap">
                      <Phone size={15} className="ar-input-icon" />
                      <input name="contact" value={form.contact} onChange={handleChange}
                        placeholder="+91 98765 43210" className="ar-input ar-with-icon" />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="ar-col-divider" />

                {/* RIGHT — Location & Preferences */}
                <div className="ar-col">
                  <div className="ar-section-title">📍 Location & Preferences</div>

                  <div className="ar-grid-2 ar-field">
                    <div>
                      <label className="ar-label">City *</label>
                      <div className="ar-input-wrap">
                        <MapPin size={15} className="ar-input-icon" />
                        <input name="city" value={form.city} onChange={handleChange}
                          placeholder="e.g. Surat" className="ar-input ar-with-icon" />
                      </div>
                    </div>
                    <div>
                      <label className="ar-label">Area</label>
                      <input name="area" value={form.area} onChange={handleChange}
                        placeholder="e.g. Adajan" className="ar-input" />
                    </div>
                  </div>

                  <div className="ar-field">
                    <label className="ar-label">Preferred Gender</label>
                    <div className="ar-pill-group">
                      {['Any', 'Boys', 'Girls'].map(g => (
                        <button key={g} type="button"
                          className={`ar-pill ${form.preferredGender === g ? 'ar-pill-active' : ''}`}
                          onClick={() => setForm(p => ({ ...p, preferredGender: g }))}>
                          {g === 'Boys' ? '👦 Boys' : g === 'Girls' ? '👧 Girls' : '👥 Any'}
                        </button>
                      ))}
                    </div>
                    <select name="preferredGender" value={form.preferredGender} onChange={handleChange} style={{ display: 'none' }}>
                      <option value="Any">Any</option>
                      <option value="Boys">Boys</option>
                      <option value="Girls">Girls</option>
                    </select>
                  </div>

                  <div className="ar-field">
                    <label className="ar-label">Budget Range (₹/month)</label>
                    <div className="ar-grid-2">
                      <div className="ar-input-wrap">
                        <IndianRupee size={15} className="ar-input-icon" />
                        <input name="budgetMin" value={form.budgetMin} onChange={handleChange}
                          placeholder="Min e.g. 5000" type="number" className="ar-input ar-with-icon" />
                      </div>
                      <div className="ar-input-wrap">
                        <IndianRupee size={15} className="ar-input-icon" />
                        <input name="budgetMax" value={form.budgetMax} onChange={handleChange}
                          placeholder="Max e.g. 10000" type="number" className="ar-input ar-with-icon" />
                      </div>
                    </div>
                  </div>

                  {/* Helper tips card */}
                  <div style={{
                    background: '#f0fdf4', border: '1px solid #d1fae5',
                    borderRadius: 12, padding: '14px 16px', marginTop: 8
                  }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#065f46', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                      💡 Tips for a great listing
                    </div>
                    {['Be honest about your daily routine', 'Mention if you have pets or smoke', 'Specify preferred move-in date'].map((tip, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.82rem', color: '#374151', marginBottom: 5 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', flexShrink: 0 }} />
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit row */}
              <div className="ar-submit-wrap">
                <div className="ar-submit-inner">
                  <button type="submit" disabled={loading} className="ar-submit">
                    {loading
                      ? <><div className="ar-spinner" /> Posting…</>
                      : <><CheckCircle size={17} /> Post Request</>
                    }
                  </button>
                  <button type="button" onClick={() => navigate('/roommates')} className="ar-cancel">
                    Cancel
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRoommate;