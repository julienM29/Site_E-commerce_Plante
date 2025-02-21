import connection from "../config/database.js";

export const panierExistant = async (user_id, produit_id) => {
    try {
        // Requête pour compter le nombre de paniers actifs de l'utilisateur
        const [panierExistant] = await connection.promise().query(
            `SELECT 
                p.*, 
                GROUP_CONCAT(DISTINCT d.plante_id SEPARATOR ', ') AS produits_id,
                GROUP_CONCAT(DISTINCT d.id SEPARATOR ', ') AS detail_panier_id,  
                GROUP_CONCAT( d.prix_total SEPARATOR ', ') AS detail_panier_prix_total,
                GROUP_CONCAT( d.quantite SEPARATOR ', ') AS detail_panier_quantite  
             FROM site_kerisnel.panier p
             INNER JOIN detail_panier d ON d.panier_id = p.id  
             WHERE user_id = ? AND actif = 1 GROUP BY p.id;`,
            [user_id]
        );
        console.log('panierExisant du panier Existant : ', panierExistant[0].produits_id)
        // Si un panier actif existe, on va essayer d'ajouter ou modifier le produit
        if (panierExistant.length === 1) {
            const reponse = await addOrModifyProductPanier(user_id, produit_id, panierExistant);  // Ajout/modification du produit
            return reponse;
        } else {
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
        // Vérification des paramètres
        if (!user_id || !produit_id) {
            throw new Error("L'utilisateur ou le produit est invalide.");
        }

        // Vérification si le produit existe
        const requeteProduit = `SELECT id, prix FROM site_kerisnel.plantes WHERE id = ?;`;
        const [produit] = await connection.promise().query(requeteProduit, [produit_id]);

        if (!produit || produit.length === 0) {
            throw new Error(`Produit ID ${produit_id} introuvable.`);
        }

        // Création du panier avec NOW() pour la date
        const requetePanier = `INSERT INTO site_kerisnel.panier (user_id, created_at, actif) VALUES (?, NOW(), 1);`;
        const [result] = await connection.promise().query(requetePanier, [user_id]);

        // Vérification si l'insertion a réussi
        if (result.affectedRows === 0) {
            throw new Error("Échec de la création du panier.");
        }

        // Récupération de l'ID du panier créé
        const panierId = result.insertId;

        // Ajout du produit dans le panier
        const requeteInsert = `INSERT INTO site_kerisnel.detail_panier (panier_id, plante_id, quantite, prix_total) VALUES (?, ?, 1, ?);`;
        await connection.promise().query(requeteInsert, [panierId, produit[0].id, produit[0].prix]);

        console.log(`Panier créé avec succès (ID: ${panierId}) et produit ajouté (ID: ${produit[0].id}).`);
        return true;

    } catch (err) {
        console.error('Erreur lors de la création du panier:', err.message);
        return false; // Retourner false en cas d'erreur
    }
};


export const addOrModifyProductPanier = async (user_id, produit_id, panierExistant) => {
    let paramsRequest = [];

    try {
        // Vérification que le panier existe bien
        if (!panierExistant || panierExistant.length === 0) {
            throw new Error('Aucun panier existant trouvé.');
        }

        // Récupération des données et gestion des valeurs NULL
        let tabProduitPanierId = (panierExistant[0].produits_id || '').split(', ').map(Number);
        let tabDetailPanierId = (panierExistant[0].detail_panier_id || '').split(', ').map(Number);
        let tabDetailPanierPrix = (panierExistant[0].detail_panier_prix_total || '').split(', ').map(Number);
        let tabDetailPanierQuantite = (panierExistant[0].detail_panier_quantite || '').split(', ').map(Number);

        // Conversion de produit_id en nombre pour éviter les erreurs de comparaison
        const produitIdNumber = Number(produit_id);

        if (tabProduitPanierId.includes(produitIdNumber)) {
            const index = tabProduitPanierId.indexOf(produitIdNumber);

            // Vérification que l'index est valide
            if (index === -1 || index >= tabDetailPanierId.length || index >= tabDetailPanierPrix.length || index >= tabDetailPanierQuantite.length) {
                throw new Error('Incohérence des données dans le panier.');
            }

            const indexDetailPanier = tabDetailPanierId[index];
            const prixDetailPanier = tabDetailPanierPrix[index];
            const quantiteDetailPanier = tabDetailPanierQuantite[index] || 1; // Évite division par zéro

            const prixUnitaire = prixDetailPanier / quantiteDetailPanier;
            const newQuantite = quantiteDetailPanier + 1;
            const newPrixTotal = prixUnitaire * newQuantite;

            console.log(`Produit déjà dans le panier : ID ${produitIdNumber}`);
            console.log(`Ancien prix total: ${prixDetailPanier}, Nouvelle quantité: ${newQuantite}, Nouveau prix total: ${newPrixTotal}`);

            // Mise à jour du panier
            const requete = `UPDATE site_kerisnel.detail_panier SET quantite = ?, prix_total = ? WHERE id = ?;`;
            paramsRequest.push(newQuantite, newPrixTotal, indexDetailPanier);
            await connection.promise().query(requete, paramsRequest);
            return true;
        } else {
            console.log(`Produit non présent dans le panier, ajout du produit ID ${produitIdNumber}.`);

            // Récupération des infos du produit
            const requeteProduit = `SELECT id, prix FROM site_kerisnel.plantes WHERE id = ?;`;
            const [produit] = await connection.promise().query(requeteProduit, [produitIdNumber]);

            if (!produit || produit.length === 0) {
                throw new Error(`Produit ID ${produitIdNumber} introuvable.`);
            }

            const requeteInsert = `INSERT INTO site_kerisnel.detail_panier (panier_id, plante_id, quantite, prix_total) VALUES (?, ?, 1, ?);`;
            const paramInsert = [panierExistant[0].id, produit[0].id, produit[0].prix];
            await connection.promise().query(requeteInsert, paramInsert);
            return true;
        }

    } catch (err) {
        console.error('Erreur lors du traitement du panier:', err.message);
        throw new Error('Erreur lors du traitement du panier.');
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

const getAProduct = async () => {

}