import React from 'react';
import { X } from 'lucide-react';


const ConteneurWishListAndRecentlyViewed = ({ item, addPanier, deleteProductList, isMobile }) => {
    let prixReduit = null;
    if (item.promotion !== 0) {
        prixReduit = parseFloat(item.prix * (1 - Number(item.promotion) / 100)).toFixed(2)
    }

    return (
        <article className={`relative bg-white rounded-lg shadow-lg border hover:shadow-xl transition hover:border-green-300/70 ${isMobile ? 'w-full' : 'w-auto'}`}>
    {item.promotion !== 0 && (
        <p className={`w-3/4 text-center absolute top-5 left-0 p-1 border rounded-e-lg bg-white/90 text-xs ${isMobile ? 'text-xs' : 'text-sm'}`}>
            - {item.promotion} % sur le produit
        </p>
    )}
    <button
  className="absolute top-2 right-2 bg-white text-red-500 border border-red-200 w-7 h-7 rounded-full flex items-center justify-center shadow hover:bg-red-600 hover:text-white hover:border-red-600 transition duration-200"
  onClick={() => deleteProductList(item.id)}
  aria-label="Supprimer de la liste d'envies"
  title="Supprimer"
>
  <X className="w-4 h-4" />
</button>

    <a href={`/produit/${item.id}`}>
        <img src={`images/${item.image}`} alt={item.nom} className={`w-full object-cover rounded-t-lg ${isMobile ? 'h-32' : 'h-40'}`} />
    </a>
    <div className={`flex flex-col py-2 px-3 ${isMobile ? 'text-sm gap-4' : ' gap-2'}`}>
        <a href={`/produit/${item.id}`} className={`font-semibold truncate hover:text-green-600 ${isMobile ? 'text-base' : 'text-lg'}`}>
            {item.nom}
        </a>

        {item.promotion !== 0 ? (
            <div className="flex gap-2">
                <p className="text-gray-400 line-through text-sm">{item.prix}€</p>
                <p className="text-red-600 font-bold">{prixReduit}€</p>
            </div>
        ) : (
            <p className="text-gray-500 font-bold">{item.prix}€</p>
        )}

        <button
            className={`text-sm ${isMobile ? 'py-2 px-3 text-xs' : 'py-2 px-4'} bg-emerald-800 text-white rounded-lg hover:bg-emerald-700`}
            onClick={() => addPanier(item.id, item.nom, item.prix, item.promotion, item.image)}
        >
            Ajouter au panier
        </button>
    </div>
</article>

    );
};

export default ConteneurWishListAndRecentlyViewed;
