// src/components/ChatWindow.jsx
// Props:
//   propertyId    — the property this chat is about
//   propertyTitle — shown in the chat header
//   ownerId       — the owner's user ID
//   ownerName     — the owner's display name
//   onClose       — called when user closes the chat

import React, { useState, useEffect, useRef, useContext } from 'react';
import { X, Send, MessageSquare, Loader } from 'lucide-react';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';

function ChatWindow({ propertyId, propertyTitle, ownerId, ownerName, onClose }) {
  const { user } = useContext(AuthContext);
  const socket = useSocket();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const myId = user?.id || user?._id;
  const otherId = ownerId;
  const otherName = ownerName || 'Owner';

  // ── Load message history ──
  useEffect(() => {
    if (!myId || !otherId || !propertyId) return;
    loadMessages();
  }, [propertyId, otherId]);

  // ── Join socket room + listen for incoming messages ──
  useEffect(() => {
    if (!socket || !myId || !otherId) return;

    socket.emit('join_conversation', { propertyId, otherUserId: otherId });

    const handleReceive = (msg) => {
      // Only add if it belongs to THIS conversation
      if (msg.propertyId === propertyId) {
        setMessages(prev => {
          // Avoid duplicates (socket can sometimes double-emit)
          if (prev.some(m => m._id?.toString() === msg._id?.toString())) return prev;
          return [...prev, msg];
        });
        // Mark as read since the window is open
        socket.emit('mark_read', { propertyId, otherUserId: otherId });
      }
    };

    socket.on('receive_message', handleReceive);

    return () => {
      socket.off('receive_message', handleReceive);
    };
  }, [socket, propertyId, otherId, myId]);

  // ── Auto-scroll to bottom on new messages ──
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Focus input on open ──
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/api/messages/${propertyId}/${otherId}`);
      setMessages(res.data);
    } catch {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    if (!text.trim() || sending || !socket) return;
    setSending(true);

    // Optimistic UI — add message immediately so it feels instant
    const optimistic = {
      _id: `temp_${Date.now()}`,
      propertyId,
      senderId: myId,
      receiverId: otherId,
      text: text.trim(),
      senderName: user?.fullName,
      read: false,
      createdAt: new Date().toISOString(),
      _optimistic: true,
    };
    setMessages(prev => [...prev, optimistic]);
    const sentText = text.trim();
    setText('');

    socket.emit('send_message', {
      propertyId,
      receiverId: otherId,
      text: sentText,
    });

    setSending(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  // Group messages by date
  const grouped = messages.reduce((acc, msg) => {
    const date = new Date(msg.createdAt).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(msg);
    return acc;
  }, {});

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;}

        .cw-overlay {
          position:fixed; inset:0; z-index:1000;
          background:rgba(6,78,59,0.35); backdrop-filter:blur(4px);
          display:flex; align-items:flex-end; justify-content:flex-end;
          padding:0 24px 24px 0;
          animation:cwFadeIn 0.2s ease;
        }
        @keyframes cwFadeIn{from{opacity:0}to{opacity:1}}

        .cw-window {
          width:380px; height:520px;
          background:#fff; border-radius:20px;
          border:1.5px solid #d1fae5;
          box-shadow:0 20px 60px rgba(6,78,59,0.25), 0 8px 20px rgba(0,0,0,0.1);
          display:flex; flex-direction:column; overflow:hidden;
          animation:cwSlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
          font-family:'DM Sans',sans-serif;
        }
        @keyframes cwSlideUp{from{opacity:0;transform:translateY(24px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}

        /* Header */
        .cw-header {
          background:linear-gradient(135deg,#064e3b,#065f46);
          padding:14px 18px; display:flex; align-items:center; gap:11px;
          flex-shrink:0;
        }
        .cw-avatar {
          width:38px; height:38px; border-radius:50%;
          background:linear-gradient(135deg,#6ee7b7,#34d399);
          display:flex; align-items:center; justify-content:center;
          font-family:'Syne',sans-serif; font-size:0.85rem; font-weight:800;
          color:#064e3b; flex-shrink:0;
        }
        .cw-header-info{flex:1;min-width:0;}
        .cw-header-name{font-weight:700;font-size:0.9rem;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .cw-header-prop{font-size:0.72rem;color:#a7f3d0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .cw-close{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:6px;color:#d1fae5;cursor:pointer;transition:all 0.18s;display:flex;}
        .cw-close:hover{background:rgba(255,255,255,0.2);}

        /* Messages area */
        .cw-messages{flex:1;overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:3px;scroll-behavior:smooth;}
        .cw-messages::-webkit-scrollbar{width:4px;}
        .cw-messages::-webkit-scrollbar-track{background:transparent;}
        .cw-messages::-webkit-scrollbar-thumb{background:#d1fae5;border-radius:2px;}

        /* Date separator */
        .cw-date-sep{text-align:center;margin:10px 0 6px;font-size:0.72rem;color:#9ca3af;font-weight:600;position:relative;}
        .cw-date-sep::before,.cw-date-sep::after{content:'';position:absolute;top:50%;width:30%;height:1px;background:#f0fdf4;}
        .cw-date-sep::before{left:0;} .cw-date-sep::after{right:0;}

        /* Bubbles */
        .cw-bubble-row{display:flex;margin-bottom:3px;}
        .cw-bubble-row.mine{justify-content:flex-end;}
        .cw-bubble-row.theirs{justify-content:flex-start;}

        .cw-bubble {
          max-width:72%; padding:9px 13px; border-radius:16px;
          font-size:0.875rem; line-height:1.5; word-break:break-word;
          position:relative;
        }
        .cw-bubble.mine {
          background:linear-gradient(135deg,#059669,#047857);
          color:#fff; border-bottom-right-radius:4px;
        }
        .cw-bubble.mine.cw-optimistic{opacity:0.75;}
        .cw-bubble.theirs {
          background:#f0fdf4; color:#0f2d1a;
          border:1px solid #d1fae5; border-bottom-left-radius:4px;
        }
        .cw-time{font-size:0.65rem;margin-top:4px;display:block;}
        .cw-time.mine{color:rgba(255,255,255,0.65);text-align:right;}
        .cw-time.theirs{color:#9ca3af;}

        /* Loading */
        .cw-loading{display:flex;align-items:center;justify-content:center;flex:1;gap:10px;color:#9ca3af;font-size:0.875rem;}
        .cw-load-spin{width:20px;height:20px;border:2px solid #d1fae5;border-top-color:#059669;border-radius:50%;animation:cwSpin 0.7s linear infinite;}
        @keyframes cwSpin{to{transform:rotate(360deg)}}

        /* Empty */
        .cw-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1;gap:10px;color:#9ca3af;text-align:center;padding:24px;}
        .cw-empty-icon{width:52px;height:52px;background:#f0fdf4;border:1.5px solid #d1fae5;border-radius:50%;display:flex;align-items:center;justify-content:center;}
        .cw-empty-text{font-size:0.875rem;}
        .cw-empty-sub{font-size:0.78rem;color:#d1d5db;}

        /* Error */
        .cw-error{background:#fff1f2;border:1px solid #fecdd3;border-radius:10px;padding:8px 12px;font-size:0.8rem;color:#be123c;margin:8px 16px;text-align:center;}

        /* Input */
        .cw-input-row {
          padding:12px 14px; border-top:1px solid #f0fdf4;
          display:flex; align-items:flex-end; gap:8px; flex-shrink:0;
          background:#fff;
        }
        .cw-textarea {
          flex:1; background:#f9fafb; border:1.5px solid #e5e7eb;
          border-radius:14px; padding:10px 14px;
          font-size:0.875rem; font-family:'DM Sans',sans-serif;
          color:#0f2d1a; outline:none; resize:none;
          min-height:42px; max-height:100px;
          transition:border-color 0.18s;
          line-height:1.4;
        }
        .cw-textarea::placeholder{color:#9ca3af;}
        .cw-textarea:focus{border-color:#34d399;background:#f0fdf4;}
        .cw-send {
          width:40px; height:40px; border-radius:12px; border:none;
          background:linear-gradient(135deg,#059669,#047857);
          color:#fff; cursor:pointer; display:flex; align-items:center;
          justify-content:center; flex-shrink:0; transition:all 0.18s;
          box-shadow:0 3px 10px rgba(5,150,105,0.3);
        }
        .cw-send:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 5px 16px rgba(5,150,105,0.42);}
        .cw-send:disabled{opacity:0.5;cursor:not-allowed;transform:none;}

        @media(max-width:440px){
          .cw-overlay{padding:0;align-items:flex-end;}
          .cw-window{width:100%;border-radius:20px 20px 0 0;height:90vh;}
        }
      `}</style>

      <div className="cw-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="cw-window">

          {/* Header */}
          <div className="cw-header">
            <div className="cw-avatar">
              {otherName.charAt(0).toUpperCase()}
            </div>
            <div className="cw-header-info">
              <div className="cw-header-name">{otherName}</div>
              <div className="cw-header-prop">Re: {propertyTitle || 'Property'}</div>
            </div>
            <button onClick={onClose} className="cw-close"><X size={16}/></button>
          </div>

          {/* Messages */}
          <div className="cw-messages">
            {loading ? (
              <div className="cw-loading">
                <div className="cw-load-spin"/>
                Loading messages…
              </div>
            ) : error ? (
              <div className="cw-error">{error}</div>
            ) : messages.length === 0 ? (
              <div className="cw-empty">
                <div className="cw-empty-icon"><MessageSquare size={22} color="#059669"/></div>
                <div className="cw-empty-text">No messages yet</div>
                <div className="cw-empty-sub">Send a message to start the conversation</div>
              </div>
            ) : (
              Object.entries(grouped).map(([date, msgs]) => (
                <React.Fragment key={date}>
                  <div className="cw-date-sep">{formatDate(msgs[0].createdAt)}</div>
                  {msgs.map((msg) => {
                    const isMine = msg.senderId?.toString() === myId?.toString();
                    return (
                      <div key={msg._id} className={`cw-bubble-row ${isMine ? 'mine' : 'theirs'}`}>
                        <div className={`cw-bubble ${isMine ? 'mine' : 'theirs'} ${msg._optimistic ? 'cw-optimistic' : ''}`}>
                          {msg.text}
                          <span className={`cw-time ${isMine ? 'mine' : 'theirs'}`}>
                            {formatTime(msg.createdAt)}
                            {isMine && !msg._optimistic && (
                              <span style={{ marginLeft: 4 }}>{msg.read ? ' ✓✓' : ' ✓'}</span>
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Input */}
          <div className="cw-input-row">
            <textarea
              ref={inputRef}
              className="cw-textarea"
              placeholder="Type a message…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
              }}
            />
            <button
              className="cw-send"
              onClick={sendMessage}
              disabled={!text.trim() || sending}
            >
              <Send size={16}/>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default ChatWindow;