// src/components/Toast.jsx
// A self-contained toast system. Use the useToast() hook anywhere in your app.
//
// SETUP in main.jsx / App.jsx:
//   import { ToastProvider } from './components/Toast';
//   wrap your app: <ToastProvider><App /></ToastProvider>
//
// USAGE in any component:
//   import { useToast } from './components/Toast';
//   const toast = useToast();
//   toast.success('Property added!');
//   toast.error('Something went wrong');
//   toast.info('Booking request sent');
//   toast.warning('Fill all required fields');

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext(null);

const ICONS = {
  success: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
};

const STYLES = {
  success: { bg: '#ecfdf5', border: '#a7f3d0', icon: '#059669', bar: '#059669', text: '#065f46', sub: '#6b7280' },
  error:   { bg: '#fff1f2', border: '#fecdd3', icon: '#e11d48', bar: '#e11d48', text: '#9f1239', sub: '#6b7280' },
  warning: { bg: '#fffbeb', border: '#fde68a', icon: '#d97706', bar: '#d97706', text: '#92400e', sub: '#6b7280' },
  info:    { bg: '#eff6ff', border: '#bfdbfe', icon: '#2563eb', bar: '#2563eb', text: '#1e40af', sub: '#6b7280' },
};

function ToastItem({ toast, onRemove }) {
  const s = STYLES[toast.type] || STYLES.info;
  return (
    <div
      style={{
        position: 'relative',
        background: s.bg,
        border: `1.5px solid ${s.border}`,
        borderRadius: 14,
        padding: '13px 42px 13px 14px',
        minWidth: 280,
        maxWidth: 380,
        boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
        animation: 'toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        fontFamily: "'DM Sans', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        height: 3, background: s.bar, borderRadius: '0 0 0 14px',
        animation: `toastBar ${toast.duration}ms linear forwards`,
        transformOrigin: 'left',
      }}/>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        {/* Icon */}
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: `${s.icon}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: s.icon, flexShrink: 0,
        }}>
          {ICONS[toast.type]}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: s.text, lineHeight: 1.3, marginBottom: toast.subtitle ? 3 : 0 }}>
            {toast.message}
          </div>
          {toast.subtitle && (
            <div style={{ fontSize: '0.78rem', color: s.sub, lineHeight: 1.4 }}>{toast.subtitle}</div>
          )}
        </div>
      </div>

      {/* Close */}
      <button
        onClick={() => onRemove(toast.id)}
        style={{
          position: 'absolute', top: 10, right: 10,
          background: 'none', border: 'none', cursor: 'pointer',
          color: s.sub, padding: 3, borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.15s',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counterRef = useRef(0);

  const addToast = useCallback(({ type = 'info', message, subtitle, duration = 4000 }) => {
    const id = ++counterRef.current;
    setToasts(prev => [...prev, { id, type, message, subtitle, duration }]);
    setTimeout(() => removeToast(id), duration + 300);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (message, subtitle) => addToast({ type: 'success', message, subtitle }),
    error:   (message, subtitle) => addToast({ type: 'error',   message, subtitle }),
    warning: (message, subtitle) => addToast({ type: 'warning', message, subtitle }),
    info:    (message, subtitle) => addToast({ type: 'info',    message, subtitle }),
  };

  return (
    <ToastContext.Provider value={toast}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(100%) scale(0.9); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes toastBar {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>

      {children}

      {/* Toast container — fixed bottom-right */}
      <div style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'flex-end',
      }}>
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

export default ToastProvider;