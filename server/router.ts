import { Router } from 'express';
import usersController from './controllers/users.controller';

export const router = Router();

router.post('/users', usersController.addInitialUser);

router.patch('/users/:id', usersController.finalizeUser);
