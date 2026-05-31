// src/components/ReviewSection.jsx
// Drop this inside PropertyDetails.jsx just above the bookings section.
// Usage: <ReviewSection propertyId={id} />

import React, { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';
import StarRating from './StarRating';
import { Trash2, MessageSquare, Send, ShieldAlert } from 'lucide-react';


function ReviewSection({ propertyId }) {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [myRating, setMyRating] = useState(0);
  const [myComment, setMyComment] = useState('');

  const isAdmin = user?.role === 'admin';

  // Check if current user already left a review
  const alreadyReviewed = reviews.some(
    r => r.userId === user?.id || r.userId?._id === user?.id
  );

  useEffect(() => {
    fetchReviews();
  }, [propertyId]);

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/api/reviews/${propertyId}`);
      setReviews(res.data);
    } catch {
      // silently fail — not critical
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (myRating === 0) {
      setError('Please select a star rating');
      return;
    }
    if (myComment.trim().length < 10) {
      setError('Please write at least 10 characters');
      return;
    }

    setSubmitting(true);
    try {
      await api.post(`/api/reviews/${propertyId}`, {
        rating: myRating,
        comment: myComment.trim(),
      });
      setSuccess('Review submitted! Thank you.');
      setMyRating(0);
      setMyComment('');
      await fetchReviews();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await api.delete(`/api/reviews/${reviewId}`);
      await fetchReviews();
    } catch {
      setError('Failed to delete review');
    }
  };

  // ── Rating breakdown (how many of each star) ──
  const breakdown = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
  }));
  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .rv-root { font-family: 'DM Sans', sans-serif; }

        /* Header */
        .rv-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .rv-header-icon { width: 36px; height: 36px; background: #fef9c3; border: 1.5px solid #fde68a; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .rv-header-title { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 800; color: #0f2d1a; }
        .rv-count-chip { background: #d1fae5; color: #065f46; border-radius: 100px; font-size: 0.72rem; font-weight: 800; padding: 2px 9px; }

        /* Summary panel */
        .rv-summary {
          display: flex; gap: 20px; align-items: center;
          background: #f9fafb; border: 1.5px solid #e5e7eb;
          border-radius: 16px; padding: 18px 20px; margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .rv-avg-num { font-family: 'Syne', sans-serif; font-size: 3rem; font-weight: 800; color: #0f2d1a; line-height: 1; }
        .rv-avg-label { font-size: 0.78rem; color: #6b7280; margin-top: 4px; }
        .rv-breakdown { flex: 1; min-width: 160px; display: flex; flex-direction: column; gap: 5px; }
        .rv-bar-row { display: flex; align-items: center; gap: 8px; font-size: 0.78rem; color: #6b7280; }
        .rv-bar-track { flex: 1; height: 6px; background: #e5e7eb; border-radius: 100px; overflow: hidden; }
        .rv-bar-fill { height: 100%; background: #f59e0b; border-radius: 100px; transition: width 0.4s ease; }
        .rv-bar-count { min-width: 16px; text-align: right; font-weight: 600; color: #374151; }

        /* Submit form */
        .rv-form {
          background: #fff; border: 1.5px solid #d1fae5;
          border-radius: 16px; padding: 20px; margin-bottom: 24px;
        }
        .rv-form-title { font-size: 0.88rem; font-weight: 700; color: #065f46; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.3px; }
        .rv-star-row { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
        .rv-star-label { font-size: 0.82rem; color: #6b7280; }
        .rv-textarea {
          width: 100%; background: #f9fafb; border: 1.5px solid #e5e7eb;
          border-radius: 12px; padding: 11px 14px; font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif; color: #0f2d1a;
          outline: none; resize: vertical; min-height: 80px;
          transition: all 0.18s; margin-bottom: 12px;
        }
        .rv-textarea::placeholder { color: #9ca3af; }
        .rv-textarea:focus { border-color: #34d399; background: #f0fdf4; box-shadow: 0 0 0 3px rgba(52,211,153,0.15); }
        .rv-submit-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg, #059669, #047857);
          color: #fff; padding: 10px 20px; border-radius: 11px; border: none;
          font-size: 0.875rem; font-weight: 700; cursor: pointer;
          transition: all 0.18s; font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 14px rgba(5,150,105,0.28);
        }
        .rv-submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(5,150,105,0.4); }
        .rv-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .rv-spinner { width: 15px; height: 15px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: rvSpin 0.7s linear infinite; }
        @keyframes rvSpin { to { transform: rotate(360deg); } }

        /* Alerts */
        .rv-alert-err { background: #fff1f2; border: 1.5px solid #fecdd3; border-radius: 10px; padding: 10px 14px; font-size: 0.82rem; font-weight: 600; color: #be123c; margin-bottom: 12px; }
        .rv-alert-ok { background: #dcfce7; border: 1.5px solid #a7f3d0; border-radius: 10px; padding: 10px 14px; font-size: 0.82rem; font-weight: 600; color: #166534; margin-bottom: 12px; }

        /* Gate messages */
        .rv-gate { display: flex; align-items: center; gap: 10px; background: #fefce8; border: 1.5px solid #fef08a; border-radius: 12px; padding: 13px 16px; font-size: 0.875rem; color: #854d0e; font-weight: 500; margin-bottom: 24px; }

        /* Review cards */
        .rv-card { background: #fff; border: 1.5px solid #e6f7ef; border-radius: 14px; padding: 16px 18px; margin-bottom: 12px; transition: border-color 0.18s; }
        .rv-card:hover { border-color: #a7f3d0; }
        .rv-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 8px; gap: 10px; }
        .rv-card-left { display: flex; align-items: center; gap: 10px; }
        .rv-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #d1fae5, #a7f3d0); display: flex; align-items: center; justify-content: center; font-size: 0.82rem; font-weight: 800; color: #065f46; flex-shrink: 0; }
        .rv-username { font-weight: 700; font-size: 0.9rem; color: #0f2d1a; }
        .rv-date { font-size: 0.75rem; color: #9ca3af; margin-top: 2px; }
        .rv-comment { font-size: 0.88rem; color: #374151; line-height: 1.6; }
        .rv-delete-btn { background: none; border: none; color: #9ca3af; cursor: pointer; padding: 4px; transition: color 0.18s; flex-shrink: 0; }
        .rv-delete-btn:hover { color: #ef4444; }

        /* Empty */
        .rv-empty { text-align: center; padding: 32px 0; color: #9ca3af; font-size: 0.9rem; }
        .rv-empty-icon { margin: 0 auto 10px; display: block; }
      `}</style>

      <div className="rv-root">

        {/* Header */}
        <div className="rv-header">
          <div className="rv-header-icon">
            <span style={{ fontSize: 16 }}>⭐</span>
          </div>
          <span className="rv-header-title">Reviews</span>
          {reviews.length > 0 && (
            <span className="rv-count-chip">{reviews.length}</span>
          )}
        </div>

        {/* Rating summary */}
        {reviews.length > 0 && (
          <div className="rv-summary">
            <div style={{ textAlign: 'center', minWidth: 80 }}>
              <div className="rv-avg-num">{avgRating.toFixed(1)}</div>
              <StarRating rating={avgRating} size={16} />
              <div className="rv-avg-label">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</div>
            </div>
            <div className="rv-breakdown">
              {breakdown.map(({ star, count }) => (
                <div key={star} className="rv-bar-row">
                  <span style={{ minWidth: 8 }}>{star}</span>
                  <span style={{ fontSize: 13, color: '#f59e0b' }}>★</span>
                  <div className="rv-bar-track">
                    <div
                      className="rv-bar-fill"
                      style={{ width: reviews.length ? `${(count / reviews.length) * 100}%` : '0%' }}
                    />
                  </div>
                  <span className="rv-bar-count">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit form — only for logged-in users who haven't reviewed yet */}
        {!user ? (
          <div className="rv-gate">
            <ShieldAlert size={17} />
            <span>Please <a href="/login" style={{ color: '#059669', fontWeight: 700 }}>sign in</a> to leave a review.</span>
          </div>
        ) : alreadyReviewed ? (
          <div className="rv-gate" style={{ background: '#dcfce7', borderColor: '#a7f3d0', color: '#166534' }}>
            ✓ You've already reviewed this property.
          </div>
        ) : (
          <div className="rv-form">
            <div className="rv-form-title">Write a review</div>

            {error && <div className="rv-alert-err">{error}</div>}
            {success && <div className="rv-alert-ok">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="rv-star-row">
                <span className="rv-star-label">Your rating:</span>
                <StarRating rating={myRating} onChange={setMyRating} size={28} />
                {myRating > 0 && (
                  <span style={{ fontSize: '0.82rem', color: '#6b7280', marginLeft: 4 }}>
                    {['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'][myRating]}
                  </span>
                )}
              </div>

              <textarea
                value={myComment}
                onChange={e => setMyComment(e.target.value)}
                placeholder="Share your experience — cleanliness, owner responsiveness, location, value for money…"
                className="rv-textarea"
                maxLength={1000}
              />
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: 12, textAlign: 'right' }}>
                {myComment.length}/1000
              </div>

              <button type="submit" disabled={submitting} className="rv-submit-btn">
                {submitting
                  ? <><div className="rv-spinner" /> Submitting…</>
                  : <><Send size={15} /> Submit Review</>
                }
              </button>
            </form>
          </div>
        )}

        {/* Review list */}
        {loading ? (
          <div className="rv-empty">Loading reviews…</div>
        ) : reviews.length === 0 ? (
          <div className="rv-empty">
            <MessageSquare size={32} color="#d1fae5" className="rv-empty-icon" />
            No reviews yet. Be the first to review!
          </div>
        ) : (
          reviews.map(r => {
            const initials = r.userName
              ? r.userName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
              : '?';
            const canDelete = isAdmin || r.userId === user?.id || r.userId?._id === user?.id;

            return (
              <div key={r._id} className="rv-card">
                <div className="rv-card-top">
                  <div className="rv-card-left">
                    <div className="rv-avatar">{initials}</div>
                    <div>
                      <div className="rv-username">{r.userName}</div>
                      <StarRating rating={r.rating} size={14} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="rv-date">
                      {new Date(r.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </span>
                    {canDelete && (
                      <button onClick={() => handleDelete(r._id)} className="rv-delete-btn" title="Delete review">
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>
                {r.comment && <p className="rv-comment">{r.comment}</p>}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default ReviewSection;