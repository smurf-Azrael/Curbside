import { Chat } from '@prisma/client';
import { IChat } from '../interfaces/chat.interface';
import { CreateChatInputDTO } from '../interfaces/chat.interface.dto';
import { prisma } from '../prisma/client';

const createChat = async (inputDetails: CreateChatInputDTO): Promise<IChat> => {
  const dbChat: Chat = await prisma.chat.create({ data: inputDetails });
  return { id: dbChat.id, buyerId: dbChat.buyerId, sellerId: dbChat.sellerId, listingId: dbChat.listingId, createdAt: dbChat.createdAt, updatedAt: dbChat.updatedAt, messages: [] };
};

const getChat = async (chatId: string): Promise<IChat> => {
  const dbChat: Chat = await prisma.chat.findUnique({ id: chatId });
  return { id: dbChat.id, buyerId: dbChat.buyerId, sellerId: dbChat.sellerId, listingId: dbChat.listingId, createdAt: dbChat.createdAt, updatedAt: dbChat.updatedAt, messages: [] };
};

export default { createChat, getChat };
