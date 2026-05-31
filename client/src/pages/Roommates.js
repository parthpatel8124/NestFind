// import React, { useEffect, useState, useContext } from 'react';
// import AuthContext from '../context/AuthContext';
// import { Link } from 'react-router-dom';
// import api from '../utils/api';

// function Roommates() {

//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const { user } = useContext(AuthContext);

//   const [mineOnly, setMineOnly] = useState(false);

//   useEffect(() => {
//     fetchRoommates();
//   }, [mineOnly]);

//   const fetchRoommates = async () => {

//     setLoading(true);
//     setError('');

//     try {

//       const res = await api.get(
//         `/api/roommates${mineOnly ? '?mine=true' : ''}`
//       );

//       setList(res.data);

//     } catch (err) {

//       setError('Failed to load roommate listings');

//     } finally {

//       setLoading(false);

//     }

//   };

//   const handleToggleMine = () => {
//     setMineOnly(prev => !prev);
//   };

//   return (

//     <div className="min-h-screen bg-gray-50 py-8">

//       <div className="max-w-6xl mx-auto px-4">

//         <div className="mb-6">

//           <h1 className="text-3xl font-bold">
//             Roommate Requests
//           </h1>

//           <p className="text-gray-600">
//             Find or post roommate requests
//           </p>

//         </div>


//         <div className="mb-6 flex items-center gap-4">

//           {user ? (

//             <Link
//               to="/roommates/new"
//               className="px-4 py-2 bg-blue-600 text-white rounded"
//             >
//               Post a Request
//             </Link>

//           ) : (

//             <Link
//               to="/login"
//               className="px-4 py-2 bg-blue-600 text-white rounded"
//             >
//               Login to Post
//             </Link>

//           )}

//           {user && (

//             <label className="ml-4 inline-flex items-center">

//               <input
//                 type="checkbox"
//                 checked={mineOnly}
//                 onChange={handleToggleMine}
//                 className="mr-2"
//               />

//               <span className="text-sm text-gray-600">
//                 Show my requests only
//               </span>

//             </label>

//           )}

//         </div>


//         {error && (
//           <p className="text-red-600 mb-4">
//             {error}
//           </p>
//         )}


//         {loading ? (

//           <p>Loading...</p>

//         ) : list.length ? (

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//             {list.map(r => (

//               <Link
//                 key={r._id}
//                 to={`/roommates/${r._id}`}
//                 className="block"
//               >

//                 <div className="bg-white p-4 rounded shadow hover:shadow-md transition">

//                   <div className="flex items-center justify-between">

//                     <h3 className="font-semibold text-lg">
//                       {r.title}
//                     </h3>

//                     {r.verified ? (

//                       <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
//                         Verified
//                       </span>

//                     ) : (

//                       <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
//                         Pending
//                       </span>

//                     )}

//                   </div>

//                   <p className="text-gray-600">
//                     {r.description}
//                   </p>

//                   <p className="mt-2 text-sm text-gray-500">
//                     {r.city} {r.area && `- ${r.area}`}
//                   </p>

//                   <p className="mt-2 font-semibold">
//                     Budget: {r.budgetMin || 'N/A'} - {r.budgetMax || 'N/A'}
//                   </p>

//                 </div>

//               </Link>

//             ))}

//           </div>

//         ) : (

//           <p className="text-gray-600">
//             No roommate requests yet.
//           </p>

//         )}

//       </div>

//     </div>

//   );
// }

// export default Roommates;

// import React, { useEffect, useState, useContext } from 'react';
// import AuthContext from '../context/AuthContext';
// import { Link } from 'react-router-dom';
// import api from '../utils/api';
// import { Loader } from 'lucide-react';

// function Roommates() {

//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const { user } = useContext(AuthContext);
//   const [mineOnly, setMineOnly] = useState(false);

//   useEffect(() => {
//     fetchRoommates();
//   }, [mineOnly]);

//   const fetchRoommates = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const res = await api.get(
//         `/api/roommates${mineOnly ? '?mine=true' : ''}`
//       );
//       setList(res.data);
//     } catch {
//       setError('Failed to load roommate listings');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="rm-root">
//       <div className="rm-container">

//         {/* HEADER */}
//         <div className="rm-header">
//           <div>
//             <h1>Roommate Requests</h1>
//             <p>Find or post roommate requests</p>
//           </div>
//         </div>

//         {/* ACTIONS */}
//         <div className="rm-actions">

//           {user ? (
//             <Link to="/roommates/new" className="rm-btn">
//               + Post Request
//             </Link>
//           ) : (
//             <Link to="/login" className="rm-btn">
//               Login to Post
//             </Link>
//           )}

//           {user && (
//             <div className="rm-toggle-wrap">
//               <label className="rm-switch">
//                 <input
//                   type="checkbox"
//                   checked={mineOnly}
//                   onChange={() => setMineOnly(!mineOnly)}
//                 />
//                 <span className="rm-slider"></span>
//               </label>
//               <span>My Requests</span>
//             </div>
//           )}

//         </div>

//         {/* ERROR */}
//         {error && <p className="rm-error">{error}</p>}

//         {/* LOADING */}
//         {loading ? (
//           <div className="rm-loading">
//             <Loader className="spin" />
//           </div>
//         ) : list.length ? (

//           <div className="rm-grid">

//             {list.map(r => (
//               <Link key={r._id} to={`/roommates/${r._id}`}>

//                 <div className="rm-card">

//                   <div className="rm-card-top">
//                     <h3>{r.title}</h3>

//                     <span className={`rm-badge ${r.verified ? 'ok' : 'pending'}`}>
//                       {r.verified ? 'Verified' : 'Pending'}
//                     </span>
//                   </div>

//                   <p className="rm-desc">{r.description}</p>

//                   <p className="rm-location">
//                     {r.city} {r.area && `• ${r.area}`}
//                   </p>

//                   <p className="rm-budget">
//                     ₹ {r.budgetMin || '—'} - ₹ {r.budgetMax || '—'}
//                   </p>

//                 </div>

//               </Link>
//             ))}

//           </div>

//         ) : (

//           <div className="rm-empty">
//             <h3>No roommate requests</h3>
//             <p>Be the first to post one 🚀</p>
//           </div>

//         )}

//       </div>

//       <style>{`
//         .rm-root {
//           min-height: 100vh;
//           background: linear-gradient(135deg, #ecfdf5, #f0fdf4);
//           padding: 40px 20px;
//           font-family: 'DM Sans', sans-serif;
//         }

//         .rm-container {
//           max-width: 1000px;
//           margin: auto;
//         }

//         .rm-header h1 {
//           font-size: 1.8rem;
//           font-weight: 800;
//           color: #064e3b;
//         }

//         .rm-header p {
//           color: #6b7280;
//           font-size: 0.9rem;
//         }

//         /* ACTIONS */
//         .rm-actions {
//           margin: 20px 0;
//           display: flex;
//           align-items: center;
//           gap: 16px;
//         }

//         .rm-btn {
//           background: linear-gradient(135deg, #059669, #047857);
//           color: white;
//           padding: 8px 16px;
//           border-radius: 10px;
//           text-decoration: none;
//           font-weight: 600;
//           transition: 0.25s;
//         }

//         .rm-btn:hover {
//           transform: translateY(-2px);
//         }

//         /* TOGGLE */
//         .rm-toggle-wrap {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-size: 0.85rem;
//           color: #374151;
//         }

//         .rm-switch {
//           position: relative;
//           width: 36px;
//           height: 20px;
//         }

//         .rm-switch input {
//           opacity: 0;
//           width: 0;
//           height: 0;
//         }

//         .rm-slider {
//           position: absolute;
//           cursor: pointer;
//           inset: 0;
//           background: #d1d5db;
//           border-radius: 20px;
//           transition: 0.3s;
//         }

//         .rm-slider::before {
//           content: "";
//           position: absolute;
//           height: 14px;
//           width: 14px;
//           left: 3px;
//           top: 3px;
//           background: white;
//           border-radius: 50%;
//           transition: 0.3s;
//         }

//         .rm-switch input:checked + .rm-slider {
//           background: #059669;
//         }

//         .rm-switch input:checked + .rm-slider::before {
//           transform: translateX(16px);
//         }

//         /* GRID */
//         .rm-grid {
//           display: grid;
//           gap: 16px;
//         }

//         .rm-card {
//           background: white;
//           border-radius: 16px;
//           padding: 16px;
//           border: 1px solid #d1fae5;
//           box-shadow: 0 10px 25px rgba(5,150,105,0.1);
//           transition: 0.25s;
//         }

//         .rm-card:hover {
//           transform: translateY(-4px);
//         }

//         .rm-card-top {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .rm-card h3 {
//           font-size: 1rem;
//           font-weight: 700;
//           color: #064e3b;
//         }

//         .rm-badge {
//           font-size: 0.7rem;
//           padding: 4px 8px;
//           border-radius: 999px;
//         }

//         .rm-badge.ok {
//           background: #dcfce7;
//           color: #166534;
//         }

//         .rm-badge.pending {
//           background: #fef3c7;
//           color: #92400e;
//         }

//         .rm-desc {
//           margin: 8px 0;
//           font-size: 0.85rem;
//           color: #374151;
//         }

//         .rm-location {
//           font-size: 0.8rem;
//           color: #6b7280;
//         }

//         .rm-budget {
//           margin-top: 6px;
//           font-weight: 600;
//           color: #047857;
//         }

//         .rm-empty {
//           text-align: center;
//           margin-top: 60px;
//           color: #6b7280;
//         }

//         .rm-error {
//           color: #ef4444;
//           margin-bottom: 10px;
//         }

//         .rm-loading {
//           display: flex;
//           justify-content: center;
//           margin-top: 40px;
//         }

//         .spin {
//           animation: spin 1s linear infinite;
//           color: #059669;
//         }

//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Roommates;


import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Users, Plus, MapPin, IndianRupee, CheckCircle, Clock, Search } from 'lucide-react';

function Roommates() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const [mineOnly, setMineOnly] = useState(false);

  useEffect(() => { fetchRoommates(); }, [mineOnly]);

  const fetchRoommates = async () => {
    setLoading(true); setError('');
    try {
      const res = await api.get(`/api/roommates${mineOnly ? '?mine=true' : ''}`);
      setList(res.data);
    } catch (err) {
      setError('Failed to load roommate listings');
    } finally { setLoading(false); }
  };

  const handleToggleMine = () => setMineOnly(prev => !prev);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .rm-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #f0faf4;
        }

        /* Hero */
        .rm-hero {
          background: linear-gradient(160deg, #064e3b 0%, #065f46 55%, #047857 100%);
          padding: 44px 24px 52px;
          position: relative; overflow: hidden;
        }
        .rm-hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px; pointer-events: none;
        }
        .rm-hero-blob {
          position: absolute; width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(110,231,183,0.18), transparent 65%);
          top: -80px; right: -60px; border-radius: 50%; pointer-events: none;
        }
        .rm-hero-inner {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: flex-end;
          justify-content: space-between; flex-wrap: wrap; gap: 16px;
        }
        .rm-hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 100px; padding: 4px 13px;
          font-size: 0.75rem; font-weight: 600;
          color: #a7f3d0; letter-spacing: 0.4px;
          text-transform: uppercase; margin-bottom: 10px;
          display: block;
        }
        .rm-hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 800; color: #fff;
          letter-spacing: -1px; line-height: 1.12; margin-bottom: 6px;
        }
        .rm-hero-title em {
          font-style: normal;
          background: linear-gradient(90deg, #6ee7b7, #34d399);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .rm-hero-sub { color: #a7f3d0; font-size: 0.92rem; }

        .rm-hero-actions {
          display: flex; flex-direction: column; align-items: flex-end; gap: 10px;
          flex-shrink: 0;
        }
        .rm-post-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg, #6ee7b7, #34d399);
          color: #064e3b; font-weight: 700; font-size: 0.9rem;
          padding: 11px 22px; border-radius: 12px;
          text-decoration: none; transition: all 0.18s;
          box-shadow: 0 4px 16px rgba(52,211,153,0.35);
          font-family: 'DM Sans', sans-serif;
        }
        .rm-post-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(52,211,153,0.5);
        }
        .rm-mine-toggle {
          display: flex; align-items: center; gap: 8px;
          cursor: pointer; user-select: none;
          font-size: 0.85rem; color: #a7f3d0; font-weight: 500;
        }
        .rm-toggle-track {
          width: 38px; height: 22px; border-radius: 100px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.2);
          position: relative; transition: all 0.2s;
          cursor: pointer;
        }
        .rm-toggle-track.rm-on {
          background: #34d399; border-color: #34d399;
        }
        .rm-toggle-thumb {
          position: absolute; top: 3px; left: 3px;
          width: 14px; height: 14px; border-radius: 50%;
          background: #fff; transition: transform 0.2s;
        }
        .rm-toggle-track.rm-on .rm-toggle-thumb {
          transform: translateX(16px);
        }

        /* Body */
        .rm-body {
          max-width: 1280px; margin: 0 auto;
          padding: 36px 20px 60px;
        }

        /* Error */
        .rm-error {
          background: #fff1f2; border: 1px solid #fecdd3;
          border-radius: 12px; padding: 12px 16px;
          color: #be123c; font-size: 0.875rem;
          font-weight: 600; margin-bottom: 20px;
        }

        /* Section heading */
        .rm-section-head {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 20px;
        }
        .rm-section-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem; font-weight: 800;
          color: #0f2d1a; letter-spacing: -0.5px;
        }
        .rm-count {
          background: #d1fae5; color: #065f46;
          border-radius: 100px; font-size: 0.75rem;
          font-weight: 800; padding: 2px 10px;
          margin-left: 8px;
        }

        /* Grid */
        .rm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        /* Card */
        .rm-card-link { text-decoration: none; display: block; }
        .rm-card {
          background: #fff;
          border-radius: 18px;
          border: 1.5px solid #e6f7ef;
          padding: 20px;
          transition: all 0.22s ease;
          box-shadow: 0 2px 8px rgba(5,150,105,0.06);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .rm-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #34d399, #059669);
          opacity: 0; transition: opacity 0.22s;
        }
        .rm-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(5,150,105,0.14);
          border-color: #a7f3d0;
        }
        .rm-card:hover::before { opacity: 1; }

        .rm-card-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 10px; margin-bottom: 10px;
        }
        .rm-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 1rem; font-weight: 800;
          color: #0f2d1a; line-height: 1.3;
          flex: 1;
        }
        .rm-status-chip {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 3px 10px; border-radius: 100px;
          font-size: 0.72rem; font-weight: 700;
          flex-shrink: 0;
        }
        .rm-verified { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
        .rm-pending { background: #fef9c3; color: #854d0e; border: 1px solid #fef08a; }

        .rm-desc {
          font-size: 0.875rem; color: #6b7280;
          line-height: 1.55; margin-bottom: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .rm-card-meta {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-bottom: 14px;
        }
        .rm-meta-chip {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 0.78rem; font-weight: 600;
          padding: 4px 10px; border-radius: 100px;
        }
        .rm-chip-loc { background: #fef2f2; color: #991b1b; }
        .rm-chip-budget { background: #ecfdf5; color: #065f46; }

        .rm-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 12px; border-top: 1px solid #f0fdf4;
        }
        .rm-view-link {
          font-size: 0.8rem; font-weight: 700;
          color: #059669;
        }
        .rm-card:hover .rm-view-link { text-decoration: underline; }

        /* Loading */
        .rm-loading {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 80px 0; gap: 14px;
        }
        .rm-spinner {
          width: 40px; height: 40px;
          border: 3px solid #d1fae5; border-top-color: #059669;
          border-radius: 50%; animation: rmSpin 0.75s linear infinite;
        }
        @keyframes rmSpin { to { transform: rotate(360deg); } }

        /* Empty */
        .rm-empty {
          text-align: center; padding: 80px 24px;
        }
        .rm-empty-icon {
          width: 72px; height: 72px;
          background: #ecfdf5; border: 2px solid #d1fae5;
          border-radius: 50%; display: flex;
          align-items: center; justify-content: center;
          margin: 0 auto 18px;
        }
        .rm-empty-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem; font-weight: 800;
          color: #0f2d1a; margin-bottom: 6px;
        }
        .rm-empty-sub { color: #6b7280; font-size: 0.88rem; }
      `}</style>

      <div className="rm-root">

        {/* Hero */}
        <div className="rm-hero">
          <div className="rm-hero-blob" />
          <div className="rm-hero-inner">
            <div>
              <span className="rm-hero-badge">👥 Community</span>
              <h1 className="rm-hero-title">
                Find Your <em>Roommate</em>
              </h1>
              <p className="rm-hero-sub">Browse or post requests to find the perfect match</p>
            </div>

            <div className="rm-hero-actions">
              {user ? (
                <Link to="/roommates/new" className="rm-post-btn">
                  <Plus size={16} /> Post a Request
                </Link>
              ) : (
                <Link to="/login" className="rm-post-btn">
                  <Plus size={16} /> Login to Post
                </Link>
              )}

              {user && (
                <label className="rm-mine-toggle" onClick={handleToggleMine}>
                  <div className={`rm-toggle-track ${mineOnly ? 'rm-on' : ''}`}>
                    <div className="rm-toggle-thumb" />
                  </div>
                  My requests only
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="rm-body">

          {error && <div className="rm-error">{error}</div>}

          <div className="rm-section-head">
            <div className="rm-section-title">
              {mineOnly ? 'My Requests' : 'All Requests'}
              {!loading && <span className="rm-count">{list.length}</span>}
            </div>
          </div>

          {loading ? (
            <div className="rm-loading">
              <div className="rm-spinner" />
              <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Loading listings…</span>
            </div>
          ) : list.length ? (
            <div className="rm-grid">
              {list.map(r => (
                <Link key={r._id} to={`/roommates/${r._id}`} className="rm-card-link">
                  <div className="rm-card">
                    <div className="rm-card-top">
                      <h3 className="rm-card-title">{r.title}</h3>
                      <span className={`rm-status-chip ${r.verified ? 'rm-verified' : 'rm-pending'}`}>
                        {r.verified
                          ? <><CheckCircle size={11} /> Verified</>
                          : <><Clock size={11} /> Pending</>
                        }
                      </span>
                    </div>

                    {r.description && <p className="rm-desc">{r.description}</p>}

                    <div className="rm-card-meta">
                      {(r.city || r.area) && (
                        <span className="rm-meta-chip rm-chip-loc">
                          <MapPin size={11} />
                          {r.city}{r.area ? ` · ${r.area}` : ''}
                        </span>
                      )}
                      {(r.budgetMin || r.budgetMax) && (
                        <span className="rm-meta-chip rm-chip-budget">
                          <IndianRupee size={11} />
                          {r.budgetMin || 'N/A'} – {r.budgetMax || 'N/A'}
                        </span>
                      )}
                    </div>

                    <div className="rm-card-footer">
                      <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
                        Roommate request
                      </span>
                      <span className="rm-view-link">View details →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rm-empty">
              <div className="rm-empty-icon">
                <Users size={30} color="#059669" />
              </div>
              <div className="rm-empty-title">No requests yet</div>
              <p className="rm-empty-sub">
                {mineOnly ? "You haven't posted any requests." : 'Be the first to post a roommate request!'}
              </p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Roommates;