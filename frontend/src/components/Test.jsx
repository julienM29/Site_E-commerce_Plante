import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduit, removeProduit, clearPanier } from '../mySlice';
import ConteneurProduitPanier from './shared/ConteneurProduitPanier';
const PanierTest = () => {
  const { panier, total, status, error } = useSelector((state) => state.myState);

  const dispatch = useDispatch();

  const handleAddProduit = (produit) => {
    // Vérifier si le produit est déjà dans le panier
    const produitExistant = panier.find(p => p.id === produit.id);
    if (produitExistant) {
      // Incrémenter la quantité si le produit existe déjà
      dispatch(addProduit({ ...produitExistant, quantite: produitExistant.quantite + 1 }));
    } else {
      dispatch(addProduit({ ...produit, quantite: 1 })); // Ajouter le produit avec quantité 1
    }
  };

  const handleRemoveProduit = async (produit) => {
    dispatch(removeProduit(produit)); // Supprimer le produit du panier
    const response = await fetch(`http://localhost:3000/deleteDetailPanier/${produit.detail_id}`, {
      method: "POST",
      credentials: "include"
  });
  };

  const handleClearPanier = () => {
    dispatch(clearPanier()); // Vider le panier
  };

  
  
 
  return (
    <div>
      <h2>Panier</h2>
      {panier.length > 0 ? (
        <div>
          {panier.map((produit, index) => (
            <ConteneurProduitPanier
              onDelete={() => handleRemoveProduit(produit)}
              key={produit.id}
              detail_panier_id={produit.detail_id}
              imgProduit={produit.image}
              prixTotalProduit={produit.prix}
              nomProduit={produit.nom}
              quantiteProduit={produit.quantite}
            />
          ))}
        </div>
      ) : (
        <p>Le panier est vide.</p>
      )}
    </div>
  );
};

export default PanierTest;
