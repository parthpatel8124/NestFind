// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../utils/api';
// import AuthContext from '../context/AuthContext';
// import Alert from '../components/Alert';

// function RoommateDetails(){

//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const [item, setItem] = useState(null);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(true);

//   const userId = user?.id;
//   const isAdmin = user?.role === "admin";

//   const loadRoommate = async () => {
//     try{
//       const res = await api.get(`/api/roommates/${id}`);
//       setItem(res.data);
//     }catch{
//       setError("Failed to load");
//     }finally{
//       setLoading(false);
//     }
//   }

//   useEffect(()=>{
//     loadRoommate();
//   },[id]);

//   if(loading) return <div className="p-8">Loading...</div>;
//   if(!item) return <div className="p-8">Not found</div>;

//   const ownerId = item.ownerId?._id || item.ownerId;

//   const isOwner = userId && ownerId === userId;

//   const currentInterest = (item.interestedUsers || []).find(u=>{
//     const uid = u.userId?._id || u.userId;
//     return uid === userId;
//   });

//   const currentStatus = currentInterest?.status;

//   const handleInterested = async () => {

//     try{

//       await api.post(`/api/roommates/${id}/interested`);

//       setSuccess("Request Sent");

//       await loadRoommate();

//     }catch(err){

//       setError(err.response?.data?.message || "Request failed");

//     }

//   };


//   const handleAccept = async(uid)=>{

//     try{

//       await api.post(`/api/roommates/${id}/accept/${uid}`);

//       setSuccess("User accepted");

//       await loadRoommate();

//     }catch{

//       setError("Accept failed");

//     }

//   }


//   const handleReject = async(uid)=>{

//     try{

//       await api.post(`/api/roommates/${id}/reject/${uid}`);

//       setSuccess("User rejected");

//       await loadRoommate();

//     }catch{

//       setError("Reject failed");

//     }

//   }


//   const handleDelete = async () => {

//     if(!window.confirm("Delete this request?")) return;

//     try{

//       await api.delete(`/api/roommates/${id}`);

//       navigate('/roommates');

//     }catch{

//       setError("Delete failed");

//     }

//   }


//   return (

//     <div className="min-h-screen bg-gray-50 py-8">

//       <div className="max-w-3xl mx-auto px-4">

//         <h1 className="text-2xl font-bold mb-2">{item.title}</h1>

//         <p className="text-gray-600">{item.description}</p>

//         <div className="mt-2 text-sm text-gray-500">
//           {item.city}, {item.area}
//         </div>

//         <div className="mt-2">
//           Budget: {item.budgetMin} - {item.budgetMax}
//         </div>

//         <div className="mt-2 text-sm text-gray-600">
//           Posted by: {item.ownerId?.fullName}
//         </div>

//         {error && <Alert type="error" message={error}/>}
//         {success && <Alert type="success" message={success}/>}

//         <div className="mt-6 flex gap-2">

//           {/* DELETE BUTTON */}

//           {(isOwner || isAdmin) && (

//             <button
//               onClick={handleDelete}
//               className="px-4 py-2 bg-red-600 text-white rounded"
//             >
//               Delete
//             </button>

//           )}

//           {/* INTEREST BUTTON */}

//           {!isOwner && !item.acceptedUserId && (

//             currentStatus === "pending" ?

//             <button disabled className="px-4 py-2 bg-gray-300 rounded">
//               Request Sent
//             </button>

//             :

//             currentStatus === "accepted" ?

//             <button disabled className="px-4 py-2 bg-green-600 text-white rounded">
//               Accepted
//             </button>

//             :

//             <button
//               onClick={handleInterested}
//               className="px-4 py-2 bg-green-600 text-white rounded"
//             >
//               Interested
//             </button>

//           )}

//           <button
//             onClick={()=>navigate('/roommates')}
//             className="px-4 py-2 border rounded"
//           >
//             Back
//           </button>

//         </div>


//         {/* CONTACT SECTION */}

//         {item.ownerContact && (

//           <div className="mt-6 bg-gray-100 p-4 rounded">

//             <h3 className="font-semibold">Owner Contact</h3>

//             <div className="text-blue-600 text-lg">
//               {item.ownerContact}
//             </div>

//           </div>

//         )}


//         {/* OWNER PANEL */}

//         {isOwner && (

//           <div className="mt-6 bg-white p-4 rounded shadow">

//             <h3 className="font-semibold mb-3">
//               Interested Users
//             </h3>

//             {item.interestedUsers?.length ?

//               item.interestedUsers.map(u=>{

//                 const uid = u.userId?._id || u.userId;

//                 return(

//                   <div
//                     key={uid}
//                     className="flex justify-between py-2 border-b"
//                   >

//                     <div>
//                       {u.userId?.fullName} - {u.status}
//                     </div>

//                     <div className="flex gap-2">

//                       {u.status !== "accepted" && (

//                         <button
//                           onClick={()=>handleAccept(uid)}
//                           className="px-3 py-1 bg-blue-600 text-white rounded"
//                         >
//                           Accept
//                         </button>

//                       )}

//                       <button
//                         onClick={()=>handleReject(uid)}
//                         className="px-3 py-1 bg-gray-200 rounded"
//                       >
//                         Reject
//                       </button>

//                     </div>

//                   </div>

//                 )

//               })

//               :

//               <div className="text-gray-500 text-sm">
//                 No interested users yet
//               </div>

//             }

//           </div>

//         )}

//       </div>

//     </div>

//   )

// }

// export default RoommateDetails;

// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../utils/api';
// import AuthContext from '../context/AuthContext';
// import Alert from '../components/Alert';
// import { Loader } from 'lucide-react';

// function RoommateDetails(){

//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const [item, setItem] = useState(null);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(true);

//   const userId = user?.id;
//   const isAdmin = user?.role === "admin";

//   const loadRoommate = async () => {
//     try{
//       const res = await api.get(`/api/roommates/${id}`);
//       setItem(res.data);
//     }catch{
//       setError("Failed to load");
//     }finally{
//       setLoading(false);
//     }
//   }

//   useEffect(()=>{
//     loadRoommate();
//   },[id]);

//   if(loading){
//     return (
//       <div className="rd-loading">
//         <Loader className="spin"/>
//       </div>
//     )
//   }

//   if(!item) return <div className="p-8">Not found</div>;

//   const ownerId = item.ownerId?._id || item.ownerId;
//   const isOwner = userId && ownerId === userId;

//   const currentInterest = (item.interestedUsers || []).find(u=>{
//     const uid = u.userId?._id || u.userId;
//     return uid === userId;
//   });

//   const currentStatus = currentInterest?.status;

//   const handleInterested = async () => {
//     try{
//       await api.post(`/api/roommates/${id}/interested`);
//       setSuccess("Request Sent");
//       await loadRoommate();
//     }catch(err){
//       setError(err.response?.data?.message || "Request failed");
//     }
//   };

//   const handleAccept = async(uid)=>{
//     try{
//       await api.post(`/api/roommates/${id}/accept/${uid}`);
//       setSuccess("User accepted");
//       await loadRoommate();
//     }catch{
//       setError("Accept failed");
//     }
//   }

//   const handleReject = async(uid)=>{
//     try{
//       await api.post(`/api/roommates/${id}/reject/${uid}`);
//       setSuccess("User rejected");
//       await loadRoommate();
//     }catch{
//       setError("Reject failed");
//     }
//   }

//   const handleDelete = async () => {
//     if(!window.confirm("Delete this request?")) return;
//     try{
//       await api.delete(`/api/roommates/${id}`);
//       navigate('/roommates');
//     }catch{
//       setError("Delete failed");
//     }
//   }

//   return (

//     <div className="rd-root">

//       <div className="rd-container">

//         {/* MAIN CARD */}
//         <div className="rd-card">

//           <h1>{item.title}</h1>

//           <p className="rd-desc">{item.description}</p>

//           <div className="rd-meta">
//             📍 {item.city}, {item.area}
//           </div>

//           <div className="rd-budget">
//             Budget: ₹ {item.budgetMin} - ₹ {item.budgetMax}
//           </div>

//           <div className="rd-owner">
//             Posted by: <b>{item.ownerId?.fullName}</b>
//           </div>

//           {error && <Alert type="error" message={error}/>}
//           {success && <Alert type="success" message={success}/>}

//           {/* ACTIONS */}
//           <div className="rd-actions">

//             {(isOwner || isAdmin) && (
//               <button onClick={handleDelete} className="btn red">
//                 Delete
//               </button>
//             )}

//             {!isOwner && !item.acceptedUserId && (

//               currentStatus === "pending" ?

//               <button disabled className="btn disabled">
//                 Request Sent
//               </button>

//               :

//               currentStatus === "accepted" ?

//               <button disabled className="btn green">
//                 Accepted
//               </button>

//               :

//               <button onClick={handleInterested} className="btn green">
//                 Interested
//               </button>
//             )}

//             <button
//               onClick={()=>navigate('/roommates')}
//               className="btn outline"
//             >
//               Back
//             </button>

//           </div>

//         </div>

//         {/* CONTACT */}
//         {item.ownerContact && (
//           <div className="rd-contact">
//             <h3>Owner Contact</h3>
//             <p>{item.ownerContact}</p>
//           </div>
//         )}

//         {/* OWNER PANEL */}
//         {isOwner && (
//           <div className="rd-owner-panel">

//             <h3>Interested Users</h3>

//             {item.interestedUsers?.length ? (

//               item.interestedUsers.map(u=>{

//                 const uid = u.userId?._id || u.userId;

//                 return(
//                   <div key={uid} className="rd-user-row">

//                     <div>
//                       <b>{u.userId?.fullName}</b>
//                       <span className="status">{u.status}</span>
//                     </div>

//                     <div className="actions">

//                       {u.status !== "accepted" && (
//                         <button
//                           onClick={()=>handleAccept(uid)}
//                           className="btn small blue"
//                         >
//                           Accept
//                         </button>
//                       )}

//                       <button
//                         onClick={()=>handleReject(uid)}
//                         className="btn small gray"
//                       >
//                         Reject
//                       </button>

//                     </div>

//                   </div>
//                 )
//               })

//             ) : (
//               <p className="empty">No interested users yet</p>
//             )}

//           </div>
//         )}

//       </div>

//       <style>{`
//         .rd-root {
//           min-height: 100vh;
//           background: linear-gradient(135deg,#ecfdf5,#f0fdf4);
//           padding: 40px 20px;
//           font-family: 'DM Sans', sans-serif;
//         }

//         .rd-container {
//           max-width: 800px;
//           margin: auto;
//         }

//         .rd-card {
//           background: white;
//           padding: 24px;
//           border-radius: 20px;
//           box-shadow: 0 10px 30px rgba(5,150,105,0.1);
//           border: 1px solid #d1fae5;
//         }

//         .rd-card h1 {
//           font-size: 1.5rem;
//           font-weight: 800;
//           color: #064e3b;
//         }

//         .rd-desc {
//           margin: 10px 0;
//           color: #374151;
//         }

//         .rd-meta {
//           font-size: 0.9rem;
//           color: #6b7280;
//         }

//         .rd-budget {
//           margin-top: 8px;
//           font-weight: 600;
//           color: #047857;
//         }

//         .rd-owner {
//           margin-top: 6px;
//           font-size: 0.9rem;
//         }

//         .rd-actions {
//           margin-top: 16px;
//           display: flex;
//           gap: 10px;
//           flex-wrap: wrap;
//         }

//         .btn {
//           padding: 8px 14px;
//           border-radius: 10px;
//           border: none;
//           cursor: pointer;
//           font-weight: 600;
//           transition: 0.2s;
//         }

//         .btn:hover {
//           transform: translateY(-2px);
//         }

//         .btn.green {
//           background: #059669;
//           color: white;
//         }

//         .btn.red {
//           background: #dc2626;
//           color: white;
//         }

//         .btn.blue {
//           background: #2563eb;
//           color: white;
//         }

//         .btn.gray {
//           background: #e5e7eb;
//         }

//         .btn.outline {
//           border: 1px solid #ccc;
//           background: white;
//         }

//         .btn.disabled {
//           background: #d1d5db;
//           cursor: not-allowed;
//         }

//         .btn.small {
//           padding: 5px 10px;
//           font-size: 0.8rem;
//         }

//         .rd-contact {
//           margin-top: 20px;
//           background: #ecfdf5;
//           border: 1px solid #bbf7d0;
//           padding: 16px;
//           border-radius: 14px;
//         }

//         .rd-contact h3 {
//           margin-bottom: 6px;
//           color: #065f46;
//         }

//         .rd-contact p {
//           font-size: 1.1rem;
//           color: #047857;
//           font-weight: 600;
//         }

//         .rd-owner-panel {
//           margin-top: 20px;
//           background: white;
//           padding: 16px;
//           border-radius: 14px;
//           border: 1px solid #e5e7eb;
//         }

//         .rd-user-row {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 10px 0;
//           border-bottom: 1px solid #f3f4f6;
//         }

//         .status {
//           margin-left: 10px;
//           font-size: 0.8rem;
//           color: #6b7280;
//         }

//         .actions {
//           display: flex;
//           gap: 8px;
//         }

//         .empty {
//           color: #6b7280;
//         }

//         .rd-loading {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           height: 100vh;
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
//   )
// }

// export default RoommateDetails;


import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';
import Alert from '../components/Alert';
import {
  ArrowLeft, MapPin, IndianRupee, User, Phone,
  CheckCircle, XCircle, Clock, Trash2, Users,
  Heart, Send, UserCheck
} from 'lucide-react';

function RoommateDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  const userId = user?.id;
  const isAdmin = user?.role === 'admin';

  const loadRoommate = async () => {
    try {
      const res = await api.get(`/api/roommates/${id}`);
      setItem(res.data);
    } catch {
      setError('Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRoommate(); }, [id]);

  if (loading) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
        .rd-load { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#f0faf4; gap:14px; font-family:'DM Sans',sans-serif; }
        .rd-spin { width:44px; height:44px; border:3px solid #d1fae5; border-top-color:#059669; border-radius:50%; animation:rdSpin 0.75s linear infinite; }
        @keyframes rdSpin { to { transform:rotate(360deg); } }
      `}</style>
      <div className="rd-load"><div className="rd-spin" /><span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Loading…</span></div>
    </>
  );

  if (!item) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0faf4', fontFamily: 'DM Sans, sans-serif', color: '#6b7280' }}>
      Listing not found.
    </div>
  );

  const ownerId = item.ownerId?._id || item.ownerId;
  const isOwner = userId && ownerId === userId;

  const currentInterest = (item.interestedUsers || []).find(u => {
    const uid = u.userId?._id || u.userId;
    return uid === userId;
  });
  const currentStatus = currentInterest?.status;

  const handleInterested = async () => {
    try {
      await api.post(`/api/roommates/${id}/interested`);
      setSuccess('Request Sent!');
      await loadRoommate();
    } catch (err) {
      setError(err.response?.data?.message || 'Request failed');
    }
  };

  const handleAccept = async (uid) => {
    try {
      await api.post(`/api/roommates/${id}/accept/${uid}`);
      setSuccess('User accepted');
      await loadRoommate();
    } catch { setError('Accept failed'); }
  };

  const handleReject = async (uid) => {
    try {
      await api.post(`/api/roommates/${id}/reject/${uid}`);
      setSuccess('User rejected');
      await loadRoommate();
    } catch { setError('Reject failed'); }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this request?')) return;
    try {
      await api.delete(`/api/roommates/${id}`);
      navigate('/roommates');
    } catch { setError('Delete failed'); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .rd-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #f0faf4;
          padding: 36px 0 60px;
        }
        .rd-container { max-width: 760px; margin: 0 auto; padding: 0 20px; }

        .rd-back {
          display: inline-flex; align-items: center; gap: 6px;
          background: #fff; border: 1.5px solid #d1fae5;
          border-radius: 10px; padding: 8px 16px;
          font-size: 0.875rem; font-weight: 600; color: #059669;
          cursor: pointer; transition: all 0.18s; margin-bottom: 24px;
          font-family: 'DM Sans', sans-serif; text-decoration: none;
          border: none;
        }
        .rd-back:hover { background: #ecfdf5; transform: translateX(-2px); }

        /* Hero card */
        .rd-hero-card {
          background: linear-gradient(160deg, #064e3b 0%, #065f46 60%, #047857 100%);
          border-radius: 22px; padding: 28px;
          position: relative; overflow: hidden; margin-bottom: 18px;
        }
        .rd-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 36px 36px; pointer-events: none;
        }
        .rd-hero-blob {
          position: absolute; width: 260px; height: 260px;
          background: radial-gradient(circle, rgba(110,231,183,0.2), transparent 65%);
          top: -60px; right: -40px; border-radius: 50%; pointer-events: none;
        }
        .rd-hero-inner { position: relative; z-index: 2; }
        .rd-hero-badge {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
          border-radius: 100px; padding: 3px 12px;
          font-size: 0.72rem; font-weight: 600; color: #a7f3d0;
          text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 10px;
        }
        .rd-hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.4rem, 4vw, 2rem);
          font-weight: 800; color: #fff;
          letter-spacing: -0.8px; line-height: 1.2; margin-bottom: 10px;
        }
        .rd-hero-meta {
          display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 18px;
        }
        .rd-meta-chip {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.18);
          border-radius: 100px; padding: 4px 12px;
          font-size: 0.8rem; font-weight: 600; color: #d1fae5;
        }
        .rd-hero-desc { color: #a7f3d0; font-size: 0.92rem; line-height: 1.65; }

        /* Action buttons row */
        .rd-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }

        .rd-btn-interested {
          display: inline-flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg, #6ee7b7, #34d399);
          color: #064e3b; font-weight: 700; font-size: 0.9rem;
          padding: 10px 20px; border-radius: 12px; border: none;
          cursor: pointer; transition: all 0.18s;
          box-shadow: 0 4px 14px rgba(52,211,153,0.35);
          font-family: 'DM Sans', sans-serif;
        }
        .rd-btn-interested:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(52,211,153,0.5); }
        .rd-btn-sent {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
          color: #d1fae5; padding: 10px 18px; border-radius: 12px;
          font-size: 0.875rem; font-weight: 600; cursor: default;
          font-family: 'DM Sans', sans-serif;
        }
        .rd-btn-accepted {
          display: inline-flex; align-items: center; gap: 7px;
          background: #dcfce7; color: #166534;
          border: 1.5px solid #bbf7d0;
          padding: 10px 18px; border-radius: 12px;
          font-size: 0.875rem; font-weight: 700; cursor: default;
          font-family: 'DM Sans', sans-serif;
        }
        .rd-btn-back {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          color: #d1fae5; padding: 10px 16px; border-radius: 12px;
          font-size: 0.875rem; font-weight: 600; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all 0.18s;
        }
        .rd-btn-back:hover { background: rgba(255,255,255,0.18); }
        .rd-btn-delete {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3);
          color: #fca5a5; padding: 10px 16px; border-radius: 12px;
          font-size: 0.875rem; font-weight: 600; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all 0.18s;
        }
        .rd-btn-delete:hover { background: rgba(239,68,68,0.25); }

        /* Info cards below */
        .rd-cards-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }
        @media (max-width: 520px) { .rd-cards-row { grid-template-columns: 1fr; } }

        .rd-info-card {
          background: #fff; border-radius: 16px;
          border: 1.5px solid #e6f7ef; padding: 18px 20px;
          box-shadow: 0 2px 8px rgba(5,150,105,0.06);
        }
        .rd-info-label {
          font-size: 0.72rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.4px;
          color: #9ca3af; margin-bottom: 6px;
        }
        .rd-info-value {
          font-size: 1rem; font-weight: 700; color: #0f2d1a;
          display: flex; align-items: center; gap: 6px;
        }
        .rd-info-value.rd-budget { color: #059669; font-size: 1.05rem; }
        .rd-info-value.rd-contact { color: #1d4ed8; }

        /* Owner panel */
        .rd-panel {
          background: #fff; border-radius: 18px;
          border: 1.5px solid #e6f7ef; padding: 22px;
          box-shadow: 0 2px 8px rgba(5,150,105,0.06);
          margin-top: 18px;
        }
        .rd-panel-title {
          font-family: 'Syne', sans-serif;
          font-size: 1rem; font-weight: 800;
          color: #0f2d1a; margin-bottom: 16px;
          display: flex; align-items: center; gap: 8px;
        }
        .rd-panel-count {
          background: #d1fae5; color: #065f46;
          border-radius: 100px; font-size: 0.72rem;
          font-weight: 800; padding: 2px 9px;
        }

        .rd-user-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 0; border-bottom: 1px solid #f0fdf4; gap: 10px;
          flex-wrap: wrap;
        }
        .rd-user-row:last-child { border-bottom: none; }
        .rd-user-info { display: flex; align-items: center; gap: 10px; }
        .rd-user-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #d1fae5, #a7f3d0);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .rd-user-name { font-weight: 600; font-size: 0.9rem; color: #0f2d1a; }
        .rd-user-status {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 2px 9px; border-radius: 100px;
          font-size: 0.72rem; font-weight: 700; margin-top: 2px;
        }
        .rd-s-accepted { background: #dcfce7; color: #166534; }
        .rd-s-rejected { background: #ffe4e6; color: #9f1239; }
        .rd-s-pending { background: #fef9c3; color: #854d0e; }

        .rd-user-btns { display: flex; gap: 8px; }
        .rd-accept-btn {
          display: inline-flex; align-items: center; gap: 4px;
          background: #dcfce7; color: #166534;
          border: 1px solid #bbf7d0;
          padding: 6px 13px; border-radius: 8px;
          font-size: 0.8rem; font-weight: 700; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all 0.18s;
        }
        .rd-accept-btn:hover { background: #bbf7d0; }
        .rd-reject-btn {
          display: inline-flex; align-items: center; gap: 4px;
          background: #f9fafb; color: #6b7280;
          border: 1px solid #e5e7eb;
          padding: 6px 13px; border-radius: 8px;
          font-size: 0.8rem; font-weight: 700; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: all 0.18s;
        }
        .rd-reject-btn:hover { background: #ffe4e6; color: #9f1239; border-color: #fecdd3; }

        .rd-empty-users {
          text-align: center; padding: 24px 0;
          color: #9ca3af; font-size: 0.88rem;
        }
      `}</style>

      <div className="rd-root">
        <div className="rd-container">

          <button onClick={() => navigate('/roommates')} className="rd-back">
            <ArrowLeft size={16} /> Back to Listings
          </button>

          {error && <Alert type="error" message={error} onClose={() => setError('')} />}
          {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

          {/* Hero card */}
          <div className="rd-hero-card">
            <div className="rd-hero-grid" />
            <div className="rd-hero-blob" />
            <div className="rd-hero-inner">
              <div className="rd-hero-badge"><Users size={11} /> Roommate Request</div>
              <h1 className="rd-hero-title">{item.title}</h1>

              <div className="rd-hero-meta">
                {(item.city || item.area) && (
                  <span className="rd-meta-chip">
                    <MapPin size={13} />
                    {item.city}{item.area ? ` · ${item.area}` : ''}
                  </span>
                )}
                {(item.budgetMin || item.budgetMax) && (
                  <span className="rd-meta-chip">
                    <IndianRupee size={13} />
                    {item.budgetMin || 'N/A'} – {item.budgetMax || 'N/A'}
                  </span>
                )}
                {item.preferredGender && (
                  <span className="rd-meta-chip">
                    <Users size={13} /> {item.preferredGender}
                  </span>
                )}
                {item.ownerId?.fullName && (
                  <span className="rd-meta-chip">
                    <User size={13} /> {item.ownerId.fullName}
                  </span>
                )}
              </div>

              {item.description && <p className="rd-hero-desc">{item.description}</p>}

              <div className="rd-actions">
                {!isOwner && !item.acceptedUserId && (
                  currentStatus === 'pending' ? (
                    <span className="rd-btn-sent"><Clock size={15} /> Request Sent</span>
                  ) : currentStatus === 'accepted' ? (
                    <span className="rd-btn-accepted"><CheckCircle size={15} /> Accepted!</span>
                  ) : (
                    <button onClick={handleInterested} className="rd-btn-interested">
                      <Send size={15} /> I'm Interested
                    </button>
                  )
                )}
                {(isOwner || isAdmin) && (
                  <button onClick={handleDelete} className="rd-btn-delete">
                    <Trash2 size={15} /> Delete
                  </button>
                )}
                <button onClick={() => navigate('/roommates')} className="rd-btn-back">
                  <ArrowLeft size={15} /> Back
                </button>
              </div>
            </div>
          </div>

          {/* Info row */}
          <div className="rd-cards-row">
            {(item.budgetMin || item.budgetMax) && (
              <div className="rd-info-card">
                <div className="rd-info-label">Budget Range</div>
                <div className="rd-info-value rd-budget">
                  <IndianRupee size={16} />
                  {item.budgetMin || 'N/A'} – {item.budgetMax || 'N/A'} /mo
                </div>
              </div>
            )}
            {item.ownerContact && (
              <div className="rd-info-card">
                <div className="rd-info-label">Owner Contact</div>
                <div className="rd-info-value rd-contact">
                  <Phone size={15} /> {item.ownerContact}
                </div>
              </div>
            )}
          </div>

          {/* Owner panel */}
          {isOwner && (
            <div className="rd-panel">
              <div className="rd-panel-title">
                <UserCheck size={18} color="#059669" />
                Interested Users
                {item.interestedUsers?.length > 0 && (
                  <span className="rd-panel-count">{item.interestedUsers.length}</span>
                )}
              </div>

              {item.interestedUsers?.length ? (
                item.interestedUsers.map(u => {
                  const uid = u.userId?._id || u.userId;
                  const statusCls = u.status === 'accepted' ? 'rd-s-accepted'
                    : u.status === 'rejected' ? 'rd-s-rejected' : 'rd-s-pending';
                  const StatusIcon = u.status === 'accepted' ? CheckCircle
                    : u.status === 'rejected' ? XCircle : Clock;
                  return (
                    <div key={uid} className="rd-user-row">
                      <div className="rd-user-info">
                        <div className="rd-user-avatar"><User size={16} color="#059669" /></div>
                        <div>
                          <div className="rd-user-name">{u.userId?.fullName || 'Unknown'}</div>
                          <span className={`rd-user-status ${statusCls}`}>
                            <StatusIcon size={10} /> {u.status || 'pending'}
                          </span>
                        </div>
                      </div>
                      <div className="rd-user-btns">
                        {u.status !== 'accepted' && (
                          <button onClick={() => handleAccept(uid)} className="rd-accept-btn">
                            <CheckCircle size={12} /> Accept
                          </button>
                        )}
                        <button onClick={() => handleReject(uid)} className="rd-reject-btn">
                          <XCircle size={12} /> Reject
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="rd-empty-users">
                  <Users size={28} color="#d1fae5" style={{ margin: '0 auto 8px', display: 'block' }} />
                  No interested users yet
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default RoommateDetails;