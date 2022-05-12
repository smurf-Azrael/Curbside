import { Chat } from '@prisma/client';
import { IChat } from '../interfaces/chat.interface';
import { CreateChatInputDTO } from '../interfaces/chat.interface.dto';
import { prisma } from '../prisma/client';

const createChat = async (inputDetails: CreateChatInputDTO): Promise<IChat> => {
  const dbChat: Chat = await prisma.chat.create({ data: inputDetails });
  return { id: dbChat.id, buyerId: dbChat.buyerId, sellerId: dbChat.sellerId, listingId: dbChat.listingId, messages: [] };
};

export default { createChat };
