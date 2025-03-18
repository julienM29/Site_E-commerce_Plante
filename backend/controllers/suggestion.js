import connection from "../config/database.js";

export const getSuggestions = async (searchQuery) => {
    const [suggestions] = await connection.promise().query(
        `SELECT  p.*, 
            (SELECT i.url_image 
             FROM site_kerisnel.images i 
             WHERE i.id_plante = p.id 
             LIMIT 1) AS image
        FROM site_kerisnel.plantes p 
        WHERE p.nom LIKE ?;`,
        [`%${searchQuery}%`]  // Ajout des % pour la recherche partielle
    );
    console.log('dans get Suggestion , les suggestions : ', suggestions)
    return suggestions;
};
