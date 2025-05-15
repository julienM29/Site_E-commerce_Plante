import React, { useState,useEffect } from 'react';
import BarreLivraisonGratuite from '../BarreLivraisonGratuite';
import ConteneurProduitPanier from '../ConteneurProduitPanier';
import { useDispatch, useSelector } from 'react-redux';
import { addProduit, removeProduit, clearPanier } from '../../../mySlice';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SideBarPanier2 = ({ sidebarRef, closeSidebar }) => {
    const { panier, total } = useSelector((state) => state.myState);
    const dispatch = useDispatch();

    const [prixTotalPanier, setPrixTotalPanier] = useState( total || 0);

    const handleRemoveProduit = async (produit, image) => {
        dispatch(removeProduit(produit)); // Supprimer le produit du panier
        await fetch(`http://localhost:3000/deleteDetailPanier/${produit.detail_id}`, {
            method: "POST",
            credentials: "include"
        });
        toast.error(
            <div className="flex items-center gap-3">
              <img
                src={`/images/${image}`}
                alt={produit.nom}
                className="w-10 h-10 object-cover rounded-full border border-gray-300"
              />
              <div>
                <p className="text-sm font-semibold text-green-700">{produit.nom}</p>
                <p className="text-xs text-gray-600">
                    supprimé du panier
                </p>
              </div>
            </div>,
            {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
    };
    useEffect(() => {
        // Ne mettre à jour le prix total que si `total` a changé
        if (total !== prixTotalPanier) {
            setPrixTotalPanier(total);
            console.log('useEffect set prix total : ', total);
        }
    }, [total]);
    return (
        <div ref={sidebarRef} className="fixed flex flex-col items-center justify-between top-0 right-0 w-[22%] bg-white h-screen border-l shadow-lg transform translate-x-full z-20">
            {/* En tête de la side barre */}
            <div className="w-full flex items-center justify-around h-[11%] bg-custom-light px-6 py-2 shadow-md">
                <div className="text-2xl font-semibold tracking-wide flex gap-2">
                    <p>Panier</p>
                    <p> - {panier.length} produits</p>
                </div>
                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeSidebar}
                >
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>

            </div>
            <div className="w-full px-4 h-3/4 flex flex-col gap-6 py-4 overflow-y-auto overflow-x-hidden scrollbar-none ">
                <BarreLivraisonGratuite prixPanier={prixTotalPanier}></BarreLivraisonGratuite>

                <div>
                    {panier.map((produit, index) => (
                        <ConteneurProduitPanier
                            panierIndex={index}
                            onDelete={() => handleRemoveProduit(produit, produit.image)}
                            key={produit.id}
                            detail_panier_id={produit.detail_id}
                            imgProduit={produit.image}
                            prixTotalProduit={produit.prix}
                            nomProduit={produit.nom}
                            quantiteProduit={produit.quantite}
                        />
                    ))}
                </div>
            </div>
            {/* ) : (
                <p>Le panier est vide.</p>
            )} */}


            <div className='h-[14%] bg-custom-light w-full flex flex-col gap-4 justify-center items-center border-t-2'>

                <a href="/panier"   className="flex justify-center items-center font-semibold bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 text-white rounded-full text-base px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                >Aller au panier - {total} euros</a>
                <button onClick={closeSidebar} className="w-3/4 flex justify-center items-center font-semibold  text-sm text-emerald-600 underline-offset-4 hover:underline">
                    Continuer vos achats

                </button>
            </div>
        </div>
    );
};

export default SideBarPanier2;

