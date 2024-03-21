import pool from "../database/pg.client.js";

// The CoreDataMapper can be used to flexibly query a database postgres table.
export default class CoreDatamapper {
  tableName;

  findByPk = async (id) => {
    const result = await pool.query(
      `SELECT * FROM "${this.tableName}" WHERE "id" = $1`,
      [id]
    );
    return result.rows[0];
  };

  insert = async (data) => {
    const result = await pool.query(
      `SELECT * FROM create_${this.tableName}($1)`,
      [data]
    );
    return result.rows[0];
  };

  update = async (data) => {
    const result = await pool.query(
      `SELECT * FROM update_${this.tableName}($1)`,
      [data]
    );
    return result.rows[0];
  };

  delete = async (id) => {
    const result = await pool.query(
      `SELECT * FROM delete_${this.tableName}($1)`,
      [id]
    );
    return result.rowCount > 0;
  };
}
