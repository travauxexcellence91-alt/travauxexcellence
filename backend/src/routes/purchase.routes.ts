import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { purchaseLead } from '../controllers/purchase.controller.js';

const router = Router();

router.post('/leads/:id/purchase', requireAuth, requireRole('artisan'), purchaseLead);

export default router; 