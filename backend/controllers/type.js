import connection from "../config/database.js";

export const loadTypeDB = async () => {
  try {
    const [types] = await connection.promise().query('SELECT * FROM type');
    // Vérifie si la requête retourne des types
    if (types.length > 0) {
      return types; // Retourne directement le tableau des types
    } else {
      return []; // Retourne un tableau vide si aucun type n'est trouvé
    }
  } catch (err) {
    // Gestion des erreurs : log de l'erreur et message d'erreur
    console.error('Erreur lors de la récupération des types de plantes:', err);
    throw new Error('Erreur lors de la récupération des types de plantes');
  }
};
