import { randomBytes, scryptSync } from 'crypto';

const password = process.argv[2];
if (!password || password.length < 10) {
  console.error('Usage: npm run auth:hash -- "your-password" (minimum 10 characters)');
  process.exit(1);
}

const salt = randomBytes(16).toString('hex');
const hash = scryptSync(password, salt, 64).toString('hex');
console.log(`${salt}:${hash}`);
