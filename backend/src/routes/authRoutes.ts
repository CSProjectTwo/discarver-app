import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController.ts';

const router = Router();

// Endpoint: POST /api/auth/register
router.post('/register', registerUser);

// Endpoint: POST /api/auth/login
router.post('/login', loginUser);

export default router;
