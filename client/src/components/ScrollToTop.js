// src/components/ScrollToTop.jsx
// Fixed bottom-right scroll-to-top button. Shows after 300px scroll.
// USAGE in App.jsx — add <ScrollToTop /> after </Routes> inside Router

import React, { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        .stt-btn{position:fixed;bottom:28px;right:28px;z-index:9999;width:46px;height:46px;border-radius:13px;border:none;cursor:pointer;background:linear-gradient(135deg,#059669,#047857);color:#fff;box-shadow:0 4px 16px rgba(5,150,105,.38);display:flex;align-items:center;justify-content:center;opacity:0;transform:translateY(16px) scale(.88);pointer-events:none;transition:opacity .25s ease,transform .25s ease;}
        .stt-btn.stt-visible{opacity:1;transform:translateY(0) scale(1);pointer-events:all;}
        .stt-btn:hover{background:linear-gradient(135deg,#047857,#065f46);transform:translateY(-2px) scale(1.06)!important;box-shadow:0 8px 24px rgba(5,150,105,.45);}
        .stt-btn:active{transform:scale(.95)!important;}
        .stt-arrow{width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:8px solid #fff;margin-bottom:2px;}
      `}</style>
      <button className={`stt-btn ${visible ? 'stt-visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Scroll to top" aria-label="Scroll to top">
        <div className="stt-arrow" />
      </button>
    </>
  );
}