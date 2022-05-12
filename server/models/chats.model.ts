import { IChat } from '../interfaces/chat.interface';
import chatQueries from '../queries/chatQueries';
const getChatsByUserId = async (userId: string): Promise<IChat[]> => {
  const chats = await chatQueries.getChatsByUserId(userId);
  return chats;
};

export default {
  getChatsByUserId
};
