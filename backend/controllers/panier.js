import connection from "../config/database.js";

export const panierExistant = async (user_id, produit_id) => {
    try {
        // Requête pour compter le nombre de paniers actifs de l'utilisateur
        let panierExistant = await getPanier(user_id);
        // Si un panier actif existe, on va essayer d'ajouter ou modifier le produit
        if (panierExistant) {
            const reponse = await addOrModifyProductPanier(user_id, produit_id, panierExistant);
            return reponse;
        } else {
            await createPanier(user_id, produit_id);
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
        let tabProduitPanierId = (panierExistant.produits_id || '').split(', ').map(Number);
        let tabDetailPanierId = (panierExistant.detail_panier_id || '').split(', ').map(Number);
        let tabDetailPanierPrix = (panierExistant.detail_panier_prix_total || '').split(', ').map(Number);
        let tabDetailPanierQuantite = (panierExistant.detail_panier_quantite || '').split(', ').map(Number);

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
            return {
                success: true,
                method: 'update',
                newQuantite: newQuantite,
                newPrixTotal : newPrixTotal,
                indexDetailPanier: indexDetailPanier
            };
            
        } else {
            console.log(`Produit non présent dans le panier, ajout du produit ID ${produitIdNumber}.`);

            // Récupération des infos du produit
            const requeteProduit = `SELECT id, prix FROM site_kerisnel.plantes WHERE id = ?;`;
            const [produit] = await connection.promise().query(requeteProduit, [produitIdNumber]);

            if (!produit || produit.length === 0) {
                throw new Error(`Produit ID ${produitIdNumber} introuvable.`);
            }
            const requeteInsert = `INSERT INTO site_kerisnel.detail_panier (panier_id, plante_id, quantite, prix_total) VALUES (?, ?, 1, ?);`;
            const paramInsert = [panierExistant.id, produit[0].id, produit[0].prix];
            await connection.promise().query(requeteInsert, paramInsert);
            return {
                success: true,
                method: 'create',
            };
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

export const addOrModifyProductPanier2 = async (request, reply, user_id, produit_id) => {
    try {
        const cookie = request.cookies.panier;  // Accéder aux cookies de la requête
        const decodedCookiePanier = cookie ? JSON.parse(decodeURIComponent(cookie)) : {};

        // Gestion des valeurs nulles et transformation en tableau de nombres
        const toNumberArray = (arr) => Array.isArray(arr) ? arr.map(Number) : [];

        let tabProduitPanierId = toNumberArray(decodedCookiePanier.produit_id);
        let tabDetailPanierId = toNumberArray(decodedCookiePanier.detail_panier_id);
        let tabDetailPanierPrix = toNumberArray(decodedCookiePanier.detail_panier_prix);
        let tabDetailPanierQuantite = toNumberArray(decodedCookiePanier.detail_panier_quantite);

        const produitIdNumber = Number(produit_id);

        if (tabProduitPanierId.includes(produitIdNumber)) {
            // Produit déjà dans le panier
            const index = tabProduitPanierId.indexOf(produitIdNumber);

            if (index === -1 || index >= tabDetailPanierId.length) {
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

            // Mise à jour en BDD
            const requete = `UPDATE site_kerisnel.detail_panier SET quantite = ?, prix_total = ? WHERE id = ?;`;
            await connection.promise().query(requete, [newQuantite, newPrixTotal, indexDetailPanier]);

            // Mise à jour du cookie
            tabDetailPanierPrix[index] = newPrixTotal;
            tabDetailPanierQuantite[index] = newQuantite;
        } else {
            console.log(`Produit non présent dans le panier, ajout du produit ID ${produitIdNumber}.`);
            // Récupération des infos du produit
            const requeteProduit = `SELECT id, prix FROM site_kerisnel.plantes WHERE id = ?;`;
            const [produit] = await connection.promise().query(requeteProduit, [produitIdNumber]);

            if (!produit || produit.length === 0) {
                throw new Error(`Produit ID ${produitIdNumber} introuvable.`);
            }

            // Ajout en BDD
            const requeteInsert = `INSERT INTO site_kerisnel.detail_panier (panier_id, plante_id, quantite, prix_total) VALUES (?, ?, 1, ?);`;
            const insertResult = await connection.promise().query(requeteInsert, [panierExistant[0].id, produit[0].id, produit[0].prix]);
            const insertId = insertResult[0].insertId;

            // Mise à jour des tableaux
            tabProduitPanierId.push(produit[0].id);
            tabDetailPanierId.push(insertId);
            tabDetailPanierPrix.push(produit[0].prix);
            tabDetailPanierQuantite.push(1);
        }

        // Mise à jour du cookie (une seule fois)
        const newPanierCookie = {
            produit_id: tabProduitPanierId,
            detail_panier_id: tabDetailPanierId,
            detail_panier_prix: tabDetailPanierPrix,
            detail_panier_quantite: tabDetailPanierQuantite
        };

        reply.setCookie('panier', JSON.stringify(newPanierCookie), {
            httpOnly: true,
            secure: true, // true si HTTPS, sinon false en local
            sameSite: 'None',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 semaine
        });

        return true;
    } catch (err) {
        console.error('Erreur lors du traitement du panier:', err.message);
        throw new Error('Erreur lors du traitement du panier.');
    }
};
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