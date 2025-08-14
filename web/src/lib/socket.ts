import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket() {
  if (socket) return socket;
  socket = io('http://localhost:4000', { transports: ['websocket'] });
  const token = localStorage.getItem('token');
  if (token) {
    socket.emit('auth', token);
  }
  return socket;
}

export function subscribeSectors(sectorIds: string[]) {
  const s = getSocket();
  s.emit('subscribe:sectors', sectorIds);
} 