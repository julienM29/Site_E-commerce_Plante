import connection from "../config/database.js";

const requete = `
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
        console.log('Params  :', params);

        // Extraction des valeurs des filtres
        let colorRequest = params.color || null;
        let text = params.text || null;
        let minPrice = params.minPrice || null;
        let maxPrice = params.maxPrice || null;
        let exposition = params.exposition || null;

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
        
        // Si des conditions ont été ajoutées, on ajoute la clause WHERE à la requête
        if (conditions.length > 0) {
            newRequest += ' WHERE ' + conditions.join(' AND ');
        }

        // Ajout de la clause GROUP BY
        newRequest += ' GROUP BY p.id';
        if (paramsExpo.length > 0) {
            newRequest += ` HAVING COUNT(DISTINCT te.id) = ${paramsExpo.length}`
        }
        // console.log('newRequest fin de logique : ', newRequest)
        console.log('param fin de logique : ', paramsRequest)

        // Exécution de la requête SQL sécurisée avec les paramètres liés
        const [products] = await connection.promise().query(newRequest, paramsRequest);

        // Si des produits sont trouvés, on les formate et on les renvoie
        if (products.length > 0) {
            const formattedProducts = products.map(product => ({
                ...product,
                images: product.images ? product.images.split(', ') : []  // Transformer en tableau
            }));

            console.log('Produit(s) trouvé(s) :', formattedProducts.length);
            return formattedProducts;
        } else {
            return [];
        }

    } catch (err) {
        console.error('Erreur lors de la récupération des plantes:', err);
        throw new Error('Erreur lors de la récupération des plantes');
    }
};

