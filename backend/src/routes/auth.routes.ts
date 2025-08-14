import { Router } from 'express';
import { login, registerArtisan, registerClient, searchCompany } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register-artisan', registerArtisan);
router.post('/register-client', registerClient);
router.post('/login', login);
router.get('/search-company', searchCompany);

export default router; 