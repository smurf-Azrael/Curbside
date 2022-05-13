import { NextFunction, Request, Response } from 'express';
import { USER_NOT_AUTHENTICATED, USER_NOT_FINALIZED, USER_NOT_FOUND } from '../errors/SharedErrorMessages';
import { getUserById } from '../queries/userQueries';

export const fullUserRequired = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // @ts-ignore
  if (req.user) {
    // @ts-ignore
    const dbUser = await getUserById(req.user.uid);
    if (!dbUser) {
      res.status(404).send({ error: USER_NOT_FOUND });
    } else if (dbUser.firstName === undefined || dbUser.lastName === undefined) {
      res.status(400).send({ error: USER_NOT_FINALIZED });
    } else {
      next();
    }
  } else {
    res.status(401).send({ error: USER_NOT_AUTHENTICATED });
  }
};

export const loginRequired = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // @ts-ignore
  if (req.user) {
    next();
  } else {
    res.status(401).send({ error: USER_NOT_AUTHENTICATED });
  }
};
