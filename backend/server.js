// server.js
import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { createAccount, connexionAccount } from './controllers/auth.js';

const fastify = Fastify();

// Ajouter le plugin CORS
fastify.register(fastifyCors, {
  origin: 'http://localhost:5174', // Autoriser seulement l'origine de React
});

// Définir une route basique
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// Exemple d'API pour React
fastify.get('/api/data', async (request, reply) => {
  return { message: 'Hello from Fastify API' };
});

// API pour la création de compte
fastify.post('/connexion', async (request, reply) => {
  const { emailConnexion, motDePasseConnexion } = request.body;  // Accède aux données envoyées dans le corps de la requête
 const { messageEmail, messageMDP } = await connexionAccount(emailConnexion, motDePasseConnexion);
  reply.send({ messageEmail, messageMDP });
});
fastify.post('/creationCompte', async (request, reply) => {
  const {  prenom, nom, email, motDePasse } = request.body;  // Accède aux données envoyées dans le corps de la requête
  const message = await createAccount(prenom, nom, email, motDePasse);
  reply.send({ message });
});

// Lancer le serveur
fastify.listen({ port: 3000, host: '127.0.0.1' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
