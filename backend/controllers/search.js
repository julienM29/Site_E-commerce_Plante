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
        console.log('Params :', params);
        let colorRequest = params.color || null;
        let text = params.text || null;
        console.log('recup color :', colorRequest);
        let newRequest
        let paramsRequest = [];

        if (params) {
            newRequest = requete + ' WHERE '
        }
        if (colorRequest) {
            newRequest = newRequest + 'e2.couleur LIKE ? ';
            paramsRequest.push(`%${colorRequest}%`)
        }
        if (text) {
            newRequest = newRequest + ` AND p.nom LIKE ?`;
            paramsRequest.push(`%${text}%`)
        }

        let finalRequest = newRequest + ' GROUP BY p.id;'
        const [products] = await connection.promise().query(finalRequest, paramsRequest);

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
