import CoreDataMapper from "./core.datamapper.js";
import pool from "../database/pg.client.js";

export default class DeckDataMapper extends CoreDataMapper {
  tableName = "deck";

  constructor() {
    super();
  }

  async findAllDecksByUserID(id) {
    const result = await pool.query(
      `SELECT * FROM "${this.tableName}" WHERE "user_id" = $1`,
      [id]
    );
    return result.rows;
  }
}
