import React from 'react';


const ConteneurWishListAndRecentlyViewed = ({ item, addPanier, deleteProductList }) => {
    let prixReduit = null;
    if (item.promotion !== 0) {
        prixReduit = parseFloat(item.prix * (1 - Number(item.promotion) / 100)).toFixed(2)
    }

    return (
        <article className="relative bg-white rounded-lg shadow-lg border  hover:shadow-xl transition hover:border-2 hover:border-green-300/70">
            {item.promotion !== 0 && (
                <p className='w-3/4 text-center roup z-10 absolute top-5 left-0 p-1 border rounded-e-lg bg-white/90 '>- {item.promotion} % sur le produit</p>

            )}
            <button
                className="absolute top-1 right-1 bg-gray-300/90 text-black w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-700 hover:text-white transition-all duration-200"
                onClick={() => deleteProductList(item.id)}
                aria-label="Supprimer de la liste d'envies"
                title="Supprimer de la liste d'envies"
            >
                ✖
            </button>
            <a href={`/produit/${item.id}`}>
                <img src={`images/${item.image}`} alt={item.nom} className="w-full h-40 object-cover rounded-t-lg" />
            </a>
            <div className="flex flex-col gap-2 py-2 px-3">
                <a href={`/produit/${item.id}`} className="text-lg font-semibold truncate hover:text-green-600">{item.nom}</a>

                {item.promotion !== 0 ? (
                    <div className="flex gap-2">
                        <p className="text-gray-400 line-through text-sm">{item.prix}€</p>
                        <p className="text-red-600 font-bold ">{prixReduit}€</p>
                    </div>
                ) : (
                    <p className="text-gray-500 font-bold">{item.prix}€</p>
                )}
                <button className="text-sm bg-emerald-800 text-white py-2 px-4 rounded-lg hover:bg-emerald-700"
                    onClick={() => addPanier(item.id, item.nom, item.prix, item.promotion, item.image)}>
                    Ajouter au panier
                </button>
            </div>
        </article>
    );
};

export default ConteneurWishListAndRecentlyViewed;
