import { ToastContainer, toast } from 'react-toastify';

export const showToastMessage = (mes, type = 'default', position = 'top-right') => {
  toast(mes, {
    type: type, // Sử dụng type như một thuộc tính trong options
    position: position,
  });
};
