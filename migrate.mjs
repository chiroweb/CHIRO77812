import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';

// Load .env.local manually
const envFile = readFileSync('.env.local', 'utf-8');
const lines = envFile.split('\n');
for (const line of lines) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    let val = match[2].trim();
    // Remove surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[match[1].trim()] = val;
  }
}

const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!dbUrl) {
  console.error('No database URL found');
  process.exit(1);
}
console.log('DB URL found, connecting...');

const sql = neon(dbUrl);

async function migrate() {
  const cols = await sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'portfolio_projects' ORDER BY ordinal_position`;
  console.log('Current columns:', cols.map(r => r.column_name));

  await sql`ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS slug VARCHAR(500) UNIQUE`;
  console.log('+ slug added');
  await sql`ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS client_name VARCHAR(300)`;
  console.log('+ client_name added');
  await sql`ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS site_url TEXT`;
  console.log('+ site_url added');
  await sql`ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS content TEXT`;
  console.log('+ content added');

  const after = await sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'portfolio_projects' ORDER BY ordinal_position`;
  console.log('After migration:', after.map(r => r.column_name));
  console.log('Migration complete!');
}

migrate().catch(e => { console.error('Migration failed:', e); process.exit(1); });
