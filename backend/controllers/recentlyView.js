import connection from "../config/database.js";

export const getRecentlyViewProduct = async (user_id) => {
    const [recentlyViewed] = await connection.promise().query(
        `SELECT r.*, p.*, 
       (SELECT i.url_image 
        FROM site_kerisnel.images i 
        WHERE i.id_plante = p.id 
        LIMIT 1) AS image
FROM site_kerisnel.recently_viewed_products r
INNER JOIN plantes p ON r.plante_id = p.id
WHERE r.user_id = ? order by viewed_at DESC;`,
        [user_id]
    );
    if (recentlyViewed.length === 0) {
        return { success: false, message: 'Aucune adresse non active trouvée' };
    }

    return { success: true, recentlyViewed: recentlyViewed };
};
export const deleteRecentlyViewProduct = async (user_id, produit_id) => {
    const [result] = await connection.promise().query(
        `DELETE FROM site_kerisnel.recently_viewed_products
WHERE user_id=? AND plante_id=?;`,
        [user_id, produit_id]
    );
    if (result.affectedRows > 0) {
        return { success: true };
    } else {
        return { success: false }
    }
};
export const updateRecentlyViewProductList = async (user_id, product_id) => {
    console.log('je passe dans le update, voici user id :', user_id, ' et produit id : ', product_id)
    const connectionDB = connection.promise();
    const now = new Date();

    // Démarrer la transaction
    await connectionDB.query('START TRANSACTION');

    try {
        // Récupérer la liste des produits récemment vus en BDD, triée par date croissante
        const [listRecentlyViewProduct] = await connectionDB.query(
            'SELECT plante_id FROM recently_viewed_products WHERE user_id = ? ORDER BY viewed_at ASC',
            [user_id]
        );

        // Si la liste est vide, directement insérer le produit
        if (listRecentlyViewProduct.length === 0) {
            await connectionDB.query(
                'INSERT INTO recently_viewed_products (user_id, plante_id, viewed_at) VALUES (?, ?, ?)',
                [user_id, product_id, now]
            );
        } else {
            // Vérifier si le produit existe déjà dans la liste
            const existingProduct = listRecentlyViewProduct.find(p => p.plante_id === product_id);

            // Si le produit est déjà le dernier de la liste (dernier élément en BDD)
            if (existingProduct && listRecentlyViewProduct[listRecentlyViewProduct.length - 1].plante_id === product_id) {
                console.log('Le produit est déjà le dernier dans la liste. Pas de mise à jour nécessaire.');
            } else {
                // Supprimer le produit de la base de données s'il est déjà présent
                await connectionDB.query(
                    'DELETE FROM recently_viewed_products WHERE user_id = ? AND plante_id = ?',
                    [user_id, product_id]
                );

                // Vérifier combien d'éléments il reste après suppression
                const [rows] = await connectionDB.query(
                    'SELECT COUNT(*) AS count FROM recently_viewed_products WHERE user_id = ?',
                    [user_id]
                );
                const count = rows[0].count;

                // Si on est déjà à 10, supprimer le plus ancien
                if (count >= 10) {
                    await connectionDB.query(
                        `DELETE FROM recently_viewed_products 
                         WHERE user_id = ? 
                         ORDER BY viewed_at ASC 
                         LIMIT 1`,
                        [user_id]
                    );
                }

                // Insérer le produit consulté à la fin de la liste
                await connectionDB.query(
                    'INSERT INTO recently_viewed_products (user_id, plante_id, viewed_at) VALUES (?, ?, ?)',
                    [user_id, product_id, now]
                );
            }
        }

        // Committer la transaction
        await connectionDB.query('COMMIT');
        return { success: true, message: 'BDD mise à jour pour les récemment vus' };
    } catch (err) {
        // En cas d'erreur, rollback pour annuler toute modification
        await connectionDB.query('ROLLBACK');
        console.error('Erreur lors de la mise à jour des produits vus:', err);
        return { success: false, message: 'Erreur lors de la mise à jour des produits vus' };
    }
};


