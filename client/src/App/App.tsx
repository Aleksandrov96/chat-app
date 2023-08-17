import React, { useEffect, useContext, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignInPage from 'pages/SignInPage/SignInPage';
import SignUpPage from 'pages/SignUpPage/SignUpPage';
import ChatPage from 'pages/ChatPage/ChatPage';
import { StoresContext } from 'context/StoresContext';
import { observer } from 'mobx-react-lite';
import { setToastError } from 'utils/setToastError';
import { SocketService } from 'services/socket-service';
import SocketStore from 'stores/socketStore';
import { I18NProvider } from 'lang/I18NProvider';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import './App.scss';

function App() {
  const {
    authStore, chatStore, socketStore, uiStore,
  } = useContext(StoresContext);

  const shouldCheckAuth = useRef(true);

  useEffect(() => {
    if (shouldCheckAuth.current) {
      shouldCheckAuth.current = false;
      if (localStorage.getItem('token')) {
        authStore?.checkAuth()
          .catch((e) => {
            setToastError(e.message as string);
          });
      }
    }
  }, []);

  useEffect(() => {
    authStore?.isAuth && SocketService.initSocket(socketStore as SocketStore, chatStore);
  }, [authStore?.isAuth]);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      uiStore?.setTheme(theme);
    }
  }, []);

  return (
    <I18NProvider locale={uiStore?.locale as string}>
      <Routes>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route
          path="/"
          element={
          (
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          )
        }
        />
      </Routes>
    </I18NProvider>
  );
}

export default observer(App);
