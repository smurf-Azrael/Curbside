import { Request, Response, Router } from 'express';
import userController from './controllers/user.controller';
import listingController from './controllers/listing.controller';
import { fullUserRequired, loginRequired } from './middlewares/login-required.middleware';
import chatController from './controllers/chat.controller';
import ratingController from './controllers/rating.controller';
import favoriteController from './controllers/favorites.controller';

export const router = Router();

router.post('/users', loginRequired, userController.addInitialUser);

router.get('/users/:id', userController.getUserProfile);
router.patch('/users/:id', loginRequired, userController.finalizeUser);

router.get('/listings', listingController.getListings);
router.post('/listings', fullUserRequired, listingController.addListing);

router.get('/listings/:id', listingController.getListingByListingId);
router.patch('/listings/:id', fullUserRequired, listingController.patchListingByListingId);

router.get('/chats', fullUserRequired, chatController.getChatsByUserId);

router.post('/ratings', loginRequired, ratingController.addRatings);

router.patch('/favorites/:id', favoriteController.addFavorite);
router.get('/favorites/:id', favoriteController.getFavorites);
router.delete('/favorites/:id', favoriteController.deleteFavorite);

router.get('/login', fullUserRequired, (req: Request, res: Response) => {
  console.log('LOGIN');
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

// router.get('*', (req: Request, res: Response) => {
//   res.status(404).send({ error: PAGE_NOT_FOUND });
// });
