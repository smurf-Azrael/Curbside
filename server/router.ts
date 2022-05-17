import { Request, Response, Router } from 'express';
import usersController from './controllers/user.controller';
import listingsController from './controllers/listing.controller';
import { fullUserRequired, loginRequired } from './middlewares/login-required.middleware';
import chatsController from './controllers/chat.controller';
import ratingsController from './controllers/rating.controller';
import transactionController from './controllers/transaction.controller';

export const router = Router();

router.post('/users', loginRequired, usersController.addInitialUser);

router.get('/users/:id', usersController.getUserProfile);
router.patch('/users/:id', loginRequired, usersController.finalizeUser);

router.get('/listings', listingsController.getListings);
router.post('/listings', fullUserRequired, listingsController.addListing);

router.get('/listings/:id', listingsController.getListingByListingId);
router.patch('/listings/:id', fullUserRequired, listingsController.patchListingByListingId);

router.get('/chats', fullUserRequired, chatsController.getChatsByUserId);
router.get('/chats/:listingId', fullUserRequired, chatsController.getUsersByListingIdAndSellerId);

router.post('/ratings', fullUserRequired, ratingsController.addRatings);

router.delete('/transactions/:listingId', fullUserRequired, transactionController.deleteTransaction);
router.get('/transactions', fullUserRequired, transactionController.getTransactionByBuyerAndSellerId);

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
