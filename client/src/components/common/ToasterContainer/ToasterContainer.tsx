import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/scss/main.scss';

export function ToasterContainer(): JSX.Element {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
