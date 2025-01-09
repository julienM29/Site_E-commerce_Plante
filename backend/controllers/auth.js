import argon2 from "argon2";
import connection from "../config/database.js";


export const createAccount = async (prenom, nom, email, motDePasse) => {
  const now = new Date(); // Utilise new Date() pour obtenir un objet Date valide
  let message = '';

  try {
    // Hachage du mot de passe avec argon2
    const hashPasswordUser = await argon2.hash(motDePasse);
    const [emailExistant] = await connection.promise().query('SELECT * FROM utilisateurs WHERE email = ?', [email]);
    if (emailExistant.length === 0) {

      // Insérer l'utilisateur dans la base de données
      await connection.promise().query(
        'INSERT INTO utilisateurs (nom, prenom, mot_de_passe, email, date_creation, date_modification, actif, administrateur) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
        [nom, prenom, hashPasswordUser, email, now, now, 1, 0]
      );
      message = 'Insertion dans la base de donnée';
    } else {
      message = 'Un compte est déjà associé à cette email';
    }

  } catch (err) {
    // Gérer l'erreur et donner un message plus détaillé
    console.error('Erreur lors de la création du compte:', err);
    message = 'Erreur lors de la création du compte : ' + err.message;

  }
  console.log('je suis après le try catch et message =' + message)
  return message;

}
export const connexionAccount = async (emailConnexion, motDePasseConnexion) => {
  console.log('debut')
  let messageEmail = '';
  let messageMDP = '';
  
  const [emailExistant] = await connection.promise().query('SELECT * FROM utilisateurs WHERE email = ?', [emailConnexion]);

  if (emailExistant.length === 0) {
    messageEmail = 'Adresse email incorrect';
  } else {
    const user = emailExistant[0];
  
  if (await argon2.verify(user.mot_de_passe, motDePasseConnexion)) {
    messageMDP = 'Mot de passe correct';
  } else {    
    messageMDP = 'Mot de passe incorrect';
  }

  }

  
  return { messageEmail, messageMDP };
}



