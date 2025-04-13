import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { checkUserConnect } from '../shared/CheckUserInformation';

const RecentlyViewedProduct = () => {
  const sendRecentlyViewedToServer = async () => {
    const result = await checkUserConnect();
    const userId = result.user.id;
    
    const recentlyViewed = Cookies.get('recentlyViewProduct');
    if (!recentlyViewed) return;  // Si le cookie n'existe pas, on arrête la fonction

    const blob = new Blob([recentlyViewed], { type: 'application/json' });

    // Envoi de la requête après 1 seconde
    setTimeout(() => {
      navigator.sendBeacon(`http://localhost:3000/updateRecentlyViewProduct/${userId}`, blob);
      console.log('sendBeacon envoyé');
    }, 1000);  // Attendre 1 seconde avant d'envoyer la requête
  };

  useEffect(() => {
    // Appel de la fonction après un certain délai avant de quitter la page
    setTimeout(sendRecentlyViewedToServer, 3000);  // Délai de 3 secondes avant d'envoyer les données

    // Optionnel : Retourner un clean-up si nécessaire
    return () => clearTimeout();
  }, []);

  return null;  // Ce composant n'affiche rien, il fait juste son job en arrière-plan
};

export default RecentlyViewedProduct;
