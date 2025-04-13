import React, { useEffect, useState } from 'react';
import { checkUserConnect } from '../../CheckUserInformation';
import { useDispatch, useSelector } from 'react-redux';
import { upQuantityInput } from '../../../../mySlice';

const ConsulteRecemment = () => {
    const [recentlyViewed, setRecentlyViewed] = useState([]); // Initialisé à [] pour éviter les erreurs
    const dispatch = useDispatch(); // ✅ Utiliser useDispatch dans un composant React
    const { panier } = useSelector((state) => state.myState);

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


    const addPanier = async (produit_id) => {
        console.log('add panier')
        try {
            const detail_panierFromRedux = panier[produit_id]?.detail_id || 0;
            dispatch(upQuantityInput({ detail_panierFromRedux }));
        } catch (error) {
            console.error('Erreur lors du chargement de la wishlist:', error);
        }
    }

    useEffect(() => {
        loadRecentlyView();
    }, []);
    return (
        <div> {/* ✅ Ajout d'un conteneur englobant */}
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
                            <article key={item.id} className="relative bg-white rounded-lg shadow-lg border p-2 hover:shadow-xl transition hover:border-2 hover:border-green-300/70">
                                <a href={`/produit/${item.id}`}>
                                    <img src={`images/${item.image}`} alt={item.nom} className="w-full h-40 object-cover rounded-t-lg" />
                                </a>
                                <div className="flex flex-col gap-2 p-2">
                                    <a href={`/produit/${item.id}`} className="text-lg font-semibold truncate hover:text-green-600">{item.nom}</a>
                                    <p className="text-gray-500 font-bold">{item.prix}€</p>
                                    <button className="text-sm bg-emerald-800 text-white py-2 px-4 rounded-lg hover:bg-emerald-700"
                                    onClick={() => addPanier(item.id, item.nom, item.prix, item.image)}
                                    >
                                        Ajouter au panier
                                    </button>
                                </div>
                            </article>

                        ))}
                    </div>
                </div>
            )}
        </div>
    );

};

export default ConsulteRecemment;
