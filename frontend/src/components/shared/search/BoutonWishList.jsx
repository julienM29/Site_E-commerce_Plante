import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const WishlistButton = ({userId, isWishlisted, plantId }) => {
    const [inWishlist, setInWishlist] = useState(isWishlisted);

  const toggleWishlist = async () => {
    if (!userId) return; // Éviter les requêtes inutiles si l'utilisateur n'est pas connecté

    try {
      if (isWishlisted) {
        setInWishlist(false); // 🔥 Optimisation UI rapide

        await fetch(`http://localhost:3000/deleteWishList/${userId}/${plantId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plantId }),
          credentials: "include",
        });
      } else {
        setInWishlist(true);

        await fetch(`http://localhost:3000/addWishList/${userId}/${plantId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plantId }),
          credentials: "include",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la wishlist:", error);
      setInWishlist(!inWishlist); // ⚠️ Revenir à l’état précédent si la requête échoue
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className="group z-20 absolute top-2 right-2 p-2 border border-gray-400/50 rounded-full bg-white shadow-md hover:bg-gray-200 transition-all"
      aria-label={inWishlist ? "Retirer de la liste d'envie" : "Ajouter à la liste d'envie"}
    >
      <Heart className={`w-5 h-5 transition-all ${inWishlist ? "fill-red-500 text-red-500 group-hover:fill-gray-400 group-hover:text-gray-400" : "text-gray-400 group-hover:fill-red-500 group-hover:text-red-500"}`} />
    </button>
  );
};

export default WishlistButton;
