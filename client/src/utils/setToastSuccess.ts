import { Id, toast } from 'react-toastify';
import 'react-toastify/scss/main.scss';

const setToastSuccess = (message: string): Id => toast.success(message, {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

export default setToastSuccess;
