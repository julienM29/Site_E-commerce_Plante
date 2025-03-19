

  import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { checkUserConnect } from '../CheckUserInformation';
  import { AjoutPanier } from "../panier/Alert";
  export const updateWishList = async (dispatch, produit_id, nom, prixInitial, primaryImage) => {
  
    try {
      const result = await checkUserConnect();
      if (!result?.user?.id) {
        throw new Error("Utilisateur non connecté !");
      }
  
      const userId = result.user.id;
      // 🔹 Faire une requête pour ajouter en BDD
      const response = await fetch(`http://localhost:3000/deleteWishList/${userId}/${produit_id}`, {
        method: "POST",
        credentials: "include",
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const data = await response.json(); // Convertir la réponse en JSON
      if (data.success) {
        const indexDetailPanier = AjoutPanier(dispatch,produit_id, nom, prixInitial, primaryImage)
        return indexDetailPanier;
      } 
      
    } catch (error) {
      console.error("Erreur dans AjoutPanier :", error);
      toast.error("Impossible d'ajouter au panier !");
    }
  };
  export const deleteWishList = async (produit_id) => {
  
    try {
      const result = await checkUserConnect();
      if (!result?.user?.id) {
        throw new Error("Utilisateur non connecté !");
      }
  
      const userId = result.user.id;
      // 🔹 Faire une requête pour ajouter en BDD
      const response = await fetch(`http://localhost:3000/deleteWishList/${userId}/${produit_id}`, {
        method: "POST",
        credentials: "include",
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
    } catch (error) {
      console.error("Erreur dans AjoutPanier :", error);
      toast.error("Impossible d'ajouter au panier !");
    }
  }; 
  