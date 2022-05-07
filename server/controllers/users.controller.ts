import { Request, Response } from 'express';

export const usersController = (req: Request, res: Response): void => {
  // TODO: connect to model. But it's 9pm on a saturday so i will do that on mon
  res.send({ msg: 'test' });
};
