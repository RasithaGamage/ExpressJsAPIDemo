import { Router } from 'express';
import { getUserById, createUser } from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by their ID (provide id as query param)
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get('/', getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with username, email, and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *       500:
 *         description: Error creating user
 */
router.post('/', createUser);

export default router;
