import { Router } from 'express';
import { getUserById, createUser, getAllUsersHandler, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [users]
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

// Get all users
/**
 * @swagger
 * /users/all:
 *   get:
 *     tags: [users]
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get('/all', getAllUsersHandler);

// Update user by ID
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [users]
 *     summary: Update user by ID
 *     description: Update a user's username and email by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
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
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put('/:id', updateUser);

// Delete user by ID
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [users]
 *     summary: Delete user by ID
 *     description: Delete a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:id', deleteUser);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [users]
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
