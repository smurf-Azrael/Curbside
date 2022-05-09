import { Request, Response } from 'express';
import { UsersDTO } from '../interfaces/users.interface.dto';
import { usersModel } from '../models/users.model';

export const usersController = async (req: Request, res: Response): Promise<void> => {
  const userDetails: UsersDTO = req.body;
  const user = await usersModel(userDetails);
  res.status(200).send({ user });
};
