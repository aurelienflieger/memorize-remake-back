import pool from "../../database/index.js";

// The CoreDataMapper can be used to flexibly query a database postgres table.
export default class CoreDatamapper {
  static readTableName;

  static writeTableName;

  static async findAll() {
    const result = await pool.query(`SELECT * FROM "${this.readTableName}"`);
    return result.rows;
  }

  static async findByPk(id) {
    const result = await pool.query(
      `SELECT * FROM "${this.readTableName}" WHERE "id" = $1`,
      [id]
    );
    return result.rows[0];
  }

  static async insert(data) {
    const result = await pool.query(
      `SELECT * FROM create_${this.writeTableName}($1)`,
      [data]
    );
    return result.rows[0];
  }

  static async update(data) {
    const result = await pool.query(
      `SELECT * FROM update_${this.writeTableName}($1)`,
      [data]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query(
      `DELETE FROM "${this.writeTableName}" WHERE "id" = $1`,
      [id]
    );
    return !!result.rowCount;
  }
}
