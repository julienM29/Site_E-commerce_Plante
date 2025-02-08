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
export const connexionAccount = async (fastify, emailConnexion, motDePasseConnexion, reply) => {
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
        const [wishListExistante] = await connection.promise().query(
          'SELECT GROUP_CONCAT(id_plante) AS id_plantes FROM liste_envie WHERE id_user = ?',
          [user.id]
        );
        const wishList = wishListExistante[0].id_plantes
          ? wishListExistante[0].id_plantes
            .split(',')
            .map(item => item.trim()) // Supprimer les espaces inutiles autour de chaque élément
            .map(Number)  // Convertir chaque élément en nombre
            .filter(item => !isNaN(item)) // Filtrer les éléments qui ne sont pas des nombres
          : [];
        console.log('wishList : ', wishList)

        // Générer un token JWT avec les informations de l'utilisateur
        const token = fastify.jwt.sign({  // Utiliser fastify.jwt directement
          email: user.email,
          prenom: user.prenom,
          nom: user.nom,
          id: user.id,
        });

        //Cookie user Info
        reply.setCookie('token', token, {
          httpOnly: true,
          secure: true, // Utilise true si tu es en HTTPS, sinon false pour HTTP
          sameSite: 'None',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          domain: 'localhost',  // 🔧 Ajoute cette ligne pour forcer 'localhost' comme domaine
        })
        // Cookie wishList
        reply.setCookie('wishList', wishList, {
          httpOnly: true,
          secure: true, // Utilise true si tu es en HTTPS, sinon false pour HTTP
          sameSite: 'None',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          domain: 'localhost',  // 🔧 Ajoute cette ligne pour forcer 'localhost' comme domaine
        })
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