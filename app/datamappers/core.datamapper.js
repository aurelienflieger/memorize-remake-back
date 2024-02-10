import pool from "../pg.client.js";
// The CoreDataMapper can be used to flexibly query a database postgres table.
export default class CoreDatamapper {
  readTableName;

  writeTableName;

  async findAll() {
    const result = await pool.query(`SELECT * FROM "${this.readTableName}"`);
    return result.rows;
  }

  async findByPk(id) {
    const result = await pool.query(
      `SELECT * FROM "${this.readTableName}" WHERE "id" = $1`,
      [id]
    );
    return result.rows[0];
  }

  async insert(data) {
    const result = await pool.query(
      `SELECT * FROM create_${this.writeTableName}($1)`,
      [data]
    );
    return result.rows[0];
  }

  async update(data) {
    const result = await pool.query(
      `SELECT * FROM update_${this.writeTableName}($1)`,
      [data]
    );
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      `SELECT * FROM delete_"${this.writeTableName}" WHERE "id" = $1`,
      [id]
    );
    return !!result.rowCount;
  }
}
