export const checkUserConnect = async () => {
    try {
      const response = await fetch('http://localhost:3000/userInfo', {
        method: 'GET',
        credentials: 'include',
      });
  
      const result = await response.json();
      console.log('result : ', result);
  
      if (response.status === 401) {
        console.log("🔍 Utilisateur non authentifié");
        return result;
      }
  
      if (result.success === true) {
        console.log("🔍 Infos utilisateur récupérées :", result);
        return result;
      } else {
        console.log("🔍 Utilisateur non connecté");
        return result;
      }
    } catch (err) {
      console.error("❌ Erreur lors de la récupération des infos utilisateur :", err);
      return result;
    }
  };
  