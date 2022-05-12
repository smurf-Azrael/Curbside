import { IChat } from '../interfaces/chat.interface';
import { CreateChatInputDTO } from '../interfaces/chat.interface.dto';
import chatQueries from '../queries/chatQueries';
import { addChatInputValidation } from './chats.model.validation';

const createChat = async (createChatDetails: CreateChatInputDTO): Promise<IChat> => {
  await addChatInputValidation(createChatDetails);
  const chat: IChat = await chatQueries.createChat(createChatDetails);
  return chat;
};

export default {
  createChat
};
