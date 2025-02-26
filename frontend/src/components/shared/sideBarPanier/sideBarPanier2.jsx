import React, { useState,useEffect } from 'react';
import BarreLivraisonGratuite from '../BarreLivraisonGratuite';
import ConteneurProduitPanier from '../ConteneurProduitPanier';
import { useDispatch, useSelector } from 'react-redux';
import { addProduit, removeProduit, clearPanier } from '../../../mySlice';

const SideBarPanier2 = ({ sidebarRef, closeSidebar }) => {
    const { panier, total, status, error } = useSelector((state) => state.myState);
    const dispatch = useDispatch();

    const [prixTotalPanier, setPrixTotalPanier] = useState(0);

    const handleRemoveProduit = async (produit) => {
        dispatch(removeProduit(produit)); // Supprimer le produit du panier
        const response = await fetch(`http://localhost:3000/deleteDetailPanier/${produit.detail_id}`, {
            method: "POST",
            credentials: "include"
        });
    };

    // const prixTotal = detailPanierPrixTotalArray.reduce((total, prix) => total + prix, 0).toFixed(2);
    // setPrixTotalPanier(prixTotal); // Assure-toi que le prix total soit correctement formaté à 2 décimales
    return (
        <div ref={sidebarRef} className="fixed flex flex-col items-center top-0 right-0 w-1/5 bg-white h-screen border-l shadow-lg transform translate-x-full z-20">
            {/* En tête de la side barre */}
            <div className="w-full flex items-center justify-around h-[10%] bg-custom-light px-4 py-2">
                <div className="text-3xl font-semibold tracking-wide flex gap-2">
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
            {/* Contenu */}
            {/* {panier.length > 0 ? ( */}
            <div className="w-11/12 h-3/4 flex flex-col gap-2 py-4 overflow-y-auto overflow-x-hidden scrollbar-none ">
                <BarreLivraisonGratuite prixPanier={prixTotalPanier}></BarreLivraisonGratuite>

                <div>
                    {panier.map((produit, index) => (
                        <ConteneurProduitPanier
                            panierIndex={index}
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
            </div>
            {/* ) : (
                <p>Le panier est vide.</p>
            )} */}


            <div className='h-[15%] bg-custom-light w-full flex flex-col gap-4 justify-center items-center'>

                <button type="submit" className="w-3/4 font-bold flex justify-center bg-gradient-to-r from-emerald-600 to-emerald-300 hover:bg-gradient-to-l hover:from-emerald-600 hover:to-emerald-300 focus:ring-4 focus:outline-none focus:ring-emerald-400  text-white rounded-full text-md px-5 py-2.5 text-center shadow-md hover:shadow-lg transition-all duration-500 ease-in-out">
                    <a href="/panier">Aller au panier - {total} euros</a>
                </button>
                <button onClick={closeSidebar} className="w-3/4 flex justify-center items-center font-semibold  text-md text-emerald-600 underline-offset-4 hover:underline">
                    Continuer vos achats

                </button>
            </div>
        </div>
    );
};

export default SideBarPanier2;

