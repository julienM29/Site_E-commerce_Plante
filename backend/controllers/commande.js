import connection from "../config/database.js";

export const validationCommande = async (id_panier, garantie) => {
    try {
      const now = new Date();
      const requeteCommandeExistante = `
        SELECT COUNT(id) AS count
        FROM site_kerisnel.commande
        WHERE panier_id = ?;
      `;
  
      const [rows] = await connection.promise().query(requeteCommandeExistante, [id_panier]);
      const commandeExistante = rows[0].count;
  
      console.log('🧐 Nombre de commandes existantes pour le panier:', commandeExistante);
  
      if (commandeExistante !== 0) {
        console.log("⚠️ Une commande existe déjà pour ce panier !");
        return false;  // Retourne false si une commande existe déjà
      }
  
      // Conversion de garantie (string "true"/"false") en valeur numérique 1/0
      const garantieValue = garantie === 'true' ? 1 : 0;
      console.log('💾 Il n\'y a pas de commande, garantie :', garantieValue);
      console.log('📦 ID du panier =', id_panier);
  
      // Insertion de la nouvelle commande
      const requeteInsert = `
        INSERT INTO site_kerisnel.commande (panier_id, date_commande, garantie) 
        VALUES (?, ?, ?);
      `;
      await connection.promise().query(requeteInsert, [id_panier, now, garantieValue]);
  
      // Mise à jour du panier
      const requeteUpdateActifPanier = `
        UPDATE site_kerisnel.panier 
        SET garantie = ?, actif = 0 
        WHERE id = ?;
      `;
      await connection.promise().query(requeteUpdateActifPanier, [garantieValue, id_panier]);
  
      return true;  // Succès de la validation
    } catch (err) {
      console.error('❌ Erreur lors de la validation de la commande:', err);
      throw new Error('Erreur lors de la validation de la commande');
    }
  };
  
export const getCommande = async (id_user) => {
    const requete = `
        SELECT 
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
        inner join commande c on p.id = c.panier_id 
        WHERE p.user_id = ? AND p.actif = 0
        GROUP BY c.id;`;
    const [commandes] = await connection.promise().query(requete, [id_user]);
    return commandes
}