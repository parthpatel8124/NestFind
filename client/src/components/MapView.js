// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
// import { useNavigate } from 'react-router-dom';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { MapPin, IndianRupee, Home, ArrowRight } from 'lucide-react';

// // ── Fix Leaflet's broken default icon paths in webpack/vite ──
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
// });

// // ── Custom green pin icon matching the app theme ──
// const greenIcon = new L.DivIcon({
//   className: '',
//   html: `
//     <div style="
//       background: linear-gradient(135deg, #059669, #047857);
//       width: 36px; height: 36px;
//       border-radius: 50% 50% 50% 0;
//       transform: rotate(-45deg);
//       border: 2px solid #fff;
//       box-shadow: 0 2px 8px rgba(5,150,105,0.4);
//       display: flex; align-items: center; justify-content: center;
//     ">
//       <div style="transform: rotate(45deg); color: #fff; font-size: 14px; line-height: 1;">⌂</div>
//     </div>
//   `,
//   iconSize: [36, 36],
//   iconAnchor: [18, 36],
//   popupAnchor: [0, -38],
// });

// // ── Price pin icon — shows price on the map ──
// const createPriceIcon = (price, isAvailable) => new L.DivIcon({
//   className: '',
//   html: `
//     <div style="
//       background: ${isAvailable ? 'linear-gradient(135deg,#059669,#047857)' : '#6b7280'};
//       color: #fff;
//       padding: 5px 10px;
//       border-radius: 20px;
//       font-family: 'DM Sans', sans-serif;
//       font-size: 12px;
//       font-weight: 700;
//       white-space: nowrap;
//       box-shadow: 0 2px 8px rgba(0,0,0,0.2);
//       border: 2px solid #fff;
//       position: relative;
//     ">
//       ₹${Number(price).toLocaleString('en-IN')}
//       <div style="
//         position: absolute; bottom: -7px; left: 50%;
//         transform: translateX(-50%);
//         width: 0; height: 0;
//         border-left: 6px solid transparent;
//         border-right: 6px solid transparent;
//         border-top: 7px solid ${isAvailable ? '#047857' : '#6b7280'};
//       "></div>
//     </div>
//   `,
//   iconSize: [80, 32],
//   iconAnchor: [40, 39],
//   popupAnchor: [0, -42],
// });

// // ── Auto-fit map to show all pins ──
// function FitBounds({ properties }) {
//   const map = useMap();
//   useEffect(() => {
//     const valid = properties.filter(p => p.latitude && p.longitude);
//     if (valid.length === 0) return;
//     if (valid.length === 1) {
//       map.setView([valid[0].latitude, valid[0].longitude], 14);
//       return;
//     }
//     const bounds = L.latLngBounds(valid.map(p => [p.latitude, p.longitude]));
//     map.fitBounds(bounds, { padding: [40, 40] });
//   }, [properties]);
//   return null;
// }

// function MapView({ properties }) {
//   const navigate = useNavigate();
//   const [selectedId, setSelectedId] = useState(null);
//   const [iconMode, setIconMode] = useState('price'); // 'price' | 'pin'

//   // Filter to only properties that have coordinates
//   const mappable = properties.filter(p => p.latitude && p.longitude);

//   if (mappable.length === 0) {
//     return (
//       <>
//         <style>{`
//           @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
//           .mv-empty {
//             font-family: 'DM Sans', sans-serif;
//             display: flex; flex-direction: column;
//             align-items: center; justify-content: center;
//             padding: 80px 24px; text-align: center;
//             background: #fff; border-radius: 18px;
//             border: 1.5px solid #e6f7ef;
//           }
//           .mv-empty-icon {
//             width: 64px; height: 64px;
//             background: #ecfdf5; border: 1.5px solid #d1fae5;
//             border-radius: 50%;
//             display: flex; align-items: center; justify-content: center;
//             margin: 0 auto 16px;
//           }
//           .mv-empty-title { font-size: 1.1rem; font-weight: 700; color: #0f2d1a; margin-bottom: 6px; }
//           .mv-empty-sub { font-size: 0.875rem; color: #6b7280; }
//         `}</style>
//         <div className="mv-empty">
//           <div className="mv-empty-icon"><MapPin size={28} color="#059669" /></div>
//           <div className="mv-empty-title">No properties with map location</div>
//           <p className="mv-empty-sub">Properties need lat/lng set to appear here. Try the grid view.</p>
//         </div>
//       </>
//     );
//   }

//   const defaultCenter = [mappable[0].latitude, mappable[0].longitude];

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
//         * { box-sizing: border-box; }

//         .mv-root { position: relative; }

//         /* Map container */
//         .mv-map-wrap {
//           border-radius: 20px;
//           overflow: hidden;
//           border: 1.5px solid #d1fae5;
//           box-shadow: 0 4px 20px rgba(5,150,105,0.12);
//           height: 600px;
//         }
//         .mv-map-wrap .leaflet-container {
//           height: 100%; width: 100%;
//           font-family: 'DM Sans', sans-serif;
//         }

//         /* Top controls bar */
//         .mv-controls {
//           display: flex; align-items: center; justify-content: space-between;
//           flex-wrap: wrap; gap: 10px;
//           margin-bottom: 14px;
//         }
//         .mv-count {
//           font-family: 'DM Sans', sans-serif;
//           font-size: 0.88rem; color: #6b7280;
//         }
//         .mv-count strong { color: #059669; font-weight: 700; }

//         .mv-icon-toggle {
//           display: flex; gap: 6px;
//         }
//         .mv-icon-btn {
//           display: flex; align-items: center; gap: 5px;
//           padding: 6px 14px; border-radius: 10px;
//           font-size: 0.82rem; font-weight: 600;
//           border: 1.5px solid #e5e7eb;
//           background: #f9fafb; color: #6b7280;
//           cursor: pointer; transition: all 0.18s;
//           font-family: 'DM Sans', sans-serif;
//         }
//         .mv-icon-btn.active {
//           background: #ecfdf5; border-color: #34d399; color: #059669;
//         }

//         /* Popup styling */
//         .mv-popup {
//           font-family: 'DM Sans', sans-serif;
//           min-width: 220px;
//         }
//         .leaflet-popup-content-wrapper {
//           border-radius: 14px !important;
//           border: 1.5px solid #d1fae5 !important;
//           box-shadow: 0 8px 24px rgba(5,150,105,0.15) !important;
//           padding: 0 !important;
//           overflow: hidden;
//         }
//         .leaflet-popup-content {
//           margin: 0 !important;
//           width: auto !important;
//         }
//         .leaflet-popup-tip {
//           background: #fff !important;
//         }
//         .leaflet-popup-close-button {
//           top: 8px !important; right: 8px !important;
//           color: #6b7280 !important;
//           font-size: 18px !important;
//           width: 24px !important; height: 24px !important;
//           line-height: 24px !important;
//           z-index: 10 !important;
//         }

//         .mv-popup-img {
//           width: 100%; height: 130px;
//           object-fit: cover;
//           display: block;
//         }
//         .mv-popup-img-placeholder {
//           width: 100%; height: 130px;
//           background: #ecfdf5;
//           display: flex; align-items: center; justify-content: center;
//         }
//         .mv-popup-body { padding: 12px 14px; }
//         .mv-popup-title {
//           font-family: 'Syne', sans-serif;
//           font-size: 0.95rem; font-weight: 800;
//           color: #0f2d1a; margin-bottom: 4px;
//           white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
//         }
//         .mv-popup-loc {
//           display: flex; align-items: center; gap: 4px;
//           font-size: 0.78rem; color: #6b7280; margin-bottom: 8px;
//         }
//         .mv-popup-meta {
//           display: flex; align-items: center;
//           justify-content: space-between;
//         }
//         .mv-popup-price {
//           display: flex; align-items: center; gap: 2px;
//           font-size: 1rem; font-weight: 800; color: #059669;
//         }
//         .mv-popup-price-mo {
//           font-size: 0.72rem; color: #9ca3af;
//           font-weight: 400; margin-left: 2px;
//         }
//         .mv-popup-avail {
//           display: flex; align-items: center; gap: 4px;
//           font-size: 0.72rem; font-weight: 600;
//           padding: 3px 8px; border-radius: 100px;
//         }
//         .mv-popup-avail.avail {
//           background: #dcfce7; color: #166534;
//         }
//         .mv-popup-avail.unavail {
//           background: #ffe4e6; color: #9f1239;
//         }
//         .mv-popup-btn {
//           width: 100%;
//           background: linear-gradient(135deg, #059669, #047857);
//           color: #fff;
//           border: none; border-radius: 0 0 12px 12px;
//           padding: 10px;
//           font-size: 0.85rem; font-weight: 700;
//           cursor: pointer; transition: all 0.18s;
//           display: flex; align-items: center; justify-content: center; gap: 6px;
//           font-family: 'DM Sans', sans-serif;
//           margin-top: 10px;
//         }
//         .mv-popup-btn:hover { background: linear-gradient(135deg,#047857,#065f46); }

//         /* Bottom summary strip */
//         .mv-summary {
//           display: flex; gap: 12px; flex-wrap: wrap;
//           margin-top: 14px;
//         }
//         .mv-summary-chip {
//           display: inline-flex; align-items: center; gap: 5px;
//           background: #fff;
//           border: 1.5px solid #e6f7ef;
//           border-radius: 10px; padding: 7px 14px;
//           font-size: 0.82rem; font-weight: 600;
//           color: #065f46;
//           box-shadow: 0 1px 4px rgba(5,150,105,0.07);
//           font-family: 'DM Sans', sans-serif;
//         }
//       `}</style>

//       <div className="mv-root">

//         {/* Controls */}
//         <div className="mv-controls">
//           <span className="mv-count">
//             Showing <strong>{mappable.length}</strong> propert{mappable.length !== 1 ? 'ies' : 'y'} on map
//             {properties.length !== mappable.length && (
//               <span style={{ color: '#9ca3af', fontWeight: 400 }}>
//                 {' '}({properties.length - mappable.length} without coordinates)
//               </span>
//             )}
//           </span>
//           <div className="mv-icon-toggle">
//             <button
//               className={`mv-icon-btn ${iconMode === 'price' ? 'active' : ''}`}
//               onClick={() => setIconMode('price')}
//             >
//               ₹ Price pins
//             </button>
//             <button
//               className={`mv-icon-btn ${iconMode === 'pin' ? 'active' : ''}`}
//               onClick={() => setIconMode('pin')}
//             >
//               <MapPin size={13} /> Location pins
//             </button>
//           </div>
//         </div>

//         {/* Map */}
//         <div className="mv-map-wrap">
//           <MapContainer
//             center={defaultCenter}
//             zoom={12}
//             scrollWheelZoom={true}
//             style={{ height: '100%', width: '100%' }}
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             <FitBounds properties={mappable} />

//             {mappable.map(p => {
//               const isAvailable = p.availabilityStatus !== 'not_available';
//               const imageUrl = p.images?.[0] || p.image;
//               const icon = iconMode === 'price'
//                 ? createPriceIcon(p.price, isAvailable)
//                 : greenIcon;

//               return (
//                 <Marker
//                   key={p._id}
//                   position={[p.latitude, p.longitude]}
//                   icon={icon}
//                   eventHandlers={{
//                     click: () => setSelectedId(p._id),
//                   }}
//                 >
//                   <Popup>
//                     <div className="mv-popup">
//                       {/* Image */}
//                       {imageUrl ? (
//                         <img src={imageUrl} className="mv-popup-img" alt={p.title}
//                           onError={e => { e.target.style.display = 'none'; }} />
//                       ) : (
//                         <div className="mv-popup-img-placeholder">
//                           <Home size={28} color="#a7f3d0" />
//                         </div>
//                       )}

//                       <div className="mv-popup-body">
//                         <div className="mv-popup-title">{p.title}</div>

//                         <div className="mv-popup-loc">
//                           <MapPin size={12} color="#ef4444" />
//                           {p.city || p.location}
//                         </div>

//                         <div className="mv-popup-meta">
//                           <div className="mv-popup-price">
//                             <IndianRupee size={15} strokeWidth={2.5} />
//                             {Number(p.price).toLocaleString('en-IN')}
//                             <span className="mv-popup-price-mo">/mo</span>
//                           </div>
//                           <span className={`mv-popup-avail ${isAvailable ? 'avail' : 'unavail'}`}>
//                             {isAvailable ? '● Available' : '✕ Taken'}
//                           </span>
//                         </div>

//                         {p.propertyType && (
//                           <div style={{ marginTop: 6 }}>
//                             <span style={{
//                               background: '#f0fdf4', border: '1px solid #d1fae5',
//                               borderRadius: '100px', padding: '2px 8px',
//                               fontSize: '0.72rem', fontWeight: 700, color: '#065f46'
//                             }}>
//                               {p.propertyType}
//                             </span>
//                             {p.genderPreference && p.genderPreference !== 'Any' && (
//                               <span style={{
//                                 background: '#f5f3ff', border: '1px solid #ddd6fe',
//                                 borderRadius: '100px', padding: '2px 8px',
//                                 fontSize: '0.72rem', fontWeight: 700, color: '#5b21b6',
//                                 marginLeft: 5
//                               }}>
//                                 {p.genderPreference === 'Boys' ? '👦' : '👧'} {p.genderPreference}
//                               </span>
//                             )}
//                           </div>
//                         )}
//                       </div>

//                       <button
//                         className="mv-popup-btn"
//                         onClick={() => navigate(`/property/${p._id}`)}
//                       >
//                         View Details <ArrowRight size={14} />
//                       </button>
//                     </div>
//                   </Popup>
//                 </Marker>
//               );
//             })}
//           </MapContainer>
//         </div>

//         {/* Summary strip */}
//         <div className="mv-summary">
//           <div className="mv-summary-chip">
//             <span style={{ color: '#059669' }}>●</span>
//             {mappable.filter(p => p.availabilityStatus !== 'not_available').length} available
//           </div>
//           <div className="mv-summary-chip">
//             <span style={{ color: '#9ca3af' }}>●</span>
//             {mappable.filter(p => p.availabilityStatus === 'not_available').length} not available
//           </div>
//           <div className="mv-summary-chip">
//             <Home size={13} />
//             {[...new Set(mappable.map(p => p.city || p.location).filter(Boolean))].length} cities
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default MapView;

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, IndianRupee, Home, ArrowRight } from 'lucide-react';

// ── Fix Leaflet's broken default icon paths in webpack/vite ──
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// ── Custom green pin icon matching the app theme ──
const greenIcon = new L.DivIcon({
  className: '',
  html: `
    <div style="
      background: linear-gradient(135deg, #059669, #047857);
      width: 36px; height: 36px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid #fff;
      box-shadow: 0 2px 8px rgba(5,150,105,0.4);
      display: flex; align-items: center; justify-content: center;
    ">
      <div style="transform: rotate(45deg); color: #fff; font-size: 14px; line-height: 1;">⌂</div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -38],
});

// ── Price pin icon — shows price on the map ──
const createPriceIcon = (price, isAvailable) => new L.DivIcon({
  className: '',
  html: `
    <div style="
      background: ${isAvailable ? 'linear-gradient(135deg,#059669,#047857)' : '#6b7280'};
      color: #fff;
      padding: 5px 10px;
      border-radius: 20px;
      font-family: 'DM Sans', sans-serif;
      font-size: 12px;
      font-weight: 700;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      border: 2px solid #fff;
      position: relative;
    ">
      ₹${Number(price).toLocaleString('en-IN')}
      <div style="
        position: absolute; bottom: -7px; left: 50%;
        transform: translateX(-50%);
        width: 0; height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 7px solid ${isAvailable ? '#047857' : '#6b7280'};
      "></div>
    </div>
  `,
  iconSize: [80, 32],
  iconAnchor: [40, 39],
  popupAnchor: [0, -42],
});

// ── Auto-fit map to show all pins ──
function FitBounds({ properties }) {
  const map = useMap();
  useEffect(() => {
    // ✅ FIX: use p.lat and p.lng (not p.latitude / p.longitude)
    const valid = properties.filter(p => p.lat && p.lng);
    if (valid.length === 0) return;
    if (valid.length === 1) {
      map.setView([valid[0].lat, valid[0].lng], 14);
      return;
    }
    const bounds = L.latLngBounds(valid.map(p => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [properties]);
  return null;
}

function MapView({ properties }) {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [iconMode, setIconMode] = useState('price'); // 'price' | 'pin'

  // ✅ FIX: filter using p.lat and p.lng (your DB field names)
  const mappable = properties.filter(p => p.lat && p.lng);

  if (mappable.length === 0) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
          .mv-empty {
            font-family: 'DM Sans', sans-serif;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            padding: 80px 24px; text-align: center;
            background: #fff; border-radius: 18px;
            border: 1.5px solid #e6f7ef;
          }
          .mv-empty-icon {
            width: 64px; height: 64px;
            background: #ecfdf5; border: 1.5px solid #d1fae5;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 16px;
          }
          .mv-empty-title { font-size: 1.1rem; font-weight: 700; color: #0f2d1a; margin-bottom: 6px; }
          .mv-empty-sub { font-size: 0.875rem; color: #6b7280; }
        `}</style>
        <div className="mv-empty">
          <div className="mv-empty-icon"><MapPin size={28} color="#059669" /></div>
          <div className="mv-empty-title">No properties with map location</div>
          <p className="mv-empty-sub">Add a map pin when listing a property to see it here. Try the grid view.</p>
        </div>
      </>
    );
  }

  // ✅ FIX: use p.lat and p.lng for default center
  const defaultCenter = [mappable[0].lat, mappable[0].lng];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .mv-root { position: relative; }

        .mv-map-wrap {
          border-radius: 20px;
          overflow: hidden;
          border: 1.5px solid #d1fae5;
          box-shadow: 0 4px 20px rgba(5,150,105,0.12);
          height: 600px;
        }
        .mv-map-wrap .leaflet-container {
          height: 100%; width: 100%;
          font-family: 'DM Sans', sans-serif;
        }

        .mv-controls {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 10px;
          margin-bottom: 14px;
        }
        .mv-count {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; color: #6b7280;
        }
        .mv-count strong { color: #059669; font-weight: 700; }

        .mv-icon-toggle { display: flex; gap: 6px; }
        .mv-icon-btn {
          display: flex; align-items: center; gap: 5px;
          padding: 6px 14px; border-radius: 10px;
          font-size: 0.82rem; font-weight: 600;
          border: 1.5px solid #e5e7eb;
          background: #f9fafb; color: #6b7280;
          cursor: pointer; transition: all 0.18s;
          font-family: 'DM Sans', sans-serif;
        }
        .mv-icon-btn.active { background: #ecfdf5; border-color: #34d399; color: #059669; }

        .mv-popup { font-family: 'DM Sans', sans-serif; min-width: 220px; }
        .leaflet-popup-content-wrapper {
          border-radius: 14px !important;
          border: 1.5px solid #d1fae5 !important;
          box-shadow: 0 8px 24px rgba(5,150,105,0.15) !important;
          padding: 0 !important; overflow: hidden;
        }
        .leaflet-popup-content { margin: 0 !important; width: auto !important; }
        .leaflet-popup-tip { background: #fff !important; }
        .leaflet-popup-close-button {
          top: 8px !important; right: 8px !important;
          color: #6b7280 !important; font-size: 18px !important;
          width: 24px !important; height: 24px !important;
          line-height: 24px !important; z-index: 10 !important;
        }

        .mv-popup-img { width: 100%; height: 130px; object-fit: cover; display: block; }
        .mv-popup-img-placeholder {
          width: 100%; height: 130px; background: #ecfdf5;
          display: flex; align-items: center; justify-content: center;
        }
        .mv-popup-body { padding: 12px 14px; }
        .mv-popup-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem; font-weight: 800; color: #0f2d1a;
          margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .mv-popup-loc {
          display: flex; align-items: center; gap: 4px;
          font-size: 0.78rem; color: #6b7280; margin-bottom: 8px;
        }
        .mv-popup-meta { display: flex; align-items: center; justify-content: space-between; }
        .mv-popup-price {
          display: flex; align-items: center; gap: 2px;
          font-size: 1rem; font-weight: 800; color: #059669;
        }
        .mv-popup-price-mo { font-size: 0.72rem; color: #9ca3af; font-weight: 400; margin-left: 2px; }
        .mv-popup-avail {
          display: flex; align-items: center; gap: 4px;
          font-size: 0.72rem; font-weight: 600;
          padding: 3px 8px; border-radius: 100px;
        }
        .mv-popup-avail.avail { background: #dcfce7; color: #166534; }
        .mv-popup-avail.unavail { background: #ffe4e6; color: #9f1239; }
        .mv-popup-btn {
          width: 100%;
          background: linear-gradient(135deg, #059669, #047857);
          color: #fff; border: none; border-radius: 0 0 12px 12px;
          padding: 10px; font-size: 0.85rem; font-weight: 700;
          cursor: pointer; transition: all 0.18s;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          font-family: 'DM Sans', sans-serif; margin-top: 10px;
        }
        .mv-popup-btn:hover { background: linear-gradient(135deg,#047857,#065f46); }

        .mv-summary { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 14px; }
        .mv-summary-chip {
          display: inline-flex; align-items: center; gap: 5px;
          background: #fff; border: 1.5px solid #e6f7ef;
          border-radius: 10px; padding: 7px 14px;
          font-size: 0.82rem; font-weight: 600; color: #065f46;
          box-shadow: 0 1px 4px rgba(5,150,105,0.07);
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>

      <div className="mv-root">

        {/* Controls */}
        <div className="mv-controls">
          <span className="mv-count">
            Showing <strong>{mappable.length}</strong> propert{mappable.length !== 1 ? 'ies' : 'y'} on map
            {properties.length !== mappable.length && (
              <span style={{ color: '#9ca3af', fontWeight: 400 }}>
                {' '}({properties.length - mappable.length} without coordinates)
              </span>
            )}
          </span>
          <div className="mv-icon-toggle">
            <button className={`mv-icon-btn ${iconMode === 'price' ? 'active' : ''}`} onClick={() => setIconMode('price')}>
              ₹ Price pins
            </button>
            <button className={`mv-icon-btn ${iconMode === 'pin' ? 'active' : ''}`} onClick={() => setIconMode('pin')}>
              <MapPin size={13} /> Location pins
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="mv-map-wrap">
          <MapContainer center={defaultCenter} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FitBounds properties={mappable} />

            {mappable.map(p => {
              const isAvailable = p.availabilityStatus !== 'not_available';
              const imageUrl = p.images?.[0] || p.image;
              const icon = iconMode === 'price'
                ? createPriceIcon(p.price, isAvailable)
                : greenIcon;

              return (
                // ✅ FIX: position uses p.lat and p.lng
                <Marker
                  key={p._id}
                  position={[p.lat, p.lng]}
                  icon={icon}
                  eventHandlers={{ click: () => setSelectedId(p._id) }}
                >
                  <Popup>
                    <div className="mv-popup">
                      {imageUrl ? (
                        <img src={imageUrl} className="mv-popup-img" alt={p.title}
                          onError={e => { e.target.style.display = 'none'; }} />
                      ) : (
                        <div className="mv-popup-img-placeholder">
                          <Home size={28} color="#a7f3d0" />
                        </div>
                      )}

                      <div className="mv-popup-body">
                        <div className="mv-popup-title">{p.title}</div>
                        <div className="mv-popup-loc">
                          <MapPin size={12} color="#ef4444" />
                          {p.city || p.location}
                        </div>
                        <div className="mv-popup-meta">
                          <div className="mv-popup-price">
                            <IndianRupee size={15} strokeWidth={2.5} />
                            {Number(p.price).toLocaleString('en-IN')}
                            <span className="mv-popup-price-mo">/mo</span>
                          </div>
                          <span className={`mv-popup-avail ${isAvailable ? 'avail' : 'unavail'}`}>
                            {isAvailable ? '● Available' : '✕ Taken'}
                          </span>
                        </div>

                        {p.propertyType && (
                          <div style={{ marginTop: 6 }}>
                            <span style={{ background:'#f0fdf4',border:'1px solid #d1fae5',borderRadius:'100px',padding:'2px 8px',fontSize:'0.72rem',fontWeight:700,color:'#065f46' }}>
                              {p.propertyType}
                            </span>
                            {p.genderPreference && p.genderPreference !== 'Any' && (
                              <span style={{ background:'#f5f3ff',border:'1px solid #ddd6fe',borderRadius:'100px',padding:'2px 8px',fontSize:'0.72rem',fontWeight:700,color:'#5b21b6',marginLeft:5 }}>
                                {p.genderPreference === 'Boys' ? '👦' : '👧'} {p.genderPreference}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <button className="mv-popup-btn" onClick={() => navigate(`/property/${p._id}`)}>
                        View Details <ArrowRight size={14} />
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Summary strip */}
        <div className="mv-summary">
          <div className="mv-summary-chip">
            <span style={{ color: '#059669' }}>●</span>
            {mappable.filter(p => p.availabilityStatus !== 'not_available').length} available
          </div>
          <div className="mv-summary-chip">
            <span style={{ color: '#9ca3af' }}>●</span>
            {mappable.filter(p => p.availabilityStatus === 'not_available').length} not available
          </div>
          <div className="mv-summary-chip">
            <Home size={13} />
            {[...new Set(mappable.map(p => p.city || p.location).filter(Boolean))].length} cities
          </div>
        </div>
      </div>
    </>
  );
}

export default MapView;