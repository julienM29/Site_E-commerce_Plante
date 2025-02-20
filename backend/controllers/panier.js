import connection from "../config/database.js";

export const panierExistant = async (user_id, produit_id) => {
    try {
        // Requête pour compter le nombre de paniers actifs de l'utilisateur
        const [reponse] = await connection.promise().query(
            `SELECT COUNT(*) AS count FROM site_kerisnel.panier WHERE user_id = ? AND actif = 1`, 
            [user_id]
        );

        // Récupération du count du panier actif
        const count = reponse[0].count; 
        console.log('Nombre de paniers actifs : ', count);

        // Si un panier actif existe, on va essayer d'ajouter ou modifier le produit
        if (count === 1) {
            console.log('Un panier actif trouvé, ajout/modification du produit.');
            await addOrModifyProductPanier(user_id, produit_id);  // Ajout/modification du produit
        } else {
            console.log('Pas de panier actif trouvé, création d\'un nouveau panier.');
            await createPanier(user_id, produit_id);  // Création d'un nouveau panier
        }

    } catch (err) {
        console.error('Erreur lors de la gestion du panier:', err);
        throw new Error('Erreur lors de la gestion du panier');
    }
};


export const loadPanier = async (user_id) => {
    try {

        let requete = `SELECT * FROM  site_kerisnel.panier WHERE user_id = ? AND actif = 1`;
        const [panier] = await connection.promise().query(requete, [`${user_id}`]);

        if (panier.length > 0) {
            return panier;
        } else {
            return [];
        }
    } catch (err) {
        console.error('Erreur lors de la récupération des plantes:', err);
        throw new Error('Erreur lors de la récupération des plantes');
    }
};
export const createPanier = async (user_id, produit_id) => {
    try {
        let paramsRequest = [];  // Tableau pour stocker les valeurs à lier à la requête

        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        // Ajout des valeurs dans paramsRequest
        paramsRequest.push(user_id);
        paramsRequest.push(formattedDate);

        // La requête d'insertion
        let requete = `INSERT INTO site_kerisnel.panier (user_id, created_at, actif) VALUES (?, ?, 1)`;

        // Exécution de la requête
        // const [result] = await connection.promise().query(requete, paramsRequest);

        // Vérification si l'insertion a réussi (s'il y a un résultat)
        // if (result.affectedRows > 0) {
            return true;  // Requête réussie
        // } else {
            return false; // Si rien n'a été inséré
        // }

    } catch (err) {
        console.error('Erreur lors de la création du panier:', err);
        return false; // Retourner false en cas d'erreur
    }
};

export const addOrModifyProductPanier = async (user_id) => {
    try {
        console.log('add or modify panier')
        // let requete = `SELECT * FROM  site_kerisnel.panier WHERE user_id = ? AND actif = 1`;
        // const [panier] = await connection.promise().query(requete, [`${user_id}`]);

        // if (panier.length > 0) {            
        //     return panier;
        // } else {
        //     return [];
        // }
    } catch (err) {
        console.error('Erreur lors de la récupération des plantes:', err);
        throw new Error('Erreur lors de la récupération des plantes');
    }
};
export const deleteProductPanier = async (user_id) => {
    try {

        let requete = `SELECT * FROM  site_kerisnel.panier WHERE user_id = ? AND actif = 1`;
        const [panier] = await connection.promise().query(requete, [`${user_id}`]);

        if (panier.length > 0) {
            return panier;
        } else {
            return [];
        }
    } catch (err) {
        console.error('Erreur lors de la récupération des plantes:', err);
        throw new Error('Erreur lors de la récupération des plantes');
    }
};