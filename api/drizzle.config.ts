import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './drizzle',               // dónde se guardan las migraciones
  dbCredentials: { url: process.env.DATABASE_URL! },
});