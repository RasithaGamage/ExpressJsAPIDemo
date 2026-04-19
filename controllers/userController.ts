

import type { Request, Response } from 'express';
import { createUser as createUserService, findUserById } from '../services/userService';
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

