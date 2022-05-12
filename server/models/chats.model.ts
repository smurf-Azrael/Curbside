import { CustomError } from '../errors/CustomError.class';
import { USER_NOT_FOUND } from '../errors/SharedErrorMessages';
import { IChat } from '../interfaces/chat.interface';
import chatQueries from '../queries/chatQueries';
import { getUserById } from '../queries/userQueries';
const getChatsByUserId = async (userId: string): Promise<IChat[]> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new CustomError(USER_NOT_FOUND, 404);
  }
  const chats = await chatQueries.getChatsByUserId(userId);
  return chats;
};

export default {
  getChatsByUserId
};
