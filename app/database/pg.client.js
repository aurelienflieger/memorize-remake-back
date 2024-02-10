import "dotenv/config";
import pg from "pg";

// Syncing the postgres database with our project

const { Pool } = pg;

const poolConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DB,
};

const pool = new Pool(poolConfig);

export default pool;
