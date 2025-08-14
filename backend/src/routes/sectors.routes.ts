import { Router } from 'express';
import { createSector, listSectors, updateSector, deleteSector } from '../controllers/sectors.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', listSectors);
router.post('/', requireAuth, requireRole('admin'), createSector);
router.patch('/:id', requireAuth, requireRole('admin'), updateSector);
router.delete('/:id', requireAuth, requireRole('admin'), deleteSector);

export default router; 