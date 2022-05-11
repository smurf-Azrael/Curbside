import { Router } from 'express';
import usersController from './controllers/users.controller';
import listingsController from './controllers/listings.controller';
import { getListingByListingId } from './controllers/listingsById.controller';
import { loginRequired } from './middlewares/login-required.middleware';

export const router = Router();

router.post('/users', loginRequired, usersController.addInitialUser);

router.patch('/users/:id', loginRequired, usersController.finalizeUser);

router.post('/listings', loginRequired, listingsController.addListing);

router.get('/listings/:id', getListingByListingId);

router.get('/users/:id', usersController.getUserProfile);
