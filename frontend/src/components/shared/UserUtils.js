// userUtils.js
import { checkUserConnect } from './CheckUserInformation';

export const getUserInfoAndWishList = async (setUserID, setDataCookie) => {
    try {
        // Récupération des infos utilisateur
        const result = await checkUserConnect();
        const resultIDUser = result.user.id;
        setUserID(resultIDUser);

        // Récupération de la wishlist
        const response = await fetch(`http://localhost:3000/checkWishList`, {
            credentials: "include",
        });
        const dataWishList = await response.json();
        setDataCookie(dataWishList.wishList);
    } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur et wishlist:", error);
    }
};
