import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";

export function sql(strings: TemplateStringsArray, ...values: unknown[]) {
  const client = neon(DATABASE_URL);
  return client(strings, ...values).then((rows) => ({ rows }));
}
