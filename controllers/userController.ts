

import type { Request, Response } from 'express';
import { createUser as createUserService, findUserById, updateUserById, deleteUserById, getAllUsers } from '../services/userService';
import { User } from '../models/user';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userName = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const user: User = await createUserService(userName, email, password);
    res.send({
      message: 'User created successfully',
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error) {
    const err = error as Error;
    console.error('Error creating user:', err.stack);
    res.status(500).send({ message: 'Error creating user', error: err.message });
  }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const userId = req.query.id as string;
  try {
    const user = await findUserById(userId);
    if (user) {
      res.send({
        message: 'User found',
        user: user
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    const err = error as Error;
    console.error('Error retrieving user:', err.stack);
    res.status(500).send({ message: 'Error retrieving user', error: err.message });
  }
}

// Get all users
export const getAllUsersHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.send({
      message: 'Users retrieved successfully',
      users
    });
  } catch (error) {
    const err = error as Error;
    console.error('Error retrieving users:', err.stack);
    res.status(500).send({ message: 'Error retrieving users', error: err.message });
  }
}

// Update user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id as string;
  const { username, email } = req.body;
  try {
    const updatedUser = await updateUserById(userId, username, email);
    if (updatedUser) {
      res.send({ message: 'User updated successfully', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    const err = error as Error;
    console.error('Error updating user:', err.stack);
    res.status(500).send({ message: 'Error updating user', error: err.message });
  }
}

// Delete user by ID
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id as string;
  try {
    const deleted = await deleteUserById(userId);
    if (deleted) {
      res.send({ message: 'User deleted successfully' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    const err = error as Error;
    console.error('Error deleting user:', err.stack);
    res.status(500).send({ message: 'Error deleting user', error: err.message });
  }
}

