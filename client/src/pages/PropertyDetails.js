// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../utils/api';
// import Alert from '../components/Alert';
// import BookingForm from '../components/BookingForm';
// import { ArrowLeft, Phone, MapPin, DollarSign, Loader } from 'lucide-react';
// import AuthContext from '../context/AuthContext';

// function PropertyDetails() {

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [property, setProperty] = useState(null);
//   const [form, setForm] = useState({});
//   const [bookings, setBookings] = useState([]);

//   const [selectedImage, setSelectedImage] = useState(0); // ✅ SLIDER

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [showBooking, setShowBooking] = useState(false);

//   const { user } = useContext(AuthContext);

//   const isAdmin = user && user.role === 'admin';
//   const isOwner = user && property?.ownerId === user.id;

//   useEffect(() => {
//     loadProperty();
//   }, []);

//   const loadProperty = async () => {
//     try {
//       const res = await api.get(`/api/properties/${id}`);
//       setProperty(res.data);
//       setForm(res.data);

//       if (user) {
//         try {
//           const b = await api.get(`/api/bookings/property/${id}`);
//           setBookings(b.data);
//         } catch {}
//       }

//     } catch {
//       setError('Failed to load');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setForm(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleUpdate = async () => {
//     try {
//       const res = await api.put(`/api/properties/${id}`, form);
//       setProperty(res.data);
//       setIsEditing(false);
//       setSuccess("Updated successfully");
//     } catch {
//       setError("Update failed");
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure?")) return;

//     try {
//       await api.delete(`/api/properties/${id}`);
//       navigate('/');
//     } catch {
//       setError("Delete failed");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <Loader className="animate-spin text-blue-600" size={40} />
//       </div>
//     );
//   }

//   if (!property) return <div>Not found</div>;

//   const images = property.images?.length ? property.images : [property.image];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">

//       <div className="max-w-5xl mx-auto px-4">

//         <button onClick={() => navigate('/')}
//           className="mb-6 flex items-center text-blue-600 hover:underline">
//           <ArrowLeft size={18}/> Back
//         </button>

//         {error && <Alert type="error" message={error}/>}
//         {success && <Alert type="success" message={success}/>}

//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

//           {/* ================= IMAGE SLIDER ================= */}
//           <div className="relative">

//             <img
//               src={images[selectedImage]}
//               className="w-full h-80 object-cover"
//             />

//             {/* LEFT */}
//             {selectedImage > 0 && (
//               <button
//                 onClick={() => setSelectedImage(selectedImage - 1)}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
//               >
//                 ‹
//               </button>
//             )}

//             {/* RIGHT */}
//             {selectedImage < images.length - 1 && (
//               <button
//                 onClick={() => setSelectedImage(selectedImage + 1)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
//               >
//                 ›
//               </button>
//             )}

//             {/* DOTS */}
//             <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
//               {images.map((_, i) => (
//                 <div
//                   key={i}
//                   onClick={() => setSelectedImage(i)}
//                   className={`h-2 w-2 rounded-full cursor-pointer 
//                   ${i === selectedImage ? 'bg-white' : 'bg-white/50'}`}
//                 />
//               ))}
//             </div>

//           </div>

//           {/* ================= CONTENT ================= */}
//           <div className="p-6">

//             {/* ACTION BUTTONS */}
//             <div className="flex flex-wrap gap-2 mb-4">

//               {property.availabilityStatus !== 'not_available' && (
//                 <button
//                   onClick={() => setShowBooking(true)}
//                   className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
//                 >
//                   Book Now
//                 </button>
//               )}

//               {(isAdmin || isOwner) && (
//                 <button
//                   onClick={() => setIsEditing(!isEditing)}
//                   className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
//                 >
//                   {isEditing ? "Cancel" : "Edit"}
//                 </button>
//               )}

//               {isAdmin && (
//                 <button
//                   onClick={handleDelete}
//                   className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
//                 >
//                   Delete
//                 </button>
//               )}

//             </div>

//             {/* TITLE */}
//             {isEditing ? (
//               <input name="title" value={form.title} onChange={handleChange}
//                 className="border p-2 w-full rounded mb-3"/>
//             ) : (
//               <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
//             )}

//             {/* PRICE */}
//             {isEditing ? (
//               <input name="price" value={form.price} onChange={handleChange}
//                 className="border p-2 w-full rounded mb-3"/>
//             ) : (
//               <div className="flex items-center text-green-600 text-2xl font-bold mb-4">
//                 <DollarSign className="mr-1"/> {property.price}
//               </div>
//             )}

//             {/* LOCATION */}
//             {isEditing ? (
//               <input name="city" value={form.city} onChange={handleChange}
//                 className="border p-2 w-full rounded mb-3"/>
//             ) : (
//               <div className="flex items-center text-gray-600 mb-4">
//                 <MapPin className="mr-2 text-red-500"/>
//                 {property.city}
//               </div>
//             )}

//             {/* DESCRIPTION */}
//             {isEditing ? (
//               <textarea name="description" value={form.description} onChange={handleChange}
//                 className="border p-2 w-full rounded mb-3"/>
//             ) : (
//               <p className="text-gray-700 mb-4">{property.description}</p>
//             )}

//             {/* CONTACT */}
//             {isEditing ? (
//               <input name="contact" value={form.contact} onChange={handleChange}
//                 className="border p-2 w-full rounded mb-3"/>
//             ) : (
//               <div className="flex items-center text-blue-600 font-semibold mb-4">
//                 <Phone className="mr-2"/>
//                 {property.contact}
//               </div>
//             )}

//             {/* AVAILABILITY */}
//             {isEditing ? (
//               <>
//                 <select name="availabilityStatus" value={form.availabilityStatus}
//                   onChange={handleChange} className="border p-2 w-full rounded mb-3">
//                   <option value="available">Available</option>
//                   <option value="not_available">Not Available</option>
//                 </select>

//                 {form.availabilityStatus === 'not_available' && (
//                   <input type="date" name="availableFrom"
//                     value={form.availableFrom || ''}
//                     onChange={handleChange}
//                     className="border p-2 w-full rounded mb-3"/>
//                 )}
//               </>
//             ) : (
//               <div className="mb-4">
//                 <span className={`px-3 py-1 rounded-full text-sm 
//                   ${property.availabilityStatus === 'available'
//                     ? 'bg-green-100 text-green-700'
//                     : 'bg-red-100 text-red-700'}`}>
//                   {property.availabilityStatus === 'available'
//                     ? "Available"
//                     : `Available from ${property.availableFrom}`}
//                 </span>
//               </div>
//             )}

//             {/* SAVE */}
//             {isEditing && (
//               <button
//                 onClick={handleUpdate}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
//               >
//                 Save Changes
//               </button>
//             )}

//             {/* ================= OWNER BOOKINGS ================= */}
//             {(isOwner || isAdmin) && (
//               <div className="mt-8">
//                 <h2 className="text-xl font-semibold mb-3">Bookings</h2>

//                 {bookings.length === 0 ? (
//                   <p className="text-gray-500">No bookings yet</p>
//                 ) : (
//                   <div className="space-y-3">

//                     {bookings.map(b => (
//                       <div key={b._id} className="border p-3 rounded-lg">

//                         <p><strong>Name:</strong> {b.name}</p>
//                         <p><strong>Phone:</strong> {b.phone}</p>

//                         <p className="text-sm text-gray-600">
//                           {new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}
//                         </p>

//                       </div>
//                     ))}

//                   </div>
//                 )}

//               </div>
//             )}

//           </div>
//         </div>

//       </div>

//       {showBooking && (
//         <BookingForm
//           propertyId={id}
//           onClose={() => setShowBooking(false)}
//         />
//       )}

//     </div>
//   );
// }

// export default PropertyDetails;

// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../utils/api';
// import Alert from '../components/Alert';
// import BookingForm from '../components/BookingForm';
// import { ArrowLeft, Phone, MapPin, DollarSign, Loader } from 'lucide-react';
// import AuthContext from '../context/AuthContext';

// function PropertyDetails() {

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [property, setProperty] = useState(null);
//   const [form, setForm] = useState({});
//   const [bookings, setBookings] = useState([]);

//   const [selectedImage, setSelectedImage] = useState(0);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [showBooking, setShowBooking] = useState(false);

//   const { user } = useContext(AuthContext);

//   const isAdmin = user && user.role === 'admin';
//   const isOwner = user && property?.ownerId === user.id;

//   useEffect(() => {
//     loadProperty();
//   }, []);

//   const loadProperty = async () => {
//     try {
//       const res = await api.get(`/api/properties/${id}`);
//       setProperty(res.data);
//       setForm(res.data);

//       if (user) {
//         try {
//           const b = await api.get(`/api/bookings/property/${id}`);
//           setBookings(b.data);
//         } catch {}
//       }

//     } catch {
//       setError('Failed to load');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setForm(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleUpdate = async () => {
//     try {
//       const res = await api.put(`/api/properties/${id}`, form);
//       setProperty(res.data);
//       setIsEditing(false);
//       setSuccess("Updated successfully");
//     } catch {
//       setError("Update failed");
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure?")) return;

//     try {
//       await api.delete(`/api/properties/${id}`);
//       navigate('/');
//     } catch {
//       setError("Delete failed");
//     }
//   };

//   // ✅ APPROVE / REJECT
//   const updateStatus = async (bookingId, status) => {
//     try {
//       await api.patch(`/api/bookings/${bookingId}`, { status });

//       // refresh bookings
//       const b = await api.get(`/api/bookings/property/${id}`);
//       setBookings(b.data);

//     } catch {
//       setError("Failed to update status");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <Loader className="animate-spin text-blue-600" size={40} />
//       </div>
//     );
//   }

//   if (!property) return <div>Not found</div>;

//   const images = property.images?.length ? property.images : [property.image];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">

//       <div className="max-w-5xl mx-auto px-4">

//         <button onClick={() => navigate('/')}
//           className="mb-6 flex items-center text-blue-600 hover:underline">
//           <ArrowLeft size={18}/> Back
//         </button>

//         {error && <Alert type="error" message={error}/>}
//         {success && <Alert type="success" message={success}/>}

//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

//           {/* ================= IMAGE SLIDER ================= */}
//           <div className="relative">

//             <img
//               src={images[selectedImage]}
//               className="w-full h-80 object-cover"
//             />

//             {selectedImage > 0 && (
//               <button
//                 onClick={() => setSelectedImage(selectedImage - 1)}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
//               >
//                 ‹
//               </button>
//             )}

//             {selectedImage < images.length - 1 && (
//               <button
//                 onClick={() => setSelectedImage(selectedImage + 1)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
//               >
//                 ›
//               </button>
//             )}

//             <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
//               {images.map((_, i) => (
//                 <div
//                   key={i}
//                   onClick={() => setSelectedImage(i)}
//                   className={`h-2 w-2 rounded-full cursor-pointer 
//                   ${i === selectedImage ? 'bg-white' : 'bg-white/50'}`}
//                 />
//               ))}
//             </div>

//           </div>

//           {/* ================= CONTENT ================= */}
//           <div className="p-6">

//             {/* ACTIONS */}
//             <div className="flex flex-wrap gap-2 mb-4">

//               {property.availabilityStatus !== 'not_available' && (
//                 <button
//                   onClick={() => setShowBooking(true)}
//                   className="bg-green-600 text-white px-4 py-2 rounded-lg"
//                 >
//                   Book Now
//                 </button>
//               )}

//               {(isAdmin || isOwner) && (
//                 <button
//                   onClick={() => setIsEditing(!isEditing)}
//                   className="bg-gray-200 px-4 py-2 rounded-lg"
//                 >
//                   {isEditing ? "Cancel" : "Edit"}
//                 </button>
//               )}

//               {isAdmin && (
//                 <button
//                   onClick={handleDelete}
//                   className="bg-red-600 text-white px-4 py-2 rounded-lg"
//                 >
//                   Delete
//                 </button>
//               )}

//             </div>

//             <h1 className="text-3xl font-bold mb-2">{property.title}</h1>

//             <div className="flex items-center text-green-600 text-2xl font-bold mb-4">
//               <DollarSign className="mr-1"/> {property.price}
//             </div>

//             <div className="flex items-center text-gray-600 mb-4">
//               <MapPin className="mr-2 text-red-500"/>
//               {property.city}
//             </div>

//             <p className="text-gray-700 mb-4">{property.description}</p>

//             <div className="flex items-center text-blue-600 font-semibold mb-4">
//               <Phone className="mr-2"/>
//               {property.contact}
//             </div>

//             {/* ================= BOOKINGS ================= */}
//             {(isOwner || isAdmin) && (
//               <div className="mt-8">
//                 <h2 className="text-xl font-semibold mb-3">Bookings</h2>

//                 {bookings.length === 0 ? (
//                   <p className="text-gray-500">No bookings yet</p>
//                 ) : (
//                   <div className="space-y-3">

//                     {bookings.map(b => (
//                       <div key={b._id} className="border p-4 rounded-lg">

//                         <p><strong>Name:</strong> {b.name}</p>
//                         <p><strong>Phone:</strong> {b.phone}</p>

//                         <p className="text-sm text-gray-600 mb-2">
//                           {new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}
//                         </p>

//                         {/* STATUS */}
//                         <div className="mb-2">
//                           <span className={`px-2 py-1 text-xs rounded 
//                             ${b.status === 'approved'
//                               ? 'bg-green-100 text-green-700'
//                               : b.status === 'rejected'
//                               ? 'bg-red-100 text-red-700'
//                               : 'bg-yellow-100 text-yellow-700'}`}>
//                             {b.status || 'pending'}
//                           </span>
//                         </div>

//                         {/* BUTTONS */}
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => updateStatus(b._id, 'approved')}
//                             className="bg-green-600 text-white px-3 py-1 rounded"
//                           >
//                             Approve
//                           </button>

//                           <button
//                             onClick={() => updateStatus(b._id, 'rejected')}
//                             className="bg-red-600 text-white px-3 py-1 rounded"
//                           >
//                             Reject
//                           </button>
//                         </div>

//                       </div>
//                     ))}

//                   </div>
//                 )}

//               </div>
//             )}

//           </div>
//         </div>

//       </div>

//       {showBooking && (
//         <BookingForm
//           propertyId={id}
//           onClose={() => setShowBooking(false)}
//         />
//       )}

//     </div>
//   );
// }

// export default PropertyDetails;

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Alert from '../components/Alert';
import BookingForm from '../components/BookingForm';
import ReviewSection from '../components/ReviewSection';
import {
  ArrowLeft, Phone, MapPin, IndianRupee,
  CheckCircle, XCircle, Clock, Trash2, Pencil, X,
  ChevronLeft, ChevronRight, Home, Users, Calendar,
  Save, AlertTriangle, Wifi, Car, Wind, Zap, Dumbbell,
  ShieldCheck, Star, Ruler, Building2, Share2
} from 'lucide-react';
import AuthContext from '../context/AuthContext';
import ChatWindow from '../components/ChatWindow';
 import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

// ── Amenity icon map ──
const amenityIcons = {
  wifi: <Wifi size={14} />, internet: <Wifi size={14} />,
  parking: <Car size={14} />, car: <Car size={14} />,
  ac: <Wind size={14} />, 'air conditioning': <Wind size={14} />, airconditioning: <Wind size={14} />,
  gym: <Dumbbell size={14} />, fitness: <Dumbbell size={14} />,
  power: <Zap size={14} />, electricity: <Zap size={14} />, generator: <Zap size={14} />,
  security: <ShieldCheck size={14} />, cctv: <ShieldCheck size={14} />,
};
function AmenityIcon({ name }) {
  const key = name.toLowerCase().replace(/\s+/g, '');
  for (const [k, icon] of Object.entries(amenityIcons)) {
    if (key.includes(k)) return icon;
  }
  return <span style={{ fontSize: 13 }}>✦</span>;
}

function PropertyDetails() {

   
  const [showChat, setShowChat] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [form, setForm] = useState({});
  const [bookings, setBookings] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [copied, setCopied] = useState(false);

  const { user } = useContext(AuthContext);
  const isAdmin = user && user.role === 'admin';
  const isOwner = user && property?.ownerId === user.id;

    const [editMapPin, setEditMapPin] = useState(
     form.lat && form.lng ? { lat: form.lat, lng: form.lng } : null
   );

   function EditMapClick({ onPick }) {
     useMapEvents({ click: e => onPick(e.latlng.lat, e.latlng.lng) });
     return null;
   }

   const handleEditMapPick = (lat, lng) => {
     const la = parseFloat(lat.toFixed(6));
     const ln = parseFloat(lng.toFixed(6));
     setEditMapPin({ lat: la, lng: ln });
     setForm(p => ({ ...p, lat: la, lng: ln }));
   };


  useEffect(() => { loadProperty(); }, []);

  const loadProperty = async () => {
    try {
      const res = await api.get(`/api/properties/${id}`);
      setProperty(res.data);
      setForm({ ...res.data, amenities: Array.isArray(res.data.amenities) ? res.data.amenities.join(', ') : res.data.amenities || '' });
      if (user) {
        try { const b = await api.get(`/api/bookings/property/${id}`); setBookings(b.data); } catch {}
      }
    } catch { setError('Failed to load'); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'availabilityStatus' && value === 'available') updated.availableFrom = '';
      return updated;
    });
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        ...form,
        amenities: form.amenities
          ? form.amenities.split(',').map(a => a.trim()).filter(Boolean)
          : [],
      };
      const res = await api.put(`/api/properties/${id}`, payload);
      setProperty(res.data);
      setIsEditing(false);
      setSuccess('Property updated successfully!');
    } catch { setError('Update failed'); }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try { await api.delete(`/api/properties/${id}`); navigate('/'); }
    catch { setError('Delete failed'); }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      await api.patch(`/api/bookings/${bookingId}`, { status });
      const b = await api.get(`/api/bookings/property/${id}`);
      setBookings(b.data);
    } catch { setError('Failed to update status'); }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAvailableFromReached = (dateStr) => {
    if (!dateStr) return false;
    const today = new Date(); today.setHours(0,0,0,0);
    const avail = new Date(dateStr); avail.setHours(0,0,0,0);
    return avail <= today;
  };

  const effectiveStatus = () => {
    if (!property) return 'not_available';
    if (property.availabilityStatus === 'not_available' && isAvailableFromReached(property.availableFrom)) return 'available';
    return property.availabilityStatus;
  };

  const isCurrentlyAvailable = effectiveStatus() === 'available';

  // Parse amenities safely
  const amenitiesList = Array.isArray(property?.amenities)
    ? property.amenities
    : (property?.amenities ? property.amenities.split(',').map(a => a.trim()).filter(Boolean) : []);

  if (loading) return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
      .pd-load{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#f0faf4;gap:14px;font-family:'DM Sans',sans-serif;}
      .pd-spin{width:44px;height:44px;border:3px solid #d1fae5;border-top-color:#059669;border-radius:50%;animation:pdSpin 0.75s linear infinite;}
      @keyframes pdSpin{to{transform:rotate(360deg);}}`}</style>
      <div className="pd-load"><div className="pd-spin"/><span style={{color:'#6b7280',fontSize:'0.9rem'}}>Loading property…</span></div>
    </>
  );

  if (!property) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f0faf4',fontFamily:'DM Sans,sans-serif',color:'#6b7280'}}>
      Property not found.
    </div>
  );

  const images = property.images?.length ? property.images : [property.image].filter(Boolean);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;}

        .pd-root{font-family:'DM Sans',sans-serif;min-height:100vh;background:#f0faf4;padding:32px 0 60px;}
        .pd-container{max-width:960px;margin:0 auto;padding:0 20px;}

        /* Top bar */
        .pd-topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;gap:10px;flex-wrap:wrap;}
        .pd-back{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1.5px solid #d1fae5;border-radius:10px;padding:8px 16px;font-size:0.875rem;font-weight:600;color:#059669;cursor:pointer;transition:all 0.18s;font-family:'DM Sans',sans-serif;}
        .pd-back:hover{background:#ecfdf5;border-color:#34d399;transform:translateX(-2px);}
        .pd-share-btn{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1.5px solid #e5e7eb;border-radius:10px;padding:8px 14px;font-size:0.82rem;font-weight:600;color:#6b7280;cursor:pointer;transition:all 0.18s;font-family:'DM Sans',sans-serif;}
        .pd-share-btn:hover{border-color:#d1fae5;color:#059669;}
        .pd-share-btn.copied{background:#ecfdf5;border-color:#a7f3d0;color:#059669;}

        .pd-card{background:#fff;border-radius:24px;border:1.5px solid #e6f7ef;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.04),0 20px 40px rgba(5,150,105,0.08);}

        /* Slider */
        .pd-slider{position:relative;height:400px;background:#ecfdf5;overflow:hidden;}
        .pd-slider-img{width:100%;height:100%;object-fit:cover;transition:opacity 0.3s;}
        .pd-slider-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(6,78,59,0.55) 0%,transparent 45%);pointer-events:none;}
        .pd-slider-btn{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.92);backdrop-filter:blur(8px);border:none;border-radius:50%;width:42px;height:42px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.18s;box-shadow:0 4px 12px rgba(0,0,0,0.15);color:#0f2d1a;}
        .pd-slider-btn:hover{background:#fff;transform:translateY(-50%) scale(1.07);}
        .pd-slider-btn-left{left:16px;} .pd-slider-btn-right{right:16px;}
        .pd-dots{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);display:flex;gap:6px;}
        .pd-dot{width:8px;height:8px;border-radius:50%;cursor:pointer;transition:all 0.18s;background:rgba(255,255,255,0.5);border:none;}
        .pd-dot.pd-dot-active{background:#fff;width:24px;border-radius:4px;}
        .pd-avail-ribbon{position:absolute;top:16px;left:16px;display:flex;align-items:center;gap:5px;padding:5px 13px;border-radius:100px;font-size:0.78rem;font-weight:700;backdrop-filter:blur(8px);}
        .pd-avail-ribbon.available{background:rgba(236,253,245,0.95);color:#065f46;border:1px solid rgba(52,211,153,0.5);}
        .pd-avail-ribbon.unavailable{background:rgba(255,241,242,0.95);color:#9f1239;border:1px solid rgba(251,113,133,0.4);}
        .pd-avail-ribbon.soon{background:rgba(254,249,195,0.95);color:#854d0e;border:1px solid rgba(251,191,36,0.4);}
        .pd-avail-pulse{width:7px;height:7px;border-radius:50%;background:#10b981;animation:pdPulse 1.8s ease infinite;}
        @keyframes pdPulse{0%,100%{opacity:1}50%{opacity:0.3}}
        .pd-img-counter{position:absolute;top:16px;right:16px;background:rgba(0,0,0,0.45);backdrop-filter:blur(8px);color:#fff;border-radius:100px;padding:4px 12px;font-size:0.78rem;font-weight:600;}

        /* Slide-in title on image */
        .pd-img-title{position:absolute;bottom:20px;left:20px;right:20px;}
        .pd-img-title-text{font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:800;color:#fff;letter-spacing:-0.5px;line-height:1.2;text-shadow:0 2px 8px rgba(0,0,0,0.3);}
        .pd-img-price{font-size:1.1rem;font-weight:800;color:#6ee7b7;display:flex;align-items:center;gap:3px;margin-top:4px;}

        /* Body */
        .pd-body{padding:28px;}

        /* Action buttons */
        .pd-actions{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:22px;}
        .pd-btn-book{display:inline-flex;align-items:center;gap:7px;background:linear-gradient(135deg,#059669,#047857);color:#fff;padding:11px 24px;border-radius:12px;border:none;cursor:pointer;font-size:0.9rem;font-weight:700;transition:all 0.18s;box-shadow:0 4px 14px rgba(5,150,105,0.3);font-family:'DM Sans',sans-serif;}
        .pd-btn-book:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(5,150,105,0.42);}
        .pd-btn-edit{display:inline-flex;align-items:center;gap:7px;background:#f0fdf4;color:#065f46;border:1.5px solid #d1fae5;padding:10px 18px;border-radius:12px;font-size:0.875rem;font-weight:600;cursor:pointer;transition:all 0.18s;font-family:'DM Sans',sans-serif;}
        .pd-btn-edit:hover{background:#dcfce7;border-color:#a7f3d0;}
        .pd-btn-delete{display:inline-flex;align-items:center;gap:7px;background:#fff1f2;color:#be123c;border:1.5px solid #fecdd3;padding:10px 18px;border-radius:12px;font-size:0.875rem;font-weight:600;cursor:pointer;transition:all 0.18s;font-family:'DM Sans',sans-serif;}
        .pd-btn-delete:hover{background:#ffe4e6;border-color:#fda4af;}

        /* Rating display */
        .pd-rating-row{display:flex;align-items:center;gap:8px;margin-bottom:16px;}
        .pd-rating-stars{color:#f59e0b;font-size:1rem;letter-spacing:1px;}
        .pd-rating-num{font-weight:800;font-size:0.95rem;color:#0f2d1a;}
        .pd-rating-count{font-size:0.82rem;color:#9ca3af;}
        .pd-verified-badge{display:inline-flex;align-items:center;gap:5px;background:#dcfce7;border:1px solid #bbf7d0;border-radius:100px;padding:3px 11px;font-size:0.75rem;font-weight:700;color:#166534;}

        /* Info chips */
        .pd-info-row{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:22px;}
        .pd-info-chip{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:12px;font-size:0.875rem;font-weight:600;}
        .pd-chip-price{background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;font-size:1.05rem;}
        .pd-chip-location{background:#fef2f2;color:#991b1b;border:1px solid #fecaca;}
        .pd-chip-contact{background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe;}
        .pd-chip-gender{background:#f5f3ff;color:#5b21b6;border:1px solid #ddd6fe;}
        .pd-chip-type{background:#fff7ed;color:#9a3412;border:1px solid #fed7aa;}
        .pd-chip-size{background:#f0fdf4;color:#166534;border:1px solid #bbf7d0;}
        .pd-chip-area{background:#f0f9ff;color:#0c4a6e;border:1px solid #bae6fd;}

        /* Section label */
        .pd-section-label{font-size:0.76rem;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;color:#9ca3af;margin-bottom:10px;display:flex;align-items:center;gap:8px;}
        .pd-section-label::after{content:'';flex:1;height:1px;background:linear-gradient(to right,#e5e7eb,transparent);}

        .pd-desc{color:#374151;font-size:0.95rem;line-height:1.75;margin-bottom:22px;}

        /* Amenities */
        .pd-amenities-grid{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px;}
        .pd-amenity-tag{display:inline-flex;align-items:center;gap:6px;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:10px;padding:7px 13px;font-size:0.82rem;font-weight:600;color:#374151;transition:all 0.18s;}
        .pd-amenity-tag:hover{background:#ecfdf5;border-color:#a7f3d0;color:#065f46;}

        .pd-divider{border:none;border-top:1px solid #f0fdf4;margin:22px 0;}

        /* ── EDIT FORM ── */
        .pd-edit-section{background:#f0fdf4;border:1.5px solid #d1fae5;border-radius:18px;padding:22px;margin-bottom:24px;animation:pdFadeIn 0.22s ease;}
        @keyframes pdFadeIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .pd-edit-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;}
        .pd-edit-title{font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;color:#065f46;display:flex;align-items:center;gap:8px;}
        .pd-edit-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        @media(max-width:600px){.pd-edit-grid{grid-template-columns:1fr;}}
        .pd-edit-full{grid-column:1/-1;}
        .pd-edit-field{display:flex;flex-direction:column;gap:5px;}
        .pd-edit-label{font-size:0.74rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.3px;}
        .pd-edit-input{width:100%;background:#fff;border:1.5px solid #d1fae5;border-radius:10px;padding:10px 13px;font-size:0.875rem;font-family:'DM Sans',sans-serif;color:#0f2d1a;outline:none;transition:all 0.18s;}
        .pd-edit-input:focus{border-color:#34d399;box-shadow:0 0 0 3px rgba(52,211,153,0.15);}
        .pd-edit-select{width:100%;background:#fff;border:1.5px solid #d1fae5;border-radius:10px;padding:10px 32px 10px 13px;font-size:0.875rem;font-family:'DM Sans',sans-serif;color:#0f2d1a;outline:none;cursor:pointer;transition:all 0.18s;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;}
        .pd-edit-select:focus{border-color:#34d399;box-shadow:0 0 0 3px rgba(52,211,153,0.15);}
        .pd-avail-notice{display:flex;align-items:flex-start;gap:10px;background:#fefce8;border:1.5px solid #fef08a;border-radius:12px;padding:12px 14px;font-size:0.82rem;color:#854d0e;font-family:'DM Sans',sans-serif;line-height:1.5;}
        .pd-avail-notice strong{font-weight:700;display:block;margin-bottom:2px;}
        .pd-auto-avail-banner{display:flex;align-items:center;gap:10px;background:#dcfce7;border:1.5px solid #a7f3d0;border-radius:12px;padding:12px 16px;font-size:0.875rem;font-weight:600;color:#166534;margin-bottom:16px;}
        .pd-edit-save{display:inline-flex;align-items:center;gap:7px;background:linear-gradient(135deg,#059669,#047857);color:#fff;padding:11px 22px;border-radius:11px;font-size:0.9rem;font-weight:700;border:none;cursor:pointer;transition:all 0.18s;font-family:'DM Sans',sans-serif;box-shadow:0 4px 14px rgba(5,150,105,0.3);margin-top:18px;}
        .pd-edit-save:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(5,150,105,0.42);}

        /* Bookings */
        .pd-bookings-title{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:800;color:#0f2d1a;margin-bottom:16px;display:flex;align-items:center;gap:8px;}
        .pd-bookings-count{background:#059669;color:#fff;border-radius:100px;font-size:0.72rem;font-weight:800;padding:2px 9px;}
        .pd-booking-card{background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:14px;padding:16px;margin-bottom:12px;transition:border-color 0.18s;}
        .pd-booking-card:hover{border-color:#a7f3d0;}
        .pd-booking-name{font-weight:700;font-size:0.95rem;color:#0f2d1a;margin-bottom:4px;}
        .pd-booking-meta{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:10px;}
        .pd-booking-meta-item{display:flex;align-items:center;gap:5px;font-size:0.8rem;color:#6b7280;}
        .pd-status-chip{display:inline-flex;align-items:center;gap:5px;padding:3px 11px;border-radius:100px;font-size:0.75rem;font-weight:700;margin-bottom:10px;}
        .pd-status-approved{background:#dcfce7;color:#166534;}
        .pd-status-rejected{background:#ffe4e6;color:#9f1239;}
        .pd-status-pending{background:#fef9c3;color:#854d0e;}
        .pd-booking-actions{display:flex;gap:8px;}
        .pd-approve-btn{display:inline-flex;align-items:center;gap:5px;background:#dcfce7;color:#166534;border:1px solid #bbf7d0;padding:6px 14px;border-radius:8px;font-size:0.8rem;font-weight:700;cursor:pointer;transition:all 0.18s;font-family:'DM Sans',sans-serif;}
        .pd-approve-btn:hover{background:#bbf7d0;}
        .pd-reject-btn{display:inline-flex;align-items:center;gap:5px;background:#ffe4e6;color:#9f1239;border:1px solid #fecdd3;padding:6px 14px;border-radius:8px;font-size:0.8rem;font-weight:700;cursor:pointer;transition:all 0.18s;font-family:'DM Sans',sans-serif;}
        .pd-reject-btn:hover{background:#fecdd3;}
        .pd-no-bookings{text-align:center;padding:28px 0;color:#9ca3af;font-size:0.9rem;}

        @media(max-width:600px){.pd-slider{height:260px;}.pd-body{padding:18px;}.pd-img-title-text{font-size:1.1rem;}}
      `}</style>

      <div className="pd-root">
        <div className="pd-container">

          <div className="pd-topbar">
            <button onClick={() => navigate(-1)} className="pd-back">
              <ArrowLeft size={16}/> Back 
            </button>
            <button onClick={handleShare} className={`pd-share-btn ${copied ? 'copied' : ''}`}>
              <Share2 size={14}/> {copied ? 'Link copied!' : 'Share'}
            </button>
          </div>

          {error && <Alert type="error" message={error} onClose={() => setError('')}/>}
          {success && <Alert type="success" message={success} onClose={() => setSuccess('')}/>}

          {property.availabilityStatus === 'not_available' && isAvailableFromReached(property.availableFrom) && (
            <div className="pd-auto-avail-banner">
              <CheckCircle size={18}/>
              <span>This property became available on <strong>{new Date(property.availableFrom).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</strong>.{(isOwner||isAdmin)&&' Update the status below.'}</span>
            </div>
          )}

          <div className="pd-card">

            {/* Slider */}
            <div className="pd-slider">
              {images.length > 0 ? (
                <img src={images[selectedImage]} className="pd-slider-img" alt={property.title}/>
              ) : (
                <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:8,color:'#a7f3d0'}}>
                  <Home size={48} color="#6ee7b7"/><span style={{fontSize:'0.9rem'}}>No images</span>
                </div>
              )}
              <div className="pd-slider-overlay"/>

              {/* Availability ribbon */}
              {isCurrentlyAvailable ? (
                <div className="pd-avail-ribbon available"><div className="pd-avail-pulse"/> Available</div>
              ) : property.availableFrom ? (
                <div className="pd-avail-ribbon soon">📅 From {new Date(property.availableFrom).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</div>
              ) : (
                <div className="pd-avail-ribbon unavailable">✕ Not Available</div>
              )}

              {images.length > 1 && <span className="pd-img-counter">{selectedImage+1} / {images.length}</span>}
              {selectedImage > 0 && <button className="pd-slider-btn pd-slider-btn-left" onClick={() => setSelectedImage(selectedImage-1)}><ChevronLeft size={18}/></button>}
              {selectedImage < images.length-1 && <button className="pd-slider-btn pd-slider-btn-right" onClick={() => setSelectedImage(selectedImage+1)}><ChevronRight size={18}/></button>}
              {images.length > 1 && (
                <div className="pd-dots">
                  {images.map((_,i) => <button key={i} className={`pd-dot ${i===selectedImage?'pd-dot-active':''}`} onClick={() => setSelectedImage(i)}/>)}
                </div>
              )}

              {/* Title overlay on image */}
              <div className="pd-img-title">
                <div className="pd-img-title-text">{property.title}</div>
                <div className="pd-img-price">
                  <IndianRupee size={16} strokeWidth={2.5}/>{property.price?.toLocaleString('en-IN')}<span style={{fontSize:'0.78rem',fontWeight:400,color:'#a7f3d0',marginLeft:2}}>/mo</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="pd-body">

              {/* Actions */}
              <div className="pd-actions">
                {isCurrentlyAvailable && (
                  <button onClick={() => setShowBooking(true)} className="pd-btn-book">
                    <Calendar size={16}/> Book Now
                  </button>
                )}

                {(isAdmin||isOwner) && (
                  <button onClick={() => setIsEditing(!isEditing)} className="pd-btn-edit">
                    {isEditing ? <><X size={15}/> Cancel</> : <><Pencil size={15}/> Edit</>}
                  </button>
                )}
                {isAdmin && <button onClick={handleDelete} className="pd-btn-delete"><Trash2 size={15}/> Delete</button>}
             
              {/* this is added */}
          

              {!isOwner && user && (
               <button onClick={() => setShowChat(true)} className="pd-btn-edit">
                  💬 Chat with Owner
                  </button>
                )}
                {showChat && (
                  <ChatWindow
                    propertyId={id}
                    propertyTitle={property.title}
                    ownerId={property.ownerId}
                    ownerName={property.ownerName || 'Owner'}
                    onClose={() => setShowChat(false)}
                  />
                )}
              </div>

              

              {/* Rating + verified row */}
              <div className="pd-rating-row">
                {property.avgRating > 0 && (
                  <>
                    <span className="pd-rating-stars">{'★'.repeat(Math.round(property.avgRating))}{'☆'.repeat(5-Math.round(property.avgRating))}</span>
                    <span className="pd-rating-num">{Number(property.avgRating).toFixed(1)}</span>
                    <span className="pd-rating-count">({property.reviewCount || 0} review{property.reviewCount!==1?'s':''})</span>
                  </>
                )}
                {property.verified && (
                  <span className="pd-verified-badge"><ShieldCheck size={12}/> Verified</span>
                )}
              </div>

              {/* Info chips */}
              <div className="pd-info-row">
                {(property.city||property.location) && (
                  <span className="pd-info-chip pd-chip-location"><MapPin size={14}/> {property.city||property.location}{property.area ? ` · ${property.area}` : ''}</span>
                )}
                {property.contact && (
                  <span className="pd-info-chip pd-chip-contact"><Phone size={14}/> {property.contact}</span>
                )}
                {property.genderPreference && (
                  <span className="pd-info-chip pd-chip-gender"><Users size={14}/> {property.genderPreference}</span>
                )}
                {property.propertyType && (
                  <span className="pd-info-chip pd-chip-type"><Building2 size={14}/> {property.propertyType}</span>
                )}
                {property.size && (
                  <span className="pd-info-chip pd-chip-size"><Ruler size={14}/> {property.size}</span>
                )}
              </div>

              {/* Description */}
              {property.description && (
                <>
                  <div className="pd-section-label">About this property</div>
                  <p className="pd-desc">{property.description}</p>
                </>
              )}

              {/* ── AMENITIES ── */}
              {amenitiesList.length > 0 && (
                <>
                  <div className="pd-section-label">Amenities</div>
                  <div className="pd-amenities-grid">
                    {amenitiesList.map((a, i) => (
                      <span key={i} className="pd-amenity-tag">
                        <AmenityIcon name={a}/> {a}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <hr className="pd-divider"/>

              {/* Reviews */}
              <ReviewSection propertyId={id}/>

              {/* ── EDIT FORM ── */}
              {isEditing && (
                <>
                  <hr className="pd-divider"/>
                  <div className="pd-edit-section">
                    <div className="pd-edit-header">
                      <div className="pd-edit-title"><Pencil size={16}/> Edit Property</div>
                    </div>
                    <div className="pd-edit-grid">

                      <div className="pd-edit-field pd-edit-full">
                        <label className="pd-edit-label">Property Title</label>
                        <input name="title" value={form.title||''} onChange={handleChange} className="pd-edit-input" placeholder="Property title"/>
                      </div>

                      <div className="pd-edit-field pd-edit-full">
                        <label className="pd-edit-label">Description</label>
                        <textarea name="description" value={form.description||''} onChange={handleChange} className="pd-edit-input" placeholder="Description" style={{minHeight:80,resize:'vertical'}}/>
                      </div>

                      <div className="pd-edit-field">
                        <label className="pd-edit-label">Monthly Rent (₹)</label>
                        <input name="price" type="number" value={form.price||''} onChange={handleChange} className="pd-edit-input" placeholder="e.g. 8000"/>
                      </div>

                      <div className="pd-edit-field">
                        <label className="pd-edit-label">Contact Number</label>
                        <input name="contact" value={form.contact||''} onChange={handleChange} className="pd-edit-input" placeholder="+91 98765 43210"/>
                      </div>

                      <div className="pd-edit-field">
                        <label className="pd-edit-label">City</label>
                        <input name="city" value={form.city||''} onChange={handleChange} className="pd-edit-input" placeholder="e.g. Surat"/>
                      </div>

                      <div className="pd-edit-field">
                        <label className="pd-edit-label">Area</label>
                        <input name="area" value={form.area||''} onChange={handleChange} className="pd-edit-input" placeholder="e.g. Adajan"/>
                      </div>

                      <div className="pd-edit-field pd-edit-full">
                        <label className="pd-edit-label">Full Address</label>
                        <input name="location" value={form.location||''} onChange={handleChange} className="pd-edit-input" placeholder="Street, Landmark"/>
                      </div>

                      <div className="pd-edit-field">
                        <label className="pd-edit-label">Property Type</label>
                        <select name="propertyType" value={form.propertyType||'PG'} onChange={handleChange} className="pd-edit-select">
                          <option value="PG">🏠 PG</option>
                          <option value="Flat">🏢 Flat</option>
                          <option value="Apartment">🏙️ Apartment</option>
                        </select>
                      </div>

                      <div className="pd-edit-field">
                        <label className="pd-edit-label">Gender Preference</label>
                        <select name="genderPreference" value={form.genderPreference||'Any'} onChange={handleChange} className="pd-edit-select">
                          <option value="Any">👥 Any</option>
                          <option value="Boys">👦 Boys</option>
                          <option value="Girls">👧 Girls</option>
                        </select>
                      </div>

                      <div className="pd-edit-field">
                        <label className="pd-edit-label">Size</label>
                        <input name="size" value={form.size||''} onChange={handleChange} className="pd-edit-input" placeholder="e.g. 1200 sq ft"/>
                      </div>

                      {/* ── AMENITIES EDIT ── */}
                      <div className="pd-edit-field pd-edit-full">
                        <label className="pd-edit-label">Amenities <span style={{color:'#9ca3af',fontWeight:400,textTransform:'none'}}>(comma separated)</span></label>
                        <input name="amenities" value={form.amenities||''} onChange={handleChange} className="pd-edit-input" placeholder="WiFi, AC, Parking, Gym, Laundry, CCTV…"/>
                      </div>

                      <div className="pd-edit-field">
                        <label className="pd-edit-label">Availability Status</label>
                        <select name="availabilityStatus" value={form.availabilityStatus||'available'} onChange={handleChange} className="pd-edit-select">
                          <option value="available">✅ Available</option>
                          <option value="not_available">❌ Not Available</option>
                        </select>
                      </div>

                      {form.availabilityStatus === 'not_available' && (
                        <div className="pd-edit-field">
                          <label className="pd-edit-label">Available From (optional)</label>
                          <input type="date" name="availableFrom" value={form.availableFrom?form.availableFrom.substring(0,10):''} onChange={handleChange} min={new Date().toISOString().substring(0,10)} className="pd-edit-input"/>
                        </div>
                      )}

                    </div>

                    {form.availabilityStatus==='not_available' && form.availableFrom && (
                      <div className="pd-avail-notice" style={{marginTop:16}}>
                        <AlertTriangle size={16} style={{flexShrink:0,marginTop:1}}/>
                        <div>
                          <strong>Auto-availability notice</strong>
                          On {new Date(form.availableFrom).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}, this property will automatically show as available.
                        </div>
                      </div>
                    )}
                    <div className="pd-edit-field pd-edit-full" style={{ marginTop: 8 }}>
                    <label className="pd-edit-label">
                      Map Location Pin
                      <span style={{ color:'#9ca3af', fontWeight:400, textTransform:'none', fontSize:'0.7rem', marginLeft:6 }}>
                        click map to update pin
                      </span>
                    </label>

                    <div style={{ borderRadius:12, overflow:'hidden', border:'1.5px solid #d1fae5', marginBottom:8 }}>
                      <MapContainer
                        center={editMapPin ? [editMapPin.lat, editMapPin.lng] : [20.5937, 78.9629]}
                        zoom={editMapPin ? 14 : 5}
                        style={{ height: 240, width: '100%' }}
                        scrollWheelZoom={false}
                      >
                        <TileLayer
                          attribution='&copy; OpenStreetMap'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <EditMapClick onPick={handleEditMapPick} />
                        {editMapPin && <Marker position={[editMapPin.lat, editMapPin.lng]} />}
                      </MapContainer>
                    </div>

                    <div style={{ display:'flex', gap:10 }}>
                      <div style={{ flex:1, background:'#f9fafb', border:'1.5px solid #e5e7eb', borderRadius:9, padding:'7px 11px' }}>
                        <div style={{ fontSize:'0.67rem', fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'.3px', marginBottom:3 }}>Latitude</div>
                        <div style={{ fontSize:'0.85rem', fontWeight:700, color: editMapPin ? '#0f2d1a' : '#9ca3af', fontFamily:'monospace' }}>
                          {editMapPin ? editMapPin.lat : 'Click map to set'}
                        </div>
                      </div>
                      <div style={{ flex:1, background:'#f9fafb', border:'1.5px solid #e5e7eb', borderRadius:9, padding:'7px 11px' }}>
                        <div style={{ fontSize:'0.67rem', fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'.3px', marginBottom:3 }}>Longitude</div>
                        <div style={{ fontSize:'0.85rem', fontWeight:700, color: editMapPin ? '#0f2d1a' : '#9ca3af', fontFamily:'monospace' }}>
                          {editMapPin ? editMapPin.lng : 'Click map to set'}
                        </div>
                      </div>
                      {editMapPin && (
                        <button
                          type="button"
                          onClick={() => { setEditMapPin(null); setForm(p => ({ ...p, lat: '', lng: '' })); }}
                          style={{ background:'#fff1f2', border:'1.5px solid #fecdd3', borderRadius:9, padding:'0 13px', color:'#be123c', fontSize:'0.78rem', fontWeight:700, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", whiteSpace:'nowrap' }}
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                    <button onClick={handleUpdate} className="pd-edit-save"><Save size={15}/> Save Changes</button>
                  </div>
                </>
              )}

              {/* Bookings */}
              {(isOwner||isAdmin) && (
                <>
                  <hr className="pd-divider"/>
                  <div className="pd-bookings-title">
                    Booking Requests
                    {bookings.length > 0 && <span className="pd-bookings-count">{bookings.length}</span>}
                  </div>
                  {bookings.length === 0 ? (
                    <div className="pd-no-bookings">
                      <Calendar size={32} color="#d1fae5" style={{margin:'0 auto 8px',display:'block'}}/>
                      No bookings yet
                    </div>
                  ) : bookings.map(b => (
                    <div key={b._id} className="pd-booking-card">
                      <div className="pd-booking-name">{b.name}</div>
                      <div className="pd-booking-meta">
                        <span className="pd-booking-meta-item"><Phone size={13}/> {b.phone}</span>
                        <span className="pd-booking-meta-item"><Calendar size={13}/> {new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}</span>
                        {b.userType && <span className="pd-booking-meta-item">👤 {b.userType}</span>}
                      </div>
                      <div>
                        <span className={`pd-status-chip ${b.status==='approved'?'pd-status-approved':b.status==='rejected'?'pd-status-rejected':'pd-status-pending'}`}>
                          {b.status==='approved'&&<CheckCircle size={11}/>}
                          {b.status==='rejected'&&<XCircle size={11}/>}
                          {(!b.status||b.status==='pending')&&<Clock size={11}/>}
                          {b.status||'pending'}
                        </span>
                      </div>
                      <div className="pd-booking-actions">
                        <button onClick={() => updateStatus(b._id,'approved')} className="pd-approve-btn"><CheckCircle size={13}/> Approve</button>
                        <button onClick={() => updateStatus(b._id,'rejected')} className="pd-reject-btn"><XCircle size={13}/> Reject</button>
                      </div>
                    </div>
                  ))}
                </>
              )}

            </div>
          </div>
        </div>
      </div>

      {showBooking && <BookingForm propertyId={id} onClose={() => setShowBooking(false)}/>}
    </>
  );
}

export default PropertyDetails;


// ─────────────────────────────────────────────────────────────────────────────
// ADD THIS to your existing PropertyDetails.jsx edit form section
//
// This lets owners update the lat/lng of an existing property from the
// PropertyDetails page — so old properties (saved without coordinates)
// can get their map pin added without re-creating the listing.
//
// FIND in PropertyDetails.jsx the edit form grid section and add these fields
// right before the Save button.
// ─────────────────────────────────────────────────────────────────────────────

// 1. ADD these imports at the top of PropertyDetails.jsx:
//    import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

// 2. ADD this inside the component (near the other useState declarations):
//
//    const [editMapPin, setEditMapPin] = useState(
//      form.lat && form.lng ? { lat: form.lat, lng: form.lng } : null
//    );
//
//    function EditMapClick({ onPick }) {
//      useMapEvents({ click: e => onPick(e.latlng.lat, e.latlng.lng) });
//      return null;
//    }
//
//    const handleEditMapPick = (lat, lng) => {
//      const la = parseFloat(lat.toFixed(6));
//      const ln = parseFloat(lng.toFixed(6));
//      setEditMapPin({ lat: la, lng: ln });
//      setForm(p => ({ ...p, lat: la, lng: ln }));
//    };

// 3. ADD this block INSIDE the edit form grid, before the Save button:
//    (copy from the JSX below)

/*
  ── Edit form map section (add before ap-edit-save button) ──

  <div className="pd-edit-field pd-edit-full" style={{ marginTop: 8 }}>
    <label className="pd-edit-label">
      Map Location Pin
      <span style={{ color:'#9ca3af', fontWeight:400, textTransform:'none', fontSize:'0.7rem', marginLeft:6 }}>
        click map to update pin
      </span>
    </label>

    <div style={{ borderRadius:12, overflow:'hidden', border:'1.5px solid #d1fae5', marginBottom:8 }}>
      <MapContainer
        center={editMapPin ? [editMapPin.lat, editMapPin.lng] : [20.5937, 78.9629]}
        zoom={editMapPin ? 14 : 5}
        style={{ height: 240, width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <EditMapClick onPick={handleEditMapPick} />
        {editMapPin && <Marker position={[editMapPin.lat, editMapPin.lng]} />}
      </MapContainer>
    </div>

    <div style={{ display:'flex', gap:10 }}>
      <div style={{ flex:1, background:'#f9fafb', border:'1.5px solid #e5e7eb', borderRadius:9, padding:'7px 11px' }}>
        <div style={{ fontSize:'0.67rem', fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'.3px', marginBottom:3 }}>Latitude</div>
        <div style={{ fontSize:'0.85rem', fontWeight:700, color: editMapPin ? '#0f2d1a' : '#9ca3af', fontFamily:'monospace' }}>
          {editMapPin ? editMapPin.lat : 'Click map to set'}
        </div>
      </div>
      <div style={{ flex:1, background:'#f9fafb', border:'1.5px solid #e5e7eb', borderRadius:9, padding:'7px 11px' }}>
        <div style={{ fontSize:'0.67rem', fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'.3px', marginBottom:3 }}>Longitude</div>
        <div style={{ fontSize:'0.85rem', fontWeight:700, color: editMapPin ? '#0f2d1a' : '#9ca3af', fontFamily:'monospace' }}>
          {editMapPin ? editMapPin.lng : 'Click map to set'}
        </div>
      </div>
      {editMapPin && (
        <button
          type="button"
          onClick={() => { setEditMapPin(null); setForm(p => ({ ...p, lat: '', lng: '' })); }}
          style={{ background:'#fff1f2', border:'1.5px solid #fecdd3', borderRadius:9, padding:'0 13px', color:'#be123c', fontSize:'0.78rem', fontWeight:700, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", whiteSpace:'nowrap' }}
        >
          Clear
        </button>
      )}
    </div>
  </div>
*/

// 4. Make sure handleUpdate sends lat/lng properly.
//    In your handleUpdate function, the form already contains lat/lng
//    so they'll be sent via the api.put('/api/properties/:id', form) call.
//    The backend PUT route (from properties_route_fix.js) handles saving them.