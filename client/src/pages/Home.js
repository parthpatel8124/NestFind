// import React, { useState, useEffect, useContext } from 'react';
// import api from '../utils/api';
// import PropertyCard from '../components/PropertyCard';
// import Alert from '../components/Alert';
// import { Search, Filter, Loader } from 'lucide-react';
// import AuthContext from '../context/AuthContext'; // ✅ ADDED

// function Home() {
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const { user } = useContext(AuthContext); // ✅ ADDED

//   const [searchQuery, setSearchQuery] = useState('');
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [selectedPropertyType, setSelectedPropertyType] = useState('');
//   const [selectedGenderPref, setSelectedGenderPref] = useState('');

//   const [availabilityFilter, setAvailabilityFilter] = useState('');

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await api.get('/api/properties');

//       // ✅ FILTER OUT OWN PROPERTIES
//       const filtered = response.data.filter(p => {
//         if (!user) return true;
//         return p.ownerId !== user.id;
//       });

//       setProperties(filtered);
//       setFilteredProperties(filtered);

//     } catch (error) {
//       setError('Failed to load properties.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const applyFilters = (search, price, location, type, gender, availability) => {
//     let filtered = [...properties];

//     if (search) {
//       filtered = filtered.filter(p =>
//         p.title?.toLowerCase().includes(search) ||
//         p.description?.toLowerCase().includes(search) ||
//         (p.location || p.city || '').toLowerCase().includes(search)
//       );
//     }

//     if (location) {
//       filtered = filtered.filter(p => (p.city || p.location) === location);
//     }

//     if (type) {
//       filtered = filtered.filter(p => p.propertyType === type);
//     }

//     if (gender) {
//       filtered = filtered.filter(p => (p.genderPreference || 'Any') === gender);
//     }

//     if (availability) {
//       if (availability === 'available') {
//         filtered = filtered.filter(p => p.availabilityStatus === 'available');
//       } else {
//         filtered = filtered.filter(p => p.availabilityStatus === 'not_available');
//       }
//     }

//     filtered = filtered.filter(p =>
//       p.price >= price.min && p.price <= price.max
//     );

//     setFilteredProperties(filtered);
//   };

//   const handleSearch = (e) => {
//     const val = e.target.value.toLowerCase();
//     setSearchQuery(val);
//     applyFilters(val, priceRange, selectedLocation, selectedPropertyType, selectedGenderPref, availabilityFilter);
//   };

//   const handleLocationChange = (e) => {
//     const val = e.target.value;
//     setSelectedLocation(val);
//     applyFilters(searchQuery, priceRange, val, selectedPropertyType, selectedGenderPref, availabilityFilter);
//   };

//   const handlePropertyTypeChange = (e) => {
//     const val = e.target.value;
//     setSelectedPropertyType(val);
//     applyFilters(searchQuery, priceRange, selectedLocation, val, selectedGenderPref, availabilityFilter);
//   };

//   const handleGenderPrefChange = (e) => {
//     const val = e.target.value;
//     setSelectedGenderPref(val);
//     applyFilters(searchQuery, priceRange, selectedLocation, selectedPropertyType, val, availabilityFilter);
//   };

//   const handleAvailabilityChange = (e) => {
//     const val = e.target.value;
//     setAvailabilityFilter(val);
//     applyFilters(searchQuery, priceRange, selectedLocation, selectedPropertyType, selectedGenderPref, val);
//   };

//   const handlePriceChange = (e, type) => {
//     const newRange = { ...priceRange, [type]: Number(e.target.value) };
//     setPriceRange(newRange);
//     applyFilters(searchQuery, newRange, selectedLocation, selectedPropertyType, selectedGenderPref, availabilityFilter);
//   };

//   const uniqueLocations = [...new Set(properties.map(p => p.city || p.location))].filter(Boolean);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4">

//         <h1 className="text-4xl font-bold mb-6">Find Your Dream Property</h1>

//         <div className="bg-white p-6 rounded shadow mb-8 grid grid-cols-1 md:grid-cols-6 gap-4">

//           <input
//             placeholder="Search"
//             value={searchQuery}
//             onChange={handleSearch}
//             className="p-2 border rounded"
//           />

//           <select value={selectedLocation} onChange={handleLocationChange} className="p-2 border rounded">
//             <option value="">All Locations</option>
//             {uniqueLocations.map(l => <option key={l}>{l}</option>)}
//           </select>

//           <select value={selectedPropertyType} onChange={handlePropertyTypeChange} className="p-2 border rounded">
//             <option value="">Any</option>
//             <option>PG</option>
//             <option>Flat</option>
//             <option>Apartment</option>
//           </select>

//           <select value={selectedGenderPref} onChange={handleGenderPrefChange} className="p-2 border rounded">
//             <option value="">Any</option>
//             <option>Boys</option>
//             <option>Girls</option>
//             <option>Any</option>
//           </select>

//           <select value={availabilityFilter} onChange={handleAvailabilityChange} className="p-2 border rounded">
//             <option value="">All</option>
//             <option value="available">Available</option>
//             <option value="not_available">Not Available</option>
//           </select>

//         </div>

//         {loading ? (
//           <div className="flex justify-center py-10">
//             <Loader className="animate-spin text-blue-600" />
//           </div>
//         ) : filteredProperties.length ? (
//           <div className="grid md:grid-cols-3 gap-6">
//             {filteredProperties.map(p => (
//               <PropertyCard key={p._id} property={p} />
//             ))}
//           </div>
//         ) : (
//           <p>No properties found</p>
//         )}

//       </div>
//     </div>
//   );
// }

// export default Home;

// import React, { useState, useEffect, useContext } from 'react';
// import api from '../utils/api';
// import PropertyCard from '../components/PropertyCard';
// import Alert from '../components/Alert';
// import { Search, Loader, MapPin, Home, Users, CheckCircle, SlidersHorizontal, X } from 'lucide-react';
// import AuthContext from '../context/AuthContext';

// function HomePage() {
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showFilters, setShowFilters] = useState(false);

//   const { user } = useContext(AuthContext);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [selectedPropertyType, setSelectedPropertyType] = useState('');
//   const [selectedGenderPref, setSelectedGenderPref] = useState('');
//   const [availabilityFilter, setAvailabilityFilter] = useState('');

//   useEffect(() => { fetchProperties(); }, []);

//   const fetchProperties = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await api.get('/api/properties');
//       const filtered = response.data.filter(p => {
//         if (!user) return true;
//         return p.ownerId !== user.id;
//       });
//       setProperties(filtered);
//       setFilteredProperties(filtered);
//     } catch (error) {
//       setError('Failed to load properties.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const applyFilters = (search, price, location, type, gender, availability) => {
//     let filtered = [...properties];
//     if (search) {
//       filtered = filtered.filter(p =>
//         p.title?.toLowerCase().includes(search) ||
//         p.description?.toLowerCase().includes(search) ||
//         (p.location || p.city || '').toLowerCase().includes(search)
//       );
//     }
//     if (location) filtered = filtered.filter(p => (p.city || p.location) === location);
//     if (type) filtered = filtered.filter(p => p.propertyType === type);
//     if (gender) filtered = filtered.filter(p => (p.genderPreference || 'Any') === gender);
//     if (availability) {
//       if (availability === 'available') filtered = filtered.filter(p => p.availabilityStatus === 'available');
//       else filtered = filtered.filter(p => p.availabilityStatus === 'not_available');
//     }
//     filtered = filtered.filter(p => p.price >= price.min && p.price <= price.max);
//     setFilteredProperties(filtered);
//   };

//   const handleSearch = (e) => {
//     const val = e.target.value.toLowerCase();
//     setSearchQuery(val);
//     applyFilters(val, priceRange, selectedLocation, selectedPropertyType, selectedGenderPref, availabilityFilter);
//   };
//   const handleLocationChange = (e) => {
//     const val = e.target.value;
//     setSelectedLocation(val);
//     applyFilters(searchQuery, priceRange, val, selectedPropertyType, selectedGenderPref, availabilityFilter);
//   };
//   const handlePropertyTypeChange = (e) => {
//     const val = e.target.value;
//     setSelectedPropertyType(val);
//     applyFilters(searchQuery, priceRange, selectedLocation, val, selectedGenderPref, availabilityFilter);
//   };
//   const handleGenderPrefChange = (e) => {
//     const val = e.target.value;
//     setSelectedGenderPref(val);
//     applyFilters(searchQuery, priceRange, selectedLocation, selectedPropertyType, val, availabilityFilter);
//   };
//   const handleAvailabilityChange = (e) => {
//     const val = e.target.value;
//     setAvailabilityFilter(val);
//     applyFilters(searchQuery, priceRange, selectedLocation, selectedPropertyType, selectedGenderPref, val);
//   };
//   const handlePriceChange = (e, type) => {
//     const newRange = { ...priceRange, [type]: Number(e.target.value) };
//     setPriceRange(newRange);
//     applyFilters(searchQuery, newRange, selectedLocation, selectedPropertyType, selectedGenderPref, availabilityFilter);
//   };

//   const uniqueLocations = [...new Set(properties.map(p => p.city || p.location))].filter(Boolean);

//   const activeFilterCount = [selectedLocation, selectedPropertyType, selectedGenderPref, availabilityFilter].filter(Boolean).length;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

//         .home-root {
//           font-family: 'DM Sans', sans-serif;
//           min-height: 100vh;
//           background: #060f09;
//           color: #fff;
//         }

//         /* Hero */
//         .hero-section {
//           position: relative;
//           overflow: hidden;
//           padding: 64px 24px 52px;
//           text-align: center;
//         }
//         .hero-blob-1 {
//           position: absolute;
//           width: 500px; height: 500px;
//           background: radial-gradient(circle, rgba(52,211,153,0.18), transparent 70%);
//           top: -100px; left: 50%;
//           transform: translateX(-50%);
//           pointer-events: none;
//         }
//         .hero-grid {
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(52,211,153,0.035) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(52,211,153,0.035) 1px, transparent 1px);
//           background-size: 40px 40px;
//           pointer-events: none;
//         }
//         .hero-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           background: rgba(52,211,153,0.1);
//           border: 1px solid rgba(52,211,153,0.22);
//           border-radius: 100px;
//           padding: 5px 14px;
//           font-size: 0.75rem;
//           font-weight: 600;
//           color: #34d399;
//           letter-spacing: 0.5px;
//           text-transform: uppercase;
//           margin-bottom: 20px;
//           animation: fadeUp 0.5s ease both;
//         }
//         .hero-title {
//           font-family: 'Syne', sans-serif;
//           font-size: clamp(2.2rem, 5vw, 3.5rem);
//           font-weight: 800;
//           line-height: 1.1;
//           letter-spacing: -2px;
//           color: #fff;
//           margin-bottom: 14px;
//           animation: fadeUp 0.5s 0.1s ease both;
//         }
//         .hero-title .highlight {
//           background: linear-gradient(90deg, #34d399, #6ee7b7, #a7f3d0);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }
//         .hero-sub {
//           color: #6b7280;
//           font-size: 1rem;
//           max-width: 480px;
//           margin: 0 auto 32px;
//           line-height: 1.6;
//           animation: fadeUp 0.5s 0.2s ease both;
//         }

//         /* Stats row */
//         .stats-row {
//           display: flex;
//           justify-content: center;
//           gap: 32px;
//           flex-wrap: wrap;
//           margin-bottom: 40px;
//           animation: fadeUp 0.5s 0.3s ease both;
//         }
//         .stat-item {
//           text-align: center;
//         }
//         .stat-num {
//           font-family: 'Syne', sans-serif;
//           font-size: 1.4rem;
//           font-weight: 800;
//           color: #34d399;
//         }
//         .stat-label {
//           font-size: 0.75rem;
//           color: #6b7280;
//           margin-top: 2px;
//         }

//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         /* Search bar */
//         .search-wrap {
//           position: relative;
//           max-width: 600px;
//           margin: 0 auto;
//           animation: fadeUp 0.5s 0.35s ease both;
//         }
//         .search-icon {
//           position: absolute;
//           left: 18px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #4b5563;
//           pointer-events: none;
//           z-index: 2;
//         }
//         .search-input {
//           width: 100%;
//           background: rgba(255,255,255,0.05);
//           border: 1.5px solid rgba(255,255,255,0.1);
//           border-radius: 16px;
//           padding: 16px 20px 16px 50px;
//           font-size: 0.97rem;
//           font-family: 'DM Sans', sans-serif;
//           color: #fff;
//           transition: all 0.2s ease;
//           outline: none;
//           box-sizing: border-box;
//           backdrop-filter: blur(12px);
//         }
//         .search-input::placeholder { color: #4b5563; }
//         .search-input:focus {
//           border-color: #34d399;
//           background: rgba(52,211,153,0.05);
//           box-shadow: 0 0 0 3px rgba(52,211,153,0.12), 0 8px 32px rgba(0,0,0,0.4);
//         }

//         /* Filter area */
//         .filter-container {
//           max-width: 1280px;
//           margin: 0 auto;
//           padding: 0 24px 40px;
//         }
//         .filter-toggle-row {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           margin-bottom: 16px;
//         }
//         .results-count {
//           font-size: 0.88rem;
//           color: #6b7280;
//         }
//         .results-count strong { color: #34d399; }
//         .filter-toggle-btn {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           background: rgba(52,211,153,0.08);
//           border: 1px solid rgba(52,211,153,0.2);
//           border-radius: 12px;
//           padding: 9px 16px;
//           font-size: 0.85rem;
//           font-weight: 600;
//           color: #34d399;
//           cursor: pointer;
//           transition: all 0.2s;
//           font-family: 'DM Sans', sans-serif;
//         }
//         .filter-toggle-btn:hover {
//           background: rgba(52,211,153,0.14);
//         }
//         .filter-badge-num {
//           background: #34d399;
//           color: #0a2e1a;
//           border-radius: 100px;
//           font-size: 0.7rem;
//           font-weight: 800;
//           padding: 1px 7px;
//         }

//         .filters-panel {
//           background: rgba(15,30,20,0.7);
//           backdrop-filter: blur(16px);
//           border: 1px solid rgba(52,211,153,0.14);
//           border-radius: 18px;
//           padding: 20px;
//           margin-bottom: 28px;
//           animation: filterSlide 0.25s ease;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
//           gap: 12px;
//         }
//         @keyframes filterSlide {
//           from { opacity: 0; transform: translateY(-8px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .filter-select {
//           width: 100%;
//           background: rgba(255,255,255,0.04);
//           border: 1.5px solid rgba(255,255,255,0.08);
//           border-radius: 12px;
//           padding: 10px 14px;
//           font-size: 0.875rem;
//           font-family: 'DM Sans', sans-serif;
//           color: #d1d5db;
//           outline: none;
//           cursor: pointer;
//           transition: all 0.2s;
//           appearance: none;
//           background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234b5563' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
//           background-repeat: no-repeat;
//           background-position: right 12px center;
//           padding-right: 32px;
//         }
//         .filter-select:focus {
//           border-color: #34d399;
//           background-color: rgba(52,211,153,0.05);
//           box-shadow: 0 0 0 3px rgba(52,211,153,0.1);
//           color: #fff;
//         }
//         .filter-select option { background: #0f1e14; color: #d1d5db; }

//         /* Property grid */
//         .property-grid {
//           max-width: 1280px;
//           margin: 0 auto;
//           padding: 0 24px 60px;
//         }
//         .grid-inner {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//           gap: 24px;
//         }

//         /* Loading */
//         .loading-wrap {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 80px 0;
//           gap: 16px;
//         }
//         .spinner-ring {
//           width: 44px; height: 44px;
//           border: 3px solid rgba(52,211,153,0.15);
//           border-top-color: #34d399;
//           border-radius: 50%;
//           animation: spin 0.8s linear infinite;
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }
//         .loading-text { color: #6b7280; font-size: 0.9rem; }

//         /* Empty state */
//         .empty-state {
//           text-align: center;
//           padding: 80px 24px;
//         }
//         .empty-icon {
//           width: 72px; height: 72px;
//           background: rgba(52,211,153,0.08);
//           border: 1px solid rgba(52,211,153,0.15);
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin: 0 auto 20px;
//         }
//         .empty-title {
//           font-family: 'Syne', sans-serif;
//           font-size: 1.3rem;
//           font-weight: 700;
//           color: #fff;
//           margin-bottom: 8px;
//         }
//         .empty-sub { color: #6b7280; font-size: 0.9rem; }

//         /* Chip filter pills (active indicator) */
//         .active-chips {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 8px;
//           margin-bottom: 20px;
//         }
//         .chip {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           background: rgba(52,211,153,0.1);
//           border: 1px solid rgba(52,211,153,0.25);
//           border-radius: 100px;
//           padding: 4px 12px;
//           font-size: 0.78rem;
//           font-weight: 600;
//           color: #34d399;
//         }
//       `}</style>

//       <div className="home-root">

//         {/* Hero */}
//         <div className="hero-section">
//           <div className="hero-blob-1" />
//           <div className="hero-grid" />

//           <div className="hero-badge">
//             🏠 For Students & Freshers
//           </div>

//           <h1 className="hero-title">
//             Find Your Perfect<br />
//             <span className="highlight">PG, Flat & Room</span>
//           </h1>

//           <p className="hero-sub">
//             Verified listings for students and freshers. No broker fees, transparent pricing, move in stress-free.
//           </p>

//           <div className="stats-row">
//             <div className="stat-item">
//               <div className="stat-num">{properties.length}+</div>
//               <div className="stat-label">Listings</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-num">{uniqueLocations.length}</div>
//               <div className="stat-label">Cities</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-num">0</div>
//               <div className="stat-label">Broker Fees</div>
//             </div>
//           </div>

//           <div className="search-wrap">
//             <Search size={18} className="search-icon" />
//             <input
//               placeholder="Search by location, title or description..."
//               value={searchQuery}
//               onChange={handleSearch}
//               className="search-input"
//             />
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="filter-container">
//           {error && <Alert type="error" message={error} onClose={() => setError('')} />}

//           <div className="filter-toggle-row">
//             <span className="results-count">
//               Showing <strong>{filteredProperties.length}</strong> of {properties.length} listings
//             </span>
//             <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
//               <SlidersHorizontal size={15} />
//               Filters
//               {activeFilterCount > 0 && (
//                 <span className="filter-badge-num">{activeFilterCount}</span>
//               )}
//               {showFilters ? <X size={14} /> : null}
//             </button>
//           </div>

//           {/* Active chips */}
//           {activeFilterCount > 0 && (
//             <div className="active-chips">
//               {selectedLocation && <span className="chip"><MapPin size={11} />{selectedLocation}</span>}
//               {selectedPropertyType && <span className="chip"><Home size={11} />{selectedPropertyType}</span>}
//               {selectedGenderPref && <span className="chip"><Users size={11} />{selectedGenderPref}</span>}
//               {availabilityFilter && <span className="chip"><CheckCircle size={11} />{availabilityFilter === 'available' ? 'Available' : 'Not Available'}</span>}
//             </div>
//           )}

//           {showFilters && (
//             <div className="filters-panel">
//               <select value={selectedLocation} onChange={handleLocationChange} className="filter-select">
//                 <option value="">📍 All Locations</option>
//                 {uniqueLocations.map(l => <option key={l} value={l}>{l}</option>)}
//               </select>

//               <select value={selectedPropertyType} onChange={handlePropertyTypeChange} className="filter-select">
//                 <option value="">🏠 Any Type</option>
//                 <option>PG</option>
//                 <option>Flat</option>
//                 <option>Apartment</option>
//               </select>

//               <select value={selectedGenderPref} onChange={handleGenderPrefChange} className="filter-select">
//                 <option value="">👥 Any Gender</option>
//                 <option>Boys</option>
//                 <option>Girls</option>
//                 <option>Any</option>
//               </select>

//               <select value={availabilityFilter} onChange={handleAvailabilityChange} className="filter-select">
//                 <option value="">✅ All Status</option>
//                 <option value="available">Available</option>
//                 <option value="not_available">Not Available</option>
//               </select>
//             </div>
//           )}
//         </div>

//         {/* Listings */}
//         <div className="property-grid">
//           {loading ? (
//             <div className="loading-wrap">
//               <div className="spinner-ring" />
//               <span className="loading-text">Finding the best places for you...</span>
//             </div>
//           ) : filteredProperties.length ? (
//             <div className="grid-inner">
//               {filteredProperties.map(p => (
//                 <PropertyCard key={p._id} property={p} />
//               ))}
//             </div>
//           ) : (
//             <div className="empty-state">
//               <div className="empty-icon">
//                 <Search size={28} color="#34d399" />
//               </div>
//               <div className="empty-title">No listings found</div>
//               <p className="empty-sub">Try adjusting your filters or search for a different area.</p>
//             </div>
//           )}
//         </div>

//       </div>
//     </>
//   );
// }

// export default HomePage;

// import React, { useState, useEffect, useContext } from 'react';
// import api from '../utils/api';
// import PropertyCard from '../components/PropertyCard';
// import MapView from '../components/MapView';
// import Alert from '../components/Alert';
// import {
//   Search, MapPin, Home, Users, CheckCircle, SlidersHorizontal,
//   X, Sparkles, LayoutGrid, Map, IndianRupee, ArrowUpDown,
//   TrendingUp, TrendingDown, Star
// } from 'lucide-react';
// import AuthContext from '../context/AuthContext';

// const PRICE_MAX = 50000;

// function HomePage() {
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [viewMode, setViewMode] = useState('grid');

//   const { user } = useContext(AuthContext);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [priceRange, setPriceRange] = useState({ min: 0, max: PRICE_MAX });
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [selectedPropertyType, setSelectedPropertyType] = useState('');
//   const [selectedGenderPref, setSelectedGenderPref] = useState('');
//   const [availabilityFilter, setAvailabilityFilter] = useState('');
//   const [sortBy, setSortBy] = useState('newest'); // newest | price_asc | price_desc | rating

//   useEffect(() => { fetchProperties(); }, []);

//   const fetchProperties = async () => {
//     setLoading(true); setError('');
//     try {
//       const response = await api.get('/api/properties');
//       const filtered = response.data.filter(p => {
//         if (!user) return true;
//         return p.ownerId !== user.id;
//       });
//       setProperties(filtered);
//       setFilteredProperties(filtered);
//     } catch { setError('Failed to load properties.'); }
//     finally { setLoading(false); }
//   };

//   const applyFilters = (search, price, location, type, gender, availability, sort) => {
//     let filtered = [...properties];
//     if (search) filtered = filtered.filter(p =>
//       p.title?.toLowerCase().includes(search) ||
//       p.description?.toLowerCase().includes(search) ||
//       (p.location||p.city||'').toLowerCase().includes(search) ||
//       (p.area||'').toLowerCase().includes(search)
//     );
//     if (location) filtered = filtered.filter(p => (p.city||p.location) === location);
//     if (type) filtered = filtered.filter(p => p.propertyType === type);
//     if (gender) filtered = filtered.filter(p => (p.genderPreference||'Any') === gender);
//     if (availability) {
//       if (availability === 'available') filtered = filtered.filter(p => p.availabilityStatus === 'available');
//       else filtered = filtered.filter(p => p.availabilityStatus === 'not_available');
//     }
//     filtered = filtered.filter(p => p.price >= price.min && p.price <= (price.max >= PRICE_MAX ? Infinity : price.max));

//     // Sort
//     if (sort === 'price_asc') filtered.sort((a,b) => (a.price||0) - (b.price||0));
//     else if (sort === 'price_desc') filtered.sort((a,b) => (b.price||0) - (a.price||0));
//     else if (sort === 'rating') filtered.sort((a,b) => (b.avgRating||0) - (a.avgRating||0));
//     // newest = default API order

//     setFilteredProperties(filtered);
//   };

//   const handleSearch = (e) => {
//     const val = e.target.value.toLowerCase(); setSearchQuery(val);
//     applyFilters(val, priceRange, selectedLocation, selectedPropertyType, selectedGenderPref, availabilityFilter, sortBy);
//   };
//   const handleLocationChange = (e) => {
//     const val = e.target.value; setSelectedLocation(val);
//     applyFilters(searchQuery, priceRange, val, selectedPropertyType, selectedGenderPref, availabilityFilter, sortBy);
//   };
//   const handlePropertyTypeChange = (e) => {
//     const val = e.target.value; setSelectedPropertyType(val);
//     applyFilters(searchQuery, priceRange, selectedLocation, val, selectedGenderPref, availabilityFilter, sortBy);
//   };
//   const handleGenderPrefChange = (e) => {
//     const val = e.target.value; setSelectedGenderPref(val);
//     applyFilters(searchQuery, priceRange, selectedLocation, selectedPropertyType, val, availabilityFilter, sortBy);
//   };
//   const handleAvailabilityChange = (e) => {
//     const val = e.target.value; setAvailabilityFilter(val);
//     applyFilters(searchQuery, priceRange, selectedLocation, selectedPropertyType, selectedGenderPref, val, sortBy);
//   };
//   const handlePriceChange = (type, value) => {
//     const newRange = { ...priceRange, [type]: Number(value) };
//     setPriceRange(newRange);
//     applyFilters(searchQuery, newRange, selectedLocation, selectedPropertyType, selectedGenderPref, availabilityFilter, sortBy);
//   };
//   const handleSortChange = (val) => {
//     setSortBy(val);
//     applyFilters(searchQuery, priceRange, selectedLocation, selectedPropertyType, selectedGenderPref, availabilityFilter, val);
//   };

//   const clearAllFilters = () => {
//     setSearchQuery(''); setPriceRange({min:0,max:PRICE_MAX});
//     setSelectedLocation(''); setSelectedPropertyType('');
//     setSelectedGenderPref(''); setAvailabilityFilter(''); setSortBy('newest');
//     setFilteredProperties(properties);
//     setShowFilters(false);
//   };

//   const uniqueLocations = [...new Set(properties.map(p => p.city||p.location))].filter(Boolean);
//   const activeFilterCount = [selectedLocation, selectedPropertyType, selectedGenderPref, availabilityFilter,
//     priceRange.min > 0 ? 'min' : '', priceRange.max < PRICE_MAX ? 'max' : ''
//   ].filter(Boolean).length;

//   const formatPrice = (v) => v >= PRICE_MAX ? '50k+' : `₹${(v/1000).toFixed(0)}k`;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
//         *{box-sizing:border-box;}

//         .hm-root{font-family:'DM Sans',sans-serif;min-height:100vh;background:#f0faf4;color:#0f2d1a;}

//         /* Hero */
//         .hm-hero{background:linear-gradient(160deg,#064e3b 0%,#065f46 55%,#047857 100%);padding:60px 24px 80px;position:relative;overflow:hidden;}
//         .hm-hero::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px);background-size:40px 40px;pointer-events:none;}
//         .hm-hero-blob{position:absolute;width:520px;height:520px;background:radial-gradient(circle,rgba(110,231,183,0.18),transparent 65%);top:-100px;right:-80px;pointer-events:none;border-radius:50%;}
//         .hm-hero-blob2{position:absolute;width:300px;height:300px;background:radial-gradient(circle,rgba(52,211,153,0.12),transparent 65%);bottom:-60px;left:8%;pointer-events:none;border-radius:50%;}
//         .hm-hero-inner{position:relative;z-index:2;max-width:680px;margin:0 auto;text-align:center;}

//         .hm-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:100px;padding:5px 14px;font-size:0.75rem;font-weight:600;color:#a7f3d0;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:20px;animation:hmFadeUp 0.5s ease both;}
//         .hm-title{font-family:'Syne',sans-serif;font-size:clamp(2rem,5vw,3.2rem);font-weight:800;line-height:1.12;letter-spacing:-1.5px;color:#fff;margin-bottom:14px;animation:hmFadeUp 0.5s 0.08s ease both;}
//         .hm-title em{font-style:normal;background:linear-gradient(90deg,#6ee7b7,#34d399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
//         .hm-sub{color:#a7f3d0;font-size:1rem;max-width:460px;margin:0 auto 32px;line-height:1.65;animation:hmFadeUp 0.5s 0.16s ease both;}
//         @keyframes hmFadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

//         /* Search */
//         .hm-search-wrap{position:relative;max-width:600px;margin:0 auto;animation:hmFadeUp 0.5s 0.24s ease both;}
//         .hm-search-icon{position:absolute;left:18px;top:50%;transform:translateY(-50%);color:#9ca3af;pointer-events:none;}
//         .hm-search-input{width:100%;background:#fff;border:2px solid transparent;border-radius:18px;padding:17px 20px 17px 52px;font-size:0.97rem;font-family:'DM Sans',sans-serif;color:#0f2d1a;outline:none;transition:all 0.2s;box-shadow:0 8px 32px rgba(0,0,0,0.18);}
//         .hm-search-input::placeholder{color:#9ca3af;}
//         .hm-search-input:focus{border-color:#34d399;box-shadow:0 8px 32px rgba(0,0,0,0.18),0 0 0 4px rgba(52,211,153,0.18);}
//         .hm-search-clear{position:absolute;right:16px;top:50%;transform:translateY(-50%);background:none;border:none;color:#9ca3af;cursor:pointer;padding:4px;transition:color 0.18s;}
//         .hm-search-clear:hover{color:#374151;}

//         /* Stats */
//         .hm-stats{display:flex;justify-content:center;gap:0;margin-top:40px;animation:hmFadeUp 0.5s 0.32s ease both;flex-wrap:wrap;}
//         .hm-stat{text-align:center;padding:0 28px;border-right:1px solid rgba(255,255,255,0.15);}
//         .hm-stat:last-child{border-right:none;}
//         .hm-stat-num{font-family:'Syne',sans-serif;font-size:1.65rem;font-weight:800;color:#fff;}
//         .hm-stat-label{font-size:0.74rem;color:#6ee7b7;font-weight:500;margin-top:2px;text-transform:uppercase;letter-spacing:0.4px;}

//         /* Body */
//         .hm-body{max-width:1280px;margin:0 auto;padding:36px 24px 60px;}

//         /* Toolbar */
//         .hm-toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px;}
//         .hm-toolbar-left{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
//         .hm-section-title{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;color:#0f2d1a;letter-spacing:-0.4px;}
//         .hm-section-title span{color:#059669;}
//         .hm-result-count{font-size:0.85rem;color:#9ca3af;font-weight:400;}

//         /* View toggle */
//         .hm-view-toggle{display:inline-flex;background:#fff;border:1.5px solid #d1fae5;border-radius:12px;overflow:hidden;box-shadow:0 2px 6px rgba(5,150,105,0.07);}
//         .hm-view-btn{display:flex;align-items:center;gap:5px;padding:8px 16px;font-size:0.82rem;font-weight:600;color:#6b7280;cursor:pointer;background:transparent;border:none;transition:all 0.18s;font-family:'DM Sans',sans-serif;}
//         .hm-view-btn:first-child{border-right:1px solid #d1fae5;}
//         .hm-view-btn.hm-view-active{background:#ecfdf5;color:#059669;}

//         /* Sort */
//         .hm-sort-select{background:#fff;border:1.5px solid #d1fae5;border-radius:12px;padding:8px 32px 8px 12px;font-size:0.82rem;font-weight:600;color:#374151;cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;font-family:'DM Sans',sans-serif;outline:none;transition:all 0.18s;box-shadow:0 2px 6px rgba(5,150,105,0.07);}
//         .hm-sort-select:focus{border-color:#34d399;}

//         /* Filter button */
//         .hm-filter-btn{display:flex;align-items:center;gap:7px;background:#fff;border:1.5px solid #d1fae5;border-radius:12px;padding:8px 16px;font-size:0.855rem;font-weight:600;color:#059669;cursor:pointer;transition:all 0.18s;font-family:'DM Sans',sans-serif;box-shadow:0 2px 6px rgba(5,150,105,0.07);}
//         .hm-filter-btn:hover{background:#ecfdf5;border-color:#34d399;}
//         .hm-filter-count{background:#059669;color:#fff;border-radius:100px;font-size:0.7rem;font-weight:800;padding:1px 7px;}

//         /* Filter panel */
//         .hm-filter-panel{background:#fff;border:1.5px solid #d1fae5;border-radius:20px;padding:22px 24px;margin-bottom:24px;box-shadow:0 4px 20px rgba(5,150,105,0.08);animation:hmSlide 0.22s ease;}
//         @keyframes hmSlide{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
//         .hm-filter-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;}
//         .hm-filter-field{display:flex;flex-direction:column;gap:5px;}
//         .hm-filter-label{font-size:0.72rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.4px;}
//         .hm-select{width:100%;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:10px;padding:9px 30px 9px 11px;font-size:0.875rem;font-family:'DM Sans',sans-serif;color:#374151;outline:none;cursor:pointer;transition:all 0.18s;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;}
//         .hm-select:focus{border-color:#34d399;background-color:#f0fdf4;box-shadow:0 0 0 3px rgba(52,211,153,0.12);color:#0f2d1a;}

//         /* Price range */
//         .hm-price-range{grid-column:1/-1;}
//         .hm-price-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
//         .hm-price-label-text{font-size:0.72rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.4px;}
//         .hm-price-values{display:flex;align-items:center;gap:6px;font-size:0.82rem;font-weight:700;color:#059669;}
//         .hm-price-sep{color:#9ca3af;font-weight:400;}
//         .hm-range-wrap{position:relative;height:28px;display:flex;align-items:center;}
//         .hm-range-track{position:absolute;left:0;right:0;height:4px;background:#e5e7eb;border-radius:100px;}
//         .hm-range-fill{position:absolute;height:4px;background:linear-gradient(90deg,#34d399,#059669);border-radius:100px;}
//         .hm-range-input{position:absolute;width:100%;height:4px;background:transparent;-webkit-appearance:none;appearance:none;pointer-events:none;outline:none;}
//         .hm-range-input::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:18px;height:18px;border-radius:50%;background:#059669;border:2px solid #fff;box-shadow:0 2px 6px rgba(5,150,105,0.4);cursor:pointer;pointer-events:all;transition:transform 0.18s;}
//         .hm-range-input::-webkit-slider-thumb:hover{transform:scale(1.15);}
//         .hm-range-input::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#059669;border:2px solid #fff;box-shadow:0 2px 6px rgba(5,150,105,0.4);cursor:pointer;pointer-events:all;}

//         /* Filter actions */
//         .hm-filter-actions{display:flex;align-items:center;justify-content:space-between;margin-top:18px;padding-top:14px;border-top:1px solid #f0fdf4;}
//         .hm-clear-btn{font-size:0.82rem;font-weight:600;color:#9ca3af;background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;transition:color 0.18s;}
//         .hm-clear-btn:hover{color:#ef4444;}
//         .hm-apply-count{font-size:0.82rem;color:#6b7280;}
//         .hm-apply-count strong{color:#059669;font-weight:700;}

//         /* Active chips */
//         .hm-chips{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:18px;}
//         .hm-chip{display:inline-flex;align-items:center;gap:5px;background:#d1fae5;border:1px solid #6ee7b7;border-radius:100px;padding:4px 11px;font-size:0.77rem;font-weight:600;color:#065f46;}
//         .hm-chip-remove{background:none;border:none;cursor:pointer;color:#6ee7b7;padding:0;margin-left:2px;display:flex;align-items:center;transition:color 0.15s;}
//         .hm-chip-remove:hover{color:#059669;}

//         /* Grid */
//         .hm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px;}

//         /* Loading */
//         .hm-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 0;gap:16px;}
//         .hm-spinner{width:42px;height:42px;border:3px solid #d1fae5;border-top-color:#059669;border-radius:50%;animation:hmSpin 0.75s linear infinite;}
//         @keyframes hmSpin{to{transform:rotate(360deg);}}

//         /* Empty */
//         .hm-empty{text-align:center;padding:80px 24px;}
//         .hm-empty-icon{width:72px;height:72px;background:#ecfdf5;border:2px solid #d1fae5;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;}
//         .hm-empty-title{font-family:'Syne',sans-serif;font-size:1.25rem;font-weight:800;color:#0f2d1a;margin-bottom:8px;}
//         .hm-empty-sub{color:#6b7280;font-size:0.9rem;margin-bottom:18px;}
//         .hm-empty-clear{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1.5px solid #d1fae5;border-radius:11px;padding:9px 18px;font-size:0.875rem;font-weight:600;color:#059669;cursor:pointer;transition:all 0.18s;font-family:'DM Sans',sans-serif;}
//         .hm-empty-clear:hover{background:#ecfdf5;}
//       `}</style>

//       <div className="hm-root">

//         {/* Hero */}
//         <div className="hm-hero">
//           <div className="hm-hero-blob"/>
//           <div className="hm-hero-blob2"/>
//           <div className="hm-hero-inner">
//             <div className="hm-badge"><Sparkles size={11}/> For Students &amp; Freshers</div>
//             <h1 className="hm-title">Find Your Perfect<br/><em>PG, Flat &amp; Room</em></h1>
//             <p className="hm-sub">Verified listings, zero broker fees, transparent pricing — move in stress-free.</p>

//             <div className="hm-search-wrap">
//               <Search size={18} className="hm-search-icon"/>
//               <input
//                 placeholder="Search by city, area, or property name…"
//                 value={searchQuery} onChange={handleSearch}
//                 className="hm-search-input"
//               />
//               {searchQuery && (
//                 <button className="hm-search-clear" onClick={() => { setSearchQuery(''); applyFilters('', priceRange, selectedLocation, selectedPropertyType, selectedGenderPref, availabilityFilter, sortBy); }}>
//                   <X size={16}/>
//                 </button>
//               )}
//             </div>

//             <div className="hm-stats">
//               <div className="hm-stat"><div className="hm-stat-num">{properties.length}+</div><div className="hm-stat-label">Listings</div></div>
//               <div className="hm-stat"><div className="hm-stat-num">{uniqueLocations.length}</div><div className="hm-stat-label">Cities</div></div>
//               <div className="hm-stat"><div className="hm-stat-num">₹0</div><div className="hm-stat-label">Broker Fee</div></div>
//               <div className="hm-stat"><div className="hm-stat-num">100%</div><div className="hm-stat-label">Verified</div></div>
//             </div>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="hm-body">
//           {error && <Alert type="error" message={error} onClose={() => setError('')}/>}

//           {/* Toolbar */}
//           <div className="hm-toolbar">
//             <div className="hm-toolbar-left">
//               <div className="hm-section-title">
//                 Latest <span>Listings</span>
//                 <span className="hm-result-count"> ({filteredProperties.length} found)</span>
//               </div>

//               {/* Grid/Map toggle */}
//               <div className="hm-view-toggle">
//                 <button className={`hm-view-btn ${viewMode==='grid'?'hm-view-active':''}`} onClick={() => setViewMode('grid')}>
//                   <LayoutGrid size={14}/> Grid
//                 </button>
//                 <button className={`hm-view-btn ${viewMode==='map'?'hm-view-active':''}`} onClick={() => setViewMode('map')}>
//                   <Map size={14}/> Map
//                 </button>
//               </div>

//               {/* Sort */}
//               <select className="hm-sort-select" value={sortBy} onChange={e => handleSortChange(e.target.value)}>
//                 <option value="newest">✦ Newest first</option>
//                 <option value="price_asc">↑ Price: Low to High</option>
//                 <option value="price_desc">↓ Price: High to Low</option>
//                 <option value="rating">⭐ Top Rated</option>
//               </select>
//             </div>

//             <button className="hm-filter-btn" onClick={() => setShowFilters(!showFilters)}>
//               <SlidersHorizontal size={15}/>
//               Filters
//               {activeFilterCount > 0 && <span className="hm-filter-count">{activeFilterCount}</span>}
//               {showFilters && <X size={13}/>}
//             </button>
//           </div>

//           {/* Active filter chips */}
//           {activeFilterCount > 0 && (
//             <div className="hm-chips">
//               {selectedLocation && (
//                 <span className="hm-chip">
//                   <MapPin size={11}/>{selectedLocation}
//                   <button className="hm-chip-remove" onClick={() => handleLocationChange({target:{value:''}})}>×</button>
//                 </span>
//               )}
//               {selectedPropertyType && (
//                 <span className="hm-chip">
//                   <Home size={11}/>{selectedPropertyType}
//                   <button className="hm-chip-remove" onClick={() => handlePropertyTypeChange({target:{value:''}})}>×</button>
//                 </span>
//               )}
//               {selectedGenderPref && (
//                 <span className="hm-chip">
//                   <Users size={11}/>{selectedGenderPref}
//                   <button className="hm-chip-remove" onClick={() => handleGenderPrefChange({target:{value:''}})}>×</button>
//                 </span>
//               )}
//               {availabilityFilter && (
//                 <span className="hm-chip">
//                   <CheckCircle size={11}/>{availabilityFilter==='available'?'Available':'Not Available'}
//                   <button className="hm-chip-remove" onClick={() => handleAvailabilityChange({target:{value:''}})}>×</button>
//                 </span>
//               )}
//               {(priceRange.min > 0 || priceRange.max < PRICE_MAX) && (
//                 <span className="hm-chip">
//                   <IndianRupee size={11}/>{formatPrice(priceRange.min)} – {formatPrice(priceRange.max)}
//                   <button className="hm-chip-remove" onClick={() => { setPriceRange({min:0,max:PRICE_MAX}); applyFilters(searchQuery,{min:0,max:PRICE_MAX},selectedLocation,selectedPropertyType,selectedGenderPref,availabilityFilter,sortBy); }}>×</button>
//                 </span>
//               )}
//             </div>
//           )}

//           {/* Filter panel */}
//           {showFilters && (
//             <div className="hm-filter-panel">
//               <div className="hm-filter-grid">

//                 <div className="hm-filter-field">
//                   <label className="hm-filter-label">📍 Location</label>
//                   <select value={selectedLocation} onChange={handleLocationChange} className="hm-select">
//                     <option value="">All Locations</option>
//                     {uniqueLocations.map(l => <option key={l} value={l}>{l}</option>)}
//                   </select>
//                 </div>

//                 <div className="hm-filter-field">
//                   <label className="hm-filter-label">🏠 Property Type</label>
//                   <select value={selectedPropertyType} onChange={handlePropertyTypeChange} className="hm-select">
//                     <option value="">Any Type</option>
//                     <option>PG</option><option>Flat</option><option>Apartment</option>
//                   </select>
//                 </div>

//                 <div className="hm-filter-field">
//                   <label className="hm-filter-label">👥 Gender</label>
//                   <select value={selectedGenderPref} onChange={handleGenderPrefChange} className="hm-select">
//                     <option value="">Any Gender</option>
//                     <option>Boys</option><option>Girls</option><option>Any</option>
//                   </select>
//                 </div>

//                 <div className="hm-filter-field">
//                   <label className="hm-filter-label">✅ Availability</label>
//                   <select value={availabilityFilter} onChange={handleAvailabilityChange} className="hm-select">
//                     <option value="">All Status</option>
//                     <option value="available">Available Now</option>
//                     <option value="not_available">Not Available</option>
//                   </select>
//                 </div>

//                 {/* ── PRICE RANGE ── */}
//                 <div className="hm-filter-field hm-price-range">
//                   <div className="hm-price-header">
//                     <span className="hm-price-label-text">💰 Price Range</span>
//                     <span className="hm-price-values">
//                       {formatPrice(priceRange.min)}
//                       <span className="hm-price-sep">–</span>
//                       {formatPrice(priceRange.max)}
//                       <span style={{color:'#9ca3af',fontWeight:400}}>/mo</span>
//                     </span>
//                   </div>
//                   <div className="hm-range-wrap">
//                     <div className="hm-range-track"/>
//                     <div className="hm-range-fill" style={{
//                       left: `${(priceRange.min/PRICE_MAX)*100}%`,
//                       right: `${100-(priceRange.max/PRICE_MAX)*100}%`
//                     }}/>
//                     {/* Min slider */}
//                     <input type="range" className="hm-range-input"
//                       min={0} max={PRICE_MAX} step={1000}
//                       value={priceRange.min}
//                       onChange={e => {
//                         const v = Math.min(Number(e.target.value), priceRange.max - 1000);
//                         handlePriceChange('min', v);
//                       }}
//                       style={{zIndex: priceRange.min > PRICE_MAX*0.9 ? 5 : 3}}
//                     />
//                     {/* Max slider */}
//                     <input type="range" className="hm-range-input"
//                       min={0} max={PRICE_MAX} step={1000}
//                       value={priceRange.max}
//                       onChange={e => {
//                         const v = Math.max(Number(e.target.value), priceRange.min + 1000);
//                         handlePriceChange('max', v);
//                       }}
//                       style={{zIndex: 4}}
//                     />
//                   </div>
//                 </div>

//               </div>

//               <div className="hm-filter-actions">
//                 <button className="hm-clear-btn" onClick={clearAllFilters}>
//                   <X size={13}/> Clear all filters
//                 </button>
//                 <span className="hm-apply-count">
//                   <strong>{filteredProperties.length}</strong> propert{filteredProperties.length!==1?'ies':'y'} match
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* Listings */}
//           {loading ? (
//             <div className="hm-loading">
//               <div className="hm-spinner"/>
//               <span style={{color:'#6b7280',fontSize:'0.9rem'}}>Finding great places for you…</span>
//             </div>
//           ) : filteredProperties.length ? (
//             viewMode === 'grid' ? (
//               <div className="hm-grid">
//                 {filteredProperties.map(p => <PropertyCard key={p._id} property={p}/>)}
//               </div>
//             ) : (
//               <MapView properties={filteredProperties}/>
//             )
//           ) : (
//             <div className="hm-empty">
//               <div className="hm-empty-icon"><Search size={28} color="#059669"/></div>
//               <div className="hm-empty-title">No listings found</div>
//               <p className="hm-empty-sub">Try adjusting your filters or searching a different area.</p>
//               {activeFilterCount > 0 && (
//                 <button className="hm-empty-clear" onClick={clearAllFilters}>
//                   <X size={14}/> Clear all filters
//                 </button>
//               )}
//             </div>
//           )}

//         </div>
//       </div>
//     </>
//   );
// }

// export default HomePage;

// src/pages/Home.jsx
// Seeker  → Browse/search all listings with filters & map toggle
// Owner   → Personal dashboard: stats cards, their own listings, quick actions
// Admin   → Platform overview: all listings + platform stats
// Guest   → Browse all listings with CTA to register

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import PropertyCard from '../components/PropertyCard';
import MapView from '../components/MapView';
import Alert from '../components/Alert';
import AuthContext from '../context/AuthContext';
import {
  Search, MapPin, Home, Users, CheckCircle, SlidersHorizontal,
  X, Sparkles, LayoutGrid, Map, IndianRupee, Plus, Eye,
  TrendingUp, Star, Building2, Clock, ArrowRight, ShieldCheck,
  MessageSquare, Calendar
} from 'lucide-react';
import Pagination from '../components/Pagination';
import SkeletonCard from '../components/SkeletonCard';
import useScrollRestoration from '../hooks/useScrollRestoration';

const PRICE_MAX = 50000;

// ══════════════════════════════════════════════════════════
// SEEKER + GUEST + ADMIN home (browse view)
// ══════════════════════════════════════════════════════════
function BrowseHome({ user }) {
  useScrollRestoration('home');
  const ITEMS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [properties,         setProperties]         = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading,            setLoading]            = useState(true);
  const [error,              setError]              = useState('');
  const [showFilters,        setShowFilters]        = useState(false);
  const [viewMode,           setViewMode]           = useState('grid');

  const [searchQuery,          setSearchQuery]          = useState('');
  const [priceRange,           setPriceRange]           = useState({ min:0, max:PRICE_MAX });
  const [selectedLocation,     setSelectedLocation]     = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [selectedGenderPref,   setSelectedGenderPref]   = useState('');
  const [availabilityFilter,   setAvailabilityFilter]   = useState('');
  const [sortBy,               setSortBy]               = useState('newest');

  useEffect(() => { fetchProperties(); }, []);

  const fetchProperties = async () => {
    setLoading(true); setError('');
    try {
      const res  = await api.get('/api/properties');
      const all  = res.data.filter(p => !user || p.ownerId !== user.id);
      setProperties(all);
      setFilteredProperties(all);
    } catch { setError('Failed to load properties.'); }
    finally { setLoading(false); }
  };

  const applyFilters = (search, price, loc, type, gender, avail, sort) => {
    let f = [...properties];
    if (search) f = f.filter(p =>
      p.title?.toLowerCase().includes(search) ||
      p.description?.toLowerCase().includes(search) ||
      (p.location||p.city||'').toLowerCase().includes(search) ||
      (p.area||'').toLowerCase().includes(search)
    );
    if (loc)    f = f.filter(p => (p.city||p.location) === loc);
    if (type)   f = f.filter(p => p.propertyType === type);
    if (gender) f = f.filter(p => (p.genderPreference||'Any') === gender);
    if (avail)  f = f.filter(p => avail==='available' ? p.availabilityStatus==='available' : p.availabilityStatus==='not_available');
    f = f.filter(p => p.price >= price.min && p.price <= (price.max >= PRICE_MAX ? Infinity : price.max));
    if (sort==='price_asc')  f.sort((a,b)=>(a.price||0)-(b.price||0));
    if (sort==='price_desc') f.sort((a,b)=>(b.price||0)-(a.price||0));
    if (sort==='rating')     f.sort((a,b)=>(b.avgRating||0)-(a.avgRating||0));
    setFilteredProperties(f);
    setCurrentPage(1);
  };

  const hs = e => { const v=e.target.value.toLowerCase(); setSearchQuery(v); applyFilters(v,priceRange,selectedLocation,selectedPropertyType,selectedGenderPref,availabilityFilter,sortBy); };
  const hl = e => { const v=e.target.value; setSelectedLocation(v); applyFilters(searchQuery,priceRange,v,selectedPropertyType,selectedGenderPref,availabilityFilter,sortBy); };
  const ht = e => { const v=e.target.value; setSelectedPropertyType(v); applyFilters(searchQuery,priceRange,selectedLocation,v,selectedGenderPref,availabilityFilter,sortBy); };
  const hg = e => { const v=e.target.value; setSelectedGenderPref(v); applyFilters(searchQuery,priceRange,selectedLocation,selectedPropertyType,v,availabilityFilter,sortBy); };
  const ha = e => { const v=e.target.value; setAvailabilityFilter(v); applyFilters(searchQuery,priceRange,selectedLocation,selectedPropertyType,selectedGenderPref,v,sortBy); };
  const hp = (t,v) => { const r={...priceRange,[t]:Number(v)}; setPriceRange(r); applyFilters(searchQuery,r,selectedLocation,selectedPropertyType,selectedGenderPref,availabilityFilter,sortBy); };
  const hs2 = v => { setSortBy(v); applyFilters(searchQuery,priceRange,selectedLocation,selectedPropertyType,selectedGenderPref,availabilityFilter,v); };
  const clearAll = () => { setSearchQuery(''); setPriceRange({min:0,max:PRICE_MAX}); setSelectedLocation(''); setSelectedPropertyType(''); setSelectedGenderPref(''); setAvailabilityFilter(''); setSortBy('newest'); setFilteredProperties(properties); setShowFilters(false);setCurrentPage(1); };

  const uniqueLocations = [...new Set(properties.map(p=>p.city||p.location))].filter(Boolean);
  const activeCount = [selectedLocation,selectedPropertyType,selectedGenderPref,availabilityFilter,priceRange.min>0?'min':'',priceRange.max<PRICE_MAX?'max':''].filter(Boolean).length;
  const fp = v => v>=PRICE_MAX ? '50k+' : `₹${(v/1000).toFixed(0)}k`;

  const isAdmin = user?.role === 'admin';
  const heroTitle = isAdmin ? <>Platform <em>Overview</em></> : user ? <>Find Your Perfect<br/><em>PG, Flat &amp; Room</em></> : <>Your Home<br/><em>Awaits</em></>;
  const heroSub = isAdmin ? 'All listings on the platform. Manage, verify and monitor from here.' : 'Verified listings, zero broker fees, transparent pricing — move in stress-free.';
  const badge = isAdmin ? '🛡️ Admin Panel' : '🔍 For Students & Freshers';

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
const paginatedProperties = filteredProperties.slice(
(currentPage - 1) * ITEMS_PER_PAGE,
currentPage * ITEMS_PER_PAGE
);

  return (
    <div className="hm-root">
      {/* Hero */}
      <div className="hm-hero">
        <div className="hm-blob1"/><div className="hm-blob2"/>
        <div className="hm-hero-inner">
          <div className="hm-badge">{badge}</div>
          <h1 className="hm-title">{heroTitle}</h1>
          <p className="hm-sub">{heroSub}</p>

          <div className="hm-search-wrap">
            <Search size={18} className="hm-search-ico"/>
            <input value={searchQuery} onChange={hs} placeholder="Search city, area or property name…" className="hm-search-input"/>
            {searchQuery && <button className="hm-search-clear" onClick={()=>{setSearchQuery('');applyFilters('',priceRange,selectedLocation,selectedPropertyType,selectedGenderPref,availabilityFilter,sortBy);}}><X size={15}/></button>}
          </div>

          <div className="hm-stats">
            {isAdmin ? (
              <>
                <div className="hm-stat"><div className="hm-stat-n">{properties.length}</div><div className="hm-stat-l">Total Listings</div></div>
                <div className="hm-stat"><div className="hm-stat-n">{properties.filter(p=>p.availabilityStatus==='available').length}</div><div className="hm-stat-l">Available</div></div>
                <div className="hm-stat"><div className="hm-stat-n">{uniqueLocations.length}</div><div className="hm-stat-l">Cities</div></div>
                <div className="hm-stat"><div className="hm-stat-n">{properties.filter(p=>p.verified).length}</div><div className="hm-stat-l">Verified</div></div>
              </>
            ) : (
              <>
                <div className="hm-stat"><div className="hm-stat-n">{properties.length}+</div><div className="hm-stat-l">Listings</div></div>
                <div className="hm-stat"><div className="hm-stat-n">{uniqueLocations.length}</div><div className="hm-stat-l">Cities</div></div>
                <div className="hm-stat"><div className="hm-stat-n">₹0</div><div className="hm-stat-l">Broker Fee</div></div>
                <div className="hm-stat"><div className="hm-stat-n">100%</div><div className="hm-stat-l">Verified</div></div>
              </>
            )}
          </div>

          {/* Guest CTA */}
          {!user && (
            <div style={{display:'flex',gap:10,justifyContent:'center',marginTop:20,animation:'hmFadeUp .5s .4s ease both'}}>
              <Link to="/register" style={{display:'flex',alignItems:'center',gap:6,background:'linear-gradient(135deg,#6ee7b7,#34d399)',color:'#064e3b',padding:'10px 22px',borderRadius:12,fontWeight:700,fontSize:'0.9rem',textDecoration:'none',boxShadow:'0 4px 14px rgba(52,211,153,0.35)',fontFamily:"'DM Sans',sans-serif"}}>
                <Sparkles size={15}/> Get Started Free
              </Link>
              <Link to="/login" style={{display:'flex',alignItems:'center',gap:6,background:'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.2)',color:'#d1fae5',padding:'10px 18px',borderRadius:12,fontWeight:600,fontSize:'0.9rem',textDecoration:'none',fontFamily:"'DM Sans',sans-serif"}}>
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="hm-body">
        {error && <Alert type="error" message={error} onClose={() => setError('')}/>}

        {/* Toolbar */}
        <div className="hm-toolbar">
          <div className="hm-toolbar-left">
            <div className="hm-section-title">Latest <span>Listings</span> <span className="hm-result-count">({filteredProperties.length} found)</span></div>
            <div className="hm-view-toggle">
              <button className={`hm-view-btn ${viewMode==='grid'?'act':''}`} onClick={()=>setViewMode('grid')}><LayoutGrid size={14}/> Grid</button>
              <button className={`hm-view-btn ${viewMode==='map'?'act':''}`} onClick={()=>setViewMode('map')}><Map size={14}/> Map</button>
            </div>
            <select className="hm-sort" value={sortBy} onChange={e=>hs2(e.target.value)}>
              <option value="newest">✦ Newest</option>
              <option value="price_asc">↑ Price Low→High</option>
              <option value="price_desc">↓ Price High→Low</option>
              <option value="rating">⭐ Top Rated</option>
            </select>
          </div>
          <button className="hm-filter-btn" onClick={()=>setShowFilters(!showFilters)}>
            <SlidersHorizontal size={14}/> Filters
            {activeCount>0 && <span className="hm-filter-count">{activeCount}</span>}
            {showFilters && <X size={12}/>}
          </button>
        </div>

        {/* Active chips */}
        {activeCount>0 && (
          <div className="hm-chips">
            {selectedLocation && <span className="hm-chip"><MapPin size={10}/>{selectedLocation}<button className="hm-chip-rm" onClick={()=>hl({target:{value:''}})}>×</button></span>}
            {selectedPropertyType && <span className="hm-chip"><Home size={10}/>{selectedPropertyType}<button className="hm-chip-rm" onClick={()=>ht({target:{value:''}})}>×</button></span>}
            {selectedGenderPref && <span className="hm-chip"><Users size={10}/>{selectedGenderPref}<button className="hm-chip-rm" onClick={()=>hg({target:{value:''}})}>×</button></span>}
            {availabilityFilter && <span className="hm-chip"><CheckCircle size={10}/>{availabilityFilter==='available'?'Available':'Not Available'}<button className="hm-chip-rm" onClick={()=>ha({target:{value:''}})}>×</button></span>}
            {(priceRange.min>0||priceRange.max<PRICE_MAX) && <span className="hm-chip"><IndianRupee size={10}/>{fp(priceRange.min)}–{fp(priceRange.max)}<button className="hm-chip-rm" onClick={()=>{setPriceRange({min:0,max:PRICE_MAX});applyFilters(searchQuery,{min:0,max:PRICE_MAX},selectedLocation,selectedPropertyType,selectedGenderPref,availabilityFilter,sortBy);}}>×</button></span>}
          </div>
        )}

        {/* Filter panel */}
        {showFilters && (
          <div className="hm-filter-panel">
            <div className="hm-filter-grid">
              <div className="hm-ff"><label className="hm-fl">📍 Location</label><select value={selectedLocation} onChange={hl} className="hm-sel"><option value="">All</option>{uniqueLocations.map(l=><option key={l} value={l}>{l}</option>)}</select></div>
              <div className="hm-ff"><label className="hm-fl">🏠 Type</label><select value={selectedPropertyType} onChange={ht} className="hm-sel"><option value="">Any</option><option>PG</option><option>Flat</option><option>Apartment</option></select></div>
              <div className="hm-ff"><label className="hm-fl">👥 Gender</label><select value={selectedGenderPref} onChange={hg} className="hm-sel"><option value="">Any</option><option>Boys</option><option>Girls</option><option>Any</option></select></div>
              <div className="hm-ff"><label className="hm-fl">✅ Status</label><select value={availabilityFilter} onChange={ha} className="hm-sel"><option value="">All</option><option value="available">Available</option><option value="not_available">Not Available</option></select></div>
              <div className="hm-ff hm-ff-full">
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                  <label className="hm-fl">💰 Price Range</label>
                  <span style={{fontSize:'0.8rem',fontWeight:700,color:'#059669'}}>{fp(priceRange.min)} – {fp(priceRange.max)}<span style={{color:'#9ca3af',fontWeight:400}}>/mo</span></span>
                </div>
                <div style={{position:'relative',height:28,display:'flex',alignItems:'center'}}>
                  <div style={{position:'absolute',left:0,right:0,height:4,background:'#e5e7eb',borderRadius:100}}/>
                  <div style={{position:'absolute',height:4,background:'linear-gradient(90deg,#34d399,#059669)',borderRadius:100,left:`${(priceRange.min/PRICE_MAX)*100}%`,right:`${100-(priceRange.max/PRICE_MAX)*100}%`}}/>
                  <input type="range" min={0} max={PRICE_MAX} step={1000} value={priceRange.min} onChange={e=>hp('min',Math.min(Number(e.target.value),priceRange.max-1000))} style={{position:'absolute',width:'100%',height:4,background:'transparent',WebkitAppearance:'none',appearance:'none',pointerEvents:'none',zIndex:priceRange.min>PRICE_MAX*.9?5:3}}/>
                  <input type="range" min={0} max={PRICE_MAX} step={1000} value={priceRange.max} onChange={e=>hp('max',Math.max(Number(e.target.value),priceRange.min+1000))} style={{position:'absolute',width:'100%',height:4,background:'transparent',WebkitAppearance:'none',appearance:'none',pointerEvents:'none',zIndex:4}}/>
                </div>
                <style>{`.hm-root input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#059669;border:2px solid #fff;box-shadow:0 2px 6px rgba(5,150,105,.4);cursor:pointer;pointer-events:all;}`}</style>
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:16,paddingTop:14,borderTop:'1px solid #f0fdf4'}}>
              <button onClick={clearAll} style={{fontSize:'0.8rem',fontWeight:600,color:'#9ca3af',background:'none',border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",display:'flex',alignItems:'center',gap:4,transition:'color .18s'}}><X size={12}/> Clear all</button>
              <span style={{fontSize:'0.8rem',color:'#6b7280'}}><strong style={{color:'#059669'}}>{filteredProperties.length}</strong> match</span>
            </div>
          </div>
        )}

        {/* Listings */}
        {loading ? (
          // <div className="hm-loading"><div className="hm-spinner"/><span style={{color:'#6b7280',fontSize:'0.9rem'}}>Finding great places…</span></div>
          <div className="hm-grid">
              {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>

        ) : filteredProperties.length ? (
          viewMode==='grid' ? (
            <div className="hm-grid">{paginatedProperties.map(p=><PropertyCard key={p._id} property={p}/>)}</div>
          ) : (
            <MapView properties={filteredProperties}/>
          )
        ) : (
          <div className="hm-empty">
            <div className="hm-empty-ico"><Search size={26} color="#059669"/></div>
            <div className="hm-empty-title">No listings found</div>
            <p className="hm-empty-sub">Try adjusting your filters or search a different area.</p>
            {activeCount>0 && <button className="hm-empty-clear" onClick={clearAll}><X size={13}/> Clear filters</button>}
          </div>
        )}
        <Pagination
currentPage={currentPage}
totalPages={totalPages}
onPageChange={(page) => {
setCurrentPage(page);
const el = document.querySelector('.hm-toolbar');
if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
else window.scrollTo({ top: 0, behavior: 'smooth' });
}}
/>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// OWNER home — personal dashboard
// ══════════════════════════════════════════════════════════
function OwnerHome({ user }) {
  const navigate = useNavigate();
  const [myProperties, setMyProperties] = useState([]);
  const [propBookings, setPropBookings] = useState({});
  const [loading,      setLoading]      = useState(true);
  const [viewMode,     setViewMode]     = useState('grid');
  const [searchQuery,  setSearchQuery]  = useState('');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const res   = await api.get('/api/properties');
      const mine  = res.data.filter(p => p.ownerId === user.id);
      setMyProperties(mine);
      const map = {};
      for (const p of mine) {
        try { const b = await api.get(`/api/bookings/property/${p._id}`); map[p._id] = b.data; }
        catch { map[p._id] = []; }
      }
      setPropBookings(map);
    } catch {}
    finally { setLoading(false); }
  };

  const allBookings   = Object.values(propBookings).flat();
  const pendingCount  = allBookings.filter(b => !b.status || b.status === 'pending').length;
  const approvedCount = allBookings.filter(b => b.status === 'approved').length;
  const availableCount = myProperties.filter(p => p.availabilityStatus === 'available').length;

  const filtered = myProperties.filter(p =>
    !searchQuery ||
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.city||p.location||'').toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f0faf4'}}>
      <div style={{width:44,height:44,border:'3px solid #d1fae5',borderTopColor:'#059669',borderRadius:'50%',animation:'spin .75s linear infinite'}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );

  return (
    <div className="hm-root">
      {/* Owner hero */}
      <div className="hm-hero">
        <div className="hm-blob1"/><div className="hm-blob2"/>
        <div className="hm-hero-inner">
          <div className="hm-badge">🏠 Owner Dashboard</div>
          <h1 className="hm-title">Welcome back,<br/><em>{user.fullName?.split(' ')[0] || 'Owner'}</em></h1>
          <p className="hm-sub">Manage your listings, track bookings and connect with tenants — all in one place.</p>

          {/* Quick actions */}
          <div style={{display:'flex',gap:10,justifyContent:'center',marginTop:8,flexWrap:'wrap',animation:'hmFadeUp .5s .2s ease both'}}>
            <Link to="/add-property" style={{display:'flex',alignItems:'center',gap:7,background:'linear-gradient(135deg,#6ee7b7,#34d399)',color:'#064e3b',padding:'11px 22px',borderRadius:12,fontWeight:700,fontSize:'0.9rem',textDecoration:'none',boxShadow:'0 4px 14px rgba(52,211,153,0.35)',fontFamily:"'DM Sans',sans-serif"}}>
              <Plus size={16}/> Add New Property
            </Link>
            <Link to="/my-bookings" style={{display:'flex',alignItems:'center',gap:7,background:'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.2)',color:'#d1fae5',padding:'11px 18px',borderRadius:12,fontWeight:600,fontSize:'0.9rem',textDecoration:'none',fontFamily:"'DM Sans',sans-serif"}}>
              <Calendar size={15}/> View All Bookings
            </Link>
            <Link to="/messages" style={{display:'flex',alignItems:'center',gap:7,background:'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.2)',color:'#d1fae5',padding:'11px 18px',borderRadius:12,fontWeight:600,fontSize:'0.9rem',textDecoration:'none',fontFamily:"'DM Sans',sans-serif"}}>
              <MessageSquare size={15}/> Messages
            </Link>
          </div>

          {/* Stats */}
          <div className="hm-stats" style={{marginTop:28}}>
            <div className="hm-stat"><div className="hm-stat-n">{myProperties.length}</div><div className="hm-stat-l">My Listings</div></div>
            <div className="hm-stat"><div className="hm-stat-n">{availableCount}</div><div className="hm-stat-l">Available</div></div>
            <div className="hm-stat"><div className="hm-stat-n" style={{color:pendingCount>0?'#fbbf24':'#fff'}}>{pendingCount}</div><div className="hm-stat-l">Pending Bookings</div></div>
            <div className="hm-stat"><div className="hm-stat-n">{approvedCount}</div><div className="hm-stat-l">Approved</div></div>
          </div>
        </div>
      </div>

      <div className="hm-body">

        {/* Toolbar */}
        <div className="hm-toolbar" style={{marginBottom:20}}>
          <div className="hm-toolbar-left">
            <div className="hm-section-title">My <span>Properties</span> <span className="hm-result-count">({filtered.length})</span></div>
            <div className="hm-view-toggle">
              <button className={`hm-view-btn ${viewMode==='grid'?'act':''}`} onClick={()=>setViewMode('grid')}><LayoutGrid size={14}/> Grid</button>
              <button className={`hm-view-btn ${viewMode==='map'?'act':''}`} onClick={()=>setViewMode('map')}><Map size={14}/> Map</button>
            </div>
          </div>
          <div style={{position:'relative'}}>
            <Search size={15} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#9ca3af',pointerEvents:'none'}}/>
            <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search your listings…"
              style={{background:'#fff',border:'1.5px solid #d1fae5',borderRadius:11,padding:'8px 14px 8px 36px',fontSize:'0.855rem',fontFamily:"'DM Sans',sans-serif",color:'#0f2d1a',outline:'none',width:220,transition:'all .18s'}}
            />
          </div>
        </div>

        {/* Pending bookings alert */}
        {pendingCount > 0 && (
          <div style={{background:'#fffbeb',border:'1.5px solid #fde68a',borderRadius:14,padding:'13px 18px',marginBottom:22,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
            <div style={{display:'flex',alignItems:'center',gap:10,fontSize:'0.875rem',color:'#92400e',fontWeight:600}}>
              <Clock size={17} color="#d97706"/> You have <strong>{pendingCount} pending booking request{pendingCount!==1?'s':''}</strong> waiting for your review
            </div>
            <Link to="/my-bookings" style={{display:'flex',alignItems:'center',gap:5,background:'#d97706',color:'#fff',padding:'7px 16px',borderRadius:9,fontWeight:700,fontSize:'0.82rem',textDecoration:'none',fontFamily:"'DM Sans',sans-serif"}}>
              Review now <ArrowRight size={13}/>
            </Link>
          </div>
        )}

        {myProperties.length === 0 ? (
          <div className="hm-empty">
            <div className="hm-empty-ico"><Building2 size={26} color="#059669"/></div>
            <div className="hm-empty-title">No properties yet</div>
            <p className="hm-empty-sub">Add your first property to start receiving booking requests from tenants.</p>
            <Link to="/add-property" style={{display:'inline-flex',alignItems:'center',gap:6,background:'linear-gradient(135deg,#059669,#047857)',color:'#fff',padding:'10px 20px',borderRadius:11,fontWeight:700,fontSize:'0.875rem',textDecoration:'none',boxShadow:'0 4px 12px rgba(5,150,105,.25)',fontFamily:"'DM Sans',sans-serif"}}>
              <Plus size={15}/> Add Property
            </Link>
          </div>
        ) : viewMode==='map' ? (
          <MapView properties={filtered}/>
        ) : (
          <div className="hm-grid">
            {filtered.map(p => {
              const bList = propBookings[p._id] || [];
              const pendingB = bList.filter(b=>!b.status||b.status==='pending').length;
              return (
                <div key={p._id} style={{position:'relative'}}>
                  <PropertyCard property={p}/>
                  {pendingB > 0 && (
                    <div style={{position:'absolute',top:12,right:12,background:'#f59e0b',color:'#fff',borderRadius:100,fontSize:'0.7rem',fontWeight:800,padding:'3px 10px',zIndex:5,boxShadow:'0 2px 8px rgba(0,0,0,.15)'}}>
                      {pendingB} pending
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// Main export — routes to correct home based on role
// ══════════════════════════════════════════════════════════
export default function HomePage() {
  const { user } = useContext(AuthContext);
  const role = user?.role;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;}

        .hm-root{font-family:'DM Sans',sans-serif;min-height:100vh;background:#f0faf4;color:#0f2d1a;}

        /* Hero */
        .hm-hero{background:linear-gradient(160deg,#064e3b 0%,#065f46 55%,#047857 100%);padding:60px 24px 80px;position:relative;overflow:hidden;}
        .hm-hero::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px);background-size:40px 40px;pointer-events:none;}
        .hm-blob1{position:absolute;width:520px;height:520px;background:radial-gradient(circle,rgba(110,231,183,0.18),transparent 65%);top:-100px;right:-80px;border-radius:50%;pointer-events:none;}
        .hm-blob2{position:absolute;width:300px;height:300px;background:radial-gradient(circle,rgba(52,211,153,0.12),transparent 65%);bottom:-60px;left:8%;border-radius:50%;pointer-events:none;}
        .hm-hero-inner{position:relative;z-index:2;max-width:680px;margin:0 auto;text-align:center;}
        .hm-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:100px;padding:5px 14px;font-size:0.75rem;font-weight:600;color:#a7f3d0;letter-spacing:.5px;text-transform:uppercase;margin-bottom:18px;animation:hmFadeUp .5s ease both;}
        .hm-title{font-family:'Syne',sans-serif;font-size:clamp(2rem,5vw,3.1rem);font-weight:800;line-height:1.12;letter-spacing:-1.5px;color:#fff;margin-bottom:13px;animation:hmFadeUp .5s .08s ease both;}
        .hm-title em{font-style:normal;background:linear-gradient(90deg,#6ee7b7,#34d399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .hm-sub{color:#a7f3d0;font-size:1rem;max-width:460px;margin:0 auto 28px;line-height:1.65;animation:hmFadeUp .5s .16s ease both;}
        @keyframes hmFadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

        /* Search */
        .hm-search-wrap{position:relative;max-width:600px;margin:0 auto;animation:hmFadeUp .5s .24s ease both;}
        .hm-search-ico{position:absolute;left:18px;top:50%;transform:translateY(-50%);color:#9ca3af;pointer-events:none;}
        .hm-search-input{width:100%;background:#fff;border:2px solid transparent;border-radius:18px;padding:17px 20px 17px 52px;font-size:0.97rem;font-family:'DM Sans',sans-serif;color:#0f2d1a;outline:none;transition:all .2s;box-shadow:0 8px 32px rgba(0,0,0,.18);}
        .hm-search-input::placeholder{color:#9ca3af;}
        .hm-search-input:focus{border-color:#34d399;box-shadow:0 8px 32px rgba(0,0,0,.18),0 0 0 4px rgba(52,211,153,.18);}
        .hm-search-clear{position:absolute;right:16px;top:50%;transform:translateY(-50%);background:none;border:none;color:#9ca3af;cursor:pointer;padding:4px;}

        /* Stats */
        .hm-stats{display:flex;justify-content:center;flex-wrap:wrap;gap:0;margin-top:36px;animation:hmFadeUp .5s .32s ease both;}
        .hm-stat{text-align:center;padding:0 26px;border-right:1px solid rgba(255,255,255,.15);}
        .hm-stat:last-child{border-right:none;}
        .hm-stat-n{font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;color:#fff;}
        .hm-stat-l{font-size:0.72rem;color:#6ee7b7;font-weight:500;margin-top:2px;text-transform:uppercase;letter-spacing:.4px;}

        /* Body */
        .hm-body{max-width:1280px;margin:0 auto;padding:34px 24px 60px;}

        /* Toolbar */
        .hm-toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px;}
        .hm-toolbar-left{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
        .hm-section-title{font-family:'Syne',sans-serif;font-size:1.25rem;font-weight:800;color:#0f2d1a;letter-spacing:-.4px;}
        .hm-section-title span{color:#059669;}
        .hm-result-count{font-size:0.82rem;color:#9ca3af;font-weight:400;}
        .hm-view-toggle{display:inline-flex;background:#fff;border:1.5px solid #d1fae5;border-radius:12px;overflow:hidden;box-shadow:0 2px 6px rgba(5,150,105,.07);}
        .hm-view-btn{display:flex;align-items:center;gap:5px;padding:7px 15px;font-size:0.8rem;font-weight:600;color:#6b7280;cursor:pointer;background:transparent;border:none;transition:all .18s;font-family:'DM Sans',sans-serif;}
        .hm-view-btn:first-child{border-right:1px solid #d1fae5;}
        .hm-view-btn.act{background:#ecfdf5;color:#059669;}
        .hm-sort{background:#fff;border:1.5px solid #d1fae5;border-radius:11px;padding:7px 30px 7px 11px;font-size:0.8rem;font-weight:600;color:#374151;cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 9px center;font-family:'DM Sans',sans-serif;outline:none;box-shadow:0 2px 6px rgba(5,150,105,.07);}
        .hm-filter-btn{display:flex;align-items:center;gap:6px;background:#fff;border:1.5px solid #d1fae5;border-radius:11px;padding:7px 14px;font-size:0.82rem;font-weight:600;color:#059669;cursor:pointer;transition:all .18s;font-family:'DM Sans',sans-serif;box-shadow:0 2px 6px rgba(5,150,105,.07);}
        .hm-filter-btn:hover{background:#ecfdf5;border-color:#34d399;}
        .hm-filter-count{background:#059669;color:#fff;border-radius:100px;font-size:0.68rem;font-weight:800;padding:1px 7px;}

        /* Filter panel */
        .hm-filter-panel{background:#fff;border:1.5px solid #d1fae5;border-radius:18px;padding:20px 22px;margin-bottom:22px;box-shadow:0 4px 18px rgba(5,150,105,.08);animation:hmSlide .2s ease;}
        @keyframes hmSlide{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .hm-filter-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:12px;}
        .hm-ff{display:flex;flex-direction:column;gap:4px;}
        .hm-ff-full{grid-column:1/-1;}
        .hm-fl{font-size:0.7rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.4px;}
        .hm-sel{width:100%;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:9px;padding:8px 28px 8px 10px;font-size:0.855rem;font-family:'DM Sans',sans-serif;color:#374151;outline:none;cursor:pointer;transition:all .18s;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 9px center;}
        .hm-sel:focus{border-color:#34d399;background-color:#f0fdf4;}

        /* Chips */
        .hm-chips{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:16px;}
        .hm-chip{display:inline-flex;align-items:center;gap:4px;background:#d1fae5;border:1px solid #6ee7b7;border-radius:100px;padding:4px 10px;font-size:0.76rem;font-weight:600;color:#065f46;}
        .hm-chip-rm{background:none;border:none;cursor:pointer;color:#6ee7b7;padding:0;margin-left:2px;display:flex;align-items:center;transition:color .15s;}
        .hm-chip-rm:hover{color:#059669;}

        /* Grid */
        .hm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:22px;}

        /* Loading */
        .hm-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 0;gap:14px;}
        .hm-spinner{width:42px;height:42px;border:3px solid #d1fae5;border-top-color:#059669;border-radius:50%;animation:hmSpin .75s linear infinite;}
        @keyframes hmSpin{to{transform:rotate(360deg);}}

        /* Empty */
        .hm-empty{text-align:center;padding:72px 24px;}
        .hm-empty-ico{width:68px;height:68px;background:#ecfdf5;border:2px solid #d1fae5;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;}
        .hm-empty-title{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:800;color:#0f2d1a;margin-bottom:7px;}
        .hm-empty-sub{color:#6b7280;font-size:0.875rem;margin-bottom:16px;}
        .hm-empty-clear{display:inline-flex;align-items:center;gap:5px;background:#fff;border:1.5px solid #d1fae5;border-radius:10px;padding:8px 16px;font-size:0.855rem;font-weight:600;color:#059669;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .18s;}
        .hm-empty-clear:hover{background:#ecfdf5;}
      `}</style>

      {role === 'owner'
        ? <OwnerHome user={user}/>
        : <BrowseHome user={user}/>
      }
    </>
  );
}