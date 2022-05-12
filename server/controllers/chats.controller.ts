import { NextFunction, Request, Response } from 'express';
import { CreateChatInputDTO } from '../interfaces/chat.interface.dto';
import chatModel from '../models/chats.model';
const createChat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const createChatDetails: CreateChatInputDTO = req.body;
    const chat = await chatModel.createChat(createChatDetails);
    res.status(200).send({ data: chat });
  } catch (error) {
    next(error);
  }
};

export default { createChat };
