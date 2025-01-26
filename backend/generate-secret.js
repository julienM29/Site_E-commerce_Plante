import { randomBytes } from 'crypto';
import { writeFileSync } from 'fs';

// Générer 32 octets de données aléatoires
const key = randomBytes(32);

// Sauvegarder la clé dans le fichier 'secret-key'
writeFileSync('secret-key', key);

console.log('Clé secrète générée et sauvegardée dans le fichier "secret-key".');
