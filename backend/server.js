// server.js
const Fastify = require('fastify');
const fastify = Fastify();

// Ajouter le plugin CORS
fastify.register(require('@fastify/cors'), {
  origin: 'http://localhost:5174',  // Autoriser seulement l'origine de React
  // ou utiliser '*' pour autoriser toutes les origines
  // origin: '*',
});

// Définir une route basique
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// Exemple d'API pour React
fastify.get('/api/data', async (request, reply) => {
  return { message: 'Hello from Fastify API' };
});

// Lancer le serveur avec un objet de configuration
fastify.listen({ port: 3000, host: '127.0.0.1' }, (err, address) => { // Corrected listen syntax
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
