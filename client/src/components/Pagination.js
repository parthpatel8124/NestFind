// src/components/Pagination.jsx
// USAGE in HomePage BrowseHome:
//   import Pagination from '../components/Pagination';
//   const ITEMS_PER_PAGE = 9;
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
//   const paginatedProperties = filteredProperties.slice((currentPage-1)*ITEMS_PER_PAGE, currentPage*ITEMS_PER_PAGE);
//   // reset page on every filter: setCurrentPage(1)
//   // render: <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p)=>{setCurrentPage(p);window.scrollTo({top:0,behavior:'smooth'});}} />

import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const delta = 1;
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    pages.push(1);
    if (range[0] > 2) pages.push('...');
    pages.push(...range);
    if (range[range.length - 1] < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  return (
    <>
      <style>{`
        .pg-root{display:flex;align-items:center;justify-content:center;gap:6px;padding:32px 0 8px;flex-wrap:wrap;}
        .pg-btn{min-width:38px;height:38px;border-radius:10px;border:1.5px solid #e5e7eb;background:#fff;color:#374151;font-size:.875rem;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0 8px;transition:all .18s;font-family:'DM Sans',sans-serif;user-select:none;}
        .pg-btn:hover:not(:disabled):not(.pg-ellipsis){border-color:#34d399;color:#059669;background:#f0fdf4;}
        .pg-btn.pg-active{background:linear-gradient(135deg,#059669,#047857);border-color:#059669;color:#fff;box-shadow:0 3px 10px rgba(5,150,105,.28);}
        .pg-btn:disabled{opacity:.4;cursor:not-allowed;}
        .pg-ellipsis{cursor:default;border-color:transparent;background:transparent;color:#9ca3af;}
        .pg-info{font-size:.8rem;color:#9ca3af;font-family:'DM Sans',sans-serif;margin-left:8px;}
      `}</style>
      <div className="pg-root">
        <button className="pg-btn" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>←</button>
        {getPages().map((page, idx) =>
          page === '...' ? (
            <button key={`e${idx}`} className="pg-btn pg-ellipsis" disabled>···</button>
          ) : (
            <button key={page} className={`pg-btn ${currentPage === page ? 'pg-active' : ''}`} onClick={() => onPageChange(page)}>{page}</button>
          )
        )}
        <button className="pg-btn" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>→</button>
        <span className="pg-info">Page {currentPage} of {totalPages}</span>
      </div>
    </>
  );
}