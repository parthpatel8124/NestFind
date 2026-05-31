// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Heart, MapPin } from 'lucide-react';

// function PropertyCard({ property }) {

//   const [isFavorite, setIsFavorite] = useState(false);

//   const imageUrl = property.images?.[0] || property.image;

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
//     setIsFavorite(saved.some(p => p._id === property._id));
//   }, [property._id]);

//   const toggleFav = (e) => {
//     e.preventDefault();
//     let saved = JSON.parse(localStorage.getItem('favorites') || '[]');

//     if (isFavorite) {
//       saved = saved.filter(p => p._id !== property._id);
//     } else {
//       saved.push(property);
//     }

//     localStorage.setItem('favorites', JSON.stringify(saved));
//     setIsFavorite(!isFavorite);
//   };

//   return (
//     <Link to={`/property/${property._id}`}>
//       <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

//         {/* IMAGE */}
//         <div className="relative h-48">

//           <img
//             src={imageUrl}
//             className="w-full h-full object-cover"
//           />

//           {/* VERIFIED BADGE */}
//           <div className="absolute top-2 left-2 flex flex-col gap-1">

//             <span className={`text-xs px-2 py-1 rounded 
//               ${property.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
//               {property.verified ? 'Verified' : 'Pending'}
//             </span>

//             {/* ✅ NEW AVAILABILITY BADGE */}
//             <span className={`text-xs px-2 py-1 rounded 
//               ${property.isAvailable !== false ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
              
//               {property.isAvailable !== false
//                 ? 'Available'
//                 : property.availableFrom
//                   ? `From ${property.availableFrom}`
//                   : 'Not Available'}
//             </span>

//           </div>

//           {/* FAVORITE */}
//           <button
//             onClick={toggleFav}
//             className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
//           >
//             <Heart
//               className={isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}
//               size={18}
//             />
//           </button>
//         </div>

//         {/* CONTENT */}
//         <div className="p-4">

//           <h3 className="font-semibold text-lg truncate">
//             {property.title}
//           </h3>

//           <div className="flex items-center text-sm text-gray-500 mb-2">
//             <MapPin size={14} className="mr-1 text-red-500" />
//             {property.city}
//           </div>

//           <div className="text-green-600 font-bold text-lg mb-2">
//             ₹ {property.price}
//           </div>

//           <p className="text-sm text-gray-600 line-clamp-2">
//             {property.description}
//           </p>

//         </div>
//       </div>
//     </Link>
//   );
// }

// export default PropertyCard;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Heart, MapPin } from 'lucide-react';

// function PropertyCard({ property }) {

//   const [isFavorite, setIsFavorite] = useState(false);

//   const imageUrl = property.images?.[0] || property.image;

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
//     setIsFavorite(saved.some(p => p._id === property._id));
//   }, [property._id]);

//   const toggleFav = (e) => {
//     e.preventDefault();
//     let saved = JSON.parse(localStorage.getItem('favorites') || '[]');

//     if (isFavorite) {
//       saved = saved.filter(p => p._id !== property._id);
//     } else {
//       saved.push(property);
//     }

//     localStorage.setItem('favorites', JSON.stringify(saved));
//     setIsFavorite(!isFavorite);
//   };

//   return (
//     <Link to={`/property/${property._id}`}>
//       <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

//         {/* IMAGE */}
//         <div className="relative h-48">

//           <img
//             src={imageUrl}
//             className="w-full h-full object-cover"
//           />

//           {/* BADGES */}
//           <div className="absolute top-2 left-2 flex flex-col gap-1">

//             {/* VERIFIED */}
//             <span className={`text-xs px-2 py-1 rounded 
//               ${property.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
//               {property.verified ? 'Verified' : 'Pending'}
//             </span>

//             {/* ✅ FIXED AVAILABILITY BADGE */}
//             <span className={`text-xs px-2 py-1 rounded 
//               ${property.availabilityStatus !== 'not_available'
//                 ? 'bg-blue-100 text-blue-700'
//                 : 'bg-red-100 text-red-700'}`}>

//               {property.availabilityStatus !== 'not_available'
//                 ? 'Available'
//                 : property.availableFrom
//                   ? `From ${new Date(property.availableFrom).toLocaleDateString()}`
//                   : 'Not Available'}

//             </span>

//           </div>

//           {/* FAVORITE */}
//           <button
//             onClick={toggleFav}
//             className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
//           >
//             <Heart
//               className={isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}
//               size={18}
//             />
//           </button>
//         </div>

//         {/* CONTENT */}
//         <div className="p-4">

//           <h3 className="font-semibold text-lg truncate">
//             {property.title}
//           </h3>

//           <div className="flex items-center text-sm text-gray-500 mb-2">
//             <MapPin size={14} className="mr-1 text-red-500" />
//             {property.city}
//           </div>

//           <div className="text-green-600 font-bold text-lg mb-2">
//             ₹ {property.price}
//           </div>

//           <p className="text-sm text-gray-600 line-clamp-2">
//             {property.description}
//           </p>

//         </div>
//       </div>
//     </Link>
//   );
// }

// export default PropertyCard;

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, IndianRupee, Home } from 'lucide-react';
import AuthContext from '../context/AuthContext';
 import StarRating from './StarRating';
 import LazyImage from './LazyImage';

function PropertyCard({ property }) {
  const { user } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imgError, setImgError] = useState(false);

  const imageUrl = property.images?.[0] || property.image;
  const isAvailable = property.availabilityStatus !== 'not_available';

  // ── Per-user storage key ──
  // Matches exactly what Favorites.jsx uses, so both stay in sync.
  const storageKey = user?.id ? `favorites_${user.id}` : 'favorites_guest';

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setIsFavorite(saved.some(p => p._id === property._id));
  }, [property._id, storageKey]);

  const toggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (isFavorite) {
      saved = saved.filter(p => p._id !== property._id);
    } else {
      saved.push(property);
    }
    localStorage.setItem(storageKey, JSON.stringify(saved));
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .pc-wrap {
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          display: block;
        }
        .pc-card {
          background: #fff;
          border-radius: 20px;
          border: 1.5px solid #e6f7ef;
          overflow: hidden;
          transition: all 0.25s ease;
          box-shadow: 0 2px 10px rgba(5,150,105,0.07);
          cursor: pointer;
          position: relative;
        }
        .pc-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(5,150,105,0.16);
          border-color: #a7f3d0;
        }

        .pc-img-wrap {
          position: relative; height: 200px;
          overflow: hidden; background: #f0faf4;
        }
        .pc-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.4s ease;
        }
        .pc-card:hover .pc-img { transform: scale(1.04); }
        .pc-img-placeholder {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px; color: #a7f3d0;
          font-size: 0.8rem; font-weight: 500;
        }
        .pc-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(6,78,59,0.35) 0%, transparent 50%);
          pointer-events: none;
        }

        .pc-badges {
          position: absolute; top: 12px; left: 12px;
          display: flex; flex-direction: column; gap: 5px;
        }
        .pc-badge {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 3px 10px; border-radius: 100px;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.2px; backdrop-filter: blur(8px);
        }
        .pc-badge-verified { background: rgba(236,253,245,0.92); color: #065f46; border: 1px solid rgba(52,211,153,0.4); }
        .pc-badge-pending { background: rgba(255,251,235,0.92); color: #92400e; border: 1px solid rgba(252,211,77,0.4); }
        .pc-badge-available { background: rgba(236,253,245,0.92); color: #065f46; border: 1px solid rgba(52,211,153,0.4); }
        .pc-badge-unavailable { background: rgba(255,241,242,0.92); color: #9f1239; border: 1px solid rgba(251,113,133,0.4); }

        .pc-type-chip {
          position: absolute; bottom: 12px; left: 12px;
          background: rgba(6,78,59,0.82); backdrop-filter: blur(8px);
          color: #a7f3d0; padding: 3px 10px; border-radius: 100px;
          font-size: 0.72rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.5px;
        }

        .pc-fav {
          position: absolute; top: 12px; right: 12px;
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.92); backdrop-filter: blur(8px);
          border-radius: 50%; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          transition: all 0.2s ease; z-index: 2;
        }
        .pc-fav:hover { transform: scale(1.12); box-shadow: 0 4px 14px rgba(0,0,0,0.18); }
        .pc-fav.pc-fav-active { background: #fff1f2; }

        .pc-body { padding: 16px 18px 18px; }
        .pc-title {
          font-weight: 700; font-size: 1rem; color: #0f2d1a;
          margin-bottom: 6px; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis; line-height: 1.3;
        }
        .pc-location {
          display: flex; align-items: center; gap: 4px;
          font-size: 0.82rem; color: #6b7280; margin-bottom: 12px;
        }
        .pc-price-row {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 10px;
        }
        .pc-price {
          display: flex; align-items: center; gap: 2px;
          font-size: 1.2rem; font-weight: 800; color: #059669; line-height: 1;
        }
        .pc-price-mo {
          font-size: 0.75rem; font-weight: 500; color: #9ca3af;
          margin-left: 2px; align-self: flex-end; margin-bottom: 1px;
        }
        .pc-gender-chip {
          display: inline-flex; align-items: center; gap: 4px;
          background: #f0fdf4; border: 1px solid #d1fae5;
          border-radius: 100px; padding: 3px 10px;
          font-size: 0.75rem; font-weight: 600; color: #065f46;
        }
        .pc-desc {
          font-size: 0.83rem; color: #9ca3af; line-height: 1.55;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 14px;
        }
        .pc-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 12px; border-top: 1px solid #f0fdf4;
        }
        .pc-avail-dot {
          display: flex; align-items: center; gap: 5px;
          font-size: 0.78rem; font-weight: 600;
        }
        .pc-dot { width: 7px; height: 7px; border-radius: 50%; }
        .pc-dot-green { background: #10b981; animation: pcPulse 2s ease infinite; }
        .pc-dot-red { background: #f43f5e; }
        @keyframes pcPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .pc-view-btn {
          display: inline-flex; align-items: center; gap: 5px;
          background: linear-gradient(135deg, #059669, #047857);
          color: #fff; padding: 7px 16px; border-radius: 10px;
          font-size: 0.82rem; font-weight: 700; transition: all 0.18s;
          box-shadow: 0 3px 10px rgba(5,150,105,0.25);
        }
        .pc-card:hover .pc-view-btn { box-shadow: 0 5px 16px rgba(5,150,105,0.38); }
      `}</style>

      <Link to={`/property/${property._id}`} className="pc-wrap">
        <div className="pc-card">

          <div className="pc-img-wrap">
            {imageUrl && !imgError ? (
              // <img src={imageUrl} className="pc-img" alt={property.title}
              <LazyImage
src={property.images?.[0] || property.image}
alt={property.title}
className="pc-img"
style={{ height: '100%', width: '100%' }}
/>
                // onError={() => setImgError(true)} />
            ) : (
              <div className="pc-img-placeholder">
                <Home size={32} color="#6ee7b7" />
                <span>No image</span>
              </div>
            )}
            <div className="pc-img-overlay" />

            <div className="pc-badges">
              <span className={`pc-badge ${property.verified ? 'pc-badge-verified' : 'pc-badge-pending'}`}>
                {property.verified ? '✓ Verified' : '⏳ Pending'}
              </span>
              <span className={`pc-badge ${isAvailable ? 'pc-badge-available' : 'pc-badge-unavailable'}`}>
                {isAvailable
                  ? '● Available'
                  : property.availableFrom
                    ? `From ${new Date(property.availableFrom).toLocaleDateString()}`
                    : '✕ Not Available'}
              </span>
            </div>

            {property.propertyType && (
              <span className="pc-type-chip">{property.propertyType}</span>
            )}

            <button onClick={toggleFav} className={`pc-fav ${isFavorite ? 'pc-fav-active' : ''}`}>
              <Heart
                size={17}
                color={isFavorite ? '#ef4444' : '#9ca3af'}
                fill={isFavorite ? '#ef4444' : 'none'}
              />
            </button>
          </div>

          <div className="pc-body">
            <h3 className="pc-title">{property.title}</h3>
            <div className="pc-location">
              <MapPin size={13} color="#ef4444" />
              <span>{property.city || property.location}</span>
            </div>
            <div className="pc-price-row">
              <div className="pc-price">
                <IndianRupee size={17} strokeWidth={2.5} />
                {property.price?.toLocaleString('en-IN')}
                <span className="pc-price-mo">/mo</span>
              </div>
              {property.genderPreference && property.genderPreference !== 'Any' && (
                <span className="pc-gender-chip">
                  {property.genderPreference === 'Boys' ? '👦' : '👧'} {property.genderPreference}
                </span>
              )}
            </div>
            {property.avgRating > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <StarRating rating={property.avgRating} size={14} />
              <span style={{
                fontSize: '0.78rem', fontWeight: 700, color: '#059669'
              }}>
               {Number(property.avgRating).toFixed(1)}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
             ({property.reviewCount || 0} review{property.reviewCount !== 1 ? 's' : ''})
                </span>
               </div>
              )}
            {property.description && (
              <p className="pc-desc">{property.description}</p>
            )}
            <div className="pc-footer">
              <div className="pc-avail-dot" style={{ color: isAvailable ? '#059669' : '#f43f5e' }}>
                <div className={`pc-dot ${isAvailable ? 'pc-dot-green' : 'pc-dot-red'}`} />
                {isAvailable ? 'Available now' : 'Not available'}
              </div>
              <span className="pc-view-btn">View Details →</span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default PropertyCard;


// ── ADD THIS to your existing PropertyCard.jsx ──
// 1. Import StarRating at the top:
//    import StarRating from './StarRating';
//
// 2. Inside the .pc-body div, after the price row, add this block:

/*
  {property.avgRating > 0 && (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
      <StarRating rating={property.avgRating} size={14} />
      <span style={{
        fontSize: '0.78rem', fontWeight: 700, color: '#059669'
      }}>
        {Number(property.avgRating).toFixed(1)}
      </span>
      <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
        ({property.reviewCount || 0} review{property.reviewCount !== 1 ? 's' : ''})
      </span>
    </div>
  )}
*/

// 3. In PropertyDetails.jsx, add ReviewSection just before the Bookings section:
//    import ReviewSection from '../components/ReviewSection';
//
//    Then inside the pd-body div:
//    <hr className="pd-divider" />
//    <ReviewSection propertyId={id} />

// 4. In your server.js / app.js register the route:
//    const reviewsRouter = require('./routes/reviews');
//    app.use('/api/reviews', reviewsRouter);

// That's it — no other changes needed!