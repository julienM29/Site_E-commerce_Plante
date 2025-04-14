import React, { useEffect, useState } from 'react';
import { checkUserConnect } from '../../CheckUserInformation';
import { AjoutPanier } from '../../panier/Alert';
import { updateWishList, deleteWishList } from '../../wishList/updateWishList';
import { useDispatch, useSelector } from 'react-redux';
import { upQuantityInput } from '../../../../mySlice';
import ConteneurWishListAndRecentlyViewed from '../../../ConteneurWishlistAndRecentlyViewed';

const ListeEnvie = () => {
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
        <div> {/* ✅ Ajout d'un conteneur englobant */}
            {wishList.length === 0 ? (
                <div className="w-full gap-7 flex flex-col items-center px-6 py-8">
                    <img src="./icones/panier_coeur.png" alt="" className="w-28 h-28" />
                    <p>Votre liste d'envies est vide...</p>
                    <p className="text-center font-semibold">
                        Vous pouvez ajouter des articles dans votre liste d'envies et les commander plus tard !
                    </p>
                    <a href='/search' className="rounded-lg py-2 px-4 bg-rose-500 text-white hover:bg-rose-400">
                        Voir les produits
                    </a>
                </div>
            ) : (
                <div className="w-full gap-5 flex flex-col items-center px-4 py-6 max-h-[65vh] overflow-y-auto ">
                    <h2 className="text-xl font-semibold">Votre liste d'envies :</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {wishList.map((item) => (
                                                        < ConteneurWishListAndRecentlyViewed key={item.id} item={item} addPanier={modifyWishList} deleteProductList={deleteProductWishList} />

                            // <article key={item.id} className="relative bg-white rounded-lg shadow-lg border p- hover:shadow-xl transition hover:border-2 hover:border-green-300/70">
                            //     {item.promotion !== 0 && (
                            //         <p className='w-3/4 text-center roup z-10 absolute top-5 left-0 px-3 border rounded-e-lg bg-white/90 '>- {item.promotion} % sur le produit</p>

                            //     )}
                            //     <button
                            //         className="absolute top-1 right-1 bg-gray-300/90 text-black w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-700 hover:text-white transition-all duration-200"
                            //         onClick={() => deleteProductWishList(item.id)}
                            //         aria-label="Supprimer de la liste d'envies"
                            //         title="Supprimer de la liste d'envies"
                            //     >
                            //         ✖
                            //     </button>

                            //     <a href={`/produit/${item.id}`}>
                            //         <img src={`images/${item.image}`} alt={item.nom} className="w-full h-40 object-cover rounded-t-lg" />
                            //     </a>
                            //     <div className="flex flex-col gap-2 p-2">
                            //         <a href={`/produit/${item.id}`} className="text-lg font-semibold truncate hover:text-green-600">{item.nom}</a>
                            //         <p className="text-gray-500 font-bold">{item.prix}€</p>
                            //         <button className="text-sm bg-emerald-800 text-white py-2 px-4 rounded-lg hover:bg-emerald-700"
                            //             onClick={() => modifyWishList(item.id, item.nom, item.prix,item.promotion, item.image)}>
                            //             Ajouter au panier
                            //         </button>
                            //     </div>
                            // </article>

                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListeEnvie;
