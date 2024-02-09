import pg from "pg";

const { Pool } = pg;

let poolConfig = {
  database: "memorize"
};

const pool = new Pool(poolConfig);

export default pool;