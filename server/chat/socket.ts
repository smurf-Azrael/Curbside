/* eslint-disable n/no-callback-literal */
import { Message } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { IMessage } from '../interfaces/message.interface';
import { prisma } from '../prisma/client';

export const socketListener = (io: Server): Server => io.on('connection', (socket: Socket) => {
  console.log('a user connected');

  socket.on('message', async (body: string, listingId: string, chatId: string | undefined) => {
    // store the message in db
    // convert db msg to IMessage
    //@ts-ignore
    const senderId = socket.user.id;
    if (!chatId) {
      const listing = await prisma.listing.findUnique({ where: { id: listingId } });
      if (listing) {
        const chat = await prisma.chat.create(
          {
            data: {
              //@ts-ignore
              buyerId: senderId,
              listingId: listing.id,
              sellerId: listing.userId
            }
          });
        chatId = chat.id;
      }
    }

    const dbMessage = await prisma.message.create({ data: { body, chatId, senderId } });
    console.log(body, { chatId });
    // // @ts-ignore
    // const senderId = socket.user.id;
    // const dbMessage = await prisma.message.create({ data: { body, chatId, senderId } });
    //@ts-ignore
    io.in(chatId).emit('messageResponse', { ok: true, data: { message: dbMessage } });
  });

  socket.on('getChat', async (listingId: string, buyerId: string, cb: ({ ok, data }: { ok?: boolean, data:{chatId?:string, messages?: IMessage[], error?: string }}) => void) => {
    // @ts-ignore

    console.log('gettttttting chat')
    try {
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
        cb({ ok: false, data : {error: 'Chat not found.' }});
      } else {
        const messages = await prisma.message.findMany({
          where: {
            chatId: chat.id
          }
        });

        cb(
          {
            ok: true,
            data: {
              chatId: chat.id,
              messages: messages.map((message: Message) => ({ id: message.id, chatId: message.chatId, body: message.body, createdAt: message.createdAt, senderId: message.senderId }))
            }
          });
      }
    } catch (e) {
      console.log(e);
      cb({ ok: false, data: { error: 'Chat not found.' }});
    }
    // query db to get the chat where all ids are true
    // if there is such a chat
    //    -> cb({data: {chatId: string, messages: IMessage[], listing: {}}})
    // else
    //    -> cb({ok: false, error: 'No Chat'})
  });

  socket.on('joinChat', async (chatId: string) => {
    // if user in chat => good

    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId
      }
    });
    // @ts-ignore
    if (chat && (chat.buyerId === socket.user.id || chat.sellerId === socket.user.id)) {
      socket.join(chatId);
    }
  });
});
