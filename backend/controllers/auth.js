import argon2 from "argon2";
import connection from "../config/database.js";
import fastifyCookie from 'fastify-cookie';
import fastifyJWT from '@fastify/jwt';
// Fonction de création de compte
export const createAccount = async (prenom, nom, email, motDePasse) => {
  const now = new Date();
  let message = '';

  try {
    const hashPasswordUser = await argon2.hash(motDePasse);
    const [emailExistant] = await connection.promise().query(
      'SELECT * FROM utilisateurs WHERE email = ?',
      [email]
    );

    if (emailExistant.length === 0) {
      await connection.promise().query(
        'INSERT INTO utilisateurs (nom, prenom, mot_de_passe, email, date_creation, date_modification, actif, administrateur) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
        [nom, prenom, hashPasswordUser, email, now, now, 1, 0]
      );
      message = 'Compte créé avec succès';
    } else {
      message = 'Un compte est déjà associé à cet email';
    }
  } catch (err) {
    console.error('Erreur lors de la création du compte:', err);
    message = 'Erreur lors de la création du compte : ' + err.message;
  }

  return message;
};

// Fonction de connexion
export const connexionAccount = async (fastify, emailConnexion, motDePasseConnexion) => {
  let messageEmail = '';
  let messageMDP = '';
  
  try {
    const [emailExistant] = await connection.promise().query(
      'SELECT * FROM utilisateurs WHERE email = ?', 
      [emailConnexion]
    );

    if (emailExistant.length === 0) {
      messageEmail = 'Adresse email incorrecte';
    } else {
      const user = emailExistant[0];

      // Vérification du mot de passe
      if (await argon2.verify(user.mot_de_passe, motDePasseConnexion)) {
        messageMDP = '';

        // Générer un token JWT avec les informations de l'utilisateur
        const token = fastify.jwt.sign({  // Utiliser fastify.jwt directement
          email: user.email,
          prenom: user.prenom,
          nom: user.nom,
        });
        console.log('token : ',token)
        // Retourner le token JWT
        return { messageEmail, messageMDP, token };
      } else {
        messageMDP = 'Mot de passe incorrect';
      }
    }
  } catch (err) {
    console.error('Erreur lors de la connexion:', err);
    messageEmail = 'Erreur lors de la connexion : ' + err.message;
  }

  return { messageEmail, messageMDP };
};

const checkUserInfo = async () => {
  try {
    const response = await fetch('http://localhost:3000/userInfo', {
      method: 'GET',
      credentials: 'include', // Important pour envoyer les cookies
    });

    const result = await response.json();
    console.log("🔍 Infos utilisateur récupérées :", result);
  } catch (err) {
    console.error("❌ Erreur lors de la récupération des infos utilisateur :", err);
  }
};


// Fonction de déconnexion
export const logout = async (req, res) => {
  let messageLogout = 'Déconnexion réussie';

  try {
    req.session.delete();
  } catch (err) {
    messageLogout = 'Erreur lors de la déconnexion : ' + err.message;
  }

  return { messageLogout };
};
