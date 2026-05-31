// import React, { useEffect, useState, useContext } from 'react';
// import api from '../utils/api';
// import AuthContext from '../context/AuthContext';

// function AdminDashboard() {
//   const { user } = useContext(AuthContext);
//   const [props, setProps] = useState([]);
//   const [rms, setRms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!user || user.role !== 'admin') return;
//     fetchAll();
//   }, [user]);

//   const fetchAll = async () => {
//     setLoading(true);
//     try {
//       const [pRes, rRes] = await Promise.all([
//         api.get('/api/properties'),
//         api.get('/api/roommates')
//       ]);
//       // filter unverified
//       setProps((pRes.data || []).filter(p => !p.verified));
//       setRms((rRes.data || []).filter(r => !r.verified));
//     } catch (err) {
//       setError('Failed to load admin lists');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleVerifyProp = async (id, current) => {
//     try {
//       await api.patch(`/api/properties/${id}/verify`, { verified: !current });
//       fetchAll();
//     } catch (err) { setError('Verify failed'); }
//   };

//   const toggleVerifyRm = async (id, current) => {
//     try {
//       await api.patch(`/api/roommates/${id}/verify`, { verified: !current });
//       fetchAll();
//     } catch (err) { setError('Verify failed'); }
//   };

//   if (!user || user.role !== 'admin') return <div className="p-8">Admin only</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-5xl mx-auto px-4">
//         <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
//         {error && <div className="text-red-600 mb-4">{error}</div>}
//         {loading ? <div>Loading...</div> : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white p-4 rounded shadow">
//               <h2 className="font-semibold mb-3">Unverified Properties</h2>
//               {props.length ? props.map(p => (
//                 <div key={p._id} className="border-b py-2 flex justify-between items-center">
//                   <div>
//                     <div className="font-semibold">{p.title}</div>
//                     <div className="text-sm text-gray-500">{p.city} • {p.price}</div>
//                   </div>
//                   <button onClick={() => toggleVerifyProp(p._id, p.verified)} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Verify</button>
//                 </div>
//               )) : <div className="text-sm text-gray-500">No unverified properties</div>}
//             </div>

//             <div className="bg-white p-4 rounded shadow">
//               <h2 className="font-semibold mb-3">Unverified Roommates</h2>
//               {rms.length ? rms.map(r => (
//                 <div key={r._id} className="border-b py-2 flex justify-between items-center">
//                   <div>
//                     <div className="font-semibold">{r.title}</div>
//                     <div className="text-sm text-gray-500">{r.city} • {r.budgetMin}-{r.budgetMax}</div>
//                   </div>
//                   <button onClick={() => toggleVerifyRm(r._id, r.verified)} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Verify</button>
//                 </div>
//               )) : <div className="text-sm text-gray-500">No unverified roommate requests</div>}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;


// import React, { useEffect, useState, useContext } from 'react';
// import api from '../utils/api';
// import AuthContext from '../context/AuthContext';
// import { Loader } from 'lucide-react';

// function AdminDashboard() {

//   const { user } = useContext(AuthContext);

//   const [props, setProps] = useState([]);
//   const [rms, setRms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!user || user.role !== 'admin') return;
//     fetchAll();
//   }, [user]);

//   const fetchAll = async () => {
//     setLoading(true);
//     try {
//       const [pRes, rRes] = await Promise.all([
//         api.get('/api/properties'),
//         api.get('/api/roommates')
//       ]);

//       setProps((pRes.data || []).filter(p => !p.verified));
//       setRms((rRes.data || []).filter(r => !r.verified));

//     } catch {
//       setError('Failed to load admin lists');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleVerifyProp = async (id, current) => {
//     try {
//       await api.patch(`/api/properties/${id}/verify`, { verified: !current });
//       fetchAll();
//     } catch {
//       setError('Verify failed');
//     }
//   };

//   const toggleVerifyRm = async (id, current) => {
//     try {
//       await api.patch(`/api/roommates/${id}/verify`, { verified: !current });
//       fetchAll();
//     } catch {
//       setError('Verify failed');
//     }
//   };

//   if (!user || user.role !== 'admin') {
//     return <div className="p-8">Admin only</div>;
//   }

//   return (

//     <div className="ad-root">

//       <div className="ad-container">

//         {/* HEADER */}
//         <div className="ad-header">
//           <h1>Admin Dashboard</h1>
//           <p>Manage and verify platform content</p>
//         </div>

//         {error && <div className="ad-error">{error}</div>}

//         {/* LOADING */}
//         {loading ? (
//           <div className="ad-loading">
//             <Loader className="spin" />
//           </div>
//         ) : (

//           <div className="ad-grid">

//             {/* PROPERTIES */}
//             <div className="ad-card">

//               <div className="ad-card-head">
//                 <h2>Unverified Properties</h2>
//                 <span className="count">{props.length}</span>
//               </div>

//               {props.length ? props.map(p => (
//                 <div key={p._id} className="ad-row">

//                   <div>
//                     <div className="title">{p.title}</div>
//                     <div className="meta">{p.city} • ₹ {p.price}</div>
//                   </div>

//                   <button
//                     onClick={() => toggleVerifyProp(p._id, p.verified)}
//                     className="btn verify"
//                   >
//                     Verify
//                   </button>

//                 </div>
//               )) : (
//                 <div className="empty">No unverified properties</div>
//               )}

//             </div>

//             {/* ROOMMATES */}
//             <div className="ad-card">

//               <div className="ad-card-head">
//                 <h2>Unverified Roommates</h2>
//                 <span className="count">{rms.length}</span>
//               </div>

//               {rms.length ? rms.map(r => (
//                 <div key={r._id} className="ad-row">

//                   <div>
//                     <div className="title">{r.title}</div>
//                     <div className="meta">
//                       {r.city} • ₹ {r.budgetMin}-{r.budgetMax}
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => toggleVerifyRm(r._id, r.verified)}
//                     className="btn verify"
//                   >
//                     Verify
//                   </button>

//                 </div>
//               )) : (
//                 <div className="empty">No unverified roommate requests</div>
//               )}

//             </div>

//           </div>

//         )}

//       </div>

//       <style>{`

//         .ad-root {
//           min-height: 100vh;
//           background: linear-gradient(135deg,#ecfdf5,#f0fdf4);
//           padding: 40px 20px;
//           font-family: 'DM Sans', sans-serif;
//         }

//         .ad-container {
//           max-width: 1000px;
//           margin: auto;
//         }

//         .ad-header h1 {
//           font-size: 1.8rem;
//           font-weight: 800;
//           color: #064e3b;
//         }

//         .ad-header p {
//           color: #6b7280;
//           font-size: 0.9rem;
//         }

//         .ad-error {
//           margin-top: 10px;
//           color: #dc2626;
//         }

//         .ad-loading {
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

//         .ad-grid {
//           margin-top: 20px;
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 20px;
//         }

//         .ad-card {
//           background: white;
//           padding: 18px;
//           border-radius: 18px;
//           border: 1px solid #d1fae5;
//           box-shadow: 0 10px 30px rgba(5,150,105,0.1);
//         }

//         .ad-card-head {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 12px;
//         }

//         .ad-card-head h2 {
//           font-size: 1rem;
//           font-weight: 700;
//           color: #064e3b;
//         }

//         .count {
//           background: #d1fae5;
//           color: #065f46;
//           padding: 4px 10px;
//           border-radius: 999px;
//           font-size: 0.75rem;
//           font-weight: 600;
//         }

//         .ad-row {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 10px 0;
//           border-bottom: 1px solid #f3f4f6;
//         }

//         .title {
//           font-weight: 600;
//           color: #111827;
//         }

//         .meta {
//           font-size: 0.8rem;
//           color: #6b7280;
//         }

//         .btn.verify {
//           background: linear-gradient(135deg,#059669,#047857);
//           color: white;
//           padding: 6px 12px;
//           border-radius: 8px;
//           border: none;
//           font-size: 0.8rem;
//           cursor: pointer;
//           transition: 0.2s;
//         }

//         .btn.verify:hover {
//           transform: translateY(-2px);
//         }

//         .empty {
//           font-size: 0.85rem;
//           color: #6b7280;
//           text-align: center;
//           padding: 10px 0;
//         }

//         @media(max-width: 768px){
//           .ad-grid {
//             grid-template-columns: 1fr;
//           }
//         }

//       `}</style>

//     </div>
//   );
// }

// export default AdminDashboard;


import React, { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';
import { Shield, CheckCircle, Home, Users, IndianRupee, MapPin, RefreshCw, AlertTriangle } from 'lucide-react';

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [props, setProps] = useState([]);
  const [rms, setRms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') return;
    fetchAll();
  }, [user]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [pRes, rRes] = await Promise.all([
        api.get('/api/properties'),
        api.get('/api/roommates')
      ]);
      setProps((pRes.data || []).filter(p => !p.verified));
      setRms((rRes.data || []).filter(r => !r.verified));
    } catch (err) {
      setError('Failed to load admin lists');
    } finally { setLoading(false); }
  };

  const toggleVerifyProp = async (id, current) => {
    try {
      await api.patch(`/api/properties/${id}/verify`, { verified: !current });
      fetchAll();
    } catch { setError('Verify failed'); }
  };

  const toggleVerifyRm = async (id, current) => {
    try {
      await api.patch(`/api/roommates/${id}/verify`, { verified: !current });
      fetchAll();
    } catch { setError('Verify failed'); }
  };

  if (!user || user.role !== 'admin') return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600&display=swap'); .ad-deny{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f0faf4;font-family:'DM Sans',sans-serif;color:#6b7280;}`}</style>
      <div className="ad-deny">Admin access only.</div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .ad-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh; background: #f0faf4;
        }

        /* Hero */
        .ad-hero {
          background: linear-gradient(160deg, #064e3b 0%, #065f46 55%, #047857 100%);
          padding: 44px 24px 52px;
          position: relative; overflow: hidden;
        }
        .ad-hero::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px; pointer-events: none;
        }
        .ad-hero-blob {
          position: absolute; width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(110,231,183,0.18), transparent 65%);
          top: -60px; right: -40px; border-radius: 50%; pointer-events: none;
        }
        .ad-hero-inner {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: flex-end;
          justify-content: space-between; flex-wrap: wrap; gap: 16px;
        }
        .ad-hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 100px; padding: 4px 13px;
          font-size: 0.75rem; font-weight: 600;
          color: #a7f3d0; text-transform: uppercase;
          letter-spacing: 0.4px; margin-bottom: 10px; display: block;
        }
        .ad-hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          font-weight: 800; color: #fff;
          letter-spacing: -1px; margin-bottom: 4px;
          display: flex; align-items: center; gap: 12px;
        }
        .ad-shield-icon {
          width: 42px; height: 42px;
          background: rgba(52,211,153,0.15);
          border: 1px solid rgba(52,211,153,0.3);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
        }
        .ad-hero-sub { color: #a7f3d0; font-size: 0.92rem; }

        /* Stats */
        .ad-stats {
          display: flex; gap: 12px; flex-wrap: wrap; margin-top: 18px;
        }
        .ad-stat {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px; padding: 10px 18px;
          display: flex; align-items: center; gap: 10px;
        }
        .ad-stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem; font-weight: 800; color: #fff;
        }
        .ad-stat-label { font-size: 0.78rem; color: #a7f3d0; font-weight: 500; }

        /* Refresh btn */
        .ad-refresh-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: #d1fae5; padding: 9px 16px; border-radius: 11px;
          font-size: 0.875rem; font-weight: 600; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all 0.18s;
          flex-shrink: 0;
        }
        .ad-refresh-btn:hover { background: rgba(255,255,255,0.18); }

        /* Body */
        .ad-body { max-width: 1280px; margin: 0 auto; padding: 36px 20px 60px; }

        /* Error */
        .ad-error {
          background: #fff1f2; border: 1.5px solid #fecdd3;
          border-radius: 12px; padding: 12px 16px;
          color: #be123c; font-size: 0.875rem; font-weight: 600;
          margin-bottom: 20px;
          display: flex; align-items: center; gap: 8px;
        }

        /* Two col grid */
        .ad-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 700px) { .ad-grid { grid-template-columns: 1fr; } }

        /* Panel card */
        .ad-panel {
          background: #fff; border-radius: 18px;
          border: 1.5px solid #e6f7ef; padding: 20px;
          box-shadow: 0 2px 8px rgba(5,150,105,0.06);
        }
        .ad-panel-title {
          font-family: 'Syne', sans-serif;
          font-size: 1rem; font-weight: 800;
          color: #0f2d1a; margin-bottom: 16px;
          display: flex; align-items: center; gap: 8px;
        }
        .ad-panel-icon {
          width: 32px; height: 32px;
          background: #ecfdf5; border: 1px solid #d1fae5;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
        }
        .ad-pending-count {
          background: #fef9c3; color: #854d0e;
          border-radius: 100px; font-size: 0.72rem;
          font-weight: 800; padding: 2px 9px; margin-left: 4px;
        }

        /* Item row */
        .ad-item {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 12px 0; gap: 10px;
          border-bottom: 1px solid #f0fdf4; flex-wrap: wrap;
        }
        .ad-item:last-child { border-bottom: none; }
        .ad-item-info { flex: 1; min-width: 0; }
        .ad-item-title {
          font-weight: 700; font-size: 0.9rem; color: #0f2d1a;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          margin-bottom: 4px;
        }
        .ad-item-meta {
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
        }
        .ad-meta-chip {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 0.75rem; color: #6b7280; font-weight: 500;
        }

        .ad-verify-btn {
          display: inline-flex; align-items: center; gap: 5px;
          background: linear-gradient(135deg, #059669, #047857);
          color: #fff; padding: 7px 14px; border-radius: 9px;
          font-size: 0.8rem; font-weight: 700; border: none;
          cursor: pointer; transition: all 0.18s;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 3px 10px rgba(5,150,105,0.25);
          white-space: nowrap; flex-shrink: 0;
        }
        .ad-verify-btn:hover { transform: translateY(-1px); box-shadow: 0 5px 16px rgba(5,150,105,0.38); }

        /* Empty */
        .ad-empty {
          text-align: center; padding: 28px 16px;
          color: #9ca3af; font-size: 0.875rem;
        }
        .ad-empty-icon {
          width: 44px; height: 44px; background: #f0fdf4;
          border-radius: 50%; display: flex; align-items: center;
          justify-content: center; margin: 0 auto 10px;
        }

        /* Loading */
        .ad-loading {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 60px 0; gap: 12px;
        }
        .ad-spinner {
          width: 40px; height: 40px;
          border: 3px solid #d1fae5; border-top-color: #059669;
          border-radius: 50%; animation: adSpin 0.75s linear infinite;
        }
        @keyframes adSpin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="ad-root">

        {/* Hero */}
        <div className="ad-hero">
          <div className="ad-hero-blob" />
          <div className="ad-hero-inner">
            <div>
              <span className="ad-hero-badge"><Shield size={10} /> Admin</span>
              <h1 className="ad-hero-title">
                <div className="ad-shield-icon"><Shield size={20} color="#6ee7b7" /></div>
                Admin Dashboard
              </h1>
              <p className="ad-hero-sub">Review and verify pending listings</p>
              <div className="ad-stats">
                <div className="ad-stat">
                  <div>
                    <div className="ad-stat-num">{props.length}</div>
                    <div className="ad-stat-label">Pending Properties</div>
                  </div>
                </div>
                <div className="ad-stat">
                  <div>
                    <div className="ad-stat-num">{rms.length}</div>
                    <div className="ad-stat-label">Pending Roommates</div>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={fetchAll} className="ad-refresh-btn">
              <RefreshCw size={15} /> Refresh
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="ad-body">

          {error && (
            <div className="ad-error">
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          {loading ? (
            <div className="ad-loading">
              <div className="ad-spinner" />
              <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Loading pending items…</span>
            </div>
          ) : (
            <div className="ad-grid">

              {/* Unverified Properties */}
              <div className="ad-panel">
                <div className="ad-panel-title">
                  <div className="ad-panel-icon"><Home size={16} color="#059669" /></div>
                  Unverified Properties
                  {props.length > 0 && <span className="ad-pending-count">{props.length}</span>}
                </div>

                {props.length ? props.map(p => (
                  <div key={p._id} className="ad-item">
                    <div className="ad-item-info">
                      <div className="ad-item-title">{p.title}</div>
                      <div className="ad-item-meta">
                        <span className="ad-meta-chip"><MapPin size={11} />{p.city}</span>
                        <span className="ad-meta-chip"><IndianRupee size={11} />{p.price?.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <button onClick={() => toggleVerifyProp(p._id, p.verified)} className="ad-verify-btn">
                      <CheckCircle size={13} /> Verify
                    </button>
                  </div>
                )) : (
                  <div className="ad-empty">
                    <div className="ad-empty-icon"><CheckCircle size={20} color="#34d399" /></div>
                    All properties verified!
                  </div>
                )}
              </div>

              {/* Unverified Roommates */}
              <div className="ad-panel">
                <div className="ad-panel-title">
                  <div className="ad-panel-icon"><Users size={16} color="#059669" /></div>
                  Unverified Roommates
                  {rms.length > 0 && <span className="ad-pending-count">{rms.length}</span>}
                </div>

                {rms.length ? rms.map(r => (
                  <div key={r._id} className="ad-item">
                    <div className="ad-item-info">
                      <div className="ad-item-title">{r.title}</div>
                      <div className="ad-item-meta">
                        <span className="ad-meta-chip"><MapPin size={11} />{r.city}</span>
                        <span className="ad-meta-chip"><IndianRupee size={11} />{r.budgetMin}–{r.budgetMax}</span>
                      </div>
                    </div>
                    <button onClick={() => toggleVerifyRm(r._id, r.verified)} className="ad-verify-btn">
                      <CheckCircle size={13} /> Verify
                    </button>
                  </div>
                )) : (
                  <div className="ad-empty">
                    <div className="ad-empty-icon"><CheckCircle size={20} color="#34d399" /></div>
                    All roommate requests verified!
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;