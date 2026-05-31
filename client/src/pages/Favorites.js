// import React, { useState, useEffect } from 'react';
// import PropertyCard from '../components/PropertyCard';
// import { Heart, Trash2 } from 'lucide-react';

// function Favorites() {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     loadFavorites();
//   }, []);

//   const loadFavorites = () => {
//     try {
//       const saved = localStorage.getItem('favorites');
//       setFavorites(saved ? JSON.parse(saved) : []);
//     } catch (error) {
//       console.error('Error loading favorites:', error);
//     }
//   };

//   const removeFavorite = (propertyId) => {
//     const updated = favorites.filter(p => p._id !== propertyId);
//     setFavorites(updated);
//     localStorage.setItem('favorites', JSON.stringify(updated));
//   };

//   const clearAll = () => {
//     if (window.confirm('Are you sure you want to clear all favorites?')) {
//       setFavorites([]);
//       localStorage.removeItem('favorites');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-900 flex items-center space-x-3 mb-2">
//               <Heart size={32} className="text-red-500" />
//               <span>My Favorites</span>
//             </h1>
//             <p className="text-gray-600">Your saved properties</p>
//           </div>
//           {favorites.length > 0 && (
//             <button
//               onClick={clearAll}
//               className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center space-x-2"
//             >
//               <Trash2 size={18} />
//               <span>Clear All</span>
//             </button>
//           )}
//         </div>

//         {/* Favorites Grid */}
//         {favorites.length > 0 ? (
//           <>
//             <p className="text-gray-600 mb-4">
//               You have <span className="font-bold text-gray-900">{favorites.length}</span> favorite{favorites.length !== 1 ? 's' : ''}
//             </p>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {favorites.map(property => (
//                 <div key={property._id} className="relative">
//                   <PropertyCard property={property} />
//                   <button
//                     onClick={() => removeFavorite(property._id)}
//                     className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <div className="text-center py-16">
//             <Heart size={48} className="text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-600 text-lg">No favorites yet</p>
//             <p className="text-gray-500">Start adding properties to your favorites!</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Favorites;


// import React, { useState, useEffect } from 'react';
// import PropertyCard from '../components/PropertyCard';
// import { Heart, Trash2 } from 'lucide-react';

// function Favorites() {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     loadFavorites();
//   }, []);

//   const loadFavorites = () => {
//     try {
//       const saved = localStorage.getItem('favorites');
//       setFavorites(saved ? JSON.parse(saved) : []);
//     } catch (error) {
//       console.error('Error loading favorites:', error);
//     }
//   };

//   const removeFavorite = (propertyId) => {
//     const updated = favorites.filter(p => p._id !== propertyId);
//     setFavorites(updated);
//     localStorage.setItem('favorites', JSON.stringify(updated));
//   };

//   const clearAll = () => {
//     if (window.confirm('Clear all favorites?')) {
//       setFavorites([]);
//       localStorage.removeItem('favorites');
//     }
//   };

//   return (
//     <div className="fav-root">
//       <div className="fav-container">

//         {/* Header */}
//         <div className="fav-header">
//           <div>
//             <h1 className="fav-title">
//               <Heart size={28} />
//               My Favorites
//             </h1>
//             <p className="fav-sub">Your saved properties</p>
//           </div>

//           {favorites.length > 0 && (
//             <button onClick={clearAll} className="fav-clear">
//               <Trash2 size={16} />
//               Clear All
//             </button>
//           )}
//         </div>

//         {/* Count */}
//         {favorites.length > 0 && (
//           <p className="fav-count">
//             You have <span>{favorites.length}</span> favorite{favorites.length !== 1 ? 's' : ''}
//           </p>
//         )}

//         {/* Grid */}
//         {favorites.length > 0 ? (
//           <div className="fav-grid">
//             {favorites.map(property => (
//               <div key={property._id} className="fav-card">
//                 <PropertyCard property={property} />

//                 <button
//                   onClick={() => removeFavorite(property._id)}
//                   className="fav-remove"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="fav-empty">
//             <Heart size={48} />
//             <h3>No favorites yet</h3>
//             <p>Start saving properties you love ❤️</p>
//           </div>
//         )}
//       </div>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

//         .fav-root {
//           min-height: 100vh;
//           background: linear-gradient(135deg, #ecfdf5, #f0fdf4);
//           padding: 40px 20px;
//           font-family: 'DM Sans', sans-serif;
//         }

//         .fav-container {
//           max-width: 1200px;
//           margin: auto;
//         }

//         /* HEADER */
//         .fav-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//         }

//         .fav-title {
//           font-family: 'Syne', sans-serif;
//           font-size: 1.8rem;
//           font-weight: 800;
//           color: #064e3b;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }

//         .fav-title svg {
//           color: #ef4444;
//         }

//         .fav-sub {
//           color: #6b7280;
//           font-size: 0.9rem;
//         }

//         /* CLEAR BUTTON */
//         .fav-clear {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           background: rgba(239,68,68,0.1);
//           color: #ef4444;
//           border: 1px solid rgba(239,68,68,0.2);
//           padding: 7px 14px;
//           border-radius: 10px;
//           cursor: pointer;
//           transition: 0.25s;
//         }

//         .fav-clear:hover {
//           background: rgba(239,68,68,0.18);
//           transform: translateY(-2px);
//         }

//         /* COUNT */
//         .fav-count {
//           margin-bottom: 18px;
//           color: #374151;
//         }

//         .fav-count span {
//           font-weight: 700;
//           color: #064e3b;
//         }

//         /* GRID */
//         .fav-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//           gap: 20px;
//         }

//         /* CARD */
//         .fav-card {
//           position: relative;
//           border-radius: 18px;
//           overflow: hidden;
//           transition: 0.25s;
//         }

//         .fav-card:hover {
//           transform: translateY(-4px) scale(1.01);
//         }

//         /* REMOVE BUTTON */
//         .fav-remove {
//           position: absolute;
//           top: 12px;
//           right: 12px;
//           background: rgba(239,68,68,0.9);
//           color: #fff;
//           border: none;
//           border-radius: 50%;
//           padding: 8px;
//           cursor: pointer;
//           transition: 0.2s;
//         }

//         .fav-remove:hover {
//           background: #dc2626;
//           transform: scale(1.1);
//         }

//         /* EMPTY STATE */
//         .fav-empty {
//           text-align: center;
//           margin-top: 80px;
//           color: #6b7280;
//         }

//         .fav-empty svg {
//           color: #9ca3af;
//           margin-bottom: 10px;
//         }

//         .fav-empty h3 {
//           font-size: 1.2rem;
//           color: #064e3b;
//           margin-bottom: 5px;
//         }

//         .fav-empty p {
//           font-size: 0.9rem;
//         }

//       `}</style>
//     </div>
//   );
// }

// export default Favorites;

import React, { useState, useEffect, useContext } from 'react';
import PropertyCard from '../components/PropertyCard';
import { Heart, Trash2, Sparkles } from 'lucide-react';
import AuthContext from '../context/AuthContext';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);

  // ── Per-user storage key ──
  // Each user gets their own isolated favorites list.
  // If no user is logged in, falls back to a guest key.
  const storageKey = user?.id ? `favorites_${user.id}` : 'favorites_guest';

  useEffect(() => {
    loadFavorites();
  }, [storageKey]); // re-load when user changes (login/logout)

  const loadFavorites = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      setFavorites(saved ? JSON.parse(saved) : []);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
    }
  };

  const removeFavorite = (propertyId) => {
    const updated = favorites.filter(p => p._id !== propertyId);
    setFavorites(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      setFavorites([]);
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .fv-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #f0faf4;
        }

        .fv-hero {
          background: linear-gradient(160deg, #064e3b 0%, #065f46 55%, #047857 100%);
          padding: 44px 24px 52px;
          position: relative; overflow: hidden;
        }
        .fv-hero::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px; pointer-events: none;
        }
        .fv-hero-blob {
          position: absolute; width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(110,231,183,0.18), transparent 65%);
          top: -60px; right: -40px; border-radius: 50%; pointer-events: none;
        }
        .fv-hero-inner {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: flex-end;
          justify-content: space-between; flex-wrap: wrap; gap: 16px;
        }
        .fv-hero-badge {
          display: block;
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 100px; padding: 4px 13px;
          font-size: 0.75rem; font-weight: 600;
          color: #a7f3d0; text-transform: uppercase;
          letter-spacing: 0.4px; margin-bottom: 10px;
        }
        .fv-hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 800; color: #fff;
          letter-spacing: -1px; line-height: 1.12; margin-bottom: 4px;
          display: flex; align-items: center; gap: 12px;
        }
        .fv-heart-icon {
          width: 42px; height: 42px;
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .fv-hero-sub { color: #a7f3d0; font-size: 0.92rem; }
        .fv-hero-count {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px; padding: 8px 16px; margin-top: 14px;
          font-size: 0.85rem; color: #d1fae5; font-weight: 600;
        }
        .fv-hero-count strong { color: #fff; font-weight: 800; }

        .fv-clear-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.3);
          color: #fca5a5; padding: 10px 18px; border-radius: 12px;
          font-size: 0.875rem; font-weight: 700; cursor: pointer;
          transition: all 0.18s; font-family: 'DM Sans', sans-serif;
          flex-shrink: 0;
        }
        .fv-clear-btn:hover { background: rgba(239,68,68,0.25); color: #f87171; }

        .fv-body {
          max-width: 1280px; margin: 0 auto;
          padding: 36px 20px 60px;
        }

        .fv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .fv-card-wrap { position: relative; }
        .fv-remove-btn {
          position: absolute; top: 12px; right: 52px;
          z-index: 10;
          background: rgba(239,68,68,0.9);
          backdrop-filter: blur(8px);
          border: none; border-radius: 10px;
          padding: 7px 12px;
          display: flex; align-items: center; gap: 5px;
          font-size: 0.75rem; font-weight: 700;
          color: #fff; cursor: pointer;
          transition: all 0.18s;
          box-shadow: 0 4px 12px rgba(239,68,68,0.3);
        }
        .fv-remove-btn:hover { background: #ef4444; transform: scale(1.05); }

        .fv-section-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.15rem; font-weight: 800;
          color: #0f2d1a; letter-spacing: -0.4px;
          margin-bottom: 20px;
        }

        /* Empty state */
        .fv-empty { text-align: center; padding: 80px 24px; }
        .fv-empty-icon-wrap {
          width: 88px; height: 88px; background: #fff;
          border: 2px solid #fecdd3; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          box-shadow: 0 4px 20px rgba(239,68,68,0.1);
        }
        .fv-empty-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem; font-weight: 800;
          color: #0f2d1a; margin-bottom: 8px;
        }
        .fv-empty-sub { color: #6b7280; font-size: 0.9rem; margin-bottom: 24px; }
        .fv-explore-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg, #059669, #047857);
          color: #fff; padding: 12px 24px; border-radius: 12px;
          font-size: 0.9rem; font-weight: 700;
          text-decoration: none; transition: all 0.18s;
          box-shadow: 0 4px 14px rgba(5,150,105,0.3);
          font-family: 'DM Sans', sans-serif;
        }
        .fv-explore-btn:hover {
          box-shadow: 0 6px 22px rgba(5,150,105,0.45);
          transform: translateY(-1px);
        }

        /* Not-logged-in notice */
        .fv-guest-notice {
          background: #fff;
          border: 1.5px solid #d1fae5;
          border-radius: 16px;
          padding: 28px 24px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(5,150,105,0.07);
          max-width: 440px;
          margin: 0 auto;
        }
        .fv-guest-icon {
          width: 60px; height: 60px;
          background: #ecfdf5; border: 1.5px solid #d1fae5;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 14px;
        }
        .fv-guest-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.15rem; font-weight: 800;
          color: #0f2d1a; margin-bottom: 6px;
        }
        .fv-guest-sub { color: #6b7280; font-size: 0.875rem; margin-bottom: 18px; }
        .fv-login-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg, #059669, #047857);
          color: #fff; padding: 11px 22px; border-radius: 11px;
          font-size: 0.875rem; font-weight: 700;
          text-decoration: none; transition: all 0.18s;
          box-shadow: 0 4px 14px rgba(5,150,105,0.28);
          font-family: 'DM Sans', sans-serif;
        }
        .fv-login-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(5,150,105,0.4); }
      `}</style>

      <div className="fv-root">

        {/* Hero */}
        <div className="fv-hero">
          <div className="fv-hero-blob" />
          <div className="fv-hero-inner">
            <div>
              <span className="fv-hero-badge">❤️ Saved</span>
              <h1 className="fv-hero-title">
                <div className="fv-heart-icon">
                  <Heart size={20} color="#f87171" fill="#f87171" />
                </div>
                My Favorites
              </h1>
              <p className="fv-hero-sub">
                {user ? `${user.fullName?.split(' ')[0]}'s saved properties` : 'Your saved properties, all in one place'}
              </p>
              {favorites.length > 0 && (
                <div className="fv-hero-count">
                  <strong>{favorites.length}</strong> saved propert{favorites.length !== 1 ? 'ies' : 'y'}
                </div>
              )}
            </div>

            {favorites.length > 0 && (
              <button onClick={clearAll} className="fv-clear-btn">
                <Trash2 size={15} /> Clear All
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="fv-body">

          {/* Not logged in */}
          {!user ? (
            <div className="fv-guest-notice">
              <div className="fv-guest-icon">
                <Heart size={26} color="#059669" />
              </div>
              <div className="fv-guest-title">Login to see your favorites</div>
              <p className="fv-guest-sub">
                Your favorites are saved per account — log in to view and manage them.
              </p>
              <a href="/login" className="fv-login-btn">
                Sign In →
              </a>
            </div>
          ) : favorites.length > 0 ? (
            <>
              <div className="fv-section-title">Saved Properties</div>
              <div className="fv-grid">
                {favorites.map(property => (
                  <div key={property._id} className="fv-card-wrap">
                    <PropertyCard property={property} />
                    <button
                      onClick={() => removeFavorite(property._id)}
                      className="fv-remove-btn"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="fv-empty">
              <div className="fv-empty-icon-wrap">
                <Heart size={36} color="#fca5a5" />
              </div>
              <div className="fv-empty-title">No favorites yet</div>
              <p className="fv-empty-sub">
                Browse listings and tap the ❤️ to save properties you love
              </p>
              <a href="/" className="fv-explore-btn">
                <Sparkles size={16} /> Explore Listings
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Favorites;