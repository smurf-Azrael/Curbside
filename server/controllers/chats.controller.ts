import { Request, Response, NextFunction } from 'express';
import chatsModel from '../models/chats.model';

const getChatsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // @ts-ignore
    const userId = req.user.uid;
    const chats = await chatsModel.getChatsByUserId(userId);
    res.status(200).send({ data: chats });
  } catch (error) {
    next(error);
  }
};

export default {
  getChatsByUserId
};
