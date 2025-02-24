import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkUserConnect } from '../CheckUserInformation';
import { addProduit } from '../../../mySlice';

export const AjoutPanier = async (dispatch,produit_id, nom, prixInitial, primaryImage) => {

  try {
    const result = await checkUserConnect();
    if (!result?.user?.id) {
      throw new Error("Utilisateur non connecté !");
    }

    const userId = result.user.id;
    // 🔹 Faire une requête pour ajouter en BDD
    const response = await fetch(`http://localhost:3000/ajoutPanier/${userId}/${produit_id}`, {
      method: "POST",
      credentials: "include"
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json(); // Convertir la réponse en JSON
    const insert_id = data.insertId; // ✅ Récupérer l'ID du panier (ou détail panier)
    if (data) {
      toast.success(`${nom} a été ajouté au panier !`, {
        position: "top-right",
        autoClose: 3000,
      });

      // 🔹 Construire l'objet avant de l'envoyer au reducer
      const produitAjoute = {
        id: produit_id,
        nom: nom,
        image: primaryImage,
        quantite: 1, // 🛒 Par défaut, on ajoute 1
        prix: prixInitial,
        detail_id: insert_id, // ✅ Associer l'ID du détail panier
      };

      dispatch(addProduit(produitAjoute)); // ✅ Envoyer un objet bien formé

    } else {
      toast.error("Erreur lors de l'ajout au panier !");
    }
  } catch (error) {
    console.error("Erreur dans AjoutPanier :", error);
    toast.error("Impossible d'ajouter au panier !");
  }
};

