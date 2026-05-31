// import React, { useState } from 'react';
// import api from '../utils/api';
// import Alert from '../components/Alert';
// import { Home, DollarSign, MapPin, Phone, Image, Loader } from 'lucide-react';
// import imageCompression from 'browser-image-compression';

// // Leaflet
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// function AddProperty() {

//   const [files, setFiles] = useState([]);
//   const [preview, setPreview] = useState([]);
//   const [compressionProgress, setCompressionProgress] = useState(0);

//   const [latLng, setLatLng] = useState({
//     latitude: null,
//     longitude: null
//   });

//   const [search, setSearch] = useState('');

//   const [property, setProperty] = useState({
//     title: '',
//     description: '',
//     price: '',
//     city: '',
//     area: '',
//     location: '',
//     propertyType: 'PG',
//     genderPreference: 'Any',
//     amenities: '',
//     size: '',
//     contact: '',
//     availabilityStatus: 'available',
//     availableFrom: ''
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProperty(prev => ({ ...prev, [name]: value }));
//   };

//   // IMAGE COMPRESSION
//   const handleFileChange = async (e) => {
//     const selected = Array.from(e.target.files);
//     const compressedFiles = [];

//     for (let i = 0; i < selected.length; i++) {
//       try {
//         const options = {
//           maxSizeMB: 1,
//           maxWidthOrHeight: 1024,
//           useWebWorker: true,
//         };

//         const compressed = await imageCompression(selected[i], options);
//         compressedFiles.push(compressed);

//         const progress = Math.round(((i + 1) / selected.length) * 100);
//         setCompressionProgress(progress);

//       } catch (err) {
//         console.log("Compression error:", err);
//       }
//     }

//     setFiles(prev => [...prev, ...compressedFiles]);

//     setPreview(prev => [
//       ...prev,
//       ...compressedFiles.map(file => URL.createObjectURL(file))
//     ]);

//     setTimeout(() => setCompressionProgress(0), 1000);
//   };

//   // MAP ICON
//   const customIcon = new L.Icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
//     iconSize: [35, 35]
//   });

//   function LocationPicker() {
//     useMapEvents({
//       click(e) {
//         setLatLng({
//           latitude: e.latlng.lat,
//           longitude: e.latlng.lng
//         });
//       }
//     });

//     return latLng.latitude ? (
//       <Marker position={[latLng.latitude, latLng.longitude]} icon={customIcon} />
//     ) : null;
//   }

//   const handleSearch = async () => {
//     if (!search) return;

//     try {
//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${search}`
//       );
//       const data = await res.json();

//       if (data.length > 0) {
//         setLatLng({
//           latitude: parseFloat(data[0].lat),
//           longitude: parseFloat(data[0].lon)
//         });
//       } else {
//         setError("Location not found");
//       }
//     } catch {
//       setError("Search failed");
//     }
//   };

//   const validateForm = () => {
//     if (!property.title.trim()) return setError('Title is required');
//     if (!property.description.trim()) return setError('Description is required');
//     if (!property.price || parseFloat(property.price) <= 0) return setError('Valid price required');
//     if (!property.city.trim()) return setError('City required');
//     if (!property.location.trim()) return setError('Location required');
//     if (!property.contact.trim()) return setError('Contact required');
//     if (!latLng.latitude) return setError('Please select location on map');
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       const formData = new FormData();

//       Object.keys(property).forEach(key => {
//         if (
//           key !== 'amenities' &&
//           key !== 'availabilityStatus' &&
//           key !== 'availableFrom'
//         ) {
//           formData.append(key, property[key]);
//         }
//       });

//       const amenitiesArr = property.amenities
//         ? property.amenities.split(',').map(a => a.trim()).filter(Boolean)
//         : [];

//       formData.append('amenities', JSON.stringify(amenitiesArr));

//       files.forEach(file => formData.append('images', file));

//       formData.append('latitude', latLng.latitude);
//       formData.append('longitude', latLng.longitude);

//       formData.append('availabilityStatus', property.availabilityStatus);
//       formData.append('availableFrom', property.availableFrom || '');

//       await api.post('/api/properties', formData);

//       setSuccess('Property added successfully!');
//       setTimeout(() => window.location.href = '/', 1500);

//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add property');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-2xl mx-auto px-4">

//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Property</h1>
//           <p className="text-gray-600">List PG, Flat or Apartment</p>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-8">

//           {error && <Alert type="error" message={error} />}
//           {success && <Alert type="success" message={success} />}

//           <form onSubmit={handleSubmit} className="space-y-6">

//             <input name="title" value={property.title} onChange={handleChange} placeholder="Property Title (e.g. 2BHK near college)" className="w-full p-2 border rounded" />

//             <textarea name="description" value={property.description} onChange={handleChange} placeholder="Full property description..." className="w-full p-2 border rounded" />

//             <input type="number" name="price" value={property.price} onChange={handleChange} placeholder="Monthly Rent (₹)" className="w-full p-2 border rounded" />

//             <div className="grid grid-cols-2 gap-4">
//               <input name="city" value={property.city} onChange={handleChange} placeholder="City (e.g. Surat)" className="p-2 border rounded" />
//               <input name="area" value={property.area} onChange={handleChange} placeholder="Area (e.g. Adajan)" className="p-2 border rounded" />
//             </div>

//             <input name="location" value={property.location} onChange={handleChange} placeholder="Full Address / Location" className="w-full p-2 border rounded" />

//             <input name="amenities" value={property.amenities} onChange={handleChange} placeholder="Amenities (WiFi, AC, Parking...)" className="w-full p-2 border rounded" />

//             <input name="size" value={property.size} onChange={handleChange} placeholder="Size (e.g. 1200 sq ft)" className="w-full p-2 border rounded" />

//             <input name="contact" value={property.contact} onChange={handleChange} placeholder="Contact Number" className="w-full p-2 border rounded" />

//             {/* AVAILABILITY */}
//             <select value={property.availabilityStatus} onChange={(e) => setProperty(prev => ({ ...prev, availabilityStatus: e.target.value }))} className="w-full p-2 border rounded">
//               <option value="available">Available</option>
//               <option value="not_available">Not Available</option>
//             </select>

//             {property.availabilityStatus === 'not_available' && (
//               <input type="date" value={property.availableFrom} onChange={(e) => setProperty(prev => ({ ...prev, availableFrom: e.target.value }))} className="w-full p-2 border rounded" />
//             )}

//             {/* PROGRESS BAR */}
//             {compressionProgress > 0 && (
//               <div className="w-full bg-gray-200 h-2 rounded">
//                 <div className="bg-green-500 h-2 rounded" style={{ width: `${compressionProgress}%` }} />
//               </div>
//             )}

//             <input type="file" multiple onChange={handleFileChange} />

//             {/* MAP */}
//             <div>
//               <div className="flex gap-2 mb-2">
//                 <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search location..." className="w-full p-2 border rounded" />
//                 <button type="button" onClick={handleSearch} className="bg-blue-600 text-white px-3 rounded">Search</button>
//               </div>

//               <MapContainer center={[21.1702, 72.8311]} zoom={13} style={{ height: 250 }}>
//                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                 <LocationPicker />
//               </MapContainer>
//             </div>

//             <button className="w-full bg-blue-600 text-white py-3 rounded">
//               {loading ? 'Adding...' : 'Add Property'}
//             </button>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddProperty;


// import React, { useState } from 'react';
// import api from '../utils/api';
// import Alert from '../components/Alert';
// import { Loader } from 'lucide-react';
// import imageCompression from 'browser-image-compression';

// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// function AddProperty() {

//   const [files, setFiles] = useState([]);
//   const [preview, setPreview] = useState([]);
//   const [compressionProgress, setCompressionProgress] = useState(0);

//   const [latLng, setLatLng] = useState({ latitude: null, longitude: null });
//   const [search, setSearch] = useState('');

//   const [property, setProperty] = useState({
//     title: '',
//     description: '',
//     price: '',
//     city: '',
//     area: '',
//     location: '',
//     amenities: '',
//     size: '',
//     contact: '',
//     availabilityStatus: 'available',
//     availableFrom: ''
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setProperty(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   // IMAGE COMPRESSION
//   const handleFileChange = async (e) => {
//     const selected = Array.from(e.target.files);
//     const compressed = [];

//     for (let i = 0; i < selected.length; i++) {
//       const file = await imageCompression(selected[i], {
//         maxSizeMB: 1,
//         maxWidthOrHeight: 1024,
//         useWebWorker: true
//       });
//       compressed.push(file);
//       setCompressionProgress(Math.round(((i + 1) / selected.length) * 100));
//     }

//     setFiles(prev => [...prev, ...compressed]);
//     setPreview(prev => [...prev, ...compressed.map(f => URL.createObjectURL(f))]);
//     setTimeout(() => setCompressionProgress(0), 800);
//   };

//   const customIcon = new L.Icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
//     iconSize: [35, 35]
//   });

//   function LocationPicker() {
//     useMapEvents({
//       click(e) {
//         setLatLng({
//           latitude: e.latlng.lat,
//           longitude: e.latlng.lng
//         });
//       }
//     });

//     return latLng.latitude ? (
//       <Marker position={[latLng.latitude, latLng.longitude]} icon={customIcon}/>
//     ) : null;
//   }

//   const handleSearch = async () => {
//     if (!search) return;

//     try {
//       const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${search}`);
//       const data = await res.json();

//       if (data.length > 0) {
//         setLatLng({
//           latitude: parseFloat(data[0].lat),
//           longitude: parseFloat(data[0].lon)
//         });
//       }
//     } catch {
//       setError("Search failed");
//     }
//   };

//   const validateForm = () => {
//     if (!property.title) return setError('Title required');
//     if (!property.price) return setError('Price required');
//     if (!property.city) return setError('City required');
//     if (!latLng.latitude) return setError('Select map location');
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       const formData = new FormData();

//       Object.keys(property).forEach(key => {
//         formData.append(key, property[key]);
//       });

//       files.forEach(f => formData.append('images', f));
//       formData.append('latitude', latLng.latitude);
//       formData.append('longitude', latLng.longitude);

//       await api.post('/api/properties', formData);

//       setSuccess('Property Added!');
//       setTimeout(()=>window.location.href='/',1200);

//     } catch {
//       setError('Failed to add property');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="ap-root">

//       <div className="ap-container">

//         <h1>Add Property</h1>
//         <p>List your property with full details</p>

//         {error && <Alert type="error" message={error}/>}
//         {success && <Alert type="success" message={success}/>}

//         <form onSubmit={handleSubmit} className="ap-form">

//           {/* BASIC */}
//           <div className="section">
//             <h3>Basic Info</h3>

//             <input name="title" placeholder="Title" onChange={handleChange}/>
//             <textarea name="description" placeholder="Description" onChange={handleChange}/>
//             <input name="price" type="number" placeholder="Price ₹" onChange={handleChange}/>
//           </div>

//           {/* LOCATION */}
//           <div className="section">
//             <h3>Location</h3>

//             <div className="grid">
//               <input name="city" placeholder="City" onChange={handleChange}/>
//               <input name="area" placeholder="Area" onChange={handleChange}/>
//             </div>

//             <input name="location" placeholder="Full Address" onChange={handleChange}/>

//             <div className="search">
//               <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search location..."/>
//               <button type="button" onClick={handleSearch}>Search</button>
//             </div>

//             <MapContainer center={[21.1702,72.8311]} zoom={13} className="map">
//               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
//               <LocationPicker/>
//             </MapContainer>
//           </div>

//           {/* DETAILS */}
//           <div className="section">
//             <h3>Details</h3>

//             <input name="amenities" placeholder="Amenities (WiFi, AC...)" onChange={handleChange}/>
//             <input name="size" placeholder="Size" onChange={handleChange}/>
//             <input name="contact" placeholder="Contact" onChange={handleChange}/>
//           </div>

//           {/* IMAGE */}
//           <div className="section">
//             <h3>Images</h3>

//             {compressionProgress > 0 && (
//               <div className="progress">
//                 <div style={{width: compressionProgress + '%'}}/>
//               </div>
//             )}

//             <input type="file" multiple onChange={handleFileChange}/>

//             <div className="preview">
//               {preview.map((p,i)=>(
//                 <img key={i} src={p} alt="preview"/>
//               ))}
//             </div>
//           </div>

//           <button className="submit">
//             {loading ? <Loader className="spin"/> : "Add Property"}
//           </button>

//         </form>

//       </div>

//       <style>{`
//         .ap-root{
//           min-height:100vh;
//           background:linear-gradient(135deg,#ecfdf5,#f0fdf4);
//           padding:40px 20px;
//           font-family:'DM Sans',sans-serif;
//         }

//         .ap-container{
//           max-width:900px;
//           margin:auto;
//         }

//         h1{
//           font-size:2rem;
//           font-weight:800;
//           color:#064e3b;
//         }

//         p{
//           color:#6b7280;
//           margin-bottom:20px;
//         }

//         .ap-form{
//           display:flex;
//           flex-direction:column;
//           gap:20px;
//         }

//         .section{
//           background:white;
//           padding:18px;
//           border-radius:16px;
//           box-shadow:0 10px 25px rgba(5,150,105,0.1);
//         }

//         .section h3{
//           margin-bottom:10px;
//           color:#065f46;
//         }

//         input, textarea{
//           width:100%;
//           padding:10px;
//           border:none;
//           background:#f9fafb;
//           border-radius:10px;
//           margin-bottom:10px;
//         }

//         .grid{
//           display:grid;
//           grid-template-columns:1fr 1fr;
//           gap:10px;
//         }

//         .search{
//           display:flex;
//           gap:10px;
//         }

//         .search button{
//           background:#059669;
//           color:white;
//           border:none;
//           padding:8px 14px;
//           border-radius:8px;
//         }

//         .map{
//           height:250px;
//           border-radius:12px;
//           overflow:hidden;
//           margin-top:10px;
//         }

//         .preview{
//           display:grid;
//           grid-template-columns:repeat(auto-fill,minmax(100px,1fr));
//           gap:10px;
//           margin-top:10px;
//         }

//         .preview img{
//           width:100%;
//           height:80px;
//           object-fit:cover;
//           border-radius:8px;
//         }

//         .progress{
//           height:6px;
//           background:#e5e7eb;
//           border-radius:6px;
//           overflow:hidden;
//         }

//         .progress div{
//           height:100%;
//           background:#059669;
//         }

//         .submit{
//           background:linear-gradient(135deg,#059669,#047857);
//           color:white;
//           padding:12px;
//           border:none;
//           border-radius:12px;
//           font-weight:600;
//           cursor:pointer;
//         }

//         .spin{
//           animation:spin 1s linear infinite;
//         }

//         @keyframes spin{
//           to{transform:rotate(360deg);}
//         }

//       `}</style>

//     </div>
//   );
// }

// export default AddProperty;


// import React, { useState } from 'react';
// import api from '../utils/api';
// import Alert from '../components/Alert';
// import { Home, IndianRupee, MapPin, Phone, Upload, X, CheckCircle } from 'lucide-react';
// import imageCompression from 'browser-image-compression';
// import { useNavigate } from 'react-router-dom';
// import ReviewSection from '../components/ReviewSection';

// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// function AddProperty() {
//   const navigate = useNavigate();

//   const [files, setFiles] = useState([]);
//   const [preview, setPreview] = useState([]);
//   const [compressionProgress, setCompressionProgress] = useState(0);
//   const [latLng, setLatLng] = useState({ latitude: null, longitude: null });
//   const [search, setSearch] = useState('');
//   const [mapKey, setMapKey] = useState(0);

//   const [property, setProperty] = useState({
//     title: '',
//     description: '',
//     price: '',
//     city: '',
//     area: '',
//     location: '',
//     propertyType: 'PG',
//     genderPreference: 'Any',
//     amenities: '',
//     size: '',
//     contact: '',
//     availabilityStatus: 'available',
//     availableFrom: ''
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProperty(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = async (e) => {
//     const selected = Array.from(e.target.files);
//     const compressedFiles = [];
//     for (let i = 0; i < selected.length; i++) {
//       try {
//         const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };
//         const compressed = await imageCompression(selected[i], options);
//         compressedFiles.push(compressed);
//         setCompressionProgress(Math.round(((i + 1) / selected.length) * 100));
//       } catch (err) { console.log('Compression error:', err); }
//     }
//     setFiles(prev => [...prev, ...compressedFiles]);
//     setPreview(prev => [...prev, ...compressedFiles.map(f => URL.createObjectURL(f))]);
//     setTimeout(() => setCompressionProgress(0), 1000);
//   };

//   const removeImage = (idx) => {
//     setFiles(prev => prev.filter((_, i) => i !== idx));
//     setPreview(prev => prev.filter((_, i) => i !== idx));
//   };

//   const customIcon = new L.Icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
//     iconSize: [35, 35]
//   });

//   function LocationPicker() {
//     useMapEvents({
//       click(e) { setLatLng({ latitude: e.latlng.lat, longitude: e.latlng.lng }); }
//     });
//     return latLng.latitude ? (
//       <Marker position={[latLng.latitude, latLng.longitude]} icon={customIcon} />
//     ) : null;
//   }

//   const handleSearch = async () => {
//     if (!search) return;
//     try {
//       const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${search}`);
//       const data = await res.json();
//       if (data.length > 0) {
//         setLatLng({ latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) });
//         setMapKey(k => k + 1);
//       } else { setError('Location not found'); }
//     } catch { setError('Search failed'); }
//   };

//   const validateForm = () => {
//     if (!property.title.trim()) return setError('Title is required');
//     if (!property.description.trim()) return setError('Description is required');
//     if (!property.price || parseFloat(property.price) <= 0) return setError('Valid price required');
//     if (!property.city.trim()) return setError('City required');
//     if (!property.location.trim()) return setError('Location required');
//     if (!property.contact.trim()) return setError('Contact required');
//     if (!latLng.latitude) return setError('Please select location on map');
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); setSuccess('');
//     if (!validateForm()) return;
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       Object.keys(property).forEach(key => {
//         if (!['amenities', 'availabilityStatus', 'availableFrom'].includes(key))
//           formData.append(key, property[key]);
//       });
//       const amenitiesArr = property.amenities
//         ? property.amenities.split(',').map(a => a.trim()).filter(Boolean) : [];
//       formData.append('amenities', JSON.stringify(amenitiesArr));
//       files.forEach(file => formData.append('images', file));
//       formData.append('latitude', latLng.latitude);
//       formData.append('longitude', latLng.longitude);
//       formData.append('availabilityStatus', property.availabilityStatus);
//       formData.append('availableFrom', property.availableFrom || '');
//       await api.post('/api/properties', formData);
//       setSuccess('Property added successfully!');
//       setTimeout(() => window.location.href = '/', 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add property');
//     } finally { setLoading(false); }
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
//         * { box-sizing: border-box; }

//         .ap-root {
//           font-family: 'DM Sans', sans-serif;
//           min-height: 100vh;
//           background: #f0faf4;
//           padding: 32px 0 60px;
//         }

//         /* ── wider container ── */
//         .ap-container {
//           max-width: 1100px;
//           margin: 0 auto;
//           padding: 0 24px;
//         }

//         /* Back button */
//         .ap-back {
//           display: inline-flex; align-items: center; gap: 6px;
//           background: #fff; border: 1.5px solid #d1fae5;
//           border-radius: 10px; padding: 8px 16px;
//           font-size: 0.875rem; font-weight: 600; color: #059669;
//           cursor: pointer; transition: all 0.18s; margin-bottom: 24px;
//           font-family: 'DM Sans', sans-serif;
//         }
//         .ap-back:hover { background: #ecfdf5; border-color: #34d399; transform: translateX(-2px); }

//         /* Header */
//         .ap-header { margin-bottom: 24px; }
//         .ap-badge {
//           display: inline-flex; align-items: center; gap: 6px;
//           background: #d1fae5; border: 1px solid #a7f3d0;
//           border-radius: 100px; padding: 4px 13px;
//           font-size: 0.75rem; font-weight: 700; color: #065f46;
//           text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 10px;
//         }
//         .ap-title {
//           font-family: 'Syne', sans-serif;
//           font-size: 2.1rem; font-weight: 800;
//           color: #0f2d1a; letter-spacing: -1px; margin-bottom: 4px;
//         }
//         .ap-sub { color: #6b7280; font-size: 0.9rem; }

//         /* Main card */
//         .ap-card {
//           background: #fff;
//           border-radius: 24px;
//           border: 1.5px solid #e6f7ef;
//           box-shadow: 0 4px 6px rgba(0,0,0,0.03), 0 20px 40px rgba(5,150,105,0.07);
//           overflow: hidden;
//         }

//         /* Two-column form layout */
//         .ap-form-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 0;
//         }
//         @media (max-width: 720px) {
//           .ap-form-grid { grid-template-columns: 1fr; }
//           .ap-col-divider { display: none; }
//         }

//         .ap-col { padding: 28px 32px; }
//         .ap-col-divider {
//           width: 1px;
//           background: linear-gradient(to bottom, transparent, #d1fae5 20%, #d1fae5 80%, transparent);
//           margin: 24px 0;
//           flex-shrink: 0;
//         }

//         /* Full-width sections (images + map) */
//         .ap-full-section {
//           padding: 0 32px 32px;
//           border-top: 1px solid #f0fdf4;
//         }
//         .ap-full-section-header {
//           padding: 24px 32px 16px;
//         }

//         /* Section title */
//         .ap-section-title {
//           font-family: 'Syne', sans-serif;
//           font-size: 0.9rem; font-weight: 800; color: #065f46;
//           margin-bottom: 18px;
//           display: flex; align-items: center; gap: 8px;
//         }
//         .ap-section-title::after {
//           content: ''; flex: 1; height: 1px;
//           background: linear-gradient(to right, #d1fae5, transparent);
//         }

//         /* Field */
//         .ap-field { margin-bottom: 16px; }
//         .ap-label {
//           display: block; font-size: 0.76rem; font-weight: 700;
//           color: #6b7280; margin-bottom: 6px;
//           text-transform: uppercase; letter-spacing: 0.3px;
//         }
//         .ap-input-wrap { position: relative; }
//         .ap-input-icon {
//           position: absolute; left: 13px; top: 50%;
//           transform: translateY(-50%); color: #9ca3af; pointer-events: none;
//         }
//         .ap-input {
//           width: 100%; background: #f9fafb;
//           border: 1.5px solid #e5e7eb; border-radius: 12px;
//           padding: 11px 14px; font-size: 0.9rem;
//           font-family: 'DM Sans', sans-serif; color: #0f2d1a;
//           outline: none; transition: all 0.18s;
//         }
//         .ap-input.ap-with-icon { padding-left: 40px; }
//         .ap-input::placeholder { color: #9ca3af; }
//         .ap-input:focus {
//           border-color: #34d399; background: #f0fdf4;
//           box-shadow: 0 0 0 3px rgba(52,211,153,0.15);
//         }
//         .ap-textarea {
//           width: 100%; resize: vertical; min-height: 100px;
//           background: #f9fafb; border: 1.5px solid #e5e7eb;
//           border-radius: 12px; padding: 11px 14px;
//           font-size: 0.9rem; font-family: 'DM Sans', sans-serif;
//           color: #0f2d1a; outline: none; transition: all 0.18s;
//         }
//         .ap-textarea::placeholder { color: #9ca3af; }
//         .ap-textarea:focus {
//           border-color: #34d399; background: #f0fdf4;
//           box-shadow: 0 0 0 3px rgba(52,211,153,0.15);
//         }

//         /* Grid inside column */
//         .ap-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

//         /* Pills */
//         .ap-pill-group { display: flex; gap: 8px; flex-wrap: wrap; }
//         .ap-pill {
//           padding: 7px 14px; border-radius: 100px;
//           font-size: 0.82rem; font-weight: 600;
//           border: 1.5px solid #e5e7eb; background: #f9fafb; color: #6b7280;
//           cursor: pointer; transition: all 0.18s; font-family: 'DM Sans', sans-serif;
//         }
//         .ap-pill.ap-pill-active {
//           background: #ecfdf5; border-color: #34d399; color: #059669;
//           box-shadow: 0 0 0 2px rgba(52,211,153,0.15);
//         }

//         /* Image upload */
//         .ap-upload-area {
//           border: 2px dashed #d1fae5; border-radius: 14px; padding: 32px;
//           text-align: center; cursor: pointer; transition: all 0.18s;
//           background: #f9fafb; position: relative;
//         }
//         .ap-upload-area:hover { border-color: #34d399; background: #ecfdf5; }
//         .ap-upload-input {
//           position: absolute; inset: 0; opacity: 0;
//           cursor: pointer; width: 100%; height: 100%;
//         }
//         .ap-upload-icon {
//           width: 52px; height: 52px; background: #d1fae5;
//           border-radius: 50%; display: flex; align-items: center;
//           justify-content: center; margin: 0 auto 12px;
//         }
//         .ap-upload-label { font-size: 0.95rem; font-weight: 600; color: #059669; margin-bottom: 4px; }
//         .ap-upload-sub { font-size: 0.78rem; color: #9ca3af; }

//         /* Progress */
//         .ap-progress-wrap {
//           background: #e5e7eb; border-radius: 100px;
//           height: 6px; overflow: hidden; margin-bottom: 14px;
//         }
//         .ap-progress-bar {
//           height: 100%; border-radius: 100px;
//           background: linear-gradient(90deg, #34d399, #059669);
//           transition: width 0.3s ease;
//         }

//         /* Previews - wider grid since we have more space */
//         .ap-preview-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
//           gap: 12px; margin-top: 16px;
//         }
//         .ap-preview-item {
//           position: relative; border-radius: 12px;
//           overflow: hidden; aspect-ratio: 1;
//           border: 1.5px solid #d1fae5;
//         }
//         .ap-preview-img { width: 100%; height: 100%; object-fit: cover; }
//         .ap-preview-remove {
//           position: absolute; top: 5px; right: 5px;
//           background: rgba(0,0,0,0.55); border: none;
//           border-radius: 50%; width: 24px; height: 24px;
//           display: flex; align-items: center; justify-content: center;
//           cursor: pointer; color: #fff; transition: background 0.18s;
//         }
//         .ap-preview-remove:hover { background: rgba(239,68,68,0.85); }

//         /* Map */
//         .ap-map-search { display: flex; gap: 8px; margin-bottom: 12px; }
//         .ap-map-search-btn {
//           background: linear-gradient(135deg, #059669, #047857);
//           color: #fff; border: none; border-radius: 12px;
//           padding: 0 20px; font-size: 0.875rem; font-weight: 700;
//           cursor: pointer; transition: all 0.18s; white-space: nowrap;
//           font-family: 'DM Sans', sans-serif;
//           box-shadow: 0 4px 12px rgba(5,150,105,0.25);
//         }
//         .ap-map-search-btn:hover { transform: translateY(-1px); }
//         .ap-map-wrap {
//           border-radius: 16px; overflow: hidden;
//           border: 1.5px solid #d1fae5;
//           box-shadow: 0 4px 16px rgba(5,150,105,0.1);
//         }
//         .ap-latlng-display {
//           display: inline-flex; align-items: center; gap: 6px;
//           background: #ecfdf5; border: 1px solid #a7f3d0;
//           border-radius: 10px; padding: 8px 14px;
//           font-size: 0.8rem; color: #065f46; font-weight: 600;
//           margin-top: 10px;
//         }
//         .ap-map-hint {
//           font-size: 0.8rem; color: #9ca3af; margin-top: 8px; text-align: center;
//         }

//         /* Alerts */
//         .ap-alerts { padding: 20px 32px 0; }

//         /* Submit */
//         .ap-submit-wrap { padding: 0 32px 32px; }
//         .ap-submit {
//           width: 100%;
//           background: linear-gradient(135deg, #059669, #047857);
//           color: #fff; font-family: 'DM Sans', sans-serif;
//           font-size: 1rem; font-weight: 700;
//           padding: 15px 24px; border-radius: 14px; border: none;
//           cursor: pointer; transition: all 0.2s;
//           display: flex; align-items: center; justify-content: center; gap: 8px;
//           box-shadow: 0 6px 20px rgba(5,150,105,0.3);
//         }
//         .ap-submit:hover:not(:disabled) {
//           box-shadow: 0 8px 28px rgba(5,150,105,0.42); transform: translateY(-1px);
//         }
//         .ap-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
//         .ap-spinner {
//           width: 18px; height: 18px;
//           border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
//           border-radius: 50%; animation: apSpin 0.7s linear infinite;
//         }
//         @keyframes apSpin { to { transform: rotate(360deg); } }
//       `}</style>

//       <div className="ap-root">
//         <div className="ap-container">

//           {/* Back button */}
//           <button onClick={() => navigate('/')} className="ap-back">
//             ← Back to listings
//           </button>

//           {/* Header */}
//           <div className="ap-header">
//             <div className="ap-badge">🏠 List a Property</div>
//             <h1 className="ap-title">Add New Property</h1>
//             <p className="ap-sub">Fill in the details to list your PG, Flat or Apartment</p>
//           </div>

//           <div className="ap-card">

//             <div className="ap-alerts">
//               {error && <Alert type="error" message={error} onClose={() => setError('')} />}
//               {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}
//             </div>

//             <form onSubmit={handleSubmit}>

//               {/* ── Two-column section: Basic Info + Location & Details ── */}
//               <div className="ap-form-grid">

//                 {/* LEFT column — Basic Info */}
//                 <div className="ap-col">
//                   <div className="ap-section-title">📋 Basic Information</div>

//                   <div className="ap-field">
//                     <label className="ap-label">Property Title *</label>
//                     <input name="title" value={property.title} onChange={handleChange}
//                       placeholder="e.g. Cozy 2BHK near SV College" className="ap-input" />
//                   </div>

//                   <div className="ap-field">
//                     <label className="ap-label">Description *</label>
//                     <textarea name="description" value={property.description} onChange={handleChange}
//                       placeholder="Describe the property — amenities, rules, nearby landmarks…"
//                       className="ap-textarea" style={{ minHeight: 120 }} />
//                   </div>

//                   <div className="ap-field">
//                     <label className="ap-label">Monthly Rent (₹) *</label>
//                     <div className="ap-input-wrap">
//                       <IndianRupee size={16} className="ap-input-icon" />
//                       <input type="number" name="price" value={property.price} onChange={handleChange}
//                         placeholder="e.g. 8000" className="ap-input ap-with-icon" />
//                     </div>
//                   </div>

//                   <div className="ap-field">
//                     <label className="ap-label">Property Type</label>
//                     <div className="ap-pill-group">
//                       {['PG', 'Flat', 'Apartment'].map(t => (
//                         <button key={t} type="button"
//                           className={`ap-pill ${property.propertyType === t ? 'ap-pill-active' : ''}`}
//                           onClick={() => setProperty(p => ({ ...p, propertyType: t }))}>
//                           {t === 'PG' ? '🏠 PG' : t === 'Flat' ? '🏢 Flat' : '🏙️ Apartment'}
//                         </button>
//                       ))}
//                     </div>
//                     <select name="propertyType" value={property.propertyType} onChange={handleChange} style={{ display: 'none' }}>
//                       <option>PG</option><option>Flat</option><option>Apartment</option>
//                     </select>
//                   </div>

//                   <div className="ap-field">
//                     <label className="ap-label">Gender Preference</label>
//                     <div className="ap-pill-group">
//                       {['Any', 'Boys', 'Girls'].map(g => (
//                         <button key={g} type="button"
//                           className={`ap-pill ${property.genderPreference === g ? 'ap-pill-active' : ''}`}
//                           onClick={() => setProperty(p => ({ ...p, genderPreference: g }))}>
//                           {g === 'Boys' ? '👦 Boys' : g === 'Girls' ? '👧 Girls' : '👥 Any'}
//                         </button>
//                       ))}
//                     </div>
//                     <select name="genderPreference" value={property.genderPreference} onChange={handleChange} style={{ display: 'none' }}>
//                       <option>Any</option><option>Boys</option><option>Girls</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Vertical divider */}
//                 <div className="ap-col-divider" />

//                 {/* RIGHT column — Location & Details */}
//                 <div className="ap-col">
//                   <div className="ap-section-title">📍 Location & Details</div>

//                   <div className="ap-grid-2 ap-field">
//                     <div>
//                       <label className="ap-label">City *</label>
//                       <input name="city" value={property.city} onChange={handleChange}
//                         placeholder="e.g. Surat" className="ap-input" />
//                     </div>
//                     <div>
//                       <label className="ap-label">Area</label>
//                       <input name="area" value={property.area} onChange={handleChange}
//                         placeholder="e.g. Adajan" className="ap-input" />
//                     </div>
//                   </div>

//                   <div className="ap-field">
//                     <label className="ap-label">Full Address *</label>
//                     <div className="ap-input-wrap">
//                       <MapPin size={16} className="ap-input-icon" />
//                       <input name="location" value={property.location} onChange={handleChange}
//                         placeholder="Street, Landmark, City" className="ap-input ap-with-icon" />
//                     </div>
//                   </div>

//                   <div className="ap-grid-2 ap-field">
//                     <div>
//                       <label className="ap-label">Size</label>
//                       <input name="size" value={property.size} onChange={handleChange}
//                         placeholder="e.g. 1200 sq ft" className="ap-input" />
//                     </div>
//                     <div>
//                       <label className="ap-label">Contact *</label>
//                       <div className="ap-input-wrap">
//                         <Phone size={16} className="ap-input-icon" />
//                         <input name="contact" value={property.contact} onChange={handleChange}
//                           placeholder="+91 98765 43210" className="ap-input ap-with-icon" />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="ap-field">
//                     <label className="ap-label">Amenities <span style={{ color: '#9ca3af', fontWeight: 400, textTransform: 'none' }}>(comma separated)</span></label>
//                     <input name="amenities" value={property.amenities} onChange={handleChange}
//                       placeholder="WiFi, AC, Parking, Gym, Laundry…" className="ap-input" />
//                   </div>

//                   <div className="ap-field">
//                     <label className="ap-label">Availability Status</label>
//                     <div className="ap-pill-group">
//                       {[{ val: 'available', label: '✅ Available' }, { val: 'not_available', label: '❌ Not Available' }].map(opt => (
//                         <button key={opt.val} type="button"
//                           className={`ap-pill ${property.availabilityStatus === opt.val ? 'ap-pill-active' : ''}`}
//                           onClick={() => setProperty(p => ({ ...p, availabilityStatus: opt.val }))}>
//                           {opt.label}
//                         </button>
//                       ))}
//                     </div>
//                     <select name="availabilityStatus" value={property.availabilityStatus}
//                       onChange={e => setProperty(p => ({ ...p, availabilityStatus: e.target.value }))}
//                       style={{ display: 'none' }}>
//                       <option value="available">Available</option>
//                       <option value="not_available">Not Available</option>
//                     </select>
//                   </div>

//                   {property.availabilityStatus === 'not_available' && (
//                     <div className="ap-field">
//                       <label className="ap-label">Available From</label>
//                       <input type="date" value={property.availableFrom}
//                         onChange={e => setProperty(p => ({ ...p, availableFrom: e.target.value }))}
//                         className="ap-input" />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* ── Full width: Images ── */}
//               <div className="ap-full-section-header">
//                 <div className="ap-section-title">📷 Property Images</div>
//               </div>
//               <div className="ap-full-section">

//                 {compressionProgress > 0 && (
//                   <div style={{ marginBottom: 14 }}>
//                     <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600, marginBottom: 5 }}>
//                       Compressing images… {compressionProgress}%
//                     </div>
//                     <div className="ap-progress-wrap">
//                       <div className="ap-progress-bar" style={{ width: `${compressionProgress}%` }} />
//                     </div>
//                   </div>
//                 )}

//                 <div className="ap-upload-area">
//                   <input type="file" multiple onChange={handleFileChange} accept="image/*" className="ap-upload-input" />
//                   <div className="ap-upload-icon"><Upload size={24} color="#059669" /></div>
//                   <div className="ap-upload-label">Click or drag images here</div>
//                   <div className="ap-upload-sub">PNG, JPG up to 10MB · Auto compressed</div>
//                 </div>

//                 {preview.length > 0 && (
//                   <div className="ap-preview-grid">
//                     {preview.map((src, i) => (
//                       <div key={i} className="ap-preview-item">
//                         <img src={src} className="ap-preview-img" alt={`preview-${i}`} />
//                         <button type="button" className="ap-preview-remove" onClick={() => removeImage(i)}>
//                           <X size={12} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* ── Full width: Map ── */}
//               <div className="ap-full-section-header">
//                 <div className="ap-section-title">🗺️ Pin on Map</div>
//               </div>
//               <div className="ap-full-section">

//                 <div className="ap-map-search">
//                   <input value={search} onChange={e => setSearch(e.target.value)}
//                     placeholder="Search a location to jump to…"
//                     className="ap-input"
//                     onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleSearch())} />
//                   <button type="button" onClick={handleSearch} className="ap-map-search-btn">
//                     Search
//                   </button>
//                 </div>

//                 <div className="ap-map-wrap">
//                   <MapContainer
//                     key={mapKey}
//                     center={latLng.latitude ? [latLng.latitude, latLng.longitude] : [21.1702, 72.8311]}
//                     zoom={13}
//                     style={{ height: 340 }}
//                   >
//                     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                     <LocationPicker />
//                   </MapContainer>
//                 </div>

//                 {latLng.latitude ? (
//                   <div className="ap-latlng-display">
//                     <MapPin size={14} />
//                     📍 Pinned at {latLng.latitude.toFixed(5)}, {latLng.longitude.toFixed(5)}
//                   </div>
//                 ) : (
//                   <p className="ap-map-hint">Click anywhere on the map to pin the exact location</p>
//                 )}
//               </div>

//               {/* Submit */}
//               <div className="ap-submit-wrap">
//                 <button type="submit" disabled={loading} className="ap-submit">
//                   {loading
//                     ? <><div className="ap-spinner" /> Adding Property…</>
//                     : <><CheckCircle size={18} /> Add Property</>
//                   }
//                 </button>
//               </div>

//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddProperty;

// src/pages/AddProperty.jsx
// Shows toast on successful add. Owner/admin only (guarded by RoleGuard in App.jsx).
// src/pages/AddProperty.jsx
// Requires: npm install react-leaflet leaflet
// Add to index.html <head>:
//   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

// import React, { useState, useContext, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import api from '../utils/api';
// import Alert from '../components/Alert';
// import { useToast } from '../components/Toast';
// import AuthContext from '../context/AuthContext';
// import {
//   ArrowLeft, Home, MapPin, IndianRupee, Phone, Image,
//   Plus, X, Wifi, Save, Upload, Map
// } from 'lucide-react';

// // ── Leaflet marker click handler ──
// function MapClickHandler({ onPick }) {
//   useMapEvents({ click: e => onPick(e.latlng) });
//   return null;
// }

// const AMENITY_SUGGESTIONS = [
//   'WiFi', 'AC', 'Parking', 'Gym', 'Laundry', 'CCTV',
//   'Power Backup', 'Hot Water', 'Furnished', 'Kitchen',
//   'Security Guard', 'Elevator',
// ];
// const PROPERTY_TYPES = ['PG', 'Flat', 'Apartment'];
// const GENDER_PREFS   = ['Any', 'Boys', 'Girls'];

// export default function AddProperty() {
//   const navigate  = useNavigate();
//   const toast     = useToast();
//   const { user }  = useContext(AuthContext);

//   const [form, setForm] = useState({
//     title: '', description: '', price: '', contact: '',
//     city: '', area: '', location: '', size: '',
//     propertyType: 'PG', genderPreference: 'Any',
//     availabilityStatus: 'available',
//     lat: '', lng: '',
//   });

//   const [amenities,     setAmenities]     = useState([]);
//   const [amenityInput,  setAmenityInput]  = useState('');
//   const [images,        setImages]        = useState([]);       // File[]
//   const [imagePreviews, setImagePreviews] = useState([]);       // string[] (object URLs)
//   const [mapPin,        setMapPin]        = useState(null);     // {lat,lng}
//   const [loading,       setLoading]       = useState(false);
//   const [error,         setError]         = useState('');

//   const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

//   // ── Amenities ──
//   const addAmenity = val => {
//     const a = val.trim();
//     if (a && !amenities.includes(a)) setAmenities(p => [...p, a]);
//     setAmenityInput('');
//   };
//   const removeAmenity = a => setAmenities(p => p.filter(x => x !== a));

//   // ── Images (old-style: click zone + remove per image) ──
//   const handleImages = e => {
//     const files = Array.from(e.target.files);
//     if (!files.length) return;
//     // Append to existing
//     const newPreviews = files.map(f => URL.createObjectURL(f));
//     setImages(prev => [...prev, ...files]);
//     setImagePreviews(prev => [...prev, ...newPreviews]);
//   };

//   const removeImage = idx => {
//     URL.revokeObjectURL(imagePreviews[idx]);
//     setImages(prev => prev.filter((_, i) => i !== idx));
//     setImagePreviews(prev => prev.filter((_, i) => i !== idx));
//   };

//   // ── Map pin pick ──
//   const handleMapPick = useCallback(({ lat, lng }) => {
//     const la = parseFloat(lat.toFixed(6));
//     const ln = parseFloat(lng.toFixed(6));
//     setMapPin({ lat: la, lng: ln });
//     setForm(p => ({ ...p, lat: la, lng: ln }));
//   }, []);

//   // ── Submit ──
//   const submit = async e => {
//     e.preventDefault();
//     setError('');
//     if (!form.title || !form.price || !form.city || !form.contact) {
//       toast.warning('Missing fields', 'Title, price, city and contact are required');
//       return;
//     }
//     setLoading(true);
//     try {
//       const data = new FormData();
//       Object.entries(form).forEach(([k, v]) => v !== '' && data.append(k, v));
//       data.append('amenities', JSON.stringify(amenities));
//       images.forEach(img => data.append('images', img));

//       await api.post('/api/properties', data, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       toast.success('Property listed! 🏠', 'Your property is now visible to seekers');
//       navigate('/');
//     } catch (err) {
//       const msg = err.response?.data?.message || 'Failed to add property';
//       setError(msg);
//       toast.error('Failed to add', msg);
//     } finally { setLoading(false); }
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
//         *{box-sizing:border-box;}

//         .ap-root{font-family:'DM Sans',sans-serif;min-height:100vh;background:#f0faf4;padding:32px 0 60px;}
//         .ap-container{max-width:900px;margin:0 auto;padding:0 20px;}

//         .ap-back{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1.5px solid #d1fae5;border-radius:10px;padding:8px 16px;font-size:0.875rem;font-weight:600;color:#059669;cursor:pointer;transition:all .18s;margin-bottom:22px;font-family:'DM Sans',sans-serif;border:none;}
//         .ap-back:hover{background:#ecfdf5;transform:translateX(-2px);}

//         .ap-card{background:#fff;border-radius:22px;border:1.5px solid #e6f7ef;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.04),0 20px 40px rgba(5,150,105,0.08);}

//         .ap-hero{background:linear-gradient(135deg,#064e3b,#065f46);padding:22px 28px;display:flex;align-items:center;gap:14px;}
//         .ap-hero-ico{width:44px;height:44px;background:rgba(255,255,255,0.12);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
//         .ap-hero-title{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:800;color:#fff;}
//         .ap-hero-sub{font-size:0.78rem;color:#a7f3d0;margin-top:2px;}

//         .ap-body{padding:28px;}

//         .ap-section{margin-bottom:28px;}
//         .ap-section-label{font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:#9ca3af;margin-bottom:14px;display:flex;align-items:center;gap:8px;}
//         .ap-section-label::after{content:'';flex:1;height:1px;background:linear-gradient(to right,#e5e7eb,transparent);}

//         .ap-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
//         @media(max-width:620px){.ap-grid{grid-template-columns:1fr;}}
//         .ap-full{grid-column:1/-1;}

//         .ap-field{display:flex;flex-direction:column;gap:5px;}
//         .ap-label{font-size:0.73rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.3px;}
//         .ap-optional{color:#9ca3af;font-weight:400;text-transform:none;font-size:0.7rem;}

//         .ap-input{width:100%;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:10px;padding:10px 13px;font-size:0.875rem;font-family:'DM Sans',sans-serif;color:#0f2d1a;outline:none;transition:all .18s;}
//         .ap-input::placeholder{color:#9ca3af;}
//         .ap-input:focus{border-color:#34d399;background:#f0fdf4;box-shadow:0 0 0 3px rgba(52,211,153,0.12);}

//         .ap-select{width:100%;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:10px;padding:10px 32px 10px 13px;font-size:0.875rem;font-family:'DM Sans',sans-serif;color:#0f2d1a;outline:none;cursor:pointer;transition:all .18s;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;}
//         .ap-select:focus{border-color:#34d399;background-color:#f0fdf4;}

//         /* Pills */
//         .ap-pill-row{display:flex;flex-wrap:wrap;gap:8px;}
//         .ap-pill{padding:7px 15px;border-radius:100px;border:1.5px solid #e5e7eb;font-size:0.82rem;font-weight:600;color:#6b7280;cursor:pointer;transition:all .18s;background:#f9fafb;user-select:none;}
//         .ap-pill:hover{border-color:#a7f3d0;color:#059669;}
//         .ap-pill.on{border-color:#34d399;background:#ecfdf5;color:#065f46;}

//         /* Amenities */
//         .ap-amenity-tags{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:10px;}
//         .ap-tag{display:inline-flex;align-items:center;gap:5px;background:#d1fae5;border:1px solid #a7f3d0;border-radius:100px;padding:4px 11px;font-size:0.78rem;font-weight:600;color:#065f46;}
//         .ap-tag-rm{background:none;border:none;cursor:pointer;color:#6ee7b7;padding:0;margin-left:2px;display:flex;align-items:center;font-size:15px;line-height:1;transition:color .15s;}
//         .ap-tag-rm:hover{color:#059669;}
//         .ap-amenity-row{display:flex;gap:8px;}
//         .ap-amenity-add{background:#059669;color:#fff;border:none;border-radius:10px;padding:0 14px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .18s;}
//         .ap-amenity-add:hover{background:#047857;}
//         .ap-suggest{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;}
//         .ap-sug{font-size:0.75rem;padding:4px 11px;border-radius:100px;border:1px solid #e5e7eb;color:#6b7280;cursor:pointer;transition:all .15s;background:#f9fafb;user-select:none;}
//         .ap-sug:hover{border-color:#a7f3d0;color:#059669;background:#f0fdf4;}

//         /* ── PHOTO UPLOAD (restored old style) ── */
//         .ap-upload-zone{border:2px dashed #d1fae5;border-radius:14px;padding:0;overflow:hidden;background:#fafffe;transition:all .18s;}
//         .ap-upload-zone:hover{border-color:#34d399;background:#f0fdf4;}
//         .ap-upload-trigger{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px;cursor:pointer;gap:10px;}
//         .ap-upload-ico{width:52px;height:52px;background:linear-gradient(135deg,#d1fae5,#a7f3d0);border-radius:14px;display:flex;align-items:center;justify-content:center;}
//         .ap-upload-title{font-weight:700;font-size:0.9rem;color:#059669;}
//         .ap-upload-sub{font-size:0.78rem;color:#9ca3af;}
//         .ap-upload-btn{display:inline-flex;align-items:center;gap:6px;background:#ecfdf5;border:1.5px solid #a7f3d0;border-radius:10px;padding:8px 16px;font-size:0.82rem;font-weight:700;color:#065f46;cursor:pointer;transition:all .18s;}
//         .ap-upload-btn:hover{background:#d1fae5;}

//         .ap-img-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:10px;padding:14px;}
//         .ap-img-item{position:relative;border-radius:10px;overflow:hidden;aspect-ratio:1;border:1.5px solid #d1fae5;}
//         .ap-img-thumb{width:100%;height:100%;object-fit:cover;display:block;}
//         .ap-img-rm{position:absolute;top:5px;right:5px;background:rgba(0,0,0,0.55);border:none;border-radius:6px;width:22px;height:22px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;transition:background .15s;}
//         .ap-img-rm:hover{background:rgba(239,68,68,0.85);}
//         .ap-img-count{font-size:0.75rem;color:#6b7280;padding:0 14px 12px;text-align:right;}

//         /* ── MAP ── */
//         .ap-map-wrap{border-radius:14px;overflow:hidden;border:1.5px solid #d1fae5;position:relative;}
//         .ap-map-hint{position:absolute;top:10px;left:50%;transform:translateX(-50%);z-index:1000;background:rgba(6,78,59,0.88);color:#d1fae5;font-size:0.75rem;font-weight:600;padding:5px 14px;border-radius:100px;white-space:nowrap;pointer-events:none;backdrop-filter:blur(6px);}
//         .ap-map-coords{display:flex;gap:12px;margin-top:10px;}
//         .ap-coord-box{flex:1;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:10px;padding:8px 12px;}
//         .ap-coord-label{font-size:0.68rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.3px;margin-bottom:3px;}
//         .ap-coord-val{font-size:0.88rem;font-weight:700;color:#0f2d1a;font-family:monospace;}
//         .ap-coord-val.empty{color:#9ca3af;font-weight:400;font-family:'DM Sans',sans-serif;}

//         /* Submit */
//         .ap-footer{padding-top:8px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;}
//         .ap-submit{display:flex;align-items:center;gap:8px;background:linear-gradient(135deg,#059669,#047857);color:#fff;padding:13px 28px;border-radius:12px;border:none;font-size:0.95rem;font-weight:700;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;box-shadow:0 6px 18px rgba(5,150,105,0.28);}
//         .ap-submit:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 24px rgba(5,150,105,0.42);}
//         .ap-submit:disabled{opacity:.6;cursor:not-allowed;transform:none;}
//         .ap-spin{width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:apSpn .7s linear infinite;}
//         @keyframes apSpn{to{transform:rotate(360deg);}}
//         .ap-cancel{display:flex;align-items:center;gap:6px;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:12px;padding:13px 20px;font-size:0.875rem;font-weight:600;color:#6b7280;cursor:pointer;transition:all .18s;font-family:'DM Sans',sans-serif;}
//         .ap-cancel:hover{background:#f3f4f6;color:#374151;}

//         /* Leaflet z-index fix */
//         .leaflet-pane{z-index:0!important;}
//         .leaflet-top,.leaflet-bottom{z-index:1!important;}
//       `}</style>

//       <div className="ap-root">
//         <div className="ap-container">

//           <button onClick={() => navigate(-1)} className="ap-back">
//             <ArrowLeft size={15}/> Back
//           </button>

//           {error && <Alert type="error" message={error} onClose={() => setError('')}/>}

//           <form onSubmit={submit}>
//             <div className="ap-card">

//               {/* Header */}
//               <div className="ap-hero">
//                 <div className="ap-hero-ico"><Home size={20} color="#6ee7b7"/></div>
//                 <div>
//                   <div className="ap-hero-title">List a New Property</div>
//                   <div className="ap-hero-sub">Fill in the details below — your listing goes live immediately</div>
//                 </div>
//               </div>

//               <div className="ap-body">

//                 {/* ── Basic Info ── */}
//                 <div className="ap-section">
//                   <div className="ap-section-label">Basic Information</div>
//                   <div className="ap-grid">
//                     <div className="ap-field ap-full">
//                       <label className="ap-label">Property Title *</label>
//                       <input name="title" value={form.title} onChange={handle} className="ap-input" placeholder="e.g. Spacious Boys PG near MG Road"/>
//                     </div>
//                     <div className="ap-field ap-full">
//                       <label className="ap-label">Description <span className="ap-optional">(optional)</span></label>
//                       <textarea name="description" value={form.description} onChange={handle} className="ap-input" placeholder="Describe the property — rules, nearby landmarks, what's included…" style={{ minHeight:80, resize:'vertical' }}/>
//                     </div>
//                     <div className="ap-field">
//                       <label className="ap-label">Monthly Rent (₹) *</label>
//                       <input name="price" type="number" value={form.price} onChange={handle} className="ap-input" placeholder="e.g. 8000"/>
//                     </div>
//                     <div className="ap-field">
//                       <label className="ap-label">Contact Number *</label>
//                       <input name="contact" value={form.contact} onChange={handle} className="ap-input" placeholder="+91 98765 43210"/>
//                     </div>
//                   </div>
//                 </div>

//                 {/* ── Location ── */}
//                 <div className="ap-section">
//                   <div className="ap-section-label">Location</div>
//                   <div className="ap-grid">
//                     <div className="ap-field">
//                       <label className="ap-label">City *</label>
//                       <input name="city" value={form.city} onChange={handle} className="ap-input" placeholder="e.g. Surat"/>
//                     </div>
//                     <div className="ap-field">
//                       <label className="ap-label">Area / Locality</label>
//                       <input name="area" value={form.area} onChange={handle} className="ap-input" placeholder="e.g. Adajan"/>
//                     </div>
//                     <div className="ap-field ap-full">
//                       <label className="ap-label">Full Address</label>
//                       <input name="location" value={form.location} onChange={handle} className="ap-input" placeholder="Street name, landmark, pin code…"/>
//                     </div>
//                   </div>
//                 </div>

//                 {/* ── Property Details ── */}
//                 <div className="ap-section">
//                   <div className="ap-section-label">Property Details</div>
//                   <div className="ap-grid">
//                     <div className="ap-field">
//                       <label className="ap-label">Property Type</label>
//                       <div className="ap-pill-row">
//                         {PROPERTY_TYPES.map(t => (
//                           <div key={t} className={`ap-pill ${form.propertyType===t?'on':''}`} onClick={()=>setForm(p=>({...p,propertyType:t}))}>{t}</div>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="ap-field">
//                       <label className="ap-label">Gender Preference</label>
//                       <div className="ap-pill-row">
//                         {GENDER_PREFS.map(g => (
//                           <div key={g} className={`ap-pill ${form.genderPreference===g?'on':''}`} onClick={()=>setForm(p=>({...p,genderPreference:g}))}>{g}</div>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="ap-field">
//                       <label className="ap-label">Size <span className="ap-optional">(optional)</span></label>
//                       <input name="size" value={form.size} onChange={handle} className="ap-input" placeholder="e.g. 1200 sq ft or 2 BHK"/>
//                     </div>
//                     <div className="ap-field">
//                       <label className="ap-label">Availability Status</label>
//                       <select name="availabilityStatus" value={form.availabilityStatus} onChange={handle} className="ap-select">
//                         <option value="available">✅ Available Now</option>
//                         <option value="not_available">❌ Not Available</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 {/* ── Amenities ── */}
//                 <div className="ap-section">
//                   <div className="ap-section-label">Amenities <span className="ap-optional" style={{fontWeight:400,textTransform:'none',letterSpacing:0,fontSize:'0.7rem'}}>(optional)</span></div>
//                   {amenities.length > 0 && (
//                     <div className="ap-amenity-tags">
//                       {amenities.map(a => (
//                         <span key={a} className="ap-tag">
//                           <Wifi size={11}/> {a}
//                           <button type="button" className="ap-tag-rm" onClick={() => removeAmenity(a)}>×</button>
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                   <div className="ap-amenity-row">
//                     <input
//                       value={amenityInput}
//                       onChange={e => setAmenityInput(e.target.value)}
//                       onKeyDown={e => { if (e.key==='Enter'){e.preventDefault();addAmenity(amenityInput);}}}
//                       className="ap-input" placeholder="Type an amenity and press Enter…" style={{flex:1}}
//                     />
//                     <button type="button" onClick={() => addAmenity(amenityInput)} className="ap-amenity-add">
//                       <Plus size={18}/>
//                     </button>
//                   </div>
//                   <div className="ap-suggest">
//                     {AMENITY_SUGGESTIONS.filter(s => !amenities.includes(s)).map(s => (
//                       <span key={s} className="ap-sug" onClick={() => addAmenity(s)}>+ {s}</span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* ── PHOTOS (old style — drag zone + preview grid with remove) ── */}
//                 <div className="ap-section">
//                   <div className="ap-section-label">Photos <span className="ap-optional" style={{fontWeight:400,textTransform:'none',letterSpacing:0,fontSize:'0.7rem'}}>(optional)</span></div>
//                   <div className="ap-upload-zone">
//                     <label className="ap-upload-trigger" style={{cursor:'pointer'}}>
//                       <input type="file" accept="image/*" multiple onChange={handleImages} style={{display:'none'}}/>
//                       <div className="ap-upload-ico">
//                         <Upload size={22} color="#059669"/>
//                       </div>
//                       <div className="ap-upload-title">Upload Property Photos</div>
//                       <div className="ap-upload-sub">PNG, JPG, WEBP up to 5MB each · Multiple allowed</div>
//                       <span className="ap-upload-btn"><Image size={14}/> Choose Photos</span>
//                     </label>

//                     {imagePreviews.length > 0 && (
//                       <>
//                         <div style={{height:1,background:'#e6f7ef',margin:'0 14px'}}/>
//                         <div className="ap-img-grid">
//                           {imagePreviews.map((src, i) => (
//                             <div key={i} className="ap-img-item">
//                               <img src={src} className="ap-img-thumb" alt={`photo ${i+1}`}/>
//                               <button type="button" className="ap-img-rm" onClick={() => removeImage(i)}>
//                                 <X size={12}/>
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                         <div className="ap-img-count">{imagePreviews.length} photo{imagePreviews.length!==1?'s':''} selected</div>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 {/* ── MAP LOCATION PICKER ── */}
//                 <div className="ap-section">
//                   <div className="ap-section-label"><Map size={13}/> Pin Location on Map <span className="ap-optional" style={{fontWeight:400,textTransform:'none',letterSpacing:0,fontSize:'0.7rem'}}>(optional — helps tenants find you)</span></div>

//                   <div className="ap-map-wrap">
//                     <div className="ap-map-hint">📍 Click anywhere on the map to drop a pin</div>
//                     <MapContainer
//                       center={[21.1702, 72.8311]}
//                       zoom={12}
//                       style={{ height: 320, width: '100%' }}
//                       scrollWheelZoom={false}
//                     >
//                       <TileLayer
//                         attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                       />
//                       <MapClickHandler onPick={handleMapPick}/>
//                       {mapPin && (
//                         <Marker position={[mapPin.lat, mapPin.lng]}/>
//                       )}
//                     </MapContainer>
//                   </div>

//                   {/* Coordinate display + manual override */}
//                   <div className="ap-map-coords">
//                     <div className="ap-coord-box">
//                       <div className="ap-coord-label">Latitude</div>
//                       <div className={`ap-coord-val ${mapPin?'':'empty'}`}>
//                         {mapPin ? mapPin.lat : 'Click map to set'}
//                       </div>
//                     </div>
//                     <div className="ap-coord-box">
//                       <div className="ap-coord-label">Longitude</div>
//                       <div className={`ap-coord-val ${mapPin?'':'empty'}`}>
//                         {mapPin ? mapPin.lng : 'Click map to set'}
//                       </div>
//                     </div>
//                     {mapPin && (
//                       <button type="button"
//                         onClick={() => { setMapPin(null); setForm(p=>({...p,lat:'',lng:''})); }}
//                         style={{background:'#fff1f2',border:'1.5px solid #fecdd3',borderRadius:10,padding:'0 14px',color:'#be123c',fontSize:'0.78rem',fontWeight:700,cursor:'pointer',fontFamily:'DM Sans,sans-serif',whiteSpace:'nowrap',transition:'all .18s',flexShrink:0}}
//                       >
//                         Clear Pin
//                       </button>
//                     )}
//                   </div>

//                   {/* Or enter manually */}
//                   <div style={{marginTop:12}}>
//                     <div style={{fontSize:'0.72rem',fontWeight:700,color:'#9ca3af',textTransform:'uppercase',letterSpacing:'.3px',marginBottom:8}}>Or enter coordinates manually</div>
//                     <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
//                       <input
//                         name="lat" type="number" step="any"
//                         value={form.lat} onChange={e => {
//                           handle(e);
//                           if (e.target.value && form.lng) setMapPin({ lat: parseFloat(e.target.value), lng: parseFloat(form.lng) });
//                         }}
//                         className="ap-input" placeholder="e.g. 21.1702"
//                       />
//                       <input
//                         name="lng" type="number" step="any"
//                         value={form.lng} onChange={e => {
//                           handle(e);
//                           if (form.lat && e.target.value) setMapPin({ lat: parseFloat(form.lat), lng: parseFloat(e.target.value) });
//                         }}
//                         className="ap-input" placeholder="e.g. 72.8311"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* ── Submit ── */}
//                 <div className="ap-footer">
//                   <button type="submit" disabled={loading} className="ap-submit">
//                     {loading ? <><div className="ap-spin"/> Publishing…</> : <><Save size={16}/> Publish Property</>}
//                   </button>
//                   <button type="button" onClick={() => navigate(-1)} className="ap-cancel">
//                     <X size={15}/> Cancel
//                   </button>
//                 </div>

//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
// src/pages/AddProperty.jsx
//
// FIXES applied:
//  1. lat/lng now always appended to FormData (even as empty string → backend ignores)
//     properly saved as Number in backend via parseFloat
//  2. availableFrom date properly appended and sent
//  3. Map has city/address search box (geocoding via Nominatim free API)
//  4. Map auto-zooms to India on load, zooms to pin on click
//  5. "Not Available" date field has proper min date and clear label
//  6. All pill toggle state properly controlled
//
// REQUIRES in index.html <head>:
//   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

import React, { useState, useContext, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import api from '../utils/api';
import Alert from '../components/Alert';
import { useToast } from '../components/Toast';
import AuthContext from '../context/AuthContext';
import {
  ArrowLeft, Home, MapPin, Phone, Image,
  Plus, X, Wifi, Save, Upload, Map, Search, Locate
} from 'lucide-react';

// ── Map click handler ─────────────────────────────────────────────────────────
function MapClickHandler({ onPick }) {
  useMapEvents({ click: e => onPick(e.latlng.lat, e.latlng.lng) });
  return null;
}

// ── Fly-to helper (used when search result comes back) ────────────────────────
function MapFlyTo({ target }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo([target.lat, target.lng], 15, { duration: 1 });
  }, [target]);
  return null;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const AMENITY_SUGGESTIONS = [
  'WiFi', 'AC', 'Parking', 'Gym', 'Laundry', 'CCTV',
  'Power Backup', 'Hot Water', 'Furnished', 'Kitchen',
  'Security Guard', 'Elevator', 'RO Water', 'Gas Pipeline',
];
const PROPERTY_TYPES = ['PG', 'Flat', 'Apartment'];
const GENDER_PREFS   = ['Any', 'Boys', 'Girls'];

// India center for default map view
const INDIA_CENTER = [20.5937, 78.9629];

// ── Main component ─────────────────────────────────────────────────────────────
export default function AddProperty() {
  const navigate = useNavigate();
  const toast    = useToast();
  const { user } = useContext(AuthContext);

  // ── Form state ──
  const [form, setForm] = useState({
    title:              '',
    description:        '',
    price:              '',
    contact:            '',
    city:               '',
    area:               '',
    location:           '',
    size:               '',
    propertyType:       'PG',
    genderPreference:   'Any',
    availabilityStatus: 'available',
    availableFrom:      '',    // only used when status = not_available
    lat:                '',
    lng:                '',
  });

  const [amenities,     setAmenities]     = useState([]);
  const [amenityInput,  setAmenityInput]  = useState('');
  const [images,        setImages]        = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [mapPin,        setMapPin]        = useState(null);   // { lat, lng }
  const [mapFlyTarget,  setMapFlyTarget]  = useState(null);  // trigger fly-to
  const [mapSearch,     setMapSearch]     = useState('');
  const [mapSearching,  setMapSearching]  = useState(false);
  const [mapSearchErr,  setMapSearchErr]  = useState('');
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState('');

  // ── Field change ──
  const handle = e => {
    const { name, value } = e.target;
    setForm(prev => {
      const next = { ...prev, [name]: value };
      // When switching back to available, clear the date
      if (name === 'availabilityStatus' && value === 'available') {
        next.availableFrom = '';
      }
      return next;
    });
  };

  // ── Amenities ──
  const addAmenity = val => {
    const a = val.trim();
    if (a && !amenities.includes(a)) setAmenities(p => [...p, a]);
    setAmenityInput('');
  };
  const removeAmenity = a => setAmenities(p => p.filter(x => x !== a));

  // ── Images ──
  const handleImages = e => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setImages(prev => [...prev, ...files]);
    setImagePreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
  };
  const removeImage = idx => {
    URL.revokeObjectURL(imagePreviews[idx]);
    setImages(prev => prev.filter((_, i) => i !== idx));
    setImagePreviews(prev => prev.filter((_, i) => i !== idx));
  };

  // ── Map pin ──
  const handleMapPick = useCallback((lat, lng) => {
    const la = parseFloat(lat.toFixed(6));
    const ln = parseFloat(lng.toFixed(6));
    setMapPin({ lat: la, lng: ln });
    setForm(p => ({ ...p, lat: String(la), lng: String(ln) }));
  }, []);

  const clearPin = () => {
    setMapPin(null);
    setForm(p => ({ ...p, lat: '', lng: '' }));
  };

  // ── Geocode search (Nominatim — free, no API key) ──
  const handleMapSearch = async () => {
    const q = mapSearch.trim();
    if (!q) return;
    setMapSearching(true);
    setMapSearchErr('');
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1&countrycodes=in`,
        { headers: { 'Accept-Language': 'en', 'User-Agent': 'NestFind/1.0' } }
      );
      const data = await res.json();
      if (data.length === 0) {
        setMapSearchErr('Location not found. Try a different name.');
        return;
      }
      const { lat, lon, display_name } = data[0];
      const la = parseFloat(parseFloat(lat).toFixed(6));
      const ln = parseFloat(parseFloat(lon).toFixed(6));
      setMapPin({ lat: la, lng: ln });
      setForm(p => ({ ...p, lat: String(la), lng: String(ln) }));
      setMapFlyTarget({ lat: la, lng: ln });
    } catch {
      setMapSearchErr('Search failed. Check internet and try again.');
    } finally {
      setMapSearching(false);
    }
  };

  // Use city field to auto-search map when user moves away from city input
  const handleCityBlur = async () => {
    const city = form.city.trim();
    if (!city || mapPin) return; // don't auto-search if pin already set
    setMapSearch(city);
    // auto trigger search silently
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city + ', India')}&format=json&limit=1&countrycodes=in`,
        { headers: { 'Accept-Language': 'en', 'User-Agent': 'NestFind/1.0' } }
      );
      const data = await res.json();
      if (data.length > 0) {
        const la = parseFloat(parseFloat(data[0].lat).toFixed(6));
        const ln = parseFloat(parseFloat(data[0].lon).toFixed(6));
        setMapFlyTarget({ lat: la, lng: ln });
        // don't auto-drop pin — just move map view so user can click precisely
      }
    } catch {}
  };

  // ── Submit ──
  const submit = async e => {
    e.preventDefault();
    setError('');

    // Validation
    if (!form.title.trim())   { toast.warning('Missing field', 'Property title is required'); return; }
    if (!form.price)          { toast.warning('Missing field', 'Monthly rent is required'); return; }
    if (!form.city.trim())    { toast.warning('Missing field', 'City is required'); return; }
    if (!form.contact.trim()) { toast.warning('Missing field', 'Contact number is required'); return; }
    if (form.availabilityStatus === 'not_available' && !form.availableFrom) {
      toast.warning('Missing date', 'Please set when this property will be available'); return;
    }

    setLoading(true);
    try {
      const data = new FormData();

      // Append all text fields — always append even if empty so backend receives them
      data.append('title',              form.title.trim());
      data.append('description',        form.description.trim());
      data.append('price',              form.price);
      data.append('contact',            form.contact.trim());
      data.append('city',               form.city.trim());
      data.append('area',               form.area.trim());
      data.append('location',           form.location.trim());
      data.append('size',               form.size.trim());
      data.append('propertyType',       form.propertyType);
      data.append('genderPreference',   form.genderPreference);
      data.append('availabilityStatus', form.availabilityStatus);

      // availableFrom — only send if status is not_available
      if (form.availabilityStatus === 'not_available' && form.availableFrom) {
        data.append('availableFrom', form.availableFrom);
      }

      // ── THE KEY FIX: lat/lng explicitly appended ──
      // Only append if actually set (non-empty)
      if (form.lat && form.lng) {
        data.append('lat', form.lat);
        data.append('lng', form.lng);
      }

      // Amenities as JSON array string
      data.append('amenities', JSON.stringify(amenities));

      // Images
      images.forEach(img => data.append('images', img));

      await api.post('/api/properties', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Property listed! 🏠', 'Your property is now live on NestFind');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add property';
      setError(msg);
      toast.error('Failed to add property', msg);
    } finally {
      setLoading(false); }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;}

        .ap-root{font-family:'DM Sans',sans-serif;min-height:100vh;background:#f0faf4;padding:32px 0 60px;}
        .ap-container{max-width:920px;margin:0 auto;padding:0 20px;}

        .ap-back{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1.5px solid #d1fae5;border-radius:10px;padding:8px 16px;font-size:.875rem;font-weight:600;color:#059669;cursor:pointer;transition:all .18s;margin-bottom:22px;font-family:'DM Sans',sans-serif;border:none;}
        .ap-back:hover{background:#ecfdf5;transform:translateX(-2px);}

        .ap-card{background:#fff;border-radius:22px;border:1.5px solid #e6f7ef;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,.04),0 20px 40px rgba(5,150,105,.08);}

        .ap-hero{background:linear-gradient(135deg,#064e3b,#065f46);padding:22px 28px;display:flex;align-items:center;gap:14px;}
        .ap-hero-ico{width:44px;height:44px;background:rgba(255,255,255,.12);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .ap-hero-title{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:800;color:#fff;}
        .ap-hero-sub{font-size:.78rem;color:#a7f3d0;margin-top:2px;}

        .ap-body{padding:28px;}

        .ap-section{margin-bottom:28px;}
        .ap-section-label{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:#9ca3af;margin-bottom:14px;display:flex;align-items:center;gap:8px;}
        .ap-section-label::after{content:'';flex:1;height:1px;background:linear-gradient(to right,#e5e7eb,transparent);}

        .ap-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        @media(max-width:620px){.ap-grid{grid-template-columns:1fr;}}
        .ap-full{grid-column:1/-1;}

        .ap-field{display:flex;flex-direction:column;gap:5px;}
        .ap-label{font-size:.73rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.3px;}
        .ap-optional{color:#9ca3af;font-weight:400;text-transform:none;font-size:.7rem;margin-left:4px;}

        .ap-input{width:100%;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:10px;padding:10px 13px;font-size:.875rem;font-family:'DM Sans',sans-serif;color:#0f2d1a;outline:none;transition:all .18s;}
        .ap-input::placeholder{color:#9ca3af;}
        .ap-input:focus{border-color:#34d399;background:#f0fdf4;box-shadow:0 0 0 3px rgba(52,211,153,.12);}

        .ap-select{width:100%;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:10px;padding:10px 32px 10px 13px;font-size:.875rem;font-family:'DM Sans',sans-serif;color:#0f2d1a;outline:none;cursor:pointer;transition:all .18s;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;}
        .ap-select:focus{border-color:#34d399;background-color:#f0fdf4;}

        /* Pills */
        .ap-pill-row{display:flex;flex-wrap:wrap;gap:8px;}
        .ap-pill{padding:7px 15px;border-radius:100px;border:1.5px solid #e5e7eb;font-size:.82rem;font-weight:600;color:#6b7280;cursor:pointer;transition:all .18s;background:#f9fafb;user-select:none;}
        .ap-pill:hover{border-color:#a7f3d0;color:#059669;}
        .ap-pill.on{border-color:#34d399;background:#ecfdf5;color:#065f46;}

        /* Availability date notice */
        .ap-date-notice{display:flex;align-items:flex-start;gap:9px;background:#fffbeb;border:1.5px solid #fde68a;border-radius:10px;padding:11px 14px;font-size:.8rem;color:#92400e;line-height:1.55;margin-top:12px;}
        .ap-date-notice strong{font-weight:700;}

        /* Amenities */
        .ap-amenity-tags{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:10px;}
        .ap-tag{display:inline-flex;align-items:center;gap:5px;background:#d1fae5;border:1px solid #a7f3d0;border-radius:100px;padding:4px 11px;font-size:.78rem;font-weight:600;color:#065f46;}
        .ap-tag-rm{background:none;border:none;cursor:pointer;color:#6ee7b7;padding:0;margin-left:2px;display:flex;align-items:center;font-size:15px;line-height:1;transition:color .15s;}
        .ap-tag-rm:hover{color:#059669;}
        .ap-amenity-row{display:flex;gap:8px;}
        .ap-amenity-add{background:#059669;color:#fff;border:none;border-radius:10px;padding:0 14px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .18s;height:42px;}
        .ap-amenity-add:hover{background:#047857;}
        .ap-suggest{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;}
        .ap-sug{font-size:.75rem;padding:4px 11px;border-radius:100px;border:1px solid #e5e7eb;color:#6b7280;cursor:pointer;transition:all .15s;background:#f9fafb;user-select:none;}
        .ap-sug:hover{border-color:#a7f3d0;color:#059669;background:#f0fdf4;}

        /* ── PHOTO UPLOAD ── */
        .ap-upload-zone{border:2px dashed #d1fae5;border-radius:14px;overflow:hidden;background:#fafffe;transition:all .18s;}
        .ap-upload-zone:hover{border-color:#34d399;background:#f0fdf4;}
        .ap-upload-trigger{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px 24px;cursor:pointer;gap:10px;}
        .ap-upload-ico{width:48px;height:48px;background:linear-gradient(135deg,#d1fae5,#a7f3d0);border-radius:12px;display:flex;align-items:center;justify-content:center;}
        .ap-upload-title{font-weight:700;font-size:.88rem;color:#059669;}
        .ap-upload-sub{font-size:.76rem;color:#9ca3af;}
        .ap-upload-btn{display:inline-flex;align-items:center;gap:6px;background:#ecfdf5;border:1.5px solid #a7f3d0;border-radius:9px;padding:7px 14px;font-size:.8rem;font-weight:700;color:#065f46;cursor:pointer;transition:all .18s;}
        .ap-upload-btn:hover{background:#d1fae5;}
        .ap-img-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:10px;padding:14px;}
        .ap-img-item{position:relative;border-radius:10px;overflow:hidden;aspect-ratio:1;border:1.5px solid #d1fae5;}
        .ap-img-thumb{width:100%;height:100%;object-fit:cover;display:block;}
        .ap-img-rm{position:absolute;top:4px;right:4px;background:rgba(0,0,0,.55);border:none;border-radius:6px;width:22px;height:22px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;transition:background .15s;}
        .ap-img-rm:hover{background:rgba(239,68,68,.85);}
        .ap-img-count{font-size:.74rem;color:#6b7280;padding:0 14px 12px;text-align:right;}

        /* ── MAP ── */
        .ap-map-search-row{display:flex;gap:8px;margin-bottom:10px;}
        .ap-map-search-input{flex:1;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:10px;padding:9px 13px;font-size:.875rem;font-family:'DM Sans',sans-serif;color:#0f2d1a;outline:none;transition:all .18s;}
        .ap-map-search-input:focus{border-color:#34d399;background:#f0fdf4;}
        .ap-map-search-btn{display:flex;align-items:center;gap:6px;background:#059669;color:#fff;border:none;border-radius:10px;padding:9px 16px;font-size:.82rem;font-weight:700;cursor:pointer;white-space:nowrap;font-family:'DM Sans',sans-serif;transition:background .18s;}
        .ap-map-search-btn:hover:not(:disabled){background:#047857;}
        .ap-map-search-btn:disabled{opacity:.6;cursor:not-allowed;}
        .ap-map-search-err{font-size:.78rem;color:#be123c;margin-bottom:8px;background:#fff1f2;border:1px solid #fecdd3;border-radius:8px;padding:7px 11px;}

        .ap-map-wrap{border-radius:14px;overflow:hidden;border:1.5px solid #d1fae5;position:relative;}
        .ap-map-hint{position:absolute;top:10px;left:50%;transform:translateX(-50%);z-index:1000;background:rgba(6,78,59,.88);color:#d1fae5;font-size:.74rem;font-weight:600;padding:5px 14px;border-radius:100px;white-space:nowrap;pointer-events:none;backdrop-filter:blur(6px);}
        .ap-map-coords{display:flex;gap:10px;margin-top:10px;flex-wrap:wrap;}
        .ap-coord-box{flex:1;min-width:120px;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:10px;padding:8px 12px;}
        .ap-coord-label{font-size:.68rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.3px;margin-bottom:3px;}
        .ap-coord-val{font-size:.88rem;font-weight:700;color:#0f2d1a;font-family:monospace;}
        .ap-coord-val.empty{color:#9ca3af;font-weight:400;font-family:'DM Sans',sans-serif;font-size:.8rem;}
        .ap-clear-pin{background:#fff1f2;border:1.5px solid #fecdd3;border-radius:9px;padding:0 13px;color:#be123c;font-size:.78rem;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;white-space:nowrap;transition:all .18s;height:100%;}
        .ap-clear-pin:hover{background:#ffe4e6;}

        /* Manual coord inputs */
        .ap-manual-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px;}
        .ap-manual-label{font-size:.68rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.3px;margin-bottom:4px;}

        /* Submit */
        .ap-footer{padding-top:8px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;}
        .ap-submit{display:flex;align-items:center;gap:8px;background:linear-gradient(135deg,#059669,#047857);color:#fff;padding:13px 28px;border-radius:12px;border:none;font-size:.95rem;font-weight:700;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;box-shadow:0 6px 18px rgba(5,150,105,.28);}
        .ap-submit:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 24px rgba(5,150,105,.42);}
        .ap-submit:disabled{opacity:.6;cursor:not-allowed;transform:none;}
        .ap-spin{width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:apSpn .7s linear infinite;}
        @keyframes apSpn{to{transform:rotate(360deg);}}
        .ap-cancel{display:flex;align-items:center;gap:6px;background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:12px;padding:13px 20px;font-size:.875rem;font-weight:600;color:#6b7280;cursor:pointer;transition:all .18s;font-family:'DM Sans',sans-serif;}
        .ap-cancel:hover{background:#f3f4f6;}

        /* Leaflet z-fix */
        .leaflet-pane{z-index:0!important;}
        .leaflet-top,.leaflet-bottom{z-index:1!important;}
      `}</style>

      <div className="ap-root">
        <div className="ap-container">

          <button onClick={() => navigate(-1)} className="ap-back">
            <ArrowLeft size={15}/> Back
          </button>

          {error && <Alert type="error" message={error} onClose={() => setError('')}/>}

          <form onSubmit={submit}>
            <div className="ap-card">

              <div className="ap-hero">
                <div className="ap-hero-ico"><Home size={20} color="#6ee7b7"/></div>
                <div>
                  <div className="ap-hero-title">List a New Property</div>
                  <div className="ap-hero-sub">Fill in the details — your listing goes live immediately</div>
                </div>
              </div>

              <div className="ap-body">

                {/* ── BASIC INFO ── */}
                <div className="ap-section">
                  <div className="ap-section-label">Basic Information</div>
                  <div className="ap-grid">
                    <div className="ap-field ap-full">
                      <label className="ap-label">Property Title *</label>
                      <input name="title" value={form.title} onChange={handle} className="ap-input" placeholder="e.g. Spacious Boys PG near MG Road"/>
                    </div>
                    <div className="ap-field ap-full">
                      <label className="ap-label">Description <span className="ap-optional">(optional)</span></label>
                      <textarea name="description" value={form.description} onChange={handle} className="ap-input" placeholder="Describe rules, furnishing, nearby landmarks…" style={{minHeight:80,resize:'vertical'}}/>
                    </div>
                    <div className="ap-field">
                      <label className="ap-label">Monthly Rent (₹) *</label>
                      <input name="price" type="number" min="0" value={form.price} onChange={handle} className="ap-input" placeholder="e.g. 8000"/>
                    </div>
                    <div className="ap-field">
                      <label className="ap-label">Contact Number *</label>
                      <input name="contact" value={form.contact} onChange={handle} className="ap-input" placeholder="+91 98765 43210"/>
                    </div>
                  </div>
                </div>

                {/* ── LOCATION ── */}
                <div className="ap-section">
                  <div className="ap-section-label">Location</div>
                  <div className="ap-grid">
                    <div className="ap-field">
                      <label className="ap-label">City *</label>
                      <input
                        name="city" value={form.city} onChange={handle}
                        onBlur={handleCityBlur}
                        className="ap-input" placeholder="e.g. Surat"
                      />
                    </div>
                    <div className="ap-field">
                      <label className="ap-label">Area / Locality <span className="ap-optional">(optional)</span></label>
                      <input name="area" value={form.area} onChange={handle} className="ap-input" placeholder="e.g. Adajan"/>
                    </div>
                    <div className="ap-field ap-full">
                      <label className="ap-label">Full Address <span className="ap-optional">(optional)</span></label>
                      <input name="location" value={form.location} onChange={handle} className="ap-input" placeholder="Street name, landmark, pin code…"/>
                    </div>
                  </div>
                </div>

                {/* ── PROPERTY DETAILS ── */}
                <div className="ap-section">
                  <div className="ap-section-label">Property Details</div>
                  <div className="ap-grid">
                    <div className="ap-field">
                      <label className="ap-label">Property Type</label>
                      <div className="ap-pill-row">
                        {PROPERTY_TYPES.map(t => (
                          <div
                            key={t}
                            className={`ap-pill ${form.propertyType === t ? 'on' : ''}`}
                            onClick={() => setForm(p => ({ ...p, propertyType: t }))}
                          >{t}</div>
                        ))}
                      </div>
                    </div>
                    <div className="ap-field">
                      <label className="ap-label">Gender Preference</label>
                      <div className="ap-pill-row">
                        {GENDER_PREFS.map(g => (
                          <div
                            key={g}
                            className={`ap-pill ${form.genderPreference === g ? 'on' : ''}`}
                            onClick={() => setForm(p => ({ ...p, genderPreference: g }))}
                          >{g}</div>
                        ))}
                      </div>
                    </div>
                    <div className="ap-field">
                      <label className="ap-label">Size <span className="ap-optional">(optional)</span></label>
                      <input name="size" value={form.size} onChange={handle} className="ap-input" placeholder="e.g. 2 BHK or 1200 sq ft"/>
                    </div>
                    <div className="ap-field">
                      <label className="ap-label">Availability Status</label>
                      <select name="availabilityStatus" value={form.availabilityStatus} onChange={handle} className="ap-select">
                        <option value="available">Available Now</option>
                        <option value="not_available">Not Available</option>
                      </select>
                    </div>

                    {/* ── Available From date — only when not_available ── */}
                    {form.availabilityStatus === 'not_available' && (
                      <div className="ap-field ap-full">
                        <label className="ap-label">
                          Available From *
                          <span className="ap-optional"> — when will it become available?</span>
                        </label>
                        <input
                          type="date"
                          name="availableFrom"
                          value={form.availableFrom}
                          onChange={handle}
                          min={todayStr}
                          className="ap-input"
                          style={{maxWidth:220}}
                        />
                        {form.availableFrom && (
                          <div className="ap-date-notice">
                            <span style={{fontSize:14,flexShrink:0}}>ℹ️</span>
                            <span>
                              This property will <strong>automatically show as available</strong> on{' '}
                              <strong>{new Date(form.availableFrom).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</strong>.
                              The cron job updates the status automatically on that date.
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* ── AMENITIES ── */}
                <div className="ap-section">
                  <div className="ap-section-label">Amenities <span className="ap-optional" style={{fontWeight:400,textTransform:'none',letterSpacing:0}}>click suggestions or type your own</span></div>
                  {amenities.length > 0 && (
                    <div className="ap-amenity-tags">
                      {amenities.map(a => (
                        <span key={a} className="ap-tag">
                          <Wifi size={11}/> {a}
                          <button type="button" className="ap-tag-rm" onClick={() => removeAmenity(a)}>×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="ap-amenity-row">
                    <input
                      value={amenityInput}
                      onChange={e => setAmenityInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addAmenity(amenityInput); }}}
                      className="ap-input" placeholder="Type an amenity and press Enter…" style={{flex:1}}
                    />
                    <button type="button" onClick={() => addAmenity(amenityInput)} className="ap-amenity-add">
                      <Plus size={18}/>
                    </button>
                  </div>
                  <div className="ap-suggest">
                    {AMENITY_SUGGESTIONS.filter(s => !amenities.includes(s)).map(s => (
                      <span key={s} className="ap-sug" onClick={() => addAmenity(s)}>+ {s}</span>
                    ))}
                  </div>
                </div>

                {/* ── PHOTOS ── */}
                <div className="ap-section">
                  <div className="ap-section-label">Photos <span className="ap-optional" style={{fontWeight:400,textTransform:'none',letterSpacing:0}}>optional — multiple allowed</span></div>
                  <div className="ap-upload-zone">
                    <label className="ap-upload-trigger" style={{cursor:'pointer'}}>
                      <input type="file" accept="image/*" multiple onChange={handleImages} style={{display:'none'}}/>
                      <div className="ap-upload-ico"><Upload size={20} color="#059669"/></div>
                      <div className="ap-upload-title">Upload Property Photos</div>
                      <div className="ap-upload-sub">PNG, JPG, WEBP · Max 5 MB each</div>
                      <span className="ap-upload-btn"><Image size={13}/> Choose Photos</span>
                    </label>
                    {imagePreviews.length > 0 && (
                      <>
                        <div style={{height:1,background:'#e6f7ef',margin:'0 14px'}}/>
                        <div className="ap-img-grid">
                          {imagePreviews.map((src, i) => (
                            <div key={i} className="ap-img-item">
                              <img src={src} className="ap-img-thumb" alt={`photo ${i+1}`}/>
                              <button type="button" className="ap-img-rm" onClick={() => removeImage(i)}><X size={12}/></button>
                            </div>
                          ))}
                        </div>
                        <div className="ap-img-count">{imagePreviews.length} photo{imagePreviews.length !== 1 ? 's' : ''} selected</div>
                      </>
                    )}
                  </div>
                </div>

                {/* ── MAP LOCATION PICKER ── */}
                <div className="ap-section">
                  <div className="ap-section-label"><Map size={13}/> Pin Location on Map <span className="ap-optional" style={{fontWeight:400,textTransform:'none',letterSpacing:0}}>optional — helps tenants find your property</span></div>

                  {/* Search box */}
                  <div className="ap-map-search-row">
                    <input
                      value={mapSearch}
                      onChange={e => setMapSearch(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleMapSearch())}
                      className="ap-map-search-input"
                      placeholder="Search area, landmark or address… (e.g. Adajan Surat)"
                    />
                    <button
                      type="button"
                      onClick={handleMapSearch}
                      disabled={mapSearching || !mapSearch.trim()}
                      className="ap-map-search-btn"
                    >
                      {mapSearching
                        ? <><div className="ap-spin" style={{borderTopColor:'#fff'}}/> Searching…</>
                        : <><Search size={14}/> Search</>
                      }
                    </button>
                  </div>
                  {mapSearchErr && <div className="ap-map-search-err">{mapSearchErr}</div>}

                  <div style={{fontSize:'.78rem',color:'#6b7280',marginBottom:8}}>
                    After searching, <strong style={{color:'#059669'}}>click anywhere on the map</strong> to drop your exact pin.
                  </div>

                  {/* Map */}
                  <div className="ap-map-wrap">
                    <div className="ap-map-hint">
                      {mapPin ? '✓ Pin placed — drag or click to reposition' : 'Click on the map to drop a pin'}
                    </div>
                    <MapContainer
                      center={mapFlyTarget ? [mapFlyTarget.lat, mapFlyTarget.lng] : INDIA_CENTER}
                      zoom={mapFlyTarget ? 14 : 5}
                      style={{height:340, width:'100%'}}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <MapClickHandler onPick={handleMapPick}/>
                      <MapFlyTo target={mapFlyTarget}/>
                      {mapPin && <Marker position={[mapPin.lat, mapPin.lng]}/>}
                    </MapContainer>
                  </div>

                  {/* Coordinate display */}
                  <div className="ap-map-coords">
                    <div className="ap-coord-box">
                      <div className="ap-coord-label">Latitude</div>
                      <div className={`ap-coord-val ${mapPin ? '' : 'empty'}`}>
                        {mapPin ? mapPin.lat : 'Not set — click map'}
                      </div>
                    </div>
                    <div className="ap-coord-box">
                      <div className="ap-coord-label">Longitude</div>
                      <div className={`ap-coord-val ${mapPin ? '' : 'empty'}`}>
                        {mapPin ? mapPin.lng : 'Not set — click map'}
                      </div>
                    </div>
                    {mapPin && (
                      <button type="button" onClick={clearPin} className="ap-clear-pin">
                        Clear pin
                      </button>
                    )}
                  </div>

                  {/* Manual coordinate entry */}
                  <details style={{marginTop:12}}>
                    <summary style={{fontSize:'.78rem',color:'#6b7280',cursor:'pointer',userSelect:'none',fontWeight:600}}>
                      Or enter coordinates manually
                    </summary>
                    <div className="ap-manual-row" style={{marginTop:8}}>
                      <div>
                        <div className="ap-manual-label">Latitude</div>
                        <input
                          name="lat" type="number" step="any"
                          value={form.lat} onChange={e => {
                            handle(e);
                            if (e.target.value && form.lng) setMapPin({ lat: parseFloat(e.target.value), lng: parseFloat(form.lng) });
                          }}
                          className="ap-input" placeholder="e.g. 21.1702"
                        />
                      </div>
                      <div>
                        <div className="ap-manual-label">Longitude</div>
                        <input
                          name="lng" type="number" step="any"
                          value={form.lng} onChange={e => {
                            handle(e);
                            if (form.lat && e.target.value) setMapPin({ lat: parseFloat(form.lat), lng: parseFloat(e.target.value) });
                          }}
                          className="ap-input" placeholder="e.g. 72.8311"
                        />
                      </div>
                    </div>
                  </details>
                </div>

                {/* ── SUBMIT ── */}
                <div className="ap-footer">
                  <button type="submit" disabled={loading} className="ap-submit">
                    {loading ? <><div className="ap-spin"/> Publishing…</> : <><Save size={16}/> Publish Property</>}
                  </button>
                  <button type="button" onClick={() => navigate(-1)} className="ap-cancel">
                    <X size={15}/> Cancel
                  </button>
                  {!mapPin && (
                    <span style={{fontSize:'.78rem',color:'#9ca3af',marginLeft:4}}>
                      Tip: Adding a map pin helps your property appear in map view
                    </span>
                  )}
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}