// server.js
import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { createAccount, connexionAccount } from './controllers/auth.js';
import { loadTypeDB } from './controllers/type.js';

const fastify = Fastify();

// Ajouter le plugin CORS
fastify.register(fastifyCors, {
  origin: 'http://localhost:5174', // Autoriser seulement l'origine de React
});

// Définir une route basique
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});
fastify.get('/posts', async (request, reply) => {
  const { _start = 0, _end = 10, _sort = 'id', _order = 'ASC' } = request.query;

  // Exemple de données de posts
  const posts = [
    { id: 1, title: 'First Post', body: 'This is the body of the post', createdAt: '2025-01-12' },
    { id: 2, title: 'Second Post', body: 'This is the body of the second post', createdAt: '2025-01-13' },
    { id: 3, title: 'Third Post', body: 'This is the body of the third post', createdAt: '2025-01-14' },
    { id: 4, title: 'Fourth Post', body: 'This is the body of the fourth post', createdAt: '2025-01-15' },
    { id: 5, title: 'Fifth Post', body: 'This is the body of the fifth post', createdAt: '2025-01-16' },
  ];

  // Appliquer la logique de pagination et tri
  const sortedPosts = posts.sort((a, b) => {
    if (_order === 'ASC') return a[_sort] > b[_sort] ? 1 : -1;
    return a[_sort] < b[_sort] ? 1 : -1;
  });

  const paginatedPosts = sortedPosts.slice(parseInt(_start), parseInt(_start) + parseInt(_end));

  // Définir le header X-Total-Count
  reply.header('X-Total-Count', posts.length);

  return paginatedPosts;
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
fastify.get('/loadType', async (request, reply) => {
  const types = await loadTypeDB();
  reply.send({ types });
});
// Lancer le serveur
fastify.listen({ port: 3000, host: '127.0.0.1' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
