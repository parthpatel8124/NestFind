// import React, { useEffect, useState, useContext } from 'react';
// import api from '../utils/api';
// import AuthContext from '../context/AuthContext';
// import { Loader, MapPin } from 'lucide-react';
// import Alert from '../components/Alert';
// import { useNavigate } from 'react-router-dom';

// function MyBookings() {

//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [bookings, setBookings] = useState([]);
//   const [myProperties, setMyProperties] = useState([]);
//   const [propertyBookings, setPropertyBookings] = useState({});

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   const fetchAll = async () => {
//     try {
//       const res = await api.get('/api/bookings/my');
//       setBookings(res.data);

//       const propRes = await api.get('/api/properties');
//       const myProps = propRes.data.filter(p => p.ownerId === user?.id);
//       setMyProperties(myProps);

//       const bookingMap = {};

//       for (let p of myProps) {
//         try {
//           const b = await api.get(`/api/bookings/property/${p._id}`);
//           bookingMap[p._id] = b.data;
//         } catch {
//           bookingMap[p._id] = [];
//         }
//       }

//       setPropertyBookings(bookingMap);

//     } catch {
//       setError('Failed to load data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <Loader className="animate-spin text-blue-600" size={40} />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">

//       <div className="max-w-6xl mx-auto px-4">

//         <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

//         {error && <Alert type="error" message={error} />}

//         {/* ================= MY BOOKINGS ================= */}
//         <h2 className="text-xl font-semibold mb-4">My Bookings</h2>

//         {bookings.length === 0 ? (
//           <p className="text-gray-600 mb-8">No bookings found.</p>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-6 mb-10">

//             {bookings.map((b) => {
//               const status = b.status || 'pending';

//               return (
//                 <div
//                   key={b._id}
//                   onClick={() => navigate(`/property/${b.propertyId?._id}`)}
//                   className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
//                 >

//                   <h2 className="text-lg font-bold mb-2">
//                     {b.propertyId?.title || 'Property'}
//                   </h2>

//                   <div className="flex items-center text-gray-500 mb-2">
//                     <MapPin size={14} className="mr-1 text-red-500" />
//                     {b.propertyId?.city || '—'}
//                   </div>

//                   <div className="text-sm text-gray-700 mb-2">
//                     {new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}
//                   </div>

//                   <div>
//                     <span className={`px-3 py-1 text-xs rounded-full 
//                       ${status === 'approved'
//                         ? 'bg-green-100 text-green-700'
//                         : status === 'rejected'
//                         ? 'bg-red-100 text-red-700'
//                         : 'bg-yellow-100 text-yellow-700'
//                       }`}>
//                       {status}
//                     </span>
//                   </div>

//                 </div>
//               );
//             })}

//           </div>
//         )}

//         {/* ================= MY LISTED PROPERTIES ================= */}
//         <h2 className="text-xl font-semibold mb-4">My Listed Properties</h2>

//         {myProperties.length === 0 ? (
//           <p className="text-gray-600">No properties listed.</p>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-6">

//             {myProperties.map((p) => (
//               <div
//                 key={p._id}
//                 onClick={() => navigate(`/property/${p._id}`)}
//                 className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
//               >

//                 <h3 className="text-lg font-bold">{p.title}</h3>
//                 <p className="text-gray-600 mb-3">{p.city}</p>

//                 <div className="text-sm text-gray-500 mb-2">
//                   {propertyBookings[p._id]?.length || 0} bookings
//                 </div>

//                 {propertyBookings[p._id]?.length > 0 && (
//                   <div className="text-xs text-green-600 font-semibold">
//                     View details →
//                   </div>
//                 )}

//               </div>
//             ))}

//           </div>
//         )}

//       </div>

//     </div>
//   );
// }

// export default MyBookings;

// import React, { useEffect, useState, useContext } from 'react';
// import api from '../utils/api';
// import AuthContext from '../context/AuthContext';
// import { Loader, MapPin } from 'lucide-react';
// import Alert from '../components/Alert';
// import { useNavigate } from 'react-router-dom';

// function MyBookings() {

//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [bookings, setBookings] = useState([]);
//   const [myProperties, setMyProperties] = useState([]);
//   const [propertyBookings, setPropertyBookings] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   const fetchAll = async () => {
//     try {
//       const res = await api.get('/api/bookings/my');
//       setBookings(res.data);

//       const propRes = await api.get('/api/properties');
//       const myProps = propRes.data.filter(p => p.ownerId === user?.id);
//       setMyProperties(myProps);

//       const bookingMap = {};
//       for (let p of myProps) {
//         try {
//           const b = await api.get(`/api/bookings/property/${p._id}`);
//           bookingMap[p._id] = b.data;
//         } catch {
//           bookingMap[p._id] = [];
//         }
//       }

//       setPropertyBookings(bookingMap);

//     } catch {
//       setError('Failed to load data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="mb-root center">
//         <Loader className="mb-spinner" size={42} />
//         <style>{styles}</style>
//       </div>
//     );
//   }

//   return (
//     <div className="mb-root">
//       <div className="mb-container">

//         <h1 className="mb-title">My Dashboard</h1>

//         {error && <Alert type="error" message={error} />}

//         {/* BOOKINGS */}
//         <div className="mb-section">
//           <h2>My Bookings</h2>

//           {bookings.length === 0 ? (
//             <p className="mb-empty">No bookings yet.</p>
//           ) : (
//             <div className="mb-grid">
//               {bookings.map((b) => {
//                 const status = b.status || 'pending';

//                 return (
//                   <div
//                     key={b._id}
//                     onClick={() => navigate(`/property/${b.propertyId?._id}`)}
//                     className="mb-card"
//                   >
//                     <h3>{b.propertyId?.title || 'Property'}</h3>

//                     <div className="mb-location">
//                       <MapPin size={14} />
//                       {b.propertyId?.city || '—'}
//                     </div>

//                     <div className="mb-date">
//                       {new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}
//                     </div>

//                     <span className={`mb-status ${status}`}>
//                       {status}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* PROPERTIES */}
//         <div className="mb-section">
//           <h2>My Listed Properties</h2>

//           {myProperties.length === 0 ? (
//             <p className="mb-empty">No properties listed.</p>
//           ) : (
//             <div className="mb-grid">
//               {myProperties.map((p) => (
//                 <div
//                   key={p._id}
//                   onClick={() => navigate(`/property/${p._id}`)}
//                   className="mb-card"
//                 >
//                   <h3>{p.title}</h3>
//                   <p className="mb-city">{p.city}</p>

//                   <div className="mb-book-count">
//                     {propertyBookings[p._id]?.length || 0} bookings
//                   </div>

//                   {propertyBookings[p._id]?.length > 0 && (
//                     <span className="mb-view">View details →</span>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//       </div>

//       <style>{styles}</style>
//     </div>
//   );
// }

// const styles = `
//   .mb-root {
//     min-height: 100vh;
//     background: linear-gradient(135deg, #ecfdf5, #f0fdf4);
//     padding: 40px 20px;
//     font-family: 'DM Sans', sans-serif;
//   }

//   .mb-root.center {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }

//   .mb-container {
//     max-width: 1100px;
//     margin: auto;
//   }

//   .mb-title {
//     font-family: 'Syne', sans-serif;
//     font-size: 1.9rem;
//     font-weight: 800;
//     color: #064e3b;
//     margin-bottom: 20px;
//   }

//   .mb-section {
//     margin-bottom: 35px;
//   }

//   .mb-section h2 {
//     font-size: 1.2rem;
//     font-weight: 700;
//     color: #065f46;
//     margin-bottom: 14px;
//   }

//   .mb-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
//     gap: 18px;
//   }

//   .mb-card {
//     background: white;
//     border-radius: 18px;
//     padding: 16px;
//     cursor: pointer;
//     border: 1px solid #d1fae5;
//     box-shadow: 0 12px 25px rgba(5,150,105,0.1);
//     transition: 0.25s;
//   }

//   .mb-card:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 18px 35px rgba(5,150,105,0.2);
//   }

//   .mb-card h3 {
//     font-size: 1rem;
//     font-weight: 700;
//     color: #064e3b;
//     margin-bottom: 6px;
//   }

//   .mb-location {
//     display: flex;
//     align-items: center;
//     gap: 5px;
//     color: #6b7280;
//     font-size: 0.85rem;
//     margin-bottom: 5px;
//   }

//   .mb-location svg {
//     color: #ef4444;
//   }

//   .mb-date {
//     font-size: 0.8rem;
//     color: #374151;
//     margin-bottom: 8px;
//   }

//   .mb-status {
//     padding: 4px 10px;
//     font-size: 0.75rem;
//     border-radius: 999px;
//     font-weight: 600;
//   }

//   .mb-status.approved {
//     background: #dcfce7;
//     color: #166534;
//   }

//   .mb-status.rejected {
//     background: #fee2e2;
//     color: #991b1b;
//   }

//   .mb-status.pending {
//     background: #fef3c7;
//     color: #92400e;
//   }

//   .mb-city {
//     color: #6b7280;
//     margin-bottom: 6px;
//   }

//   .mb-book-count {
//     font-size: 0.8rem;
//     color: #374151;
//   }

//   .mb-view {
//     display: inline-block;
//     margin-top: 6px;
//     font-size: 0.8rem;
//     color: #059669;
//     font-weight: 600;
//   }

//   .mb-empty {
//     color: #6b7280;
//     font-size: 0.9rem;
//   }

//   .mb-spinner {
//     color: #059669;
//     animation: spin 1s linear infinite;
//   }

//   @keyframes spin {
//     to { transform: rotate(360deg); }
//   }
// `;

// export default MyBookings;



// import React, { useEffect, useState, useContext } from 'react';
// import api from '../utils/api';
// import AuthContext from '../context/AuthContext';
// import { MapPin, CheckCircle, XCircle, Clock, Home, CalendarDays, ArrowRight, Building2, BookOpen } from 'lucide-react';
// import Alert from '../components/Alert';
// import { useNavigate } from 'react-router-dom';

// function MyBookings() {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [bookings, setBookings] = useState([]);
//   const [myProperties, setMyProperties] = useState([]);
//   const [propertyBookings, setPropertyBookings] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => { fetchAll(); }, []);

//   const fetchAll = async () => {
//     try {
//       const res = await api.get('/api/bookings/my');
//       setBookings(res.data);

//       const propRes = await api.get('/api/properties');
//       const myProps = propRes.data.filter(p => p.ownerId === user?.id);
//       setMyProperties(myProps);

//       const bookingMap = {};
//       for (let p of myProps) {
//         try {
//           const b = await api.get(`/api/bookings/property/${p._id}`);
//           bookingMap[p._id] = b.data;
//         } catch { bookingMap[p._id] = []; }
//       }
//       setPropertyBookings(bookingMap);
//     } catch {
//       setError('Failed to load data');
//     } finally { setLoading(false); }
//   };

//   const statusConfig = {
//     approved: { label: 'Approved', icon: CheckCircle, cls: 'mb-approved' },
//     rejected: { label: 'Rejected', icon: XCircle, cls: 'mb-rejected' },
//     pending: { label: 'Pending', icon: Clock, cls: 'mb-pending' },
//   };

//   if (loading) {
//     return (
//       <>
//         <style>{`
//           @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
//           .mb-load { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#f0faf4; gap:14px; font-family:'DM Sans',sans-serif; }
//           .mb-spinner { width:44px; height:44px; border:3px solid #d1fae5; border-top-color:#059669; border-radius:50%; animation:mbSpin 0.75s linear infinite; }
//           @keyframes mbSpin { to { transform:rotate(360deg); } }
//         `}</style>
//         <div className="mb-load">
//           <div className="mb-spinner" />
//           <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Loading your dashboard…</span>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
//         * { box-sizing: border-box; }

//         .mb-root {
//           font-family: 'DM Sans', sans-serif;
//           min-height: 100vh;
//           background: #f0faf4;
//         }

//         /* Hero */
//         .mb-hero {
//           background: linear-gradient(160deg, #064e3b 0%, #065f46 55%, #047857 100%);
//           padding: 44px 24px 52px; position: relative; overflow: hidden;
//         }
//         .mb-hero::before {
//           content: ''; position: absolute; inset: 0;
//           background-image:
//             linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
//           background-size: 40px 40px; pointer-events: none;
//         }
//         .mb-hero-blob {
//           position: absolute; width: 340px; height: 340px;
//           background: radial-gradient(circle, rgba(110,231,183,0.18), transparent 65%);
//           top: -60px; right: -40px; border-radius: 50%; pointer-events: none;
//         }
//         .mb-hero-inner {
//           position: relative; z-index: 2;
//           max-width: 1280px; margin: 0 auto;
//         }
//         .mb-hero-badge {
//           display: inline-flex; align-items: center; gap: 6px;
//           background: rgba(255,255,255,0.12);
//           border: 1px solid rgba(255,255,255,0.2);
//           border-radius: 100px; padding: 4px 13px;
//           font-size: 0.75rem; font-weight: 600;
//           color: #a7f3d0; letter-spacing: 0.4px;
//           text-transform: uppercase; margin-bottom: 10px;
//         }
//         .mb-hero-title {
//           font-family: 'Syne', sans-serif;
//           font-size: clamp(1.6rem, 4vw, 2.4rem);
//           font-weight: 800; color: #fff;
//           letter-spacing: -1px; margin-bottom: 6px;
//         }
//         .mb-hero-title em {
//           font-style: normal;
//           background: linear-gradient(90deg, #6ee7b7, #34d399);
//           -webkit-background-clip: text; -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }
//         .mb-hero-sub { color: #a7f3d0; font-size: 0.92rem; }

//         /* Stats pills in hero */
//         .mb-hero-stats {
//           display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px;
//         }
//         .mb-hero-stat {
//           background: rgba(255,255,255,0.1);
//           border: 1px solid rgba(255,255,255,0.15);
//           border-radius: 12px; padding: 10px 18px;
//           display: flex; align-items: center; gap: 10px;
//         }
//         .mb-hero-stat-num {
//           font-family: 'Syne', sans-serif;
//           font-size: 1.3rem; font-weight: 800; color: #fff;
//         }
//         .mb-hero-stat-label { font-size: 0.78rem; color: #a7f3d0; font-weight: 500; }

//         /* Body */
//         .mb-body {
//           max-width: 1280px; margin: 0 auto;
//           padding: 36px 20px 60px;
//         }

//         /* Section */
//         .mb-section { margin-bottom: 44px; }
//         .mb-section-head {
//           display: flex; align-items: center; gap: 10px;
//           margin-bottom: 20px;
//         }
//         .mb-section-icon {
//           width: 36px; height: 36px;
//           background: #ecfdf5; border: 1.5px solid #d1fae5;
//           border-radius: 10px;
//           display: flex; align-items: center; justify-content: center;
//         }
//         .mb-section-title {
//           font-family: 'Syne', sans-serif;
//           font-size: 1.15rem; font-weight: 800;
//           color: #0f2d1a; letter-spacing: -0.4px;
//         }
//         .mb-section-count {
//           background: #d1fae5; color: #065f46;
//           border-radius: 100px; font-size: 0.72rem;
//           font-weight: 800; padding: 2px 9px; margin-left: 4px;
//         }

//         /* Booking cards grid */
//         .mb-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 18px; }

//         /* Booking card */
//         .mb-bcard {
//           background: #fff;
//           border-radius: 18px;
//           border: 1.5px solid #e6f7ef;
//           padding: 18px 20px;
//           cursor: pointer;
//           transition: all 0.22s ease;
//           box-shadow: 0 2px 8px rgba(5,150,105,0.06);
//           position: relative; overflow: hidden;
//         }
//         .mb-bcard::after {
//           content: ''; position: absolute;
//           top: 0; left: 0; right: 0; height: 3px;
//           opacity: 0; transition: opacity 0.22s;
//         }
//         .mb-bcard.mb-approved::after { background: linear-gradient(90deg, #34d399, #059669); }
//         .mb-bcard.mb-rejected::after { background: linear-gradient(90deg, #f87171, #ef4444); }
//         .mb-bcard.mb-pending::after { background: linear-gradient(90deg, #fbbf24, #f59e0b); }
//         .mb-bcard:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(5,150,105,0.13); border-color: #a7f3d0; }
//         .mb-bcard:hover::after { opacity: 1; }

//         .mb-bcard-title {
//           font-family: 'Syne', sans-serif;
//           font-size: 0.97rem; font-weight: 800;
//           color: #0f2d1a; margin-bottom: 8px;
//           white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
//         }
//         .mb-bcard-loc {
//           display: flex; align-items: center; gap: 4px;
//           font-size: 0.82rem; color: #6b7280; margin-bottom: 10px;
//         }
//         .mb-bcard-dates {
//           display: flex; align-items: center; gap: 6px;
//           font-size: 0.8rem; color: #6b7280;
//           background: #f9fafb; border-radius: 8px;
//           padding: 6px 10px; margin-bottom: 12px;
//         }
//         .mb-status-chip {
//           display: inline-flex; align-items: center; gap: 5px;
//           padding: 4px 11px; border-radius: 100px;
//           font-size: 0.75rem; font-weight: 700;
//         }
//         .mb-approved { background: #dcfce7; color: #166534; }
//         .mb-rejected { background: #ffe4e6; color: #9f1239; }
//         .mb-pending { background: #fef9c3; color: #854d0e; }

//         /* Property card */
//         .mb-pcard {
//           background: #fff;
//           border-radius: 18px;
//           border: 1.5px solid #e6f7ef;
//           padding: 18px 20px;
//           cursor: pointer;
//           transition: all 0.22s ease;
//           box-shadow: 0 2px 8px rgba(5,150,105,0.06);
//         }
//         .mb-pcard:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 10px 28px rgba(5,150,105,0.13);
//           border-color: #a7f3d0;
//         }
//         .mb-pcard-title {
//           font-family: 'Syne', sans-serif;
//           font-size: 0.97rem; font-weight: 800;
//           color: #0f2d1a; margin-bottom: 4px;
//         }
//         .mb-pcard-city {
//           font-size: 0.82rem; color: #6b7280; margin-bottom: 12px;
//           display: flex; align-items: center; gap: 4px;
//         }
//         .mb-pcard-footer {
//           display: flex; align-items: center; justify-content: space-between;
//           padding-top: 10px; border-top: 1px solid #f0fdf4;
//         }
//         .mb-bookings-badge {
//           display: inline-flex; align-items: center; gap: 5px;
//           background: #ecfdf5; border: 1px solid #a7f3d0;
//           border-radius: 100px; padding: 3px 11px;
//           font-size: 0.75rem; font-weight: 700; color: #065f46;
//         }
//         .mb-view-link {
//           font-size: 0.8rem; font-weight: 700;
//           color: #059669; display: flex; align-items: center; gap: 4px;
//         }

//         /* Empty */
//         .mb-empty {
//           background: #fff; border-radius: 16px;
//           border: 1.5px solid #e6f7ef; padding: 40px 24px;
//           text-align: center;
//           box-shadow: 0 2px 8px rgba(5,150,105,0.05);
//         }
//         .mb-empty-icon {
//           width: 56px; height: 56px;
//           background: #ecfdf5; border: 1.5px solid #d1fae5;
//           border-radius: 50%; display: flex;
//           align-items: center; justify-content: center;
//           margin: 0 auto 14px;
//         }
//         .mb-empty-text { color: #6b7280; font-size: 0.9rem; }
//       `}</style>

//       <div className="mb-root">

//         {/* Hero */}
//         <div className="mb-hero">
//           <div className="mb-hero-blob" />
//           <div className="mb-hero-inner">
//             <div className="mb-hero-badge">
//               <BookOpen size={11} /> Dashboard
//             </div>
//             <h1 className="mb-hero-title">
//               My <em>Dashboard</em>
//             </h1>
//             <p className="mb-hero-sub">Track your bookings and listed properties</p>

//             <div className="mb-hero-stats">
//               <div className="mb-hero-stat">
//                 <div>
//                   <div className="mb-hero-stat-num">{bookings.length}</div>
//                   <div className="mb-hero-stat-label">Bookings Made</div>
//                 </div>
//               </div>
//               <div className="mb-hero-stat">
//                 <div>
//                   <div className="mb-hero-stat-num">{myProperties.length}</div>
//                   <div className="mb-hero-stat-label">Properties Listed</div>
//                 </div>
//               </div>
//               <div className="mb-hero-stat">
//                 <div>
//                   <div className="mb-hero-stat-num">
//                     {bookings.filter(b => b.status === 'approved').length}
//                   </div>
//                   <div className="mb-hero-stat-label">Approved</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="mb-body">

//           {error && <Alert type="error" message={error} onClose={() => setError('')} />}

//           {/* My Bookings */}
//           <div className="mb-section">
//             <div className="mb-section-head">
//               <div className="mb-section-icon">
//                 <CalendarDays size={18} color="#059669" />
//               </div>
//               <span className="mb-section-title">
//                 My Bookings
//                 {bookings.length > 0 && <span className="mb-section-count">{bookings.length}</span>}
//               </span>
//             </div>

//             {bookings.length === 0 ? (
//               <div className="mb-empty">
//                 <div className="mb-empty-icon"><CalendarDays size={24} color="#059669" /></div>
//                 <div className="mb-empty-text">No bookings yet. Start exploring properties!</div>
//               </div>
//             ) : (
//               <div className="mb-grid">
//                 {bookings.map(b => {
//                   const status = b.status || 'pending';
//                   const cfg = statusConfig[status] || statusConfig.pending;
//                   const Icon = cfg.icon;
//                   return (
//                     <div key={b._id}
//                       className={`mb-bcard`}
//                       onClick={() => navigate(`/property/${b.propertyId?._id}`)}>
//                       <div className="mb-bcard-title">
//                         {b.propertyId?.title || 'Property'}
//                       </div>
//                       <div className="mb-bcard-loc">
//                         <MapPin size={13} color="#ef4444" />
//                         {b.propertyId?.city || '—'}
//                       </div>
//                       <div className="mb-bcard-dates">
//                         <CalendarDays size={13} color="#9ca3af" />
//                         {new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}
//                       </div>
//                       <span className={`mb-status-chip mb-${status}`}>
//                         <Icon size={12} />
//                         {cfg.label}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* My Listed Properties */}
//           <div className="mb-section">
//             <div className="mb-section-head">
//               <div className="mb-section-icon">
//                 <Building2 size={18} color="#059669" />
//               </div>
//               <span className="mb-section-title">
//                 My Listed Properties
//                 {myProperties.length > 0 && <span className="mb-section-count">{myProperties.length}</span>}
//               </span>
//             </div>

//             {myProperties.length === 0 ? (
//               <div className="mb-empty">
//                 <div className="mb-empty-icon"><Home size={24} color="#059669" /></div>
//                 <div className="mb-empty-text">No properties listed yet. Add one to get started!</div>
//               </div>
//             ) : (
//               <div className="mb-grid">
//                 {myProperties.map(p => {
//                   const bCount = propertyBookings[p._id]?.length || 0;
//                   return (
//                     <div key={p._id} className="mb-pcard"
//                       onClick={() => navigate(`/property/${p._id}`)}>
//                       <div className="mb-pcard-title">{p.title}</div>
//                       <div className="mb-pcard-city">
//                         <MapPin size={13} color="#ef4444" /> {p.city}
//                       </div>
//                       <div className="mb-pcard-footer">
//                         <span className="mb-bookings-badge">
//                           <CalendarDays size={12} />
//                           {bCount} booking{bCount !== 1 ? 's' : ''}
//                         </span>
//                         <span className="mb-view-link">
//                           View <ArrowRight size={13} />
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

// export default MyBookings;

// src/pages/MyBookings.jsx
// Seeker sees: My Bookings only
// Owner sees: My Listed Properties only
// Admin sees: Both sections

// import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../utils/api';
// import AuthContext from '../context/AuthContext';
// import Alert from '../components/Alert';
// import { useToast } from '../components/Toast';
// import {
//   MapPin, CheckCircle, XCircle, Clock, Home, CalendarDays,
//   ArrowRight, Building2, BookOpen, Plus
// } from 'lucide-react';

// const STATUS = {
//   approved: { label: 'Approved', Icon: CheckCircle, cls: 'st-approved' },
//   rejected: { label: 'Rejected', Icon: XCircle,     cls: 'st-rejected' },
//   pending:  { label: 'Pending',  Icon: Clock,        cls: 'st-pending'  },
// };

// export default function MyBookings() {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const toast = useToast();
//   const role = user?.role;

//   const [bookings, setBookings] = useState([]);
//   const [myProperties, setMyProperties] = useState([]);
//   const [propBookings, setPropBookings] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => { load(); }, []);

//   const load = async () => {
//     try {
//       if (role === 'user' || role === 'admin') {
//         const res = await api.get('/api/bookings/my');
//         setBookings(res.data);
//       }
//       if (role === 'owner' || role === 'admin') {
//         const propRes = await api.get('/api/properties');
//         const mine = propRes.data.filter(p => p.ownerId === user?.id);
//         setMyProperties(mine);
//         const map = {};
//         for (const p of mine) {
//           try { const b = await api.get(`/api/bookings/property/${p._id}`); map[p._id] = b.data; }
//           catch { map[p._id] = []; }
//         }
//         setPropBookings(map);
//       }
//     } catch { setError('Failed to load data'); }
//     finally { setLoading(false); }
//   };

//   const pageTitle = { user: 'My Bookings', owner: 'Owner Dashboard', admin: 'Dashboard' }[role] || 'Dashboard';

//   if (loading) return (
//     <>
//       <style>{`.mb-load{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#f0faf4;gap:14px;font-family:'DM Sans',sans-serif;}.mb-sp{width:44px;height:44px;border:3px solid #d1fae5;border-top-color:#059669;border-radius:50%;animation:mbs .75s linear infinite;}@keyframes mbs{to{transform:rotate(360deg);}}`}</style>
//       <div className="mb-load"><div className="mb-sp"/><span style={{color:'#6b7280',fontSize:'0.9rem'}}>Loading dashboard…</span></div>
//     </>
//   );

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
//         *{box-sizing:border-box;}
//         .mb-root{font-family:'DM Sans',sans-serif;min-height:100vh;background:#f0faf4;}
//         .mb-hero{background:linear-gradient(160deg,#064e3b 0%,#065f46 55%,#047857 100%);padding:42px 24px 50px;position:relative;overflow:hidden;}
//         .mb-hero::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px);background-size:40px 40px;pointer-events:none;}
//         .mb-hblob{position:absolute;width:340px;height:340px;background:radial-gradient(circle,rgba(110,231,183,0.18),transparent 65%);top:-60px;right:-40px;border-radius:50%;pointer-events:none;}
//         .mb-inner{position:relative;z-index:2;max-width:1280px;margin:0 auto;}
//         .mb-hbadge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:100px;padding:4px 13px;font-size:0.73rem;font-weight:600;color:#a7f3d0;letter-spacing:.4px;text-transform:uppercase;margin-bottom:10px;}
//         .mb-htitle{font-family:'Syne',sans-serif;font-size:clamp(1.6rem,4vw,2.2rem);font-weight:800;color:#fff;letter-spacing:-1px;margin-bottom:5px;}
//         .mb-htitle em{font-style:normal;background:linear-gradient(90deg,#6ee7b7,#34d399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
//         .mb-hsub{color:#a7f3d0;font-size:0.88rem;margin-bottom:18px;}
//         .mb-hstats{display:flex;gap:10px;flex-wrap:wrap;}
//         .mb-hstat{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.14);border-radius:11px;padding:9px 17px;}
//         .mb-hstat-n{font-family:'Syne',sans-serif;font-size:1.35rem;font-weight:800;color:#fff;}
//         .mb-hstat-l{font-size:0.74rem;color:#a7f3d0;font-weight:500;}
//         .mb-body{max-width:1280px;margin:0 auto;padding:32px 20px 60px;}
//         .mb-sec{margin-bottom:42px;}
//         .mb-sec-head{display:flex;align-items:center;gap:10px;margin-bottom:18px;}
//         .mb-sec-ico{width:34px;height:34px;background:#ecfdf5;border:1.5px solid #d1fae5;border-radius:9px;display:flex;align-items:center;justify-content:center;}
//         .mb-sec-title{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:800;color:#0f2d1a;letter-spacing:-0.3px;}
//         .mb-count{background:#d1fae5;color:#065f46;border-radius:100px;font-size:0.7rem;font-weight:800;padding:2px 9px;margin-left:4px;}
//         .mb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;}
//         /* Booking card */
//         .mb-bcard{background:#fff;border-radius:16px;border:1.5px solid #e6f7ef;padding:16px 18px;cursor:pointer;transition:all .22s;box-shadow:0 2px 8px rgba(5,150,105,0.05);}
//         .mb-bcard:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(5,150,105,0.12);border-color:#a7f3d0;}
//         .mb-bc-title{font-family:'Syne',sans-serif;font-size:0.93rem;font-weight:800;color:#0f2d1a;margin-bottom:7px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
//         .mb-bc-loc{display:flex;align-items:center;gap:4px;font-size:0.8rem;color:#6b7280;margin-bottom:9px;}
//         .mb-bc-dates{display:flex;align-items:center;gap:5px;font-size:0.77rem;color:#6b7280;background:#f9fafb;border-radius:7px;padding:5px 9px;margin-bottom:11px;}
//         .mb-chip{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:100px;font-size:0.72rem;font-weight:700;}
//         .st-approved{background:#dcfce7;color:#166534;}
//         .st-rejected{background:#ffe4e6;color:#9f1239;}
//         .st-pending{background:#fef9c3;color:#854d0e;}
//         /* Property card */
//         .mb-pcard{background:#fff;border-radius:16px;border:1.5px solid #e6f7ef;padding:16px 18px;cursor:pointer;transition:all .22s;box-shadow:0 2px 8px rgba(5,150,105,0.05);}
//         .mb-pcard:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(5,150,105,0.12);border-color:#a7f3d0;}
//         .mb-pc-title{font-family:'Syne',sans-serif;font-size:0.93rem;font-weight:800;color:#0f2d1a;margin-bottom:4px;}
//         .mb-pc-city{font-size:0.8rem;color:#6b7280;margin-bottom:11px;display:flex;align-items:center;gap:4px;}
//         .mb-pc-foot{display:flex;align-items:center;justify-content:space-between;padding-top:9px;border-top:1px solid #f0fdf4;}
//         .mb-bchip{display:inline-flex;align-items:center;gap:4px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:100px;padding:3px 10px;font-size:0.72rem;font-weight:700;color:#065f46;}
//         .mb-pbchip{background:#fef9c3;border-color:#fef08a;color:#854d0e;}
//         .mb-vlink{font-size:0.78rem;font-weight:700;color:#059669;display:flex;align-items:center;gap:3px;}
//         /* Empty */
//         .mb-empty{background:#fff;border-radius:14px;border:1.5px solid #e6f7ef;padding:36px 24px;text-align:center;}
//         .mb-empty-ico{width:52px;height:52px;background:#ecfdf5;border:1.5px solid #d1fae5;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;}
//         .mb-empty-txt{color:#6b7280;font-size:0.875rem;margin-bottom:14px;}
//         .mb-empty-link{display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,#059669,#047857);color:#fff;padding:9px 18px;border-radius:10px;font-size:0.855rem;font-weight:700;text-decoration:none;box-shadow:0 4px 12px rgba(5,150,105,0.25);font-family:'DM Sans',sans-serif;transition:all .18s;}
//         .mb-empty-link:hover{transform:translateY(-1px);}
//       `}</style>

//       <div className="mb-root">
//         <div className="mb-hero">
//           <div className="mb-hblob"/>
//           <div className="mb-inner">
//             <div className="mb-hbadge"><BookOpen size={11}/> {pageTitle}</div>
//             <h1 className="mb-htitle">{pageTitle.split(' ')[0]} <em>{pageTitle.split(' ').slice(1).join(' ') || 'Overview'}</em></h1>
//             <p className="mb-hsub">{role==='user' ? 'Track all your property booking requests' : role==='owner' ? 'Manage your listings and incoming bookings' : 'Full platform overview'}</p>
//             <div className="mb-hstats">
//               {(role==='user'||role==='admin') && <>
//                 <div className="mb-hstat"><div className="mb-hstat-n">{bookings.length}</div><div className="mb-hstat-l">Bookings Made</div></div>
//                 <div className="mb-hstat"><div className="mb-hstat-n">{bookings.filter(b=>b.status==='approved').length}</div><div className="mb-hstat-l">Approved</div></div>
//               </>}
//               {(role==='owner'||role==='admin') && <>
//                 <div className="mb-hstat"><div className="mb-hstat-n">{myProperties.length}</div><div className="mb-hstat-l">Properties Listed</div></div>
//                 <div className="mb-hstat"><div className="mb-hstat-n">{Object.values(propBookings).flat().length}</div><div className="mb-hstat-l">Total Requests</div></div>
//                 <div className="mb-hstat"><div className="mb-hstat-n">{Object.values(propBookings).flat().filter(b=>!b.status||b.status==='pending').length}</div><div className="mb-hstat-l">Pending Review</div></div>
//               </>}
//             </div>
//           </div>
//         </div>

//         <div className="mb-body">
//           {error && <Alert type="error" message={error} onClose={() => setError('')}/>}

//           {/* ── Seeker: My Bookings ── */}
//           {(role==='user'||role==='admin') && (
//             <div className="mb-sec">
//               <div className="mb-sec-head">
//                 <div className="mb-sec-ico"><CalendarDays size={17} color="#059669"/></div>
//                 <span className="mb-sec-title">My Bookings{bookings.length>0&&<span className="mb-count">{bookings.length}</span>}</span>
//               </div>
//               {bookings.length===0 ? (
//                 <div className="mb-empty">
//                   <div className="mb-empty-ico"><CalendarDays size={22} color="#059669"/></div>
//                   <div className="mb-empty-txt">No bookings yet. Start exploring properties!</div>
//                   <Link to="/" className="mb-empty-link">Browse Listings →</Link>
//                 </div>
//               ) : (
//                 <div className="mb-grid">
//                   {bookings.map(b => {
//                     const s = b.status||'pending'; const cfg = STATUS[s]||STATUS.pending; const Icon = cfg.Icon;
//                     return (
//                       <div key={b._id} className="mb-bcard" onClick={()=>navigate(`/property/${b.propertyId?._id||b.propertyId}`)}>
//                         <div className="mb-bc-title">{b.propertyId?.title||'Property'}</div>
//                         <div className="mb-bc-loc"><MapPin size={12} color="#ef4444"/>{b.propertyId?.city||'—'}</div>
//                         <div className="mb-bc-dates"><CalendarDays size={12} color="#9ca3af"/>{new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}</div>
//                         <span className={`mb-chip ${cfg.cls}`}><Icon size={11}/> {cfg.label}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ── Owner: My Listed Properties ── */}
//           {(role==='owner'||role==='admin') && (
//             <div className="mb-sec">
//               <div className="mb-sec-head">
//                 <div className="mb-sec-ico"><Building2 size={17} color="#059669"/></div>
//                 <span className="mb-sec-title">My Listed Properties{myProperties.length>0&&<span className="mb-count">{myProperties.length}</span>}</span>
//               </div>
//               {myProperties.length===0 ? (
//                 <div className="mb-empty">
//                   <div className="mb-empty-ico"><Home size={22} color="#059669"/></div>
//                   <div className="mb-empty-txt">No properties listed yet. Add your first one!</div>
//                   <Link to="/add-property" className="mb-empty-link"><Plus size={14}/> Add Property</Link>
//                 </div>
//               ) : (
//                 <div className="mb-grid">
//                   {myProperties.map(p => {
//                     const bList = propBookings[p._id]||[]; const pending = bList.filter(b=>!b.status||b.status==='pending').length;
//                     return (
//                       <div key={p._id} className="mb-pcard" onClick={()=>navigate(`/property/${p._id}`)}>
//                         <div className="mb-pc-title">{p.title}</div>
//                         <div className="mb-pc-city"><MapPin size={12} color="#ef4444"/>{p.city}</div>
//                         <div className="mb-pc-foot">
//                           <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
//                             <span className="mb-bchip"><CalendarDays size={11}/>{bList.length} request{bList.length!==1?'s':''}</span>
//                             {pending>0&&<span className={`mb-bchip mb-pbchip`}>⏳ {pending} pending</span>}
//                           </div>
//                           <span className="mb-vlink">View <ArrowRight size={12}/></span>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// src/pages/MyBookings.jsx
//
// Seeker  → "Active Bookings" + "Past Bookings" (faded, with countdown to auto-delete)
//           + PDF download on every card
// Owner   → "My Listed Properties" + per-property booking list
//           Past bookings shown separately with countdown, PDF for each
// Admin   → Both seeker section AND owner section
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';
import Alert from '../components/Alert';
import { useToast } from '../components/Toast';
import {
  MapPin, CheckCircle, XCircle, Clock, Home, CalendarDays,
  ArrowRight, Building2, BookOpen, Plus, AlertTriangle, FileText
} from 'lucide-react';

// ── Helpers ───────────────────────────────────────────────────────────────────
const today = () => { const d = new Date(); d.setHours(0,0,0,0); return d; };

function isPast(booking) {
  if (!booking.endDate) return false;
  const end = new Date(booking.endDate); end.setHours(0,0,0,0);
  return end < today();
}

function daysUntilDelete(booking) {
  if (!booking.endDate) return null;
  const end = new Date(booking.endDate); end.setHours(0,0,0,0);
  const deleteOn = new Date(end); deleteOn.setDate(deleteOn.getDate() + 10);
  return Math.ceil((deleteOn - today()) / (1000 * 60 * 60 * 24));
}

// ── Invoice generator ─────────────────────────────────────────────────────────
function downloadBookingPDF(booking, propertyInfo) {
  const invoiceNo = booking._id?.toString().slice(-8).toUpperCase() || 'UNKNOWN';
  const propTitle = propertyInfo?.title || booking.propertyId?.title || 'Property';
  const propCity  = propertyInfo?.city  || booking.propertyId?.city  || '';
  const price     = propertyInfo?.price || booking.propertyId?.price || null;
  const statusColor = { approved:'#166534', rejected:'#9f1239', pending:'#854d0e' }[booking.status||'pending'] || '#854d0e';
  const statusBg    = { approved:'#dcfce7', rejected:'#ffe4e6', pending:'#fef9c3' }[booking.status||'pending'] || '#fef9c3';

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>NestFind Invoice #${invoiceNo}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;background:#f0faf4;padding:40px 20px;color:#0f2d1a;}
.page{background:#fff;max-width:700px;margin:0 auto;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(6,78,59,.15);}
.header{background:linear-gradient(135deg,#064e3b 0%,#065f46 60%,#047857 100%);padding:32px 40px;position:relative;overflow:hidden;}
.header::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:32px 32px;}
.brand{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:#fff;letter-spacing:-1px;position:relative;z-index:1;}
.brand em{font-style:normal;color:#6ee7b7;}
.header-sub{color:#a7f3d0;font-size:.85rem;margin-top:4px;position:relative;z-index:1;}
.invoice-row{display:flex;align-items:center;justify-content:space-between;margin-top:20px;position:relative;z-index:1;}
.invoice-num{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:100px;padding:5px 16px;font-size:.78rem;font-weight:700;color:#d1fae5;letter-spacing:.5px;}
.gen-date{font-size:.75rem;color:#6ee7b7;}
.body{padding:32px 40px;}
.status-chip{display:inline-flex;align-items:center;gap:6px;padding:7px 18px;border-radius:100px;font-size:.82rem;font-weight:700;background:${statusBg};color:${statusColor};border:1px solid ${statusColor}44;margin-bottom:24px;}
.divider{height:1px;background:linear-gradient(to right,#d1fae5,transparent);margin:20px 0;}
.section-title{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:#9ca3af;margin-bottom:12px;}
.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;}
.detail-item{background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:13px 16px;}
.detail-item.wide{grid-column:1/-1;}
.detail-label{font-size:.7rem;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:.3px;margin-bottom:4px;}
.detail-value{font-size:.92rem;font-weight:700;color:#0f2d1a;}
.price-box{background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1.5px solid #a7f3d0;border-radius:14px;padding:18px 22px;display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
.price-value{font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;color:#064e3b;}
.note{background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:13px 16px;font-size:.8rem;color:#92400e;line-height:1.6;}
.footer{background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 40px;display:flex;align-items:center;justify-content:space-between;}
.footer-brand{font-family:'Syne',sans-serif;font-size:.88rem;font-weight:800;color:#059669;}
.footer-brand em{font-style:normal;color:#064e3b;}
.footer-text{font-size:.72rem;color:#9ca3af;}
@media print{body{background:#fff;padding:0;}.page{box-shadow:none;border-radius:0;}}
</style></head><body>
<div class="page">
  <div class="header">
    <div class="brand">Nest<em>Find</em></div>
    <div class="header-sub">Booking Confirmation Invoice</div>
    <div class="invoice-row">
      <span class="invoice-num">INV # ${invoiceNo}</span>
      <span class="gen-date">Generated: ${new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</span>
    </div>
  </div>
  <div class="body">
    <div class="status-chip">${booking.status==='approved'?'✓ Approved':booking.status==='rejected'?'✗ Rejected':'⏳ Pending Review'}</div>
    <div class="section-title">Property Details</div>
    <div class="detail-grid">
      <div class="detail-item wide"><div class="detail-label">Property Name</div><div class="detail-value">${propTitle}</div></div>
      <div class="detail-item"><div class="detail-label">City</div><div class="detail-value">${propCity||'—'}</div></div>
      <div class="detail-item"><div class="detail-label">Property Type</div><div class="detail-value">${propertyInfo?.propertyType||booking.propertyId?.propertyType||'—'}</div></div>
    </div>
    <div class="divider"></div>
    <div class="section-title">Booking Details</div>
    <div class="detail-grid">
      <div class="detail-item"><div class="detail-label">Tenant Name</div><div class="detail-value">${booking.name||'—'}</div></div>
      <div class="detail-item"><div class="detail-label">Phone</div><div class="detail-value">${booking.phone||'—'}</div></div>
      <div class="detail-item"><div class="detail-label">Move-in Date</div><div class="detail-value">${new Date(booking.startDate).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</div></div>
      <div class="detail-item"><div class="detail-label">Move-out Date</div><div class="detail-value">${new Date(booking.endDate).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</div></div>
      <div class="detail-item"><div class="detail-label">Tenant Type</div><div class="detail-value">${booking.userType||'—'}</div></div>
      <div class="detail-item"><div class="detail-label">Status</div><div class="detail-value" style="color:${statusColor}">${(booking.status||'pending').charAt(0).toUpperCase()+(booking.status||'pending').slice(1)}</div></div>
    </div>
    ${price?`<div class="price-box"><div style="font-size:.85rem;color:#065f46;font-weight:600">Monthly Rent</div><div class="price-value">₹${Number(price).toLocaleString('en-IN')}<span style="font-size:.9rem;font-weight:500;color:#065f46">/mo</span></div></div>`:''}
    <div class="note">⚠️ ${booking.status==='approved'?'This booking has been approved. Contact the owner to confirm move-in arrangements.':booking.status==='rejected'?'This booking was not approved. Browse other listings on NestFind.':'The owner will review your request and respond shortly.'}</div>
  </div>
  <div class="footer">
    <span class="footer-brand">Nest<em>Find</em></span>
    <span class="footer-text">Zero broker fees · 100% Verified · ${new Date().toLocaleString('en-IN')}</span>
  </div>
</div>
<script>window.onload=()=>window.print();</script>
</body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `NestFind_Invoice_${invoiceNo}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS = {
  approved: { label: 'Approved', Icon: CheckCircle, cls: 'st-approved' },
  rejected: { label: 'Rejected', Icon: XCircle,     cls: 'st-rejected' },
  pending:  { label: 'Pending',  Icon: Clock,        cls: 'st-pending'  },
};

// ── Booking Card — clickable, navigates to property details ───────────────────
function BookingCard({ booking, onDownload, navigate }) {
  const past     = isPast(booking);
  const daysLeft = past ? daysUntilDelete(booking) : null;
  const status   = booking.status || 'pending';
  const cfg      = STATUS[status] || STATUS.pending;
  const Icon     = cfg.Icon;

  // propertyId can be a populated object OR a raw string ID
  const propId    = typeof booking.propertyId === 'object'
    ? booking.propertyId?._id
    : booking.propertyId;
  const propTitle = booking.propertyId?.title || 'Property';
  const propCity  = booking.propertyId?.city  || '';

  return (
    <div
      className={`mb-bcard ${past ? 'mb-bcard-past' : ''}`}
      onClick={() => propId && navigate(`/property/${propId}`)}
      style={{ cursor: propId ? 'pointer' : 'default' }}
    >
      {/* Past ribbon */}
      {past && (
        <div className="mb-past-ribbon">
          <AlertTriangle size={11}/>
          Booking ended ·{' '}
          {daysLeft > 0
            ? `auto-deletes in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`
            : 'deleting soon'}
        </div>
      )}

      <div className="mb-bc-title">{propTitle}</div>
      {propCity && <div className="mb-bc-loc"><MapPin size={12} color="#ef4444"/>{propCity}</div>}

      <div className="mb-bc-dates">
        <CalendarDays size={12} color="#9ca3af"/>
        {new Date(booking.startDate).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
        <span style={{ color:'#d1d5db', margin:'0 4px' }}>→</span>
        {new Date(booking.endDate).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
      </div>

      <div className="mb-bc-footer">
        <span className={`mb-chip ${cfg.cls}`}><Icon size={11}/> {cfg.label}</span>
        {/* e.stopPropagation() so Invoice button doesn't trigger card navigation */}
        <button
          className="mb-pdf-btn"
          onClick={e => { e.stopPropagation(); onDownload(booking); }}
          title="Download invoice"
        >
          <FileText size={13}/><span>Invoice</span>
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function MyBookings() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast    = useToast();
  const role     = user?.role;

  const [bookings,     setBookings]     = useState([]);
  const [myProperties, setMyProperties] = useState([]);
  const [propBookings, setPropBookings] = useState({});
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState('');

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      if (role === 'user' || role === 'admin') {
        const res = await api.get('/api/bookings/my');
        setBookings(res.data);
      }
      if (role === 'owner' || role === 'admin') {
        const propRes = await api.get('/api/properties');
        const mine = propRes.data.filter(p => p.ownerId === user?.id);
        setMyProperties(mine);
        const map = {};
        for (const p of mine) {
          try { const b = await api.get(`/api/bookings/property/${p._id}`); map[p._id] = b.data; }
          catch { map[p._id] = []; }
        }
        setPropBookings(map);
      }
    } catch { setError('Failed to load data'); }
    finally { setLoading(false); }
  };

  const activeBookings = bookings.filter(b => !isPast(b));
  const pastBookings   = bookings.filter(b =>  isPast(b));
  const allBookings    = Object.values(propBookings).flat();
  const pendingCount   = allBookings.filter(b => !b.status || b.status === 'pending').length;
  const approvedCount  = allBookings.filter(b => b.status === 'approved').length;

  const handleDownload = (booking) => {
    const propInfo = typeof booking.propertyId === 'object' ? booking.propertyId : null;
    downloadBookingPDF(booking, propInfo);
    toast.success('Invoice ready!', 'Opening — use Ctrl+P to save as PDF');
  };

  const pageTitle = { user:'My Bookings', owner:'Owner Dashboard', admin:'Dashboard' }[role] || 'Dashboard';

  if (loading) return (
    <>
      <style>{`.mb-load{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#f0faf4;gap:14px;font-family:'DM Sans',sans-serif;}.mb-sp{width:44px;height:44px;border:3px solid #d1fae5;border-top-color:#059669;border-radius:50%;animation:mbs .75s linear infinite;}@keyframes mbs{to{transform:rotate(360deg);}}`}</style>
      <div className="mb-load"><div className="mb-sp"/><span style={{color:'#6b7280',fontSize:'0.9rem'}}>Loading dashboard…</span></div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;}
        .mb-root{font-family:'DM Sans',sans-serif;min-height:100vh;background:#f0faf4;}
        .mb-hero{background:linear-gradient(160deg,#064e3b 0%,#065f46 55%,#047857 100%);padding:42px 24px 50px;position:relative;overflow:hidden;}
        .mb-hero::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:40px 40px;pointer-events:none;}
        .mb-hblob{position:absolute;width:340px;height:340px;background:radial-gradient(circle,rgba(110,231,183,.18),transparent 65%);top:-60px;right:-40px;border-radius:50%;pointer-events:none;}
        .mb-inner{position:relative;z-index:2;max-width:1280px;margin:0 auto;}
        .mb-hbadge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:100px;padding:4px 13px;font-size:.73rem;font-weight:600;color:#a7f3d0;letter-spacing:.4px;text-transform:uppercase;margin-bottom:10px;}
        .mb-htitle{font-family:'Syne',sans-serif;font-size:clamp(1.7rem,4vw,2.3rem);font-weight:800;color:#fff;letter-spacing:-1px;margin-bottom:5px;}
        .mb-htitle em{font-style:normal;background:linear-gradient(90deg,#6ee7b7,#34d399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .mb-hsub{color:#a7f3d0;font-size:.88rem;margin-bottom:18px;}
        .mb-hstats{display:flex;gap:10px;flex-wrap:wrap;}
        .mb-hstat{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.14);border-radius:11px;padding:9px 17px;}
        .mb-hstat-n{font-family:'Syne',sans-serif;font-size:1.35rem;font-weight:800;color:#fff;}
        .mb-hstat-l{font-size:.74rem;color:#a7f3d0;font-weight:500;}
        .mb-body{max-width:1280px;margin:0 auto;padding:32px 20px 60px;}
        .mb-sec{margin-bottom:40px;}
        .mb-sec-head{display:flex;align-items:center;gap:10px;margin-bottom:18px;}
        .mb-sec-ico{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .mb-sec-ico-active{background:#ecfdf5;border:1.5px solid #d1fae5;}
        .mb-sec-ico-past{background:#fef9c3;border:1.5px solid #fde68a;}
        .mb-sec-ico-owner{background:#eff6ff;border:1.5px solid #bfdbfe;}
        .mb-sec-title{font-family:'Syne',sans-serif;font-size:1.08rem;font-weight:800;color:#0f2d1a;letter-spacing:-.3px;}
        .mb-count{background:#d1fae5;color:#065f46;border-radius:100px;font-size:.7rem;font-weight:800;padding:2px 9px;margin-left:4px;}
        .mb-count-past{background:#fef9c3;color:#854d0e;}
        .mb-past-hint{display:flex;align-items:flex-start;gap:10px;background:#fffbeb;border:1.5px solid #fde68a;border-radius:12px;padding:11px 16px;margin-bottom:16px;font-size:.82rem;color:#92400e;line-height:1.55;}
        .mb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;}

        /* ── Booking card — pointer cursor + press effect ── */
        .mb-bcard{background:#fff;border-radius:16px;border:1.5px solid #e6f7ef;padding:16px 18px;transition:all .22s;box-shadow:0 2px 8px rgba(5,150,105,.05);display:flex;flex-direction:column;gap:0;}
        .mb-bcard:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(5,150,105,.12);border-color:#a7f3d0;}
        .mb-bcard:active{transform:scale(0.98);}
        .mb-bcard-past{border-color:#fde68a!important;background:#fffdf5;opacity:.9;}
        .mb-bcard-past:hover{border-color:#fbbf24!important;box-shadow:0 8px 24px rgba(251,191,36,.15)!important;}
        .mb-past-ribbon{display:flex;align-items:center;gap:6px;background:#fef9c3;border-radius:8px;padding:5px 10px;font-size:.72rem;font-weight:700;color:#854d0e;margin-bottom:10px;}
        .mb-bc-title{font-family:'Syne',sans-serif;font-size:.93rem;font-weight:800;color:#0f2d1a;margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .mb-bc-loc{display:flex;align-items:center;gap:4px;font-size:.8rem;color:#6b7280;margin-bottom:8px;}
        .mb-bc-dates{display:flex;align-items:center;gap:5px;font-size:.77rem;color:#6b7280;background:#f9fafb;border-radius:7px;padding:5px 9px;margin-bottom:11px;}
        .mb-bc-footer{display:flex;align-items:center;justify-content:space-between;margin-top:auto;}
        .mb-chip{display:inline-flex;align-items:center;gap:4px;padding:4px 11px;border-radius:100px;font-size:.72rem;font-weight:700;}
        .st-approved{background:#dcfce7;color:#166534;}
        .st-rejected{background:#ffe4e6;color:#9f1239;}
        .st-pending{background:#fef9c3;color:#854d0e;}
        .mb-pdf-btn{display:inline-flex;align-items:center;gap:5px;background:#f0fdf4;border:1.5px solid #d1fae5;border-radius:8px;padding:5px 11px;font-size:.75rem;font-weight:700;color:#059669;cursor:pointer;transition:all .18s;font-family:'DM Sans',sans-serif;}
        .mb-pdf-btn:hover{background:#d1fae5;border-color:#a7f3d0;transform:translateY(-1px);}
        .mb-bchip{display:inline-flex;align-items:center;gap:4px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:100px;padding:3px 10px;font-size:.72rem;font-weight:700;color:#065f46;}
        .mb-pbchip{background:#fef9c3;border-color:#fef08a;color:#854d0e;}
        .mb-prop-section{background:#fff;border-radius:16px;border:1.5px solid #e6f7ef;padding:18px 20px;box-shadow:0 2px 8px rgba(5,150,105,.05);}
        .mb-prop-header{display:flex;align-items:center;justify-content:space-between;cursor:pointer;}
        .mb-prop-title{font-family:'Syne',sans-serif;font-size:.95rem;font-weight:800;color:#0f2d1a;}
        .mb-prop-meta{font-size:.78rem;color:#6b7280;display:flex;align-items:center;gap:4px;margin-top:2px;}
        .mb-chevron{transition:transform .2s;color:#9ca3af;}
        .mb-chevron.open{transform:rotate(180deg);}
        .mb-prop-bookings{margin-top:14px;padding-top:14px;border-top:1px solid #f0fdf4;display:flex;flex-direction:column;gap:10px;}
        .mb-prop-brow{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;background:#f9fafb;border-radius:10px;padding:10px 13px;}
        .mb-prop-brow.past-row{background:#fffdf5;border:1px solid #fde68a;}
        .mb-prop-brow-left{display:flex;flex-direction:column;gap:3px;}
        .mb-prop-brow-name{font-size:.85rem;font-weight:700;color:#0f2d1a;}
        .mb-prop-brow-dates{font-size:.75rem;color:#6b7280;display:flex;align-items:center;gap:4px;}
        .mb-prop-brow-right{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
        .mb-prop-past-tag{font-size:.68rem;font-weight:700;color:#854d0e;background:#fef9c3;border-radius:100px;padding:2px 8px;}
        .mb-empty{background:#fff;border-radius:14px;border:1.5px solid #e6f7ef;padding:36px 24px;text-align:center;}
        .mb-empty-ico{width:52px;height:52px;background:#ecfdf5;border:1.5px solid #d1fae5;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;}
        .mb-empty-txt{color:#6b7280;font-size:.875rem;margin-bottom:14px;}
        .mb-empty-link{display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,#059669,#047857);color:#fff;padding:9px 18px;border-radius:10px;font-size:.855rem;font-weight:700;text-decoration:none;box-shadow:0 4px 12px rgba(5,150,105,.25);font-family:'DM Sans',sans-serif;transition:all .18s;}
        .mb-empty-link:hover{transform:translateY(-1px);}
      `}</style>

      <div className="mb-root">
        <div className="mb-hero">
          <div className="mb-hblob"/>
          <div className="mb-inner">
            <div className="mb-hbadge"><BookOpen size={11}/> {pageTitle}</div>
            <h1 className="mb-htitle">{pageTitle.split(' ')[0]} <em>{pageTitle.split(' ').slice(1).join(' ') || 'Overview'}</em></h1>
            <p className="mb-hsub">
              {role==='user' ? 'Click any booking to view the property · Download invoices anytime' :
               role==='owner' ? 'Manage your listings and all incoming booking requests' :
               'Full platform booking overview'}
            </p>
            <div className="mb-hstats">
              {(role==='user'||role==='admin') && <>
                <div className="mb-hstat"><div className="mb-hstat-n">{activeBookings.length}</div><div className="mb-hstat-l">Active Bookings</div></div>
                <div className="mb-hstat"><div className="mb-hstat-n">{bookings.filter(b=>b.status==='approved').length}</div><div className="mb-hstat-l">Approved</div></div>
                {pastBookings.length > 0 && <div className="mb-hstat"><div className="mb-hstat-n" style={{color:'#fbbf24'}}>{pastBookings.length}</div><div className="mb-hstat-l">Past / Ended</div></div>}
              </>}
              {(role==='owner'||role==='admin') && <>
                <div className="mb-hstat"><div className="mb-hstat-n">{myProperties.length}</div><div className="mb-hstat-l">Properties Listed</div></div>
                <div className="mb-hstat"><div className="mb-hstat-n">{allBookings.length}</div><div className="mb-hstat-l">Total Requests</div></div>
                <div className="mb-hstat"><div className="mb-hstat-n" style={{color:pendingCount>0?'#fbbf24':'#fff'}}>{pendingCount}</div><div className="mb-hstat-l">Pending Review</div></div>
                <div className="mb-hstat"><div className="mb-hstat-n">{approvedCount}</div><div className="mb-hstat-l">Approved</div></div>
              </>}
            </div>
          </div>
        </div>

        <div className="mb-body">
          {error && <Alert type="error" message={error} onClose={() => setError('')}/>}

          {/* ── SEEKER ── */}
          {(role==='user'||role==='admin') && (
            <>
              <div className="mb-sec">
                <div className="mb-sec-head">
                  <div className="mb-sec-ico mb-sec-ico-active"><CalendarDays size={17} color="#059669"/></div>
                  <span className="mb-sec-title">
                    Active Bookings
                    {activeBookings.length > 0 && <span className="mb-count">{activeBookings.length}</span>}
                  </span>
                </div>
                {activeBookings.length === 0 ? (
                  <div className="mb-empty">
                    <div className="mb-empty-ico"><CalendarDays size={22} color="#059669"/></div>
                    <div className="mb-empty-txt">No active bookings. Start exploring properties!</div>
                    <Link to="/" className="mb-empty-link">Browse Listings →</Link>
                  </div>
                ) : (
                  <div className="mb-grid">
                    {activeBookings.map(b => (
                      <BookingCard key={b._id} booking={b} onDownload={handleDownload} navigate={navigate}/>
                    ))}
                  </div>
                )}
              </div>

              {pastBookings.length > 0 && (
                <div className="mb-sec">
                  <div className="mb-sec-head">
                    <div className="mb-sec-ico mb-sec-ico-past"><Clock size={17} color="#d97706"/></div>
                    <span className="mb-sec-title" style={{color:'#92400e'}}>
                      Past Bookings
                      <span className="mb-count mb-count-past">{pastBookings.length}</span>
                    </span>
                  </div>
                  <div className="mb-past-hint">
                    <AlertTriangle size={15} style={{flexShrink:0,marginTop:2}} color="#d97706"/>
                    <span>These bookings have ended. Click any card to revisit the property. They will be <strong>automatically removed</strong> 10 days after the end date.</span>
                  </div>
                  <div className="mb-grid">
                    {pastBookings.map(b => (
                      <BookingCard key={b._id} booking={b} onDownload={handleDownload} navigate={navigate}/>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── OWNER ── */}
          {(role==='owner'||role==='admin') && (
            <div className="mb-sec">
              <div className="mb-sec-head">
                <div className="mb-sec-ico mb-sec-ico-owner"><Building2 size={17} color="#2563eb"/></div>
                <span className="mb-sec-title">
                  My Listed Properties
                  {myProperties.length > 0 && <span className="mb-count" style={{background:'#dbeafe',color:'#1e40af'}}>{myProperties.length}</span>}
                </span>
              </div>
              {myProperties.length === 0 ? (
                <div className="mb-empty">
                  <div className="mb-empty-ico"><Home size={22} color="#059669"/></div>
                  <div className="mb-empty-txt">No properties listed yet. Add your first one!</div>
                  <Link to="/add-property" className="mb-empty-link"><Plus size={14}/> Add Property</Link>
                </div>
              ) : (
                <div style={{display:'flex',flexDirection:'column',gap:14}}>
                  {myProperties.map(p => {
                    const bList  = propBookings[p._id] || [];
                    const active = bList.filter(b => !isPast(b));
                    const past   = bList.filter(b =>  isPast(b));
                    const pending = active.filter(b => !b.status || b.status === 'pending').length;
                    return (
                      <OwnerPropertyCard
                        key={p._id}
                        property={p}
                        activeBookings={active}
                        pastBookings={past}
                        pendingCount={pending}
                        onDownload={handleDownload}
                        onNavigate={navigate}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ── Owner property card ───────────────────────────────────────────────────────
function OwnerPropertyCard({ property, activeBookings, pastBookings, pendingCount, onDownload, onNavigate }) {
  const [open, setOpen] = useState(activeBookings.length > 0 || pastBookings.length > 0);
  const allB = [...activeBookings, ...pastBookings];

  return (
    <div className="mb-prop-section">
      <div className="mb-prop-header" onClick={() => setOpen(o => !o)}>
        <div style={{flex:1}}>
          <div className="mb-prop-title">{property.title}</div>
          <div className="mb-prop-meta"><MapPin size={12} color="#ef4444"/>{property.city}</div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
          {allB.length > 0 && <span className="mb-bchip"><CalendarDays size={11}/>{allB.length} request{allB.length!==1?'s':''}</span>}
          {pendingCount > 0 && <span className="mb-bchip mb-pbchip">⏳ {pendingCount} pending</span>}
          <button
            onClick={e => { e.stopPropagation(); onNavigate(`/property/${property._id}`); }}
            style={{background:'#f0fdf4',border:'none',cursor:'pointer',color:'#059669',fontWeight:700,fontSize:'.78rem',display:'flex',alignItems:'center',gap:3,fontFamily:"'DM Sans',sans-serif",padding:'5px 10px',borderRadius:8,transition:'background .18s'}}
          >
            View <ArrowRight size={12}/>
          </button>
          <svg className={`mb-chevron ${open?'open':''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </div>

      {open && allB.length > 0 && (
        <div className="mb-prop-bookings">
          {activeBookings.map(b => {
            const status = b.status||'pending'; const cfg = STATUS[status]||STATUS.pending; const Icon = cfg.Icon;
            return (
              <div key={b._id} className="mb-prop-brow">
                <div className="mb-prop-brow-left">
                  <div className="mb-prop-brow-name">{b.name}{b.userType ? ` · ${b.userType}` : ''}</div>
                  <div className="mb-prop-brow-dates">
                    <CalendarDays size={11} color="#9ca3af"/>
                    {new Date(b.startDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
                    <span style={{color:'#d1d5db'}}>→</span>
                    {new Date(b.endDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
                  </div>
                </div>
                <div className="mb-prop-brow-right">
                  <span className={`mb-chip ${cfg.cls}`}><Icon size={11}/> {cfg.label}</span>
                  <button className="mb-pdf-btn" onClick={() => onDownload({ ...b, propertyId: b.propertyId || property })}>
                    <FileText size={12}/> Invoice
                  </button>
                </div>
              </div>
            );
          })}

          {pastBookings.length > 0 && (
            <>
              <div style={{fontSize:'.72rem',fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'.4px',margin:'6px 0 4px',paddingLeft:4}}>
                Past bookings (ended) · auto-delete in 10 days
              </div>
              {pastBookings.map(b => {
                const status = b.status||'pending'; const cfg = STATUS[status]||STATUS.pending; const Icon = cfg.Icon;
                const dLeft = daysUntilDelete(b);
                return (
                  <div key={b._id} className="mb-prop-brow past-row">
                    <div className="mb-prop-brow-left">
                      <div className="mb-prop-brow-name" style={{opacity:.75}}>{b.name}{b.userType ? ` · ${b.userType}` : ''}</div>
                      <div className="mb-prop-brow-dates" style={{opacity:.75}}>
                        <CalendarDays size={11} color="#9ca3af"/>
                        {new Date(b.startDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
                        <span style={{color:'#d1d5db'}}>→</span>
                        {new Date(b.endDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}
                      </div>
                    </div>
                    <div className="mb-prop-brow-right">
                      <span className={`mb-chip ${cfg.cls}`} style={{opacity:.7}}><Icon size={11}/> {cfg.label}</span>
                      {dLeft !== null && dLeft > 0 && <span className="mb-prop-past-tag">deletes in {dLeft}d</span>}
                      <button className="mb-pdf-btn" onClick={() => onDownload({ ...b, propertyId: b.propertyId || property })}>
                        <FileText size={12}/> Invoice
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}

      {open && allB.length === 0 && (
        <div style={{marginTop:14,paddingTop:14,borderTop:'1px solid #f0fdf4',textAlign:'center',color:'#9ca3af',fontSize:'.82rem'}}>
          No booking requests yet for this property
        </div>
      )}
    </div>
  );
}