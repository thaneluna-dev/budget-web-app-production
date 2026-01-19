import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';
const sql = neon(import.meta.env.VITE_DRIZZLE_DATABASE_URL, {
    disableWarningInBrowsers: true
});
export const db = drizzle({client: sql}, { schema });