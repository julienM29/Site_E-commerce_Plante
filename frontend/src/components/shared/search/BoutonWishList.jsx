import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const WishlistButton = ({userId, isWishlisted, plantId }) => {
    const [inWishlist, setInWishlist] = useState(isWishlisted);

    const toggleWishlist = async () => {
      if (!userId) return; // 🔹 Vérifier si l'utilisateur est connecté
    
      try {
        setInWishlist(prevState => !prevState); // 🔥 UI instantanée basée sur l'état précédent
    
        if (inWishlist) {
          await fetch(`http://localhost:3000/deleteWishList/${userId}/${plantId}`, {
            method: "POST",
            credentials: "include",
          });
        } else {
          await fetch(`http://localhost:3000/addWishList/${userId}/${plantId}`, {
            method: "POST",
            credentials: "include",
          });
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la wishlist:", error);
        setInWishlist(prevState => !prevState); // ⚠️ Revenir à l’état précédent en cas d'erreur
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
