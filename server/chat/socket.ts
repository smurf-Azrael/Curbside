/* eslint-disable n/no-callback-literal */
import { Message } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { IMessage } from '../interfaces/message.interface';
import { prisma } from '../prisma/client';

export const socketListener = (io: Server):Server => io.on('connection', (socket: Socket) => {
  console.log('a user connected');

  socket.on('message', async (body: string, chatId: string) => {
    // store the message in db
    // convert db msg to IMessage
    // @ts-ignore
    const senderId = socket.user.id;
    const dbMessage = await prisma.message.create({ data: { body, chatId, senderId } });
    socket.in(chatId).emit('messageReponse', { ok: true, data: { dbMessage } });
  }
  );

  socket.on('getChat', async (listingId: string, buyerId: string, cb: ({ ok, messages, error }: {ok?:boolean, messages?: IMessage[], error?: string})=> void) => {
    // @ts-ignore
    const chat = await prisma.chat.findFirst({
      where: {
        AND: [
          {
            listingId
          },
          {
            buyerId
          }
        ]
      }
    });
    if (!chat) {
      cb({ ok: false, error: 'Chat not found.' });
    } else {
      const messages = await prisma.message.findMany({
        where: {
          chatId: chat.id
        }
      });

      cb({ ok: true, messages: messages.map((message: Message) => ({ id: message.id, chatId: message.chatId, body: message.body, createdAt: message.createdAt, senderId: message.senderId })) });
    }
    // query db to get the chat where all ids are true
    // if there is such a chat
    //    -> cb({data: {chatId: string, messages: IMessage[], listing: {}}})
    // else
    //    -> cb({ok: false, error: 'No Chat'})
  });

  socket.on('joinChat', async (chatId: string, cb: ({ ok, messages, error }: {ok?:boolean, messages?: IMessage[], error?: string})=> void) => {
    // if user in chat => good

    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId
      }
    });
    // @ts-ignore
    if (!chat || (!chat.buyerId !== socket.user.id && !chat.sellerId !== socket.user.id)) {
      cb({ ok: false, error: 'Chat not found.' });
    } else {
      socket.join(chatId);
      cb({ ok: true }); // {ok: false}
    }
  });
});
