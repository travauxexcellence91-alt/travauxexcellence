import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.routes.js';
import sectorRoutes from './routes/sectors.routes.js';
import projectRoutes from './routes/projects.routes.js';
import meRoutes from './routes/me.routes.js';
import adminRoutes from './routes/admin.routes.js';
import uploadRoutes from './routes/uploads.routes.js';
import purchaseRoutes from './routes/purchase.routes.js';

export function buildApp() {
  const app = express();

  app.use(helmet());
  const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').filter(Boolean);
  app.use(cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  }));
  app.use(express.json({ limit: '5mb' }));
  app.use(morgan('dev'));
  app.use(rateLimit({ windowMs: 60_000, max: 120 }));

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/sectors', sectorRoutes);
  app.use('/api', projectRoutes);
  app.use('/api/me', meRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/uploads', uploadRoutes);
  app.use('/api', purchaseRoutes);

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
  });

  return app;
} 