import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';
import { router } from './router';
import { errorHandler } from './middlewares/error-handler.middleware';
import { authMiddleware } from './middlewares/auth.middleware';

import http from 'http';
import { Server, Socket } from 'socket.io';
import { socketListener } from './chat/socket';
import { CustomError } from './errors/CustomError.class';
import { USER_NOT_AUTHENTICATED } from './errors/SharedErrorMessages';
import { getUserById } from './queries/userQueries';
import { auth } from 'firebase-admin';

dotenv.config({ path: path.resolve(__dirname, `./config/${process.env.NODE_ENV}.env`) });

const PORT = process.env.PORT;

export const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer);
io.use(async (socket: Socket, next: any) => {
  // const token = socket.handshake.auth.token;
  const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJlYmYxMDBlYWRkYTMzMmVjOGZlYTU3ZjliNWJjM2E2YWIyOWY1NTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY3VyYnNpZGUtMzAzZDAiLCJhdWQiOiJjdXJic2lkZS0zMDNkMCIsImF1dGhfdGltZSI6MTY1MjM2NzM5MSwidXNlcl9pZCI6Imc1c3h4dDhSNE5ROENxaXJuSHRXVDlIVzJXZDIiLCJzdWIiOiJnNXN4eHQ4UjROUThDcWlybkh0V1Q5SFcyV2QyIiwiaWF0IjoxNjUyMzY3MzkxLCJleHAiOjE2NTIzNzA5OTEsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHRlc3QuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.D-YMl8J9eQmLfQHGIZmwcp1HsXLs9ua7PNphwgqjNTbE13BV4UQnnnJjOE95xl_voxfK3lGSxlhuGSFTBgTZVX9KNXlnE_zRumJHGBiaZyXAzdoGtlGdfmqjxCXNg-zaM07JAcZA1miFsi2NKSPzQYcJAj2zJy6Fhp0gvxZmFo49gCKVhfEXmLlxzG6kV7AJEAvRs3RSUVMEvq1xWOJLNJrHO6W6nP6NBmb7fb01qz1g1F1qJdfxJsGnyvchoVKdnPBys4RMEWDMc1fT9y2El7AaxYHSmDC97G1XP05CzOV2N95odzF2FpG-yOSQLgXPayRNQT7z2Im9RAT3tiruBg';
  const fbUser = await auth().verifyIdToken(token);
  const user = await getUserById(fbUser.uid);
  if (user) {
    // @ts-ignore
    socket.user = user;
    next();
  } else {
    next(new CustomError(USER_NOT_AUTHENTICATED, 401));
  }
});
socketListener(io);

app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(authMiddleware);
app.use('/api', router);
app.use(router);

app.use(errorHandler);
export const server = httpServer.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT} 🚀`));
