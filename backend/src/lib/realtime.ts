import { Server as SocketIOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';

let io: SocketIOServer | null = null;

export function setIo(server: SocketIOServer) {
  io = server;
}

export function setupSocketHandlers(server: SocketIOServer) {
  server.on('connection', (socket) => {
    socket.on('auth', (token: string) => authenticateSocket(socket, token));
    socket.on('subscribe:sectors', (sectorIds: string[]) => {
      if (!Array.isArray(sectorIds)) return;
      for (const id of sectorIds) socket.join(`sector:${id}`);
    });
  });
}

function authenticateSocket(socket: Socket, token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    // @ts-ignore
    socket.data.user = decoded;
  } catch {
    socket.disconnect(true);
  }
}

export function emitLeadNew(sectorIds: string[], payload: any) {
  if (!io) return;
  for (const id of sectorIds) io.to(`sector:${id}`).emit('lead:new', payload);
}

export function emitLeadReserved(sectorIds: string[], payload: any) {
  if (!io) return;
  for (const id of sectorIds) io.to(`sector:${id}`).emit('lead:reserved', payload);
} 