import { Request, Response, Router } from 'express';
import usersController from './controllers/users.controller';
import listingsController from './controllers/listings.controller';
import { loginRequired } from './middlewares/login-required.middleware';
import { PAGE_NOT_FOUND } from './errors/SharedErrorMessages';

export const router = Router();

router.post('/users', loginRequired, usersController.addInitialUser);

router.patch('/users/:id', loginRequired, usersController.finalizeUser);

router.post('/listings', loginRequired, listingsController.addListing);

router.get('/listings', listingsController.getListings);

router.get('/users/:id', usersController.getUserProfile);

router.get('*', (req: Request, res: Response) => {
  res.status(404).send({ error: PAGE_NOT_FOUND });
});
