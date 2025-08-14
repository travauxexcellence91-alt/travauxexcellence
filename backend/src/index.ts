import http from 'http';
import { config } from 'dotenv';
config();

import { connectToDatabase } from './lib/database.js';
import { buildApp } from './app.js';
import { Server as SocketIOServer } from 'socket.io';
import { setIo, setupSocketHandlers } from './lib/realtime.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

async function main() {
  await connectToDatabase();

  const app = buildApp();
  const server = http.createServer(app);

  const io = new SocketIOServer(server, {
    cors: {
      origin: (process.env.CORS_ORIGINS || '').split(',').filter(Boolean),
      credentials: true,
    },
  });
  setIo(io);
  setupSocketHandlers(io);

  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Fatal error on startup', err);
  process.exit(1);
}); 