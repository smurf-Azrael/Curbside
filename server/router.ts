import { Request, Response, Router } from 'express';
import usersController from './controllers/users.controller';
import listingsController from './controllers/listings.controller';
<<<<<<< HEAD
import { getListingByListingId } from './controllers/listingsById.controller';
=======
>>>>>>> 208bd9918396b4b62e0c03af372a332a4990abff
import { loginRequired } from './middlewares/login-required.middleware';
import { PAGE_NOT_FOUND } from './errors/SharedErrorMessages';

export const router = Router();

router.post('/users', loginRequired, usersController.addInitialUser);

router.patch('/users/:id', loginRequired, usersController.finalizeUser);

router.post('/listings', loginRequired, listingsController.addListing);

<<<<<<< HEAD
router.get('/listings/:id', getListingByListingId);
=======
router.get('/listings', listingsController.getListings);
>>>>>>> 208bd9918396b4b62e0c03af372a332a4990abff

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

router.get('*', (req: Request, res: Response) => {
  res.status(404).send({ error: PAGE_NOT_FOUND });
});
