import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import fastifyCookie from 'fastify-cookie';
import fastifyJWT from '@fastify/jwt';
import { createAccount, connexionAccount, updateAccount, modifyPassword } from './controllers/auth.js';
import { loadTypeDB } from './controllers/type.js';
import { loadAllProduct, loadAProductDB } from './controllers/product.js';
import { addWishList, deleteWishList, getWishList } from './controllers/wishList.js';
import { loadNouveauteProducts, loadProductByType, loadPromotionsProducts, loadSelectionProducts, loadSuggestionProducts, searchByParams, searchByText } from './controllers/search.js';
import { deleteDetailPanier, getPanier, modifyQuantity, panierExistant } from './controllers/panier.js';
import { clearPanier } from '../frontend/src/mySlice.js';
import { getSuggestions } from './controllers/suggestion.js';
import { getCommande, validationCommande } from './controllers/commande.js';
import { addAdresse, changeActiveAdresse, deleteAdresse, loadActivAdresse, loadModifyAdresse, loadOtherAdresses, modifyAdresse } from './controllers/adresse.js';
import { deleteRecentlyViewProduct, getRecentlyViewProduct, updateRecentlyViewProductList } from './controllers/recentlyView.js';
const fastify = Fastify();
const rootDir = dirname(fileURLToPath(import.meta.url)); // Répertoire actuel du fichier server.js (backend)

// Ajouter le plugin CORS
fastify.register(fastifyCors, {
  origin: 'http://localhost:5173', // Assure-toi que l'URL de ton frontend est bien autorisée
  credentials: true, // Permet d'envoyer des cookies (comme le cookie de session)
});

// Ajouter le plugin JWT
fastify.register(fastifyJWT, {
  secret: readFileSync(join(rootDir, 'secret-key')),
});

// Ajouter le plugin pour gérer les cookies (pour stocker le token JWT côté client)
fastify.register(fastifyCookie);

// Route pour la connexion
fastify.post('/connexion', async (request, reply) => {
  const { emailConnexion, motDePasseConnexion } = request.body;
  if (!emailConnexion || !motDePasseConnexion) {
    return reply.status(400).send({ error: 'Email et mot de passe sont requis' });
  }

  try {
    const { messageEmail, messageMDP, token } = await connexionAccount(fastify, emailConnexion, motDePasseConnexion, reply);

    if (messageEmail || messageMDP) {
      return reply.status(400).send({ messageEmail, messageMDP });
    }

    reply.send({ success: true, message: 'Utilisateur connecté' });
    // console.log("✅ Token envoyé au client :", token);

  } catch (err) {
    reply.status(500).send({ error: 'Une erreur est survenue pendant la connexion', details: err.message });
  }
});
// Route pour obtenir les informations de l'utilisateur (protégée par JWT)
fastify.get('/userInfo', async (request, reply) => {
  try {
    // Vérification si le cookie 'token' existe
    const token = request.cookies?.token;
    if (!token) {
      console.log("🔐 Token manquant dans les cookies");
      return reply.send({ error: 'Utilisateur non authentifié', success: false });
    }

    // Vérification du token JWT
    const user = fastify.jwt.verify(token);

    // Réponse avec les infos utilisateur et success
    reply.status(200).send({ user, success: true });
  } catch (err) {
    console.error('❌ Erreur lors de la vérification du token : ', err);

    // Si une autre erreur se produit
    return reply.status(500).send({ error: 'Erreur serveur lors de la vérification du token', details: err.message, success: false });
  }
});
fastify.post('/updateProfil/:id_user', async (request, reply) => {   
  const { id_user} = request.params;   
  const { prenom, nom, email, telephone, date_naissance, genre } = request.body;
console.log('j arrive ici ! ')
  try {       
      const response = await updateAccount(fastify, reply,id_user, prenom, nom, email, telephone, date_naissance, genre);       
      if (response.success) {         
          reply.send({ success: true });       
      } else {         
          reply.send({ success: false, message: response.message });        
      }   
  } catch (err) {       
      console.error("Erreur côté serveur:", err); 
      reply.status(500).send({ error: "Une erreur est survenue lors du traitement de l'adresse" });   
  } 
}); 
fastify.post('/modifyPassword', async (request, reply) => {   
  const { id_user, motDePasseActuelSaisi, nouveauMotDePasse } = request.body;

  try {
    console.log('id user : ', id_user, ' password : ', motDePasseActuelSaisi, ' new password : ', nouveauMotDePasse)

      const response = await modifyPassword(id_user, motDePasseActuelSaisi, nouveauMotDePasse);

      if (response.success) {         
          reply.send({ success: true });       
      } else {   
        console.log('message : ', response.message)      
          reply.send({ success: false, message: response.message });        
      }   
  } catch (err) {       
      console.error("Erreur côté serveur:", err); 
      reply.status(500).send({ error: "Une erreur est survenue lors du traitement du mot de passe" });   
  } 
});





// Route pour la déconnexion
fastify.post('/logout', async (request, reply) => {
  try {
    // Supprimer le cookie du token JWT
    reply.clearCookie('token');
    reply.clearCookie('wishList');
    reply.clearCookie('panier');
    reply.status(200).send({ messageLogout: 'Utilisateur déconnecté', success: true });
  } catch (err) {
    reply.status(500).send({ error: 'Une erreur est survenue pendant la déconnexion', details: err.message });
  }
});

// Route pour la création de compte
fastify.post('/creationCompte', async (request, reply) => {
  const { prenom, nom, email, motDePasse } = request.body;
  if (!prenom || !nom || !email || !motDePasse) {
    return reply.status(400).send({ error: 'Tous les champs sont requis' });
  }

  try {
    const result = await createAccount(prenom, nom, email, motDePasse);
    if (!result.success) {
      return reply.status(400).send({ success: false, message : result.message });
    }
    reply.status(201).send({success: true, message : result.message });
  } catch (err) {
    reply.status(500).send({ error: 'Une erreur est survenue lors de la création du compte', details: err.message });
  }
});

// Route pour charger les types
fastify.get('/loadType', async (request, reply) => {
  try {
    const types = await loadTypeDB();
    reply.status(200).send({ types });
  } catch (err) {
    reply.status(500).send({ error: 'Une erreur est survenue lors du chargement des types', details: err.message });
  }
});

// Route pour charger un produit
fastify.get('/loadProduct/:id', async (request, reply) => {
  try {
    const { id } = request.params;  // Récupère l'ID depuis les paramètres de l'URL
    const product = await loadAProductDB(id);  // Appel de ta fonction avec l'ID récupéré
    reply.status(200).send({ product });
  } catch (err) {
    reply.status(500).send({
      error: 'Une erreur est survenue lors du chargement du produit',
      details: err.message
    });
  }
});

// Route pour charger un produit
fastify.get('/loadAllProduct', async (request, reply) => {
  try {
    const product = await loadAllProduct();
    reply.status(200).send({ product });
  } catch (err) {
    reply.status(500).send({ error: 'Une erreur est survenue lors du chargement du produit', details: err.message });
  }
});
fastify.get('/loadPromotionProduct', async (request, reply) => {
  try {
    const products = await loadPromotionsProducts();
    reply.status(200).send({ products });
  } catch (err) {
    reply.status(500).send({ error: 'Une erreur est survenue lors du chargement du produit', details: err.message });
  }
});
fastify.get('/loadNouveauteProduct', async (request, reply) => {
  try {
    const products = await loadNouveauteProducts();
    reply.status(200).send({ products });
  } catch (err) {
    reply.status(500).send({ error: 'Une erreur est survenue lors du chargement du produit', details: err.message });
  }
});
fastify.get('/loadSelectionProduct', async (request, reply) => {
  try {
    const products = await loadSelectionProducts();
    reply.status(200).send({ products });
  } catch (err) {
    reply.status(500).send({ error: 'Une erreur est survenue lors du chargement du produit', details: err.message });
  }
});
fastify.get('/loadSuggestionProduct/:type_id/:produit_id', async (request, reply) => {
  try {
    const { type_id, produit_id } = request.params;  // Récupère l'ID depuis les paramètres de l'URL
    const products = await loadSuggestionProducts(type_id, produit_id );
    reply.status(200).send({ products });
  } catch (err) {
    reply.status(500).send({ error: 'Une erreur est survenue lors du chargement du produit', details: err.message });
  }
});
fastify.get('/checkWishList', async (request, reply) => {
  try {
    const cookie = request.cookies?.wishList;  // Accéder au cookie 'wishList'
    if (!cookie) {
      return reply.status(200).send({ wishList: [] });  // Si le cookie est vide, renvoyer un tableau vide
    }

    // Si le cookie est une chaîne séparée par des virgules
    const decodedCookie = decodeURIComponent(cookie);  // Décoder le cookie si nécessaire
    const wishList = decodedCookie.split(',').map(Number);  // Séparer par des virgules et convertir chaque valeur en nombre
    reply.status(200).send({ wishList });  // Renvoyer la wishlist sous forme de tableau
  } catch (err) {
    console.error('Erreur lors de la récupération du cookie:', err);
    reply.status(500).send({ error: 'Une erreur est survenue lors du chargement de la wishlist' });
  }
});


fastify.post('/addWishList/:id_user/:id_plante', async (request, reply) => {
  const { id_user, id_plante } = request.params;
  try {
    await addWishList(id_user, id_plante, request, reply);
    reply.status(200);
  } catch (err) {
    reply.status(500).send({ error: 'Une erreur est survenue lors du chargement du produit' });
  }
});
fastify.post('/deleteWishList/:id_user/:id_plante', async (request, reply) => {
  const { id_user, id_plante } = request.params;

  try {
    await deleteWishList(id_user, id_plante, request, reply);
    reply.status(200).send({success: true});
  } catch (err) {
    reply.status(500).send({ error: 'Une erreur est survenue lors du chargement du produit' });
  }
});

fastify.post('/productByType/:id_type', async (request, reply) => {
  const { id_type } = request.params;

  try {
    const products = await loadProductByType(id_type);
    reply.status(200).send({ products });;
  } catch (err) {
    reply.status(500).send({ error: 'Une erreur est survenue lors du chargement du produit' });
  }
});
fastify.post('/searchByText/:text', async (request, reply) => {
  const { text } = request.params;

  try {
    const products = await searchByText(text);
    console.log('les products : ', products)
    reply.status(200).send({ products });;
  } catch (err) {
    reply.status(500).send({ error: 'Une erreur est survenue lors du chargement du produit' });
  }
});
fastify.post('/searchByParams', async (request, reply) => {
  try {
    // console.log('je suis dans le byparams du server.js , les params :', request.body)
    const products = await searchByParams(request.body); // ✅ Passe le body à la fonction

    reply.status(200).send({ products });
  } catch (err) {
    console.error('Erreur API :', err); // 🔥 Log l'erreur pour le debug
    reply.status(500).send({ error: 'Une erreur est survenue lors du chargement du produit' });
  }
});
fastify.post('/getPanier/:user_id', async (request, reply) => {
  const { user_id } = request.params;
  try {
    const panier = await getPanier(user_id);
    reply.status(200).send({ panier });;
  } catch (err) {
    reply.status(500).send({ error: 'Une erreur est survenue lors du chargement du produit' });
  }
});
// Route pour charger un produit
fastify.post('/ajoutPanier/:user_id/:produit_id', async (request, reply) => {
  try {
    const { user_id, produit_id } = request.params;  // Récupère l'ID depuis les paramètres de l'URL
    const reponse = await panierExistant(user_id, produit_id);  // Appel de ta fonction pour ajouter le produit au panier
    console.log('reponse : ', reponse)
    // Si la fonction renvoie true, cela signifie que l'ajout a réussi
    if (reponse.success) {
      reply.send({ reponse});
    } else {
      reply.send({ success: false});
    }
  } catch (err) {
    reply.status(500).send({
      error: 'Une erreur est survenue lors du chargement du produit',
      details: err.message
    });
  }
});
fastify.post('/deleteDetailPanier/:detail_panier_id', async (request, reply) => {
  try {
    const {detail_panier_id } = request.params;  // Récupère l'ID depuis les paramètres de l'URL
    const success = await deleteDetailPanier(detail_panier_id);  // Appel de ta fonction pour ajouter le produit au panier

    // Si la fonction renvoie true, cela signifie que l'ajout a réussi
    if (success) {
      reply.send({ success: true});
    } else {
      reply.send({ success: false});
    }
  } catch (err) {
    reply.status(500).send({
      error: 'Une erreur est survenue lors de la suppression du produit dans le panier',
      details: err.message
    });
  }
});
fastify.post('/changeQuantityDetailPanier/:detail_panier_id/:increment/:newQuantity', async (request, reply) => {
  try {
    const { detail_panier_id, increment, newQuantity } = request.params;  // Récupère l'ID depuis les paramètres de l'URL
    await modifyQuantity(detail_panier_id, increment, newQuantity );  // Appel de ta fonction pour ajouter le produit au panier
  } catch (err) {
    reply.status(500).send({
      error: 'Une erreur est survenue lors du chargement du produit',
      details: err.message
    });
  }
});
fastify.get('/getWishList/:user_id', async (request, reply) => {
  try {
    const { user_id } = request.params; // Récupère l'ID utilisateur depuis l'URL
    const data = await getWishList(user_id); // Récupère la wishlist depuis la BDD
    reply.status(200).send(data); // ✅ Envoie directement le tableau
  } catch (err) {
    reply.status(500).send({
      error: 'Une erreur est survenue lors du chargement de la wishlist',
      details: err.message
    });
  }
});
fastify.post('/getSuggestion/:text', async (request, reply) => {
  const { text } = request.params;
  try {
    const products = await getSuggestions(text);
    // console.log('les products : ', products)
    reply.status(200).send({ products });;
  } catch (err) {
    reply.status(500).send({ error: 'Une erreur est survenue lors du chargement du produit' });
  }
});
fastify.post('/validationPanier/:id_panier/:garantie', async (request, reply) => {
  const { id_panier, garantie } = request.params;

  if (!id_panier) {
    console.error("🚨 Erreur : id_panier est manquant !");
    return reply.status(400).send({ error: 'id_panier est requis' });
  }

  if (garantie === undefined) {
    console.error("🚨 Erreur : garantie est manquante !");
    return reply.status(400).send({ error: 'Le paramètre garantie est requis' });
  }

  try {
    const success = await validationCommande(id_panier, garantie);
    console.log('✅ Validation terminée.');

    if (success) {
      reply.send({ success: true, message: "Commande validée avec succès" });
    } else {
      reply.status(400).send({ error: "Une commande existe déjà pour ce panier" });
    }
  } catch (err) {
    console.error("❌ Erreur lors de la validation :", err);
    reply.status(500).send({ error: 'Une erreur est survenue lors de la validation du panier' });
  }
});
fastify.get('/getCommande/:id_user', async (request, reply) => {
  const { id_user } = request.params;
  try {
    const commandes = await getCommande(id_user);
    // console.log('les products : ', products)
    reply.status(200).send( commandes );
  } catch (err) {
    reply.status(500).send({ error: 'Une erreur est survenue lors du chargement du produit' });
  }
});
fastify.post('/createAddress/:id_user', async (request, reply) => {
    const { id_user } = request.params;
    const { adresseUser, defaultAdress } = request.body; // <- déstructuration ici
    console.log('default adresse : ', defaultAdress)
    try {
        const response = await addAdresse(id_user, adresseUser, defaultAdress);
        if (response.success) {
          reply.send({ success: true, message: "adresse ajoutée au profil" });
        } else {
          reply.send({ success: false, message: "L'adresse existe déjà dans votre profil" });        }
    } catch (err) {
        console.error("Erreur côté serveur:", err); // Affiche l'erreur pour comprendre ce qui échoue
        reply.status(500).send({ error: 'Une erreur est survenue lors du traitement de l\'adresse' });
    }
});
fastify.post('/modifyAdresse/:id_user', async (request, reply) => {
  const { id_user } = request.params;
  const { adresseUser, defaultAdress } = request.body; // <- déstructuration ici
  try {
      const response = await modifyAdresse(id_user, adresseUser, defaultAdress);
      if (response.success) {
        reply.send({ success: true, message: "adresse ajoutée au profil" });
      } else {
        reply.send({ success: false, message: "L'adresse existe déjà dans votre profil" });        }
  } catch (err) {
      console.error("Erreur côté serveur:", err); // Affiche l'erreur pour comprendre ce qui échoue
      reply.status(500).send({ error: 'Une erreur est survenue lors du traitement de l\'adresse' });
  }
});
fastify.get('/loadActiveAdress/:id_user', async (request, reply) => {
  const { id_user } = request.params;
  try {
      const response = await loadActivAdresse(id_user);
      if (response.success) {
        reply.send({ success: true, adresse: response.adresseActive });
      } else {
        reply.send({ success: false, message: "Il n'y a pas d'adresses actives" });        }
  } catch (err) {
      console.error("Erreur côté serveur:", err); // Affiche l'erreur pour comprendre ce qui échoue
      reply.status(500).send({ error: 'Une erreur est survenue lors du traitement de l\'adresse' });
  }
});
fastify.get('/loadOtherAdress/:id_user', async (request, reply) => {
  const { id_user } = request.params;
  try {
      const response = await loadOtherAdresses(id_user);
      if (response.success) {
        reply.send({ success: true, adresses: response.adresses });
      } else {
        reply.send({ success: false, message: "Il n'y a pas d'adresses actives" });        }
  } catch (err) {
      console.error("Erreur côté serveur:", err); // Affiche l'erreur pour comprendre ce qui échoue
      reply.status(500).send({ error: 'Une erreur est survenue lors du traitement de l\'adresse' });
  }
});
fastify.get('/loadModifyAdress/:id_user/:id_adresse', async (request, reply) => {
  const { id_user, id_adresse } = request.params;
  try {
      const response = await loadModifyAdresse(id_user, id_adresse);
      if (response.success) {
        reply.send({ success: true, adresse: response.adresse });
      } else {
        reply.send({ success: false, message: "Il n'y a pas d'adresses actives" });        }
  } catch (err) {
      console.error("Erreur côté serveur:", err); // Affiche l'erreur pour comprendre ce qui échoue
      reply.status(500).send({ error: 'Une erreur est survenue lors du traitement de l\'adresse' });
  }
});
fastify.post('/changeActiveAdresse/:id_user/:id_adresse', async (request, reply) => {   
  const { id_user, id_adresse } = request.params;   

  try {       
      const response = await changeActiveAdresse(id_user, id_adresse);       
      if (response.success) {         
          reply.send({ success: true });       
      } else {         
          reply.send({ success: false, message: response.message });        
      }   
  } catch (err) {       
      console.error("Erreur côté serveur:", err); 
      reply.status(500).send({ error: "Une erreur est survenue lors du traitement de l'adresse" });   
  } 
}); 
fastify.post('/deleteAdresse/:id_adresse', async (request, reply) => {   
  const { id_adresse } = request.params;   
console.log('on passe dans le delete, id adresse : ', id_adresse)
  try {       
      const response = await deleteAdresse( id_adresse);       
      if (response.success) {         
          reply.send({ success: true });       
      } else {         
          reply.send({ success: false, message: response.message });        
      }   
  } catch (err) {       
      console.error("Erreur côté serveur:", err); 
      reply.status(500).send({ error: "Une erreur est survenue lors du traitement de l'adresse" });   
  } 
}); 
fastify.post('/updateRecentlyViewProduct/:id_user/:id_product', async (request, reply) => {
  const { id_user,id_product } = request.params;
  try {
      const response = await updateRecentlyViewProductList(id_user, id_product);
      if (response.success) {
        reply.send({ success: true, message: "BDD mise à jour pour les récemments vus" });
      } else {
        reply.send({ success: false, message: "Erreur dans la mise à jour des id des récemments vus" });        }
  } catch (err) {
      console.error("Erreur côté serveur:", err); // Affiche l'erreur pour comprendre ce qui échoue
      reply.status(500).send({ error: 'Une erreur est survenue lors du traitement de l\'adresse' });
  }
});
fastify.post('/deleteRecentlyViewedList/:id_user/:id_product', async (request, reply) => {
  const { id_user,id_product } = request.params;
  try {
      const response = await deleteRecentlyViewProduct(id_user, id_product);
      if (response.success) {
        reply.send({ success: true, message: "suppression BDD pour les récemments vus" });
      } else {
        reply.send({ success: false, message: "Erreur dans la suppression du produit des récemments vus" });        }
  } catch (err) {
      console.error("Erreur côté serveur:", err); // Affiche l'erreur pour comprendre ce qui échoue
      reply.status(500).send({ error: 'Une erreur est survenue lors du traitement de l\'adresse' });
  }
});
fastify.get('/getRecentlyViewProduct/:id_user', async (request, reply) => {
  const { id_user } = request.params;
  console.log('get reclently id user : ', id_user)
  try {
      const response = await getRecentlyViewProduct(id_user);
      if (response.success) {
        reply.send({ success: true, recentlyViewed: response.recentlyViewed });
      } else {
        reply.send({ success: false, message: "Il n'y a pas d'adresses actives" });        
      }
  } catch (err) {
      console.error("Erreur côté serveur:", err); // Affiche l'erreur pour comprendre ce qui échoue
      reply.status(500).send({ error: 'Une erreur est survenue lors du traitement de l\'adresse' });
  }
});
// Lancer le serveur
fastify.listen({ port: 3000, host: 'localhost' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
