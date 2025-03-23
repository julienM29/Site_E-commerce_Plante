import connection from "../config/database.js";

let requete = `
            SELECT 
    p.nom, 
    p.nom_latin, 
    p.prix, 
    p.promotion, 
    p.esthetique_id, 
    p.jardinage_id, 
    p.emplacement_id,
    GROUP_CONCAT(DISTINCT i.url_image SEPARATOR ', ') AS images,
    e.*, 
    e2.*, 
    j.*, 
    f.nom AS famille, 
    t.nom AS type,
    GROUP_CONCAT(DISTINCT te.nom SEPARATOR ', ') AS type_exposition_nom,
    GROUP_CONCAT(DISTINCT l.litres ORDER BY l.litres SEPARATOR ', ') AS litragesDispo
FROM 
    site_kerisnel.plantes p
INNER JOIN 
    images i ON i.id_plante = p.id
INNER JOIN 
    emplacement e ON e.id = p.emplacement_id 
INNER JOIN 
    esthetique e2 ON e2.id = p.esthetique_id 
INNER JOIN 
    jardinage j ON j.id = p.jardinage_id 
INNER JOIN 
    famille f ON f.id = p.id_famille 
INNER JOIN 
    type t ON t.id = p.id_type 
INNER JOIN 
    plantelitrage p2 ON p2.plante_id = p.id 
INNER JOIN 
    litrages l ON l.id = p2.litrage_id 
INNER JOIN 
    emplacement_exposition ee ON ee.emplacement_id = e.id -- Jointure avec la table de relation
INNER JOIN 
    type_exposition te ON te.id = ee.exposition_id
          
        `;
export const loadProductByType = async (id_type) => {
    try {
        let newRequest = requete + ` WHERE t.id = ${id_type} GROUP BY p.id;`;

        const [products] = await connection.promise().query(newRequest);
        if (products.length > 0) {
            // Transformer la colonne `images` en tableau
            const formattedProducts = products.map(product => ({
                ...product,
                images: product.images ? product.images.split(', ') : [] // Convertit en tableau
            }));

            return formattedProducts;
        } else {
            return [];
        }
    } catch (err) {
        // Gestion des erreurs : log de l'erreur et message d'erreur
        console.error('Erreur lors de la récupération des types de plantes:', err);
        throw new Error('Erreur lors de la récupération des types de plantes');
    }
};
export const searchByText = async (text) => {
    try {
        console.log('Texte recherché :', text);

        let newRequest = requete + ` WHERE p.nom LIKE ? GROUP BY p.id;`;
        const [products] = await connection.promise().query(newRequest, [`%${text}%`]);

        if (products.length > 0) {
            // Transformer la colonne `images` en tableau
            const formattedProducts = products.map(product => ({
                ...product,
                images: product.images ? product.images.split(', ') : [] // Convertit en tableau
            }));
            console.log('product length : ', formattedProducts.length)
            return formattedProducts;
        } else {
            return [];
        }
    } catch (err) {
        console.error('Erreur lors de la récupération des plantes:', err);
        throw new Error('Erreur lors de la récupération des plantes');
    }
};
export const searchByParams = async (params) => {
    try {
        // console.log('Params  :', params);

        // Extraction des valeurs des filtres
        let colorRequest = params.color || null;
        let text = params.text || null;
        let minPrice = params.minPrice || null;
        let maxPrice = params.maxPrice || null;
        let exposition = params.exposition || null;
        let arrosage = params.arrosage || null;
        let emplacement = params.emplacement || null;
        let floraison = params.floraison || null;
        let recolte = params.recolte || null;
        let persistant = params.persistant || null;
        let mellifere = params.mellifere || null;
        let parfum = params.parfum || null;
        let type = params.type || null;
        let promotion = params.promotion || null;

        let paramsExpo = [];  // Initialisation comme tableau vide
        // Construction de la requête SQL de base
        let newRequest = requete;
        let paramsRequest = [];  // Tableau pour stocker les valeurs à lier à la requête

        // Construction dynamique de la partie WHERE
        const conditions = [];

        // Ajout de conditions pour le filtrage par couleur
        if (colorRequest) {
            conditions.push('e2.couleur LIKE ?');
            paramsRequest.push(`%${colorRequest}%`);
        }

        // Ajout de conditions pour le filtrage par nom
        if (text) {
            conditions.push('p.nom LIKE ?');
            paramsRequest.push(`%${text}%`);
        }
        if (minPrice || maxPrice) {
            conditions.push('p.prix BETWEEN ? AND ?')
            if (params.minPrice === 0) {
                paramsRequest.push(`0`);
            } else {
                paramsRequest.push(`${minPrice}`);
            }
            paramsRequest.push(`${maxPrice}`);
        }
        if (exposition) {
            expositionCondition(exposition, paramsExpo, conditions, paramsRequest)
        }
        if (arrosage) {
            arrosageCondition(arrosage, conditions, paramsRequest)

        }
        if (emplacement && Object.values(emplacement).some(value => value)) {
            // ✅ Ajout de la jointure uniquement si un emplacement est sélectionné
            newRequest += ` INNER JOIN 
                            emplacement_utilisation eu ON eu.emplacement_id = e.id 
                        INNER JOIN 
                            type_utilisation tu ON tu.id = eu.utilisation_id `;
        
            emplacementCondition(emplacement, conditions, paramsRequest);
        }
        if(floraison){
            floraisonCondition(floraison, conditions, paramsRequest)
        }
        if(recolte){
            recolteCondition(recolte, conditions, paramsRequest)
        }
        if(persistant){
           persistantCondition(persistant, conditions)
        }
        if(mellifere){
            mellifereCondition(mellifere,conditions)
        }
        if(parfum){
            parfumCondition(parfum,conditions)
        }
        if(type){
            conditions.push(`p.id_type = ? `);
            paramsRequest.push(`${type}`);
        }
        if(promotion){
            promotionCondition(promotion,conditions)
        }
        // Si des conditions ont été ajoutées, on ajoute la clause WHERE à la requête
        if (conditions.length > 0) {
            newRequest += ' WHERE ' + conditions.join(' AND ');
        }

        // Ajout de la clause GROUP BY
        newRequest += ' GROUP BY p.id';
        if (paramsExpo.length > 0) {
            newRequest += ` HAVING COUNT(DISTINCT te.id) = ${paramsExpo.length}`
        }
        console.log('newRequest fin de logique : ', newRequest)
        // console.log('params fin de logique : ', paramsRequest)

        // Exécution de la requête SQL sécurisée avec les paramètres liés
        const [products] = await connection.promise().query(newRequest, paramsRequest);

        // Si des produits sont trouvés, on les formate et on les renvoie
        if (products.length > 0) {
            const formattedProducts = products.map(product => ({
                ...product,
                images: product.images ? product.images.split(', ') : []  // Transformer en tableau
            }));

            // console.log('Produit(s) trouvé(s) :', formattedProducts.length);
            return formattedProducts;
        } else {
            return [];
        }

    } catch (err) {
        console.error('Erreur lors de la récupération des plantes:', err);
        throw new Error('Erreur lors de la récupération des plantes');
    }
};

export const arrosageCondition = async (arrosage, conditions, paramsRequest) => {
    let paramsArrosage = [];

    // Parcourir l'objet arrosage et ajouter les labels sélectionnés
    Object.entries(arrosage).forEach(([key, value]) => {
        if (value) { // Ne prend que les valeurs à true
            paramsArrosage.push(key);
        }
    });

    // Construire la condition SQL seulement si des valeurs sont sélectionnées
    if (paramsArrosage.length > 0) {
        let placeholders = paramsArrosage.map(() => '?').join(' OR j.frequence_arrosage = ');

        conditions.push(`j.frequence_arrosage = ${placeholders}`);

        // ✅ Ajouter les valeurs sélectionnées dans paramsRequest
        paramsRequest.push(...paramsArrosage);
    }
}

export const expositionCondition = async (exposition, paramsExpo, conditions, paramsRequest) => {
    // Dictionnaire de correspondance
    const expositionLabels = {
        ensoleille: "Lieu ensoleillé",
        miOmbrage: "Mi-ombragé",
        ombrage: "Ombragé"
    };

    // Parcourir les expositions et ajouter les labels dans le tableau
    Object.entries(exposition).forEach(([key, value]) => {
        if (value) { // On ne prend que les valeurs à true
            const label = expositionLabels[key] || key;
            paramsExpo.push(label);
        }
    });
    // Si des expositions ont été sélectionnées, on construit la condition
    if (paramsExpo.length > 0) {
        conditions.push(`te.nom IN (${paramsExpo.map(() => '?').join(', ')})`);

        // ✅ Ajouter les valeurs séparément dans paramsRequest
        paramsRequest.push(...paramsExpo);
    }
}
export const emplacementCondition = async (emplacement, conditions, paramsRequest) => {
    let paramsEmplacement = [];

    Object.entries(emplacement).forEach(([key, value]) => {
        if (value) { // Ne prend que les valeurs à true
            if (key === 'PotOuBac') {
                paramsEmplacement.push('Pot ou bac');
            } else if (key === 'CouvreSol') {
                paramsEmplacement.push('Couvre-sol');
            } else {
                paramsEmplacement.push(key);
            }
        }
    });

    if (paramsEmplacement.length > 0) {
        // ✅ On ne modifie pas `requete` global ici
        conditions.push(
            `(${paramsEmplacement.map(() => `e.utilisation LIKE ?`).join(' OR ')})`
        );
        paramsRequest.push(...paramsEmplacement.map(value => `%${value}%`));
    }
};
export const floraisonCondition = async (floraison, conditions, paramsRequest) => {
    let paramsFloraison = [];

    // Collecte les mois ou périodes sélectionnées
    Object.entries(floraison).forEach(([key, value]) => {
        if (value) {
            paramsFloraison.push(key);  // On ajoute la période si elle est vraie
        }
    });

    if (paramsFloraison.length > 0) {
        // Si il n'y a qu'un seul mois sélectionné, on utilise juste un LIKE
        if (paramsFloraison.length === 1) {
            conditions.push(`e2.periode_floraison LIKE ?`);
            paramsRequest.push(`%${paramsFloraison[0]}%`);
        } else {
            // Si plusieurs mois sont sélectionnés, on les combine avec `OR`
            conditions.push(
                `(${paramsFloraison.map(() => `e2.periode_floraison LIKE ?`).join(' OR ')})`
            );
            paramsRequest.push(...paramsFloraison.map(value => `%${value}%`));
        }
    }
};
export const recolteCondition = async (recolte, conditions, paramsRequest) => {
    let paramsRecolte = [];

    // Collecte les mois ou périodes sélectionnées
    Object.entries(recolte).forEach(([key, value]) => {
        if (value) {
            paramsRecolte.push(key);  // On ajoute la période si elle est vraie
        }
    });

    if (paramsRecolte.length > 0) {
        // Si il n'y a qu'un seul mois sélectionné, on utilise juste un LIKE
        if (paramsRecolte.length === 1) {
            conditions.push(`j.periode_recolte LIKE ?`);
            paramsRequest.push(`%${paramsRecolte[0]}%`);
        } else {
            // Si plusieurs mois sont sélectionnés, on les combine avec `OR`
            conditions.push(
                `(${paramsRecolte.map(() => `j.periode_recolte LIKE ?`).join(' OR ')})`
            );
            paramsRequest.push(...paramsRecolte.map(value => `%${value}%`));
        }
    }
};
export const persistantCondition = async (persistant, conditions) => {
    if(persistant){
        conditions.push(`e2.persistant_feuillage = 1 `);
    } else {
        conditions.push(`e2.persistant_feuillage = 0 `);
    }
};
export const parfumCondition = async (parfum, conditions) => {
    if(parfum){
        conditions.push(`e2.parfum = 1 `);
    } else {
        conditions.push(`e2.parfum = 0 `);
    }
};
export const mellifereCondition = async (mellifere, conditions) => {
    if(mellifere){
        conditions.push(`j.mellifere = 1 `);
    } else {
        conditions.push(`j.mellifere = 0 `);
    }
};
export const promotionCondition = async (mellifere, conditions) => {
    if(mellifere){
        conditions.push(`p.promotion != 0 `);
    } else {
        conditions.push(`p.promotion = 0 `);
    }
};


export const loadPromotionsProducts = async ()=> {
    let newRequest = requete;
    newRequest += ' WHERE p.promotion != 0 GROUP BY p.id';

    const [products] = await connection.promise().query(newRequest);
    if (products.length > 0) {
        const formattedProducts = products.map(product => ({
            ...product,
            images: product.images ? product.images.split(', ') : []  // Transformer en tableau
        }));

        // console.log('Produit(s) trouvé(s) :', formattedProducts.length);
        return formattedProducts;
    } else {
        return [];
    }
}
export const loadNouveauteProducts = async ()=> {
    let newRequest = requete;
    newRequest += ' GROUP BY p.id ORDER BY p.id DESC LIMIT 6;';

    const [products] = await connection.promise().query(newRequest);
    if (products.length > 0) {
        const formattedProducts = products.map(product => ({
            ...product,
            images: product.images ? product.images.split(', ') : []  // Transformer en tableau
        }));

        return formattedProducts;
    } else {
        return [];
    }
}
export const loadSelectionProducts = async ()=> {
    let newRequest = requete;
    newRequest += 'Where p.nb_ventes != 0 GROUP BY p.id ORDER BY p.nb_ventes DESC LIMIT 6;';

    const [products] = await connection.promise().query(newRequest);
    if (products.length > 0) {
        const formattedProducts = products.map(product => ({
            ...product,
            images: product.images ? product.images.split(', ') : []  // Transformer en tableau
        }));

        return formattedProducts;
    } else {
        return [];
    }
}
export const loadSuggestionProducts = async (type_id,produit_id)=> {
    let newRequest = requete;
    newRequest += `Where p.id_type = ? AND p.id != ? GROUP BY p.id ORDER BY p.nb_ventes DESC LIMIT 6;`
    let paramsRequest = [];  // Tableau pour stocker les valeurs à lier à la requête
paramsRequest.push(type_id,produit_id)
    const [products] = await connection.promise().query(newRequest, paramsRequest);
    if (products.length > 0) {
        const formattedProducts = products.map(product => ({
            ...product,
            images: product.images ? product.images.split(', ') : []  // Transformer en tableau
        }));

        return formattedProducts;
    } else {
        return [];
    }
}