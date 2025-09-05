import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Initialize toast config only when needed
const getToastConfig = () => ({
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  style: {
    background: '#1E1E1E',
    fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif',
    borderRadius: '8px',
    border: '1px solid',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontSize: '14px'
  }
});

export const showToast = {
  success: (message) => {
    if (!message) return;
    const config = getToastConfig();
    toast.success(message, {
      ...config,
      style: {
        ...config.style,
        borderColor: '#BB86FC',
        color: '#BB86FC',
      },
      progressStyle: {
        background: '#BB86FC'
      },
      icon: '🎉'
    });
  },
  error: (message) => {
    if (!message) return;
    const config = getToastConfig();
    toast.error(message, {
      ...config,
      style: {
        ...config.style,
        borderColor: '#CF6679',
        color: '#CF6679',
      },
      progressStyle: {
        background: '#CF6679'
      },
      icon: '❌'
    });
  },
  info: (message) => {
    if (!message) return;
    const config = getToastConfig();
    toast.info(message, {
      ...config,
      style: {
        ...config.style,
        borderColor: '#03DAC6',
        color: '#03DAC6',
      },
      progressStyle: {
        background: '#03DAC6'
      },
      icon: 'ℹ️'
    });
  },
  warning: (message) => {
    if (!message) return;
    const config = getToastConfig();
    toast.warning(message, {
      ...config,
      style: {
        ...config.style,
        borderColor: '#FFB800',
        color: '#FFB800',
      },
      progressStyle: {
        background: '#FFB800'
      },
      icon: '⚠️'
    });
  }
};
