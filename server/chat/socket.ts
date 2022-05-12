import { Server, Socket } from 'socket.io';

export const socketListener = (io: Server):Server => io.on('connection', (socket: Socket) => {
  console.log('a user connected');
  socket.on('message', (message: string, senderId: string, receiverId: string) => {
    console.log(message, senderId, receiverId);
  });
});
