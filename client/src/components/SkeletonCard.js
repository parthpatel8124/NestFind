// src/components/SkeletonCard.jsx
// Shimmer loading skeleton shown while properties are fetching.
// USAGE in HomePage — replace spinner:
//   import SkeletonCard from '../components/SkeletonCard';
//   {loading && <div className="hm-grid">{Array.from({length:9}).map((_,i)=><SkeletonCard key={i}/>)}</div>}

import React from 'react';

export default function SkeletonCard() {
  return (
    <>
      <style>{`
        @keyframes skshimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
        .sk-card{background:#fff;border-radius:18px;border:1.5px solid #e6f7ef;overflow:hidden;box-shadow:0 2px 8px rgba(5,150,105,.05);}
        .sk-shine{background:linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 37%,#f0f0f0 63%);background-size:800px 100%;animation:skshimmer 1.4s infinite linear;}
        .sk-img{height:180px;width:100%;}
        .sk-body{padding:16px;}
        .sk-line{height:14px;border-radius:6px;margin-bottom:10px;}
        .sk-row{display:flex;gap:8px;margin-top:14px;}
        .sk-pill{height:26px;border-radius:100px;}
        .sk-footer{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding-top:12px;border-top:1px solid #f0fdf4;}
        .sk-price{height:20px;width:80px;border-radius:6px;}
        .sk-btn{height:32px;width:90px;border-radius:8px;}
      `}</style>
      <div className="sk-card">
        <div className="sk-img sk-shine" />
        <div className="sk-body">
          <div className="sk-line sk-shine" style={{ width: '75%' }} />
          <div className="sk-line sk-shine" style={{ width: '50%' }} />
          <div className="sk-line sk-shine" style={{ width: '90%' }} />
          <div className="sk-row">
            <div className="sk-pill sk-shine" style={{ width: 70 }} />
            <div className="sk-pill sk-shine" style={{ width: 55 }} />
            <div className="sk-pill sk-shine" style={{ width: 70 }} />
          </div>
          <div className="sk-footer">
            <div className="sk-price sk-shine" />
            <div className="sk-btn sk-shine" />
          </div>
        </div>
      </div>
    </>
  );
}