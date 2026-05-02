/**
 * One-shot: remove legacy embedded fields from all qawwal documents.
 *
 * Run (from project root, Node 20+):
 *   node --env-file=.env.local scripts/unset-qawwal-legacy-fields.mjs
 *
 * Or: MONGODB_URI="your-uri" node scripts/unset-qawwal-legacy-fields.mjs
 */
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Missing MONGODB_URI. Use .env.local with node --env-file or export the variable.');
  process.exit(1);
}

await mongoose.connect(uri);
const col = mongoose.connection.collection('qawwals');
const result = await col.updateMany(
  {},
  {
    $unset: {
      performances: '',
      awards: '',
      collaborations: '',
      stats: '',
      milestones: '',
      achievements: '',
    },
  }
);
console.log('matchedCount:', result.matchedCount, 'modifiedCount:', result.modifiedCount);
await mongoose.disconnect();
