import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [login]
 *     summary: User login
 *     description: Authenticate user and return JWT token in cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/', login);

export default router;
