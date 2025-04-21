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
      return {
        success: true,
        message: message
      };
    } else {
      message = 'Un compte est déjà associé à cet email';
      return {
        success: false,
        message: message
      };
    }
  } catch (err) {
    console.error('Erreur lors de la création du compte:', err);
    return {
      success: false,
      message: 'Erreur lors de la création du compte : ' + err.message
    };
  }
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
        // await setPanierCookie( reply, user.id);
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
export const updateAccount = async (fastify, reply , id_user, prenom, nom, email, telephone, date_naissance, genre) => {
    try {
        const requeteUtilisateurExistant = `
            SELECT COUNT(*) as count
            FROM utilisateurs
            WHERE 
            id = ?
            `;
        const utilisateurExistant = await connection.promise().query(requeteUtilisateurExistant, [id_user]);
        console.log('utilisateurExistant : ', utilisateurExistant[0][0].count)
        if(utilisateurExistant[0][0].count === 1 || utilisateurExistant[0][0].count === "1"){
          console.log('je vais update')
          const [day, month, year] = date_naissance.split('/');
          const dateBDD = new Date(year, month - 1, day)
          await connection.promise().query(
            'UPDATE site_kerisnel.utilisateurs SET prenom= ?, nom=?, email=?, telephone=?, date_naissance=?, genre=? WHERE id=? ',
            [ prenom, nom, email, telephone, dateBDD, genre, id_user]
        );

        console.log('Informations modifiées');
        const updatedUser = {
          id: id_user,
          prenom: prenom,
          nom: nom,
          email: email,
          telephone: telephone,
          date_naissance: date_naissance,  // Assurez-vous que la date est dans le bon format
          genre: genre
      };
        setUserCookie(fastify, reply, updatedUser);
        return { success: true, message: 'Profil mis à jour avec succès' };
        }
        
    } catch (error) {
        console.error("Erreur lors de la modification des informations du profil :", error);
        throw new Error("Impossible de modifier les informations.");
    }
};

export const modifyPassword = async (id_user, motDePasseActuelSaisi, nouveauMotDePasse) => {
  try {
    const [rows] = await connection.promise().query(
      'SELECT mot_de_passe FROM utilisateurs WHERE id = ?',
      [id_user]
    );

    if (rows.length === 0) {
      return {
        success: false,
        message: ''
      };
    }

    const user = rows[0];

    const motDePasseValide = await argon2.verify(user.mot_de_passe, motDePasseActuelSaisi);
    if (!motDePasseValide) {
      return {
        success: false,
        message: 'Mot de passe saisi incorrect'
      };
    }

    const nouveauHash = await argon2.hash(nouveauMotDePasse);
    await connection.promise().query(
      'UPDATE site_kerisnel.utilisateurs SET mot_de_passe = ? WHERE id = ?',
      [nouveauHash, id_user]
    );
    console.log('mot de passe correct, update ok')

    return {
      success: true,
      message: ''
    };

  } catch (err) {
    console.error('❌ Erreur lors de la modification du mot de passe :', err);
    return {
      success: false,
      message: 'Mot de passe saisi incorrect'
    };
  }
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
    telephone: user.telephone,
    genre: user.genre,
    date_naissance : user.date_naissance
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
