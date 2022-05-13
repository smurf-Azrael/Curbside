import { Request, Response, Router } from 'express';
import usersController from './controllers/users.controller';
import listingsController from './controllers/listings.controller';
import { fullUserRequired, loginRequired } from './middlewares/login-required.middleware';
import { PAGE_NOT_FOUND } from './errors/SharedErrorMessages';
import { patchListingByListingId } from './controllers/listingsByIdPatch.controller';
import chatsController from './controllers/chats.controller';
import ratingsController from './controllers/ratings.controller';

export const router = Router();

router.post('/users', loginRequired, usersController.addInitialUser);

router.get('/users/:id', usersController.getUserProfile);
router.patch('/users/:id', loginRequired, usersController.finalizeUser);

router.get('/listings', listingsController.getListings);
router.post('/listings', fullUserRequired, listingsController.addListing);

router.get('/listings/:id', listingsController.getListingByListingId);
router.patch('/listings/:id', fullUserRequired, patchListingByListingId);

router.get('/chats/:id', fullUserRequired, chatsController.getChatsByUserId);

router.post('/ratings', loginRequired, ratingsController.addRatings);

router.get('/login', fullUserRequired, (req: Request, res: Response) => {
  res.send({
    data: {
      user: {
        // @ts-ignore
        id: req.user.uid,
        // @ts-ignore
        email: req.user.email
      }
    }
  });
});

router.get('*', (req: Request, res: Response) => {
  res.status(404).send({ error: PAGE_NOT_FOUND });
});
