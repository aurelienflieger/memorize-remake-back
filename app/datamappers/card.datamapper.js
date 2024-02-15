import pool from "../database/pg.client.js";
import CoreDatamapper from "./core.datamapper.js";

export default class CardDataMapper extends CoreDatamapper {
  tableName = "card";

  findAllCardsByDeckID = async (id) => {
    const result = await pool.query(
      `SELECT * FROM "${this.tableName}" WHERE "deck_id" = $1`,
      [id]
    );
    return result.rows;
  };
}
