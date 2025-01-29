import connection from "../config/database.js";

export const loadAProductDB = async (id) => {
  try {
    const [product] = await connection.promise().query(`SELECT 
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
WHERE 
    p.id = ${id}
GROUP BY 
    p.id;
`);
    // Vérifie si la requête retourne des types
    if (product.length > 0) {
      return product; // Retourne directement le tableau des types
    } else {
      return []; // Retourne un tableau vide si aucun type n'est trouvé
    }
  } catch (err) {
    // Gestion des erreurs : log de l'erreur et message d'erreur
    console.error('Erreur lors de la récupération de la plante:', err);
    throw new Error('Erreur lors de la récupération de la plante');
  }
};

export const loadAllProduct = async () => {
    try {
        const [products] = await connection.promise().query(`
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
            GROUP BY 
                p.id;
        `);

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
        console.error('Erreur lors de la récupération des plantes:', err);
        throw new Error('Erreur lors de la récupération des plantes');
    }
};
