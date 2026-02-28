import pg from "pg";

let pool: pg.Pool | null = null;
let resourceBaseUrl: URL | null = null;

export function initPool(databaseUrl: string): void {
  pool = new pg.Pool({ connectionString: databaseUrl });
  resourceBaseUrl = new URL(databaseUrl);
  resourceBaseUrl.protocol = "postgres:";
  resourceBaseUrl.password = "";
}

export function getPool(): pg.Pool {
  if (!pool) {
    throw new Error("Database pool not initialized. Call initPool() first.");
  }
  return pool;
}

export function getResourceBaseUrl(): URL {
  if (!resourceBaseUrl) {
    throw new Error("Database pool not initialized. Call initPool() first.");
  }
  return resourceBaseUrl;
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
    resourceBaseUrl = null;
  }
}
