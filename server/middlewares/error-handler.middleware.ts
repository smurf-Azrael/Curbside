import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/CustomError.class';
import { UNKNOWN_SERVER_ERROR } from '../errors/ErrorMessages';

export const errorHandler = (error: any, _req: Request, res: Response, next: NextFunction): void => {
  if (error) {
    if (error instanceof CustomError) {
      res.status(error.httpStatusCode).send({ error: error.message });
    } else {
      res.status(500).send({ error: UNKNOWN_SERVER_ERROR });
    }
  } else {
    res.status(500).send({ error: UNKNOWN_SERVER_ERROR });
  }
};
