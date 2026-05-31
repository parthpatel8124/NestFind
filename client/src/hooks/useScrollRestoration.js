// src/hooks/useScrollRestoration.js
// Remembers scroll position on home page — restores when navigating back.
// USAGE — add ONE line inside BrowseHome function body:
//   import useScrollRestoration from '../hooks/useScrollRestoration';
//   function BrowseHome({ user }) {
//     useScrollRestoration('home');   // ← first line
//     ...

import { useEffect, useRef } from 'react';

export default function useScrollRestoration(key = 'page') {
  const storageKey = `scroll_${key}`;
  const isRestoredRef = useRef(false);

  // Restore scroll on mount
  useEffect(() => {
    if (isRestoredRef.current) return;
    isRestoredRef.current = true;
    const saved = sessionStorage.getItem(storageKey);
    if (saved) {
      setTimeout(() => window.scrollTo({ top: parseInt(saved, 10), behavior: 'instant' }), 100);
    }
  }, []);

  // Save scroll position as user scrolls
  useEffect(() => {
    const onScroll = () => sessionStorage.setItem(storageKey, String(Math.round(window.scrollY)));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [storageKey]);
}