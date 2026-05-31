// src/components/StarRating.jsx
// Reusable star rating component.
// Props:
//   rating     — current value (1-5)
//   onChange   — called with new value when user clicks (omit to make read-only)
//   size       — star size in px (default 20)
//   showValue  — show numeric value next to stars (default false)

import React, { useState } from 'react';

function StarRating({ rating = 0, onChange, size = 20, showValue = false }) {
  const [hovered, setHovered] = useState(0);
  const isInteractive = typeof onChange === 'function';
  const display = isInteractive ? (hovered || rating) : rating;

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(star => {
        // Support half-stars for display (read-only) mode
        const filled = display >= star;
        const half = !filled && display >= star - 0.5;

        return (
          <span
            key={star}
            onClick={() => isInteractive && onChange(star)}
            onMouseEnter={() => isInteractive && setHovered(star)}
            onMouseLeave={() => isInteractive && setHovered(0)}
            style={{
              cursor: isInteractive ? 'pointer' : 'default',
              fontSize: size,
              lineHeight: 1,
              color: filled || half ? '#f59e0b' : '#d1d5db',
              transition: 'color 0.1s, transform 0.1s',
              transform: isInteractive && hovered === star ? 'scale(1.2)' : 'scale(1)',
              display: 'inline-block',
              userSelect: 'none',
            }}
          >
            {half ? '⭐' : filled ? '★' : '☆'}
          </span>
        );
      })}

      {showValue && rating > 0 && (
        <span style={{
          marginLeft: 5,
          fontSize: size * 0.75,
          fontWeight: 700,
          color: '#059669',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {Number(rating).toFixed(1)}
        </span>
      )}
    </span>
  );
}

export default StarRating;