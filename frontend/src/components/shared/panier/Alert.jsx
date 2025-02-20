import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkUserConnect } from '../CheckUserInformation';

export const AjoutPanier = async (produit_id,nom) => {
  try {
    const result = await checkUserConnect();
    if (!result?.user?.id) {
      throw new Error("Utilisateur non connecté !");
    }

    const userId = result.user.id;
    const response = await fetch(`http://localhost:3000/ajoutPanier/${userId}/${produit_id}`, { method: "POST", credentials: "include" });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json(); // Convertir la réponse en JSON

    if (data.success) {
      toast.success(`${nom} a été ajouté au panier !`, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error("Erreur lors de l'ajout au panier !");
    }
  } catch (error) {
    console.error("Erreur dans AjoutPanier :", error);
    toast.error("Impossible d'ajouter au panier !");
  }
};

