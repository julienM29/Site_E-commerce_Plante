import connection from "../config/database.js";

export const checkWishList = async (request) => {
    const cookie = request.cookies.wishList;  // Accéder aux cookies de la requête
    return cookie
};

export const addWishList = async (id_user, id_plante, request, reply) => {
    try {
        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        const cookie = request.cookies.wishList;  // Accéder aux cookies de la requête
        const decodedCookie = decodeURIComponent(cookie);  // Décoder le cookie si nécessaire
        let wishList = decodedCookie.split(',').map(Number);  // Séparer par des virgules et convertir chaque valeur en nombre

        if (!wishList.includes(Number(id_plante))) {  // 🔹 Comparaison correcte avec Number
            wishList.push(Number(id_plante));  // 🔹 Toujours ajouter en tant que Number
        }
        
        await connection.promise().query(
            'INSERT INTO site_kerisnel.liste_envie (id_user, id_plante, date_ajout) VALUES (?, ?, ?)',
            [id_user, id_plante, formattedDate]
        );
        // Mise à jour du cookie
        reply.setCookie("wishList", wishList.join(','), {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 semaine
            domain: "localhost",
        });
        console.log(`Plante ${id_plante} ajoutée à la wishlist de l'utilisateur ${id_user} le ${formattedDate}`);
    } catch (error) {
        console.error("Erreur lors de l'ajout à la wishlist :", error);
        throw new Error("Impossible d'ajouter l'élément à la wishlist.");
    }
};
export const deleteWishList = async (id_user, id_plante, request, reply) => {

    // Récupérer et décoder le cookie
    const cookie = request.cookies.wishList;  // Accéder aux cookies de la requête
    const decodedCookie = decodeURIComponent(cookie || ""); // Gérer le cas où le cookie est vide
    let wishList = decodedCookie ? decodedCookie.split(',').map(Number) : []; // Convertir en tableau

    // 🔹 Supprimer l’ID si présent
    wishList = wishList.filter(id => id !== Number(id_plante));

    // 🔹 Mise à jour du cookie
    reply.setCookie("wishList", wishList.join(','), {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 semaine
        domain: "localhost",
    });

    // 🔹 Suppression en BDD
    await connection.promise().query(
        'DELETE FROM liste_envie WHERE id_user = ? AND id_plante = ?',
        [id_user, id_plante]
    );
};

export const getWishList = async (user_id) => {
    const [wishList] = await connection.promise().query(
        `SELECT l.*, p.*, 
       (SELECT i.url_image 
        FROM site_kerisnel.images i 
        WHERE i.id_plante = p.id 
        LIMIT 1) AS image
FROM site_kerisnel.liste_envie l
INNER JOIN plantes p ON l.id_plante = p.id
WHERE l.id_user = ?;`,
        [user_id]
    );
    return wishList;
};