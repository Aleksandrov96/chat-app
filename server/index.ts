import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import { router } from './router/index.js';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error-middleware.js';
import { SocketService } from './services/socket-service.js';
import { createServer } from 'http';
import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import './env-config.js';

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(cors({
  credentials: true, 
  origin: process.env.CLIENT_URL,
}));
app.use('/', router);
app.use(errorMiddleware);

await mongoose.connect(DB_URL as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

export const server = createServer(app);

export const socketService = new SocketService(server);

initializeApp({
  credential: cert('./sa.json'),
  storageBucket: process.env.BUCKET_URL,
});

export const bucket = getStorage().bucket();

server.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT ${PORT as string}`);
});
