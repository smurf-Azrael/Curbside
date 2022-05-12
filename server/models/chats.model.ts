import { IChat } from '../interfaces/chat.interface';
import { CreateChatInputDTO } from '../interfaces/chat.interface.dto';
import chatQueries from '../queries/chatQueries';
const createChat = async (createChatDetails: CreateChatInputDTO): Promise<IChat> => {
  const chat: IChat = await chatQueries.createChat(createChatDetails);
  return chat;
};
export default {
  createChat
};
