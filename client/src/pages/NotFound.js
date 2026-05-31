import React from "react";

function NotFound() {
  return (
    <div className="nf-root">
      {/* subtle background elements */}
      <div className="nf-grid" />
      <div className="nf-blob1" />
      <div className="nf-blob2" />

      <div className="nf-content">
        <h1 className="nf-code">404</h1>

        <h2 className="nf-title">Page Not Found</h2>

        <p className="nf-text">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <a href="/" className="nf-btn">
          Go back home →
        </a>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }

        .nf-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #f0faf4 0%, #ecfdf5 100%);
          position: relative;
          overflow: hidden;
          padding: 20px;
        }

        /* Background design (same vibe as your left panel) */
        .nf-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(5,150,105,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(5,150,105,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .nf-blob1 {
          position: absolute;
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(52,211,153,0.18), transparent 70%);
          bottom: -80px; right: -80px;
          border-radius: 50%;
        }

        .nf-blob2 {
          position: absolute;
          width: 240px; height: 240px;
          background: radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%);
          top: 60px; left: -60px;
          border-radius: 50%;
        }

        .nf-content {
          text-align: center;
          z-index: 2;
          animation: nfEnter 0.5s ease;
        }

        @keyframes nfEnter {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nf-code {
          font-family: 'Syne', sans-serif;
          font-size: 5rem;
          font-weight: 800;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #059669, #047857);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nf-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          color: #0f2d1a;
          margin-bottom: 10px;
        }

        .nf-text {
          font-size: 0.95rem;
          color: #6b7280;
          margin-bottom: 28px;
        }

        .nf-btn {
          display: inline-block;
          background: linear-gradient(135deg, #059669, #047857);
          color: #fff;
          padding: 13px 26px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.92rem;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: 0 6px 20px rgba(5,150,105,0.3);
        }

        .nf-btn:hover {
          background: linear-gradient(135deg, #047857, #065f46);
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(5,150,105,0.4);
        }

        /* Interactivity only */
        .nf-btn:active {
          transform: scale(0.96);
        }
      `}</style>
    </div>
  );
}

export default NotFound;
