import connection from "../config/database.js";

export const checkWishList = async (id_user, id_plante, request) => {
    const cookie = request.cookies.wishList;  // Accéder aux cookies de la requête
    return cookie
};

export const addWishList = async (id_user, id_plante) => {
    try {
        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        await connection.promise().query(
            'INSERT INTO site_kerisnel.liste_envie (id_user, id_plante, date_ajout) VALUES (?, ?, ?)',
            [id_user, id_plante, formattedDate]
        );

        console.log(`Plante ${id_plante} ajoutée à la wishlist de l'utilisateur ${id_user} le ${formattedDate}`);
    } catch (error) {
        console.error("Erreur lors de l'ajout à la wishlist :", error);
        throw new Error("Impossible d'ajouter l'élément à la wishlist.");
    }
};
export const deleteWishList = async (id_user, id_plante) => {
    console.log('je passe dans deleteWishList')
    await connection.promise().query('DELETE FROM liste_envie WHERE id_user = ? AND id_plante=?',
        [id_user, id_plante])
}