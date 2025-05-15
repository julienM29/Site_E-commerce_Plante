import React, { useState, useEffect } from 'react';
import BarreLivraisonGratuite from '../BarreLivraisonGratuite';
import ConteneurProduitPanier from '../ConteneurProduitPanier';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduit } from '../../../mySlice';
import { Sheet } from 'react-modal-sheet';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BottomSheetPanier = ({ closeSidebar, isOpen }) => {
  const { panier, total } = useSelector((state) => state.myState);
  const dispatch = useDispatch();
  const [prixTotalPanier, setPrixTotalPanier] = useState(total || 0);

  const handleRemoveProduit = async (produit, image) => {
    dispatch(removeProduit(produit));
    await fetch(`http://localhost:3000/deleteDetailPanier/${produit.detail_id}`, {
      method: "POST",
      credentials: "include"
    });
  //   toast.error(
  //     <div className="flex items-center gap-3">
  //       <img
  //         src={`/images/${image}`}
  //         alt={produit.nom}
  //         className="w-10 h-10 object-cover rounded-full border border-gray-300"
  //       />
  //       <div>
  //         <p className="text-sm font-semibold text-green-700">{produit.nom}</p>
  //         <p className="text-xs text-gray-600">
  //           supprimé du panier
  //         </p>
  //       </div>
  //     </div>,
  //     {
  //       position: 'top-right',
  //       autoClose: 3000,
  //       style: { zIndex: 9999 },
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     }
  //   );
  };

  useEffect(() => {
    if (total !== prixTotalPanier) {
      setPrixTotalPanier(total);
    }
  }, [total]);

  return (
    <Sheet isOpen={isOpen} onClose={closeSidebar}>
      <Sheet.Container style={{ zIndex: 2000 }}>
        {/* Header avec fond différent et coins arrondis */}
        <Sheet.Header>
          <div className="flex flex-col gap-6 items-center justify-center py-4 bg-gray-200 rounded-t-lg">
            <div className="w-16 h-1 bg-gray-400 rounded-full" />
            <div className="w-full px-4 flex justify-between items-center  ">
              <h2 className="text-lg font-semibold">Votre panier</h2>
              <span className="text-sm text-gray-700">{panier.length} {panier.length > 1 ? "produits" : "produit"} </span>
            </div>
          </div>
        </Sheet.Header>

        {/* Contenu du modal */}
        <Sheet.Content onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col px-4 pt-2 pb-32 gap-4 overflow-y-auto">
            {/* Barre de livraison gratuite */}
            <div className='pb-4  '>
              <BarreLivraisonGratuite prixPanier={prixTotalPanier} />
            </div>

            {/* Affichage des produits */}
            {panier.length > 0 ? (
              panier.map((produit, index) => (
                <ConteneurProduitPanier
                  key={produit.id}
                  panierIndex={index}
                  onDelete={() => handleRemoveProduit(produit, produit.image)}
                  detail_panier_id={produit.detail_id}
                  imgProduit={produit.image}
                  prixTotalProduit={produit.prix}
                  nomProduit={produit.nom}
                  quantiteProduit={produit.quantite}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 mt-10">
                <div className="text-4xl mb-2">🛒</div>
                Votre panier est vide.
              </div>
            )}
          </div>

          {/* Footer avec fond distinct */}
          <div className="fixed bottom-0 left-0 right-0 bg-gray-100 shadow-lg border-t border-gray-200 px-4 py-4 flex flex-col items-center gap-3 z-50  ">
            <a
              href="/panier"
              className="w-full text-center font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-4 py-3"
            >
              Aller au panier – {total} €
            </a>
            <button onClick={closeSidebar} className="text-emerald-600 underline text-sm">
              Continuer vos achats
            </button>
          </div>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onTap={closeSidebar} />
    </Sheet>
  );
};

export default BottomSheetPanier;
