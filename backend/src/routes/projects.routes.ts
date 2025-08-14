import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { createProject, listLeadsForArtisan, reserveLead, listMyLeads, getProjectDetails, listMyProjects } from '../controllers/projects.controller.js';

const router = Router();

// Client creates a project (lead)
router.post('/projects', requireAuth, requireRole('client'), createProject);

// Client lists own projects
router.get('/projects/mine', requireAuth, requireRole('client'), listMyProjects);

// Project details (client with ownership, artisan with access, or admin)
router.get('/projects/:id', requireAuth, getProjectDetails);

// Artisan lists available leads based on their sectors
router.get('/leads', requireAuth, requireRole('artisan'), listLeadsForArtisan);

// Artisan reserves a lead (no payment for now)
router.post('/leads/:id/reserve', requireAuth, requireRole('artisan'), reserveLead);

// Artisan lists their reserved leads
router.get('/me/leads', requireAuth, requireRole('artisan'), listMyLeads);

export default router; 