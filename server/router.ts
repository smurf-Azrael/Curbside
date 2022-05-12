import { NextFunction, Request, Response, Router } from 'express';
import usersController from './controllers/users.controller';
import listingsController from './controllers/listings.controller';
import { loginRequired } from './middlewares/login-required.middleware';
import { PAGE_NOT_FOUND, USER_NOT_AUTHENTICATED } from './errors/SharedErrorMessages';
// import chatController from './controllers/chats.controller';
export const router = Router();

router.post('/users', (req: Request, res: Response, next: NextFunction): void => {
  // @ts-ignore
  if (req.user) {
    next();
  } else {
    res.status(401).send({ error: USER_NOT_AUTHENTICATED });
  }
}, usersController.addInitialUser);

router.patch('/users/:id', loginRequired, usersController.finalizeUser);

router.post('/listings', loginRequired, listingsController.addListing);

router.get('/listings/:id', listingsController.getListingByListingId);

router.get('/listings', listingsController.getListings);

router.get('/users/:id', usersController.getUserProfile);

router.get('/login', loginRequired, (req: Request, res: Response) => {
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

// router.post('/chat', loginRequired, chatController.createChat);

// router.get('/chat/:id', loginRequired, chatController.getChat);

router.get('*', (req: Request, res: Response) => {
  res.status(404).send({ error: PAGE_NOT_FOUND });
});
