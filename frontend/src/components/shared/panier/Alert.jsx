import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Alert = (nom) => {
  toast.success(` ${nom} est ajouté au panier !`, {
    position: "top-right",
    autoClose: 3000,
  });
};