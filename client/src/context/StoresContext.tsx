import React, { createContext } from 'react';
import AuthStore from 'stores/authStore';
import ChatStore from 'stores/chatStore';
import SocketStore from 'stores/socketStore';
import UIStore from 'stores/uiStore';
import { State } from 'interfaces/State';

const authStore = new AuthStore();
const chatStore = new ChatStore();
const socketStore = new SocketStore();
const uiStore = new UIStore();

export const StoresContext = createContext<Partial<State>>({
  authStore,
  chatStore,
  socketStore,
  uiStore,
});
