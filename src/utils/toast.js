import { ToastContainer, toast } from 'react-toastify';

export const showToastMessage = (mes, type = 'default', position = 'top-right') => {
  toast(mes, {
    type: type, // Sử dụng type như một thuộc tính trong options
    position: position,
    autoClose: 1000, // hiển thị trong 2 giây (hoặc ít hơn)
  });
};
