import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { listUsers, toggleUserSuspension, getUserDetails, listProjects, updateProject, deleteProject, getStats, listTransactions, refundTransaction } from '../controllers/admin.controller.js';

const router = Router();

router.use(requireAuth, requireRole('admin'));

router.get('/users', listUsers);
router.get('/users/:id', getUserDetails);
router.post('/users/:id/toggle-suspension', toggleUserSuspension);

router.get('/projects', listProjects);
router.patch('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

router.get('/stats', getStats);

router.get('/transactions', listTransactions);
router.post('/transactions/:id/refund', refundTransaction);

export default router; 