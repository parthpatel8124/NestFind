// src/hooks/useSocket.js
// A singleton socket connection shared across the whole app.
// Usage: const socket = useSocket();

import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Single socket instance — created once, reused everywhere
let socketInstance = null;

function getSocket(token) {
  if (!socketInstance || !socketInstance.connected) {
    socketInstance = io(SOCKET_URL, {
      auth: { token },
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });
  }
  return socketInstance;
}

export function disconnectSocket() {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
}

export function useSocket() {
  const token = localStorage.getItem('token');
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token) return;
    socketRef.current = getSocket(token);

    socketRef.current.on('connect_error', (err) => {
      console.warn('[Socket] Connection error:', err.message);
    });

    return () => {
      // Don't disconnect on unmount — keep it alive for the session
      // Only disconnect on logout (call disconnectSocket() in your logout handler)
    };
  }, [token]);

  return socketRef.current || getSocket(token);
}

export default useSocket;