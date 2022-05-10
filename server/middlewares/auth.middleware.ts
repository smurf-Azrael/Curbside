import { NextFunction, Request, Response } from 'express';
import { initializeApp } from 'firebase-admin/app';
import { auth, credential } from 'firebase-admin';
import { USER_NOT_AUTHENTICATED } from '../errors/SharedErrorMessages';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, `../config/${process.env.NODE_ENV}.env`) });

initializeApp({
  credential: credential.cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
  })
});

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
    } else {
      res.status(403).send({ error: USER_NOT_AUTHENTICATED });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: USER_NOT_AUTHENTICATED });
  }
};
