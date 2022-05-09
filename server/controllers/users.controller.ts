import { Request, Response } from 'express';
import { FinalizeUserDTO, InitialUserDTO } from '../interfaces/users.interface.dto';
import usersModel from '../models/users.model';

const addInitialUser = async (req: Request, res: Response): Promise<void> => {
  const userDetails: InitialUserDTO = req.body;
  const user = await usersModel.addInitialUser(userDetails);
  res.status(200).send({ user });
};

const finalizeUser = async (req: Request, res: Response): Promise<void> => {
  const userDetails: FinalizeUserDTO = req.body;
  const userId: string = req.params.id;
  const user = await usersModel.finalizeUser(userId, userDetails);
  res.status(200).send({ user });
};

export default {
  addInitialUser,
  finalizeUser
};
