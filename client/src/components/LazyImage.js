// src/components/LazyImage.jsx
// Lazy-loads images — only loads when scrolled into view.
// USAGE in PropertyCard.jsx:
//   import LazyImage from './LazyImage';
//   <LazyImage src={property.images?.[0]||property.image} alt={property.title} className="pc-img" style={{height:'100%',width:'100%'}}/>

import React, { useState, useEffect, useRef } from 'react';

export default function LazyImage({ src, alt, className, style }) {
  const [loaded,  setLoaded]  = useState(false);
  const [error,   setError]   = useState(false);
  const [visible, setVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (!window.IntersectionObserver) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: '200px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const noImage = !src || error;

  return (
    <>
      <style>{`
        @keyframes liShimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
        .li-wrap{position:relative;overflow:hidden;background:#f0fdf4;}
        .li-shimmer{position:absolute;inset:0;background:linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 37%,#f0f0f0 63%);background-size:800px 100%;animation:liShimmer 1.4s infinite linear;transition:opacity .3s;}
        .li-shimmer.li-hidden{opacity:0;pointer-events:none;}
        .li-img{width:100%;height:100%;object-fit:cover;display:block;opacity:0;transition:opacity .35s ease;}
        .li-img.li-loaded{opacity:1;}
        .li-placeholder{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:6px;background:#ecfdf5;}
        .li-placeholder-icon{font-size:2rem;opacity:.5;}
        .li-placeholder-text{font-size:.72rem;color:#9ca3af;font-family:'DM Sans',sans-serif;}
      `}</style>
      <div ref={imgRef} className={`li-wrap ${className || ''}`} style={style}>
        {!noImage && <div className={`li-shimmer ${loaded ? 'li-hidden' : ''}`} />}
        {noImage && <div className="li-placeholder"><div className="li-placeholder-icon">🏠</div><div className="li-placeholder-text">No photo</div></div>}
        {!noImage && visible && (
          <img src={src} alt={alt || ''} className={`li-img ${loaded ? 'li-loaded' : ''}`} onLoad={() => setLoaded(true)} onError={() => setError(true)} />
        )}
      </div>
    </>
  );
}