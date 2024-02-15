import "dotenv/config";
import pg from "pg";

// Syncing the postgres database with our project

const { Pool } = pg;

const poolConfig = {
  connectionString: process.env.PG_URL,
  ssl: { rejectUnauthorized:false },
};

const pool = new Pool(poolConfig);

export default pool;