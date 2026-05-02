/**
 * One-off: remove legacy Singer fields from all documents in `singers`.
 * Run from project root after setting MONGODB_URI:
 *   MONGODB_URI="your connection string" node scripts/unset-singer-fields.mjs
 */

import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('Set MONGODB_URI in the environment (e.g. export MONGODB_URI=...).');
  process.exit(1);
}

const unset = {
  albums: '',
  songs: '',
  awards: '',
  collaborations: '',
  stats: '',
  milestones: '',
  achievements: '',
};

await mongoose.connect(uri);
const result = await mongoose.connection.db
  .collection('singers')
  .updateMany({}, { $unset: unset });

console.log('Matched:', result.matchedCount, 'Modified:', result.modifiedCount);
await mongoose.disconnect();
process.exit(0);
