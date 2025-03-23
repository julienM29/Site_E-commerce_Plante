import connection from "../config/database.js";

export const panierExistant = async (user_id, produit_id) => {
    try {
        // Requête pour compter le nombre de paniers actifs de l'utilisateur
        let panierExistant = await verificationPanier(user_id)
        console.log('dans panier Existant apres le verif panier,  panier existant : ', panierExistant)
        if (panierExistant) {
            console.log('il est defined')
            let panier = (await getPanier(user_id)) || [];
            console.log(' on a un panier : ', panier, ' l user id est : ', user_id)
            // Si un panier actif existe, on va essayer d'ajouter ou modifier le produit
            const reponse = await addOrModifyProductPanier(user_id, produit_id, panier, panierExistant);
            return reponse;
        } else {
            console.log('il est undefined')
            const reponse = await createPanier(user_id, produit_id);
            return reponse;

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
        return {
            success: true,
            method: 'create',
        };

    } catch (err) {
        console.error('Erreur lors de la création du panier:', err.message);
        return false; // Retourner false en cas d'erreur
    }
};


export const addOrModifyProductPanier = async (user_id, produit_id, panier, panierExistant) => {
    let paramsRequest = [];
    try {
        // console.log('panier existant debut du add or modify : ', panier)
        const produitIdNumber = Number(produit_id);

        // Vérification que le panier existe bien
        if (panier) {

            console.log('if panier existant')
            // Récupération des données et gestion des valeurs NULL
            let tabProduitPanierId = (panier.produits_id || '').split(', ').map(Number);
            let tabDetailPanierId = (panier.detail_panier_id || '').split(', ').map(Number);
            let tabDetailPanierPrix = (panier.detail_panier_prix_total || '').split(', ').map(Number);
            let tabDetailPanierQuantite = (panier.detail_panier_quantite || '').split(', ').map(Number);

            // Conversion de produit_id en nombre pour éviter les erreurs de comparaison

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
                return {
                    success: true,
                    method: 'update',
                    newQuantite: newQuantite,
                    newPrixTotal: newPrixTotal,
                    indexDetailPanier: indexDetailPanier
                };

            } else {
                console.log(`Produit non présent dans le panier, ajout du produit ID ${produitIdNumber}.`);

                // Récupération des infos du produit
                const requeteProduit = `SELECT id, prix, promotion FROM site_kerisnel.plantes WHERE id = ?;`;
                const [produit] = await connection.promise().query(requeteProduit, [produitIdNumber]);
                console.log('voici le produit : ', produit[0])
                const reduction = produit[0].promotion;
                console.log('voici reduction : ' , reduction, ' et le produit : ', produit[0])
                let prixInsertBDD = produit[0].prix
                if (reduction !== 0) {
                    prixInsertBDD = parseFloat(produit[0].prix * (1 - (Number(reduction) / 100))).toFixed(2); // Correction ici
                }
                console.log('il doit y avnoqefgaem, prix insert bdd', prixInsertBDD)
                if (!produit || produit.length === 0) {
                    throw new Error(`Produit ID ${produitIdNumber} introuvable.`);
                }
                const requeteInsert = `INSERT INTO site_kerisnel.detail_panier (panier_id, plante_id, quantite, prix_total) VALUES (?, ?, 1, ?);`;
                const paramInsert = [panierExistant.id, produit[0].id, prixInsertBDD];
                const result = await connection.promise().query(requeteInsert, paramInsert);

                // Récupérer l'insertId du produit ajouté
                const insertId = result[0].insertId;
                console.log('insert id dans panier js : ', insertId)
                return {
                    success: true,
                    method: 'create',
                    insertId: insertId,  // Renvoyer insertId dans la réponse
                };
            }
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

export const verificationPanier = async (user_id) => {
    const [panierExistant] = await connection.promise().query(
        `    SELECT COUNT(*) AS count, p.id AS id
                FROM panier p
                WHERE p.actif = 1 AND p.user_id = ?
                GROUP BY p.id;
`,
        [user_id]
    );
    return panierExistant[0];

}
export const modifyQuantity = async (detail_produit_id, increment, newQuantity) => {
    if (increment === 'true') {
        console.log('il est true')
        await connection.promise().query(
            `    UPDATE site_kerisnel.detail_panier
               SET  quantite= quantite + 1
             WHERE id=?;
            `,
            [detail_produit_id]
        );
    } else if (increment === 'change') {
        console.log('il est change')

        await connection.promise().query(
            `    UPDATE site_kerisnel.detail_panier
               SET  quantite= ?
             WHERE id=?;
            `,
            [newQuantity, detail_produit_id]
        );
    } else {
        console.log('il est false')

        await connection.promise().query(
            `    UPDATE site_kerisnel.detail_panier
               SET  quantite= quantite - 1
             WHERE id=?;
            `,
            [detail_produit_id]
        );
    }
}
export const getPanier = async (user_id) => {
    const [panierExistant] = await connection.promise().query(
        `SELECT 
            p.*, 
            GROUP_CONCAT(DISTINCT d.plante_id ORDER BY d.id DESC SEPARATOR ', ') AS produits_id,
            GROUP_CONCAT(DISTINCT d.id ORDER BY d.id DESC SEPARATOR ', ') AS detail_panier_id,  
            GROUP_CONCAT(d.prix_total ORDER BY d.id DESC SEPARATOR ', ') AS detail_panier_prix_total,
            GROUP_CONCAT(d.quantite ORDER BY d.id DESC SEPARATOR ', ') AS detail_panier_quantite,
            GROUP_CONCAT(
                (SELECT i.url_image 
                FROM images i 
                WHERE i.id_plante = d.plante_id 
                ORDER BY i.id ASC LIMIT 1) 
                ORDER BY d.id DESC SEPARATOR ', '
            ) AS images_urls,
            GROUP_CONCAT(
                (SELECT p.nom 
                FROM plantes p 
                WHERE p.id = d.plante_id 
                ORDER BY p.id ASC) 
                ORDER BY d.id DESC SEPARATOR ', '
            ) AS noms_produits
        FROM site_kerisnel.panier p
        INNER JOIN detail_panier d ON d.panier_id = p.id
        WHERE p.user_id = ? AND p.actif = 1
        GROUP BY p.id;`,
        [user_id]
    );
    return panierExistant[0];
};
export const deleteDetailPanier = async (detail_panier_id) => {
    await connection.promise().query(`DELETE FROM site_kerisnel.detail_panier WHERE id=?;`, [detail_panier_id]);
    return true;
};