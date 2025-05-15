import React, { useEffect, useState } from 'react';
import { checkUserConnect } from '../../CheckUserInformation';
import { AjoutPanier } from '../../panier/Alert';
import { useDispatch } from 'react-redux';
import ConteneurWishListAndRecentlyViewed from '../../../ConteneurWishlistAndRecentlyViewed';

const ConsulteRecemment = ({ isMobile }) => {
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [changeWishList, setChangeWishList] = useState(false);
    const dispatch = useDispatch();

    const loadRecentlyView = async () => {
        try {
            const result = await checkUserConnect();
            const response = await fetch(`http://127.0.0.1:3000/getRecentlyViewProduct/${result.user.id}`);
            const data = await response.json();
            setRecentlyViewed(data.recentlyViewed || []);
        } catch (error) {
            console.error('Erreur lors du chargement des produits consultés :', error);
        }
    };

    const modifyRecentlyViewedList = async (produit_id, produit_nom, produit_prix, produit_promotion, produit_image) => {
        try {
            let prixReduit = null;
            if (produit_promotion !== 0) {
                prixReduit = parseFloat(produit_prix * (1 - Number(produit_promotion) / 100)).toFixed(2);
            }

            const data = await deleteProductRecentlyViewedList(produit_id);

            if (data.success) {
                const indexDetailPanier = AjoutPanier(dispatch, produit_id, produit_nom, produit_prix, prixReduit, produit_image);
                return indexDetailPanier;
            }

        } catch (error) {
            console.error('Erreur lors de l’ajout au panier :', error);
        }
    };

    const deleteProductRecentlyViewedList = async (produit_id) => {
        const result = await checkUserConnect();
        const userId = result.user.id;
        const response = await fetch(`http://localhost:3000/deleteRecentlyViewedList/${userId}/${produit_id}`, {
            method: "POST",
            credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
            setChangeWishList(prev => !prev);
        }
        return data;
    };

    useEffect(() => {
        loadRecentlyView();
    }, [changeWishList]);

    return (
        <div>
            {recentlyViewed.length === 0 ? (
                <div className={`w-full flex flex-col items-center ${isMobile ? 'gap-5 px-4 py-6' : 'gap-7 px-6 py-8'}`}>
                    <img src="./icones/panier_coeur.png" alt="" className={`${isMobile ? 'w-20 h-20' : 'w-28 h-28'}`} />
                    <p className={`${isMobile ? 'text-sm' : ''}`}>Vous n'avez actuellement regardé aucun produit...</p>
                    <p className={`${isMobile ? 'text-center text-sm' : 'text-center font-semibold'}`}>
                        Pour voir la liste des produits disponibles, cliquez sur le bouton ci-dessous !
                    </p>
                    <a
                        href='/search'
                        className={`rounded-lg bg-rose-500 text-white text-center ${isMobile ? 'py-2 px-4 text-sm' : 'py-3 px-6'} hover:bg-rose-400 active:scale-95 transition transform`}
                    >
                        Voir les produits
                    </a>
                </div>
            ) : (
                <div className={`w-full flex flex-col items-center ${isMobile ? 'gap-4 px-3 py-4' : 'gap-5 px-4 py-6'} max-h-[80vh] overflow-y-auto`}>
                    <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold`}>Produits consultés récemment :</h2>
                    <div className={`grid ${isMobile ? 'grid-cols-1 w-3/4' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-5`}>
                        {recentlyViewed.map((item) => (
                            <ConteneurWishListAndRecentlyViewed
                                key={item.id}
                                item={item}
                                addPanier={modifyRecentlyViewedList}
                                deleteProductList={deleteProductRecentlyViewedList}
                                isMobile={isMobile}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConsulteRecemment;
