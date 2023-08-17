import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthStore from 'stores/authStore';
import ChatStore from 'stores/chatStore';
import SocketStore from 'stores/socketStore';
import UIStore from 'stores/uiStore';
import { BrowserRouter } from 'react-router-dom';
import { StoresContext } from 'context/StoresContext';
import App from './App/App';

const authStore = new AuthStore();
const chatStore = new ChatStore();
const socketStore = new SocketStore();
const uiStore = new UIStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as Element,
);

root.render(
  <React.StrictMode>
    <StoresContext.Provider value={{
      authStore, chatStore, socketStore, uiStore,
    }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoresContext.Provider>
  </React.StrictMode>,
);
