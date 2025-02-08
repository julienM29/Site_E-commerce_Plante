export const checkWishList = async ( id_user, id_plante, request) => {
    const cookie = request.cookies.wishList;  // Accéder aux cookies de la requête
   return cookie
  };
  
export const addWishList = async (id_user, id_plante) => {
    const cookie = getCookie('wishList');
    const wishList = JSON.parse(decodeURIComponent(cookie));
}
export const deleteWishList = async (id_user, id_plante) => {
    const cookie = getCookie('wishList');
    const wishList = JSON.parse(decodeURIComponent(cookie));
}