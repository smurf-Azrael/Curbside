import { Router } from 'express';
import usersController from './controllers/users.controller';
import { authMiddleware } from './middlewares/auth.middleware';

export const router = Router();

router.post('/users', authMiddleware, usersController.addInitialUser);

router.patch('/users/:id', authMiddleware, usersController.finalizeUser);
