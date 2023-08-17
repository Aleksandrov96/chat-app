import { Id, toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';

export const setToastError = (error: string): Id => toast.error(error, {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});
