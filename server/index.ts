import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';
import { router } from './router';
import { errorHandler } from './middlewares/error-handler.middleware';
import { authMiddleware } from './middlewares/auth.middleware';

import http from 'http';
import { Server } from 'socket.io';
import { socketListener } from './chat/socket';

dotenv.config({ path: path.resolve(__dirname, `./config/${process.env.NODE_ENV}.env`) });

const PORT = process.env.PORT;

export const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer);

socketListener(io);

app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(authMiddleware);
app.use('/api', router);
app.use(router);

app.use(errorHandler);
export const server = httpServer.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT} 🚀`));
