import client from "../pg.client.js";

export default class CoreDatamapper {
  static readTableName;

  static writeTableName;

  static async findByPk(id) {
    const result = await client.query(
      `SELECT * FROM "${this.readTableName}" WHERE "id" = $1`, [id]
    );
    return result.rows[0];
  }

  static async insert(data) {
    const result = await client.query(
      `SELECT * FROM create_${this.writeTableName}($1)`, [data]
    );
    return result.rows[0];
  }

  static async update(data) {
    const result = await client.query(
      `SELECT * FROM update_${this.writeTableName}($1)`,
      [data]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await client.query(
      `DELETE FROM "${this.writeTableName}" WHERE "id" = $1`, [id]
    );
    return !!result.rowCount;
  }
}