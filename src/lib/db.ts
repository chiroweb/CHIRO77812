import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";

const client = neon(DATABASE_URL, { fullResults: true });

export { client as sql };
