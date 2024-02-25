import "dotenv/config";
import pg from "pg";
import debugLogger from "../utils/debugLogger.util.js";
import { fileURLToPath } from "url";
import { basename } from "path";

// Syncing the postgres database with our project

const { Pool } = pg;
const __fileName = basename(fileURLToPath(import.meta.url));
const logger = debugLogger(__fileName);

let pool;

try {
  const poolConfig = {
    connectionString: process.env.PG_URL,
    database: process.env.PG_DB,
  };
  pool = new Pool(poolConfig);
} catch (err) {
  logger("Failed to create a new Pool in pg:", err.message);
  process.exit(1);
}


export default pool;