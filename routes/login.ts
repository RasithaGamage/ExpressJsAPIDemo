import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

// POST login credentials
router.post('/', login);

export default router;
