import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.clear();
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="lo-root">

      {/* Background */}
      <div className="lo-grid" />
      <div className="lo-blob1" />
      <div className="lo-blob2" />

      {/* Card */}
      <div className="lo-card">

        <div className="lo-icon">✓</div>

        <h2 className="lo-title">Logging you out...</h2>

        <p className="lo-text">
          Please wait while we securely sign you out.
        </p>

        <div className="lo-loader"></div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .lo-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0faf4;
          position: relative;
          overflow: hidden;
        }

        /* Background grid */
        .lo-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(5,150,105,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(5,150,105,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Blobs */
        .lo-blob1 {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(52,211,153,0.2), transparent 70%);
          bottom: -60px;
          right: -60px;
          border-radius: 50%;
        }

        .lo-blob2 {
          position: absolute;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%);
          top: 60px;
          left: -40px;
          border-radius: 50%;
        }

        /* Card */
        .lo-card {
          position: relative;
          z-index: 2;
          background: #fff;
          padding: 40px 34px;
          border-radius: 24px;
          text-align: center;
          border: 1.5px solid #d1fae5;
          box-shadow:
            0 4px 6px rgba(0,0,0,0.04),
            0 20px 40px rgba(5,150,105,0.1);
          animation: loEnter 0.4s ease;
        }

        @keyframes loEnter {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Icon */
        .lo-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto 14px;
          border-radius: 50%;
          background: #ecfdf5;
          color: #059669;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          font-weight: bold;
          animation: popIn 0.4s ease;
        }

        @keyframes popIn {
          from {
            transform: scale(0.7);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Text */
        .lo-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: #0f2d1a;
          margin-bottom: 6px;
        }

        .lo-text {
          font-size: 0.9rem;
          color: #6b7280;
          margin-bottom: 18px;
        }

        /* Loader */
        .lo-loader {
          width: 28px;
          height: 28px;
          border: 3px solid rgba(5,150,105,0.2);
          border-top-color: #059669;
          border-radius: 50%;
          margin: 0 auto;
          animation: spin 0.8s linear infinite, fadeIn 0.4s ease;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Logout;