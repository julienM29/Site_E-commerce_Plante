import React, { useEffect, useState } from 'react';
import { checkUserConnect } from '../../CheckUserInformation';
import { useDispatch, useSelector } from 'react-redux';
import { AjoutPanier } from '../../panier/Alert';
import ConteneurWishListAndRecentlyViewed from '../../../ConteneurWishlistAndRecentlyViewed';

const ConsulteRecemment = () => {
    const [recentlyViewed, setRecentlyViewed] = useState([]); // Initialisé à [] pour éviter les erreurs
    const dispatch = useDispatch(); // ✅ Utiliser useDispatch dans un composant React
    const [changeWishList, setChangeWishList] = useState(false); // Initialisé à [] pour éviter les erreurs

    const loadRecentlyView = async () => {
        try {
            const result = await checkUserConnect();
            const response = await fetch(`http://127.0.0.1:3000/getRecentlyViewProduct/${result.user.id}`);
            const data = await response.json();
            setRecentlyViewed(data.recentlyViewed || []); // Sécurisation si l'API renvoie `null`
        } catch (error) {
            console.error('Erreur lors du chargement de la wishlist:', error);
        }
    };

    const modifyRecentlyViewedList = async (produit_id, produit_nom, produit_prix, produit_promotion, produit_image) => {
        try {
            let prixReduit = null;
            if (produit_promotion !== 0) {
                prixReduit = parseFloat(produit_prix * (1 - Number(produit_promotion) / 100)).toFixed(2);
            }
    
            // Ajoute 'await' pour attendre la réponse avant de continuer
            const data = await deleteProductRecentlyViewedList(produit_id);
    
            if (data.success) {
                const indexDetailPanier = AjoutPanier(dispatch, produit_id, produit_nom, produit_prix, prixReduit, produit_image);
                return indexDetailPanier;
            }
    
        } catch (error) {
            console.error('Erreur lors du chargement de la wishlist:', error);
        }
    }
    
    const deleteProductRecentlyViewedList = async (produit_id) => {
        const result = await checkUserConnect();
        const userId = result.user.id;
        // 🔹 Faire une requête pour ajouter en BDD
        const response = await fetch(`http://localhost:3000/deleteRecentlyViewedList/${userId}/${produit_id}`, {
            method: "POST",
            credentials: "include",
        });
        const data = await response.json(); // Convertir la réponse en JSON
        if (data.success) {
            setChangeWishList(prev => !prev); // Bascule l'état pour déclencher le reload

        }
        return data
    }
    useEffect(() => {
        loadRecentlyView();
    }, [changeWishList]);
    return (
        <div>
            {recentlyViewed.length === 0 ? (
                <div className="w-full gap-7 flex flex-col items-center px-6 py-8">
                    <img src="./icones/panier_coeur.png" alt="" className="w-28 h-28" />
                    <p>Vous n'avez actuellement regardé aucun produit...</p>
                    <p className="text-center font-semibold">
                        Pour voir la liste des produits disponible cliquer sur le bouton en dessous !
                    </p>
                    <a href='/search' className="rounded-lg py-2 px-4 bg-rose-500 text-white hover:bg-rose-400">
                        Voir les produits
                    </a>
                </div>
            ) : (
                <div className="w-full gap-5 flex flex-col items-center px-4 py-6 max-h-[65vh] overflow-y-auto ">
                    <h2 className="text-xl font-semibold">Votre liste d'envies :</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {recentlyViewed.map((item) => (

                            < ConteneurWishListAndRecentlyViewed key={item.id} item={item} addPanier={modifyRecentlyViewedList} deleteProductList={deleteProductRecentlyViewedList} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

};

export default ConsulteRecemment;
