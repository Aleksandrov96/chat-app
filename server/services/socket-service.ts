import { Server as HTTPServer }  from 'http';
import { IMessage } from 'interfaces/models/IMessage.js';
import { Socket, Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { IUserJWTPayload } from 'interfaces/IUserJWTPayload';
import { ApiError } from '../exceptions/api-error.js';
import { SocketData } from 'interfaces/socket/SocketData.js';

export class SocketService {

  io: Server;

  constructor(server: HTTPServer) {
    this.io = this.setupSocketIo(server);
    this.onConnection();
  }

  setupSocketIo(server: HTTPServer) {
    return new Server<SocketData>(server, {
      pingTimeout: 3600,
      cors: {
        origin: process.env.CLIENT_URL,
      },
    });
  }

  onConnection(): void {
    this.io.on('connection', (socket) => {
      try {
        if (socket.handshake.auth && socket.handshake.auth.token) {
          const { _id: userId } = jwt.verify(socket.handshake.auth.token as string, process.env.JWT_ACCESS_SECRET as string) as IUserJWTPayload;
          console.log(`${userId} connected`);
          
          socket.data.userId = userId;

          this.startTyping(userId, socket);
        }
      } catch (e) {
        throw ApiError.UnautorizedError();
      }
    });
  }

  async findReceiverSocket(receiverId: string) {
    const sockets = await this.io.fetchSockets();
    const receiver = sockets.find((sct: SocketData) => sct.data.userId === receiverId);
    return receiver;
  }

  startTyping(userId: string, socket: Socket): void {
    socket.on('isTyping', async (receiverId: string) => {
      const receiver = await this.findReceiverSocket(receiverId);
      socket.to(receiver?.id as string).emit('isTyping', userId);
    });
  }

  sendMessage(receiverId: string, message: IMessage): void {
    this.io.to(receiverId).emit('message:received', message);
  }
} 


