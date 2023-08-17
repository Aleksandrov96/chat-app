import { makeAutoObservable } from 'mobx';
import { Socket } from 'socket.io-client';

export default class SocketStore {
  socket = {} as Socket;

  constructor() {
    makeAutoObservable(this);
  }

  setSocket(socket: Socket): void {
    this.socket = socket;
  }
}
