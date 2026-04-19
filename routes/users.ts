import { Router } from 'express';
import { getUserById, createUser } from '../controllers/userController';

const router = Router();

// GET user by ID
router.get('/', getUserById);

// POST create user
router.post('/', createUser);

export default router;
