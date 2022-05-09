import { NextFunction, Request, Response } from 'express';
import { initializeApp } from 'firebase-admin/app';
import { auth, credential, ServiceAccount } from 'firebase-admin';
import { USER_NOT_AUTHENTICATED } from '../errors/SharedErrorMessages';

const serviceAccount = require('../config/service-account.json');

initializeApp({ credential: credential.cert(serviceAccount as ServiceAccount) });

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const idToken = authHeader.split(' ')[1];
      const user = await auth().verifyIdToken(idToken);
      if (user) {
        // @ts-ignore
        req.user = user;
        next();
      } else {
        res.status(403).send({ error: USER_NOT_AUTHENTICATED });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: USER_NOT_AUTHENTICATED });
  }
};
