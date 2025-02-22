import argon2 from "argon2";
import connection from "../config/database.js";
import fastifyCookie from 'fastify-cookie';
import fastifyJWT from '@fastify/jwt';
import { getPanier } from "./panier.js";
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
        await setWishListCookie( reply, user.id);
        const token = setUserCookie(fastify, reply, user);
        await setPanierCookie( reply, user.id);
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

export const setWishListCookie = async ( reply, user_id) => {
  const [wishListExistante] = await connection.promise().query(
    'SELECT GROUP_CONCAT(id_plante) AS id_plantes FROM liste_envie WHERE id_user = ?',
    [user_id]
  );
  const wishList = wishListExistante[0].id_plantes
    ? wishListExistante[0].id_plantes
      .split(',')
      .map(item => item.trim()) // Supprimer les espaces inutiles autour de chaque élément
      .map(Number)  // Convertir chaque élément en nombre
      .filter(item => !isNaN(item)) // Filtrer les éléments qui ne sont pas des nombres
    : [];
  reply.setCookie('wishList', wishList, {
    httpOnly: true,
    secure: true, // Utilise true si tu es en HTTPS, sinon false pour HTTP
    sameSite: 'None',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    domain: 'localhost',  // 🔧 Ajoute cette ligne pour forcer 'localhost' comme domaine
  })
}
export const setUserCookie = (fastify, reply, user) => {
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
  return token
}
export const setPanierCookie = async (reply, user_id) => {
  try {
      const [panierExistant] = await getPanier();
      // Vérifier si un panier existe
      if (!panierExistant || panierExistant.length === 0) {
          console.log("Aucun panier trouvé pour l'utilisateur:", user_id);
          reply.clearCookie('panier'); // Supprime le cookie si aucun panier
          return;
      }

      const panier = panierExistant[0];

      // Gestion des valeurs NULL et transformation en tableau de nombres
      const toNumberArray = (str) => 
          (str || '') // Remplace NULL par ''
              .split(', ') // Sépare la chaîne
              .filter(val => val.trim() !== '') // Filtre les valeurs vides
              .map(Number); // Convertit en nombre

      const panierCookie = {
          produit_id: toNumberArray(panier.produits_id),
          detail_panier_id: toNumberArray(panier.detail_panier_id),
          detail_panier_prix: toNumberArray(panier.detail_panier_prix_total),
          detail_panier_quantite: toNumberArray(panier.detail_panier_quantite)
      };

      // Stocker le cookie sous forme de JSON
      reply.setCookie('panier', JSON.stringify(panierCookie), {
          httpOnly: true,
          secure: true, // true si HTTPS, sinon false en local
          sameSite: 'None',
          path: '/',
          maxAge: 60 * 60 * 24 * 7 ,// 1 semaine
          domain: 'localhost',  // 🔧 Ajoute cette ligne pour forcer 'localhost' comme domaine

      });

      console.log("Cookie panier défini avec succès:", panierCookie);
  } catch (err) {
      console.error("Erreur lors de la création du cookie panier:", err);
  }
};
