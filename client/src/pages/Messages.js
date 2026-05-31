// src/pages/Messages.jsx
// Add route in App.jsx: <Route path="/messages" element={<Messages />} />

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';
import ChatWindow from '../components/ChatWindow';
import { MessageSquare, Search, ArrowLeft } from 'lucide-react';

function Messages() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChat, setActiveChat] = useState(null);

  const myId = user?.id || user?._id;

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await api.get('/api/messages/conversations');
      setConversations(res.data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  const filtered = conversations.filter(c => {
    const name = c._id?.otherUser?.fullName || '';
    const prop = c._id?.propertyId?.title || '';
    const q = searchQuery.toLowerCase();
    return name.toLowerCase().includes(q) || prop.toLowerCase().includes(q);
  });

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;}

        .mg-root{font-family:'DM Sans',sans-serif;min-height:100vh;background:#f0faf4;}

        /* Hero */
        .mg-hero{background:linear-gradient(160deg,#064e3b 0%,#065f46 55%,#047857 100%);padding:36px 24px 48px;position:relative;overflow:hidden;}
        .mg-hero::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px);background-size:40px 40px;pointer-events:none;}
        .mg-hero-blob{position:absolute;width:320px;height:320px;background:radial-gradient(circle,rgba(110,231,183,0.18),transparent 65%);top:-60px;right:-40px;border-radius:50%;pointer-events:none;}
        .mg-hero-inner{position:relative;z-index:2;max-width:700px;margin:0 auto;}
        .mg-back{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:9px;padding:7px 14px;font-size:0.82rem;font-weight:600;color:#d1fae5;cursor:pointer;margin-bottom:16px;transition:all 0.18s;font-family:'DM Sans',sans-serif;}
        .mg-back:hover{background:rgba(255,255,255,0.18);}
        .mg-title{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:#fff;letter-spacing:-1px;margin-bottom:4px;}
        .mg-sub{color:#a7f3d0;font-size:0.9rem;margin-bottom:24px;}

        /* Search */
        .mg-search-wrap{position:relative;max-width:500px;}
        .mg-search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#9ca3af;pointer-events:none;}
        .mg-search{width:100%;background:#fff;border:2px solid transparent;border-radius:13px;padding:12px 16px 12px 42px;font-size:0.9rem;font-family:'DM Sans',sans-serif;color:#0f2d1a;outline:none;transition:all 0.2s;box-shadow:0 4px 16px rgba(0,0,0,0.15);}
        .mg-search::placeholder{color:#9ca3af;}
        .mg-search:focus{border-color:#34d399;}

        /* Body */
        .mg-body{max-width:700px;margin:0 auto;padding:28px 20px 60px;}

        /* Conversation list */
        .mg-list{display:flex;flex-direction:column;gap:8px;}
        .mg-convo{background:#fff;border:1.5px solid #e6f7ef;border-radius:16px;padding:14px 16px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:14px;}
        .mg-convo:hover{border-color:#a7f3d0;box-shadow:0 4px 16px rgba(5,150,105,0.1);transform:translateY(-1px);}
        .mg-convo.unread{border-color:#d1fae5;background:#fafffe;}

        .mg-avatar{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#d1fae5,#a7f3d0);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;color:#065f46;flex-shrink:0;}
        .mg-convo-body{flex:1;min-width:0;}
        .mg-convo-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;}
        .mg-convo-name{font-weight:700;font-size:0.92rem;color:#0f2d1a;}
        .mg-convo-time{font-size:0.75rem;color:#9ca3af;flex-shrink:0;}
        .mg-convo-prop{font-size:0.78rem;color:#6b7280;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .mg-convo-preview{font-size:0.82rem;color:#6b7280;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .mg-convo-preview.unread{color:#0f2d1a;font-weight:600;}
        .mg-unread-badge{background:#059669;color:#fff;border-radius:100px;font-size:0.68rem;font-weight:800;padding:2px 7px;min-width:20px;text-align:center;flex-shrink:0;}

        /* Loading */
        .mg-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 0;gap:14px;}
        .mg-spinner{width:40px;height:40px;border:3px solid #d1fae5;border-top-color:#059669;border-radius:50%;animation:mgSpin 0.75s linear infinite;}
        @keyframes mgSpin{to{transform:rotate(360deg);}}

        /* Empty */
        .mg-empty{text-align:center;padding:60px 24px;}
        .mg-empty-icon{width:72px;height:72px;background:#ecfdf5;border:2px solid #d1fae5;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;}
        .mg-empty-title{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:800;color:#0f2d1a;margin-bottom:6px;}
        .mg-empty-sub{color:#6b7280;font-size:0.9rem;}
      `}</style>

      <div className="mg-root">

        {/* Hero */}
        <div className="mg-hero">
          <div className="mg-hero-blob"/>
          <div className="mg-hero-inner">
            <button onClick={() => navigate(-1)} className="mg-back">
              <ArrowLeft size={14}/> Back
            </button>
            <h1 className="mg-title">Messages</h1>
            <p className="mg-sub">Your conversations with property owners and tenants</p>

            <div className="mg-search-wrap">
              <Search size={16} className="mg-search-icon"/>
              <input
                className="mg-search"
                placeholder="Search conversations…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="mg-body">
          {loading ? (
            <div className="mg-loading">
              <div className="mg-spinner"/>
              <span style={{color:'#6b7280',fontSize:'0.9rem'}}>Loading conversations…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="mg-empty">
              <div className="mg-empty-icon"><MessageSquare size={30} color="#059669"/></div>
              <div className="mg-empty-title">{searchQuery ? 'No results' : 'No messages yet'}</div>
              <p className="mg-empty-sub">{searchQuery ? 'Try a different search' : 'Start a conversation from any property page'}</p>
            </div>
          ) : (
            <div className="mg-list">
              {filtered.map((c, i) => {
                const other = c._id?.otherUser;
                const property = c._id?.propertyId;
                const last = c.lastMessage;
                const unread = c.unreadCount > 0;
                const initials = other?.fullName?.charAt(0)?.toUpperCase() || '?';
                const isMine = last?.senderId?.toString() === myId?.toString();

                return (
                  <div
                    key={i}
                    className={`mg-convo ${unread ? 'unread' : ''}`}
                    onClick={() => setActiveChat({
                      propertyId: property?._id,
                      propertyTitle: property?.title,
                      ownerId: other?._id,
                      ownerName: other?.fullName,
                    })}
                  >
                    <div className="mg-avatar">{initials}</div>
                    <div className="mg-convo-body">
                      <div className="mg-convo-top">
                        <span className="mg-convo-name">{other?.fullName || 'User'}</span>
                        <span className="mg-convo-time">{formatTime(last?.createdAt)}</span>
                      </div>
                      <div className="mg-convo-prop">Re: {property?.title || 'Property'}</div>
                      <div className={`mg-convo-preview ${unread ? 'unread' : ''}`}>
                        {isMine ? 'You: ' : ''}{last?.text || '…'}
                      </div>
                    </div>
                    {unread && <div className="mg-unread-badge">{c.unreadCount}</div>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Active chat window */}
      {activeChat && (
        <ChatWindow
          {...activeChat}
          onClose={() => { setActiveChat(null); fetchConversations(); }}
        />
      )}
    </>
  );
}

export default Messages;