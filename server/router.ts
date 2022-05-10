import { Router } from 'express';
import usersController from './controllers/users.controller';
import { loginRequired } from './middlewares/login-required.middleware';

export const router = Router();

router.post('/users', loginRequired, usersController.addInitialUser);

router.patch('/users/:id', loginRequired, usersController.finalizeUser);
