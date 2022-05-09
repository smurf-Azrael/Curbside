import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/CustomError.class';
import { UNKNOWN_SERVER_ERROR } from '../errors/ErrorMessages';

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
  console.log('Error handling mw caught an error');
  if (error) {
    if (error instanceof CustomError) {
      console.log('Error in mw is of type customerror');
      res.status(error.httpStatusCode).send({ error: error.message });
    } else {
      console.log('Error in NOT is of type customerror');
      res.status(500).send({ error: UNKNOWN_SERVER_ERROR });
    }
  } else {
    console.log('Error mw called but no error passed');
    res.status(500).send({ error: UNKNOWN_SERVER_ERROR });
  }
};
