import React, { useEffect, useState } from 'react';
import { checkUserConnect } from '../../CheckUserInformation';
import { AjoutPanier } from '../../panier/Alert';
import { updateWishList, deleteWishList } from '../../wishList/updateWishList';
import { useDispatch, useSelector } from 'react-redux';
import { upQuantityInput } from '../../../../mySlice';
import ConteneurWishListAndRecentlyViewed from '../../../ConteneurWishlistAndRecentlyViewed';

const ListeEnvie = ({isMobile}) => {
    const [wishList, setWishList] = useState([]); // Initialisé à [] pour éviter les erreurs
    const [changeWishList, setChangeWishList] = useState(false); // Initialisé à [] pour éviter les erreurs
    const dispatch = useDispatch(); // ✅ Utiliser useDispatch dans un composant React
    const { panier } = useSelector((state) => state.myState);

    const loadWishList = async () => {
        try {
            const result = await checkUserConnect();
            const response = await fetch(`http://127.0.0.1:3000/getWishList/${result.user.id}`);
            const data = await response.json();
            setWishList(data || []); // Sécurisation si l'API renvoie `null`
        } catch (error) {
            console.error('Erreur lors du chargement de la wishlist:', error);
        }
    };
    const modifyWishList = async (produit_id, produit_nom, produit_prix, produit_promotion, produit_image) => {
        try {
            let prixReduit = null;
            if(produit_promotion !== 0 ){
                prixReduit = parseFloat(produit_prix * (1 - Number(produit_promotion) / 100)).toFixed(2)
            }
            const indexDetailPanier = await updateWishList(dispatch, produit_id, produit_nom, produit_prix,prixReduit, produit_image)
            setChangeWishList(prev => !prev); // Bascule l'état pour déclencher le reload
            console.log('lindex detail panier recup de l update wishlist : ', indexDetailPanier)

        } catch (error) {
            console.error('Erreur lors du chargement de la wishlist:', error);
        }
    }
    const deleteProductWishList = async (produit_id) => {
        deleteWishList(produit_id)
        setChangeWishList(prev => !prev); // Bascule l'état pour déclencher le reload

    }
    useEffect(() => {
        loadWishList();
    }, [changeWishList]);

    return (
        <div>
    {wishList.length === 0 ? (
        <div className={`w-full flex flex-col items-center ${isMobile ? 'gap-5 px-4 py-6' : 'gap-7 px-6 py-8'}`}>
            <img src="./icones/panier_coeur.png" alt="" className={`${isMobile ? 'w-20 h-20' : 'w-28 h-28'}`} />
            <p className={`${isMobile ? 'text-sm' : ''}`}>Votre liste d'envies est vide...</p>
            <p className={`${isMobile ? 'text-center text-sm' : 'text-center font-semibold'}`}>
                Vous pouvez ajouter des articles dans votre liste d'envies et les commander plus tard !
            </p>
            <a
                href='/search'
                className={`rounded-lg bg-emerald-900 text-white text-center ${isMobile ? 'py-2 px-4 text-sm' : 'py-3 px-6'} hover:bg-emerald-800 active:scale-95 transition transform`}
            >
                Voir les produits
            </a>
        </div>
    ) : (
        <div className={`w-full flex flex-col items-center ${isMobile ? 'gap-4 px-3 py-4' : 'gap-5 px-4 py-6'} max-h-[80vh] overflow-y-auto`}>
            <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold`}>Votre liste d'envies :</h2>
            <div className={`grid ${isMobile ? 'grid-cols-1 w-3/4' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-5`}>
                {wishList.map((item) => (
                    <ConteneurWishListAndRecentlyViewed
                        key={item.id}
                        item={item}
                        addPanier={modifyWishList}
                        deleteProductList={deleteProductWishList}
                        isMobile={isMobile} 
                    />
                ))}
            </div>
        </div>
    )}
</div>

    );
};

export default ListeEnvie;
