import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { getMe, updateArtisanProfile, updateClientProfile } from '../controllers/me.controller.js';

const router = Router();

router.get('/', requireAuth, getMe);
router.patch('/artisan', requireAuth, requireRole('artisan'), updateArtisanProfile);
router.patch('/client', requireAuth, requireRole('client'), updateClientProfile);

export default router; 