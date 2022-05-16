import { NextFunction, Request, Response } from 'express';
import { initializeApp, ServiceAccount } from 'firebase-admin/app';
import { auth, credential } from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';
import config from '../config/config.json';
dotenv.config({ path: path.resolve(__dirname, `../config/${process.env.NODE_ENV}.env`) });

initializeApp({
  credential: credential.cert(config as ServiceAccount)
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
        // @ts-ignore
        req.user.emailVerified = true;
        next();
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next();
  }
};
