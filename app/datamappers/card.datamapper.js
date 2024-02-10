import pool from "../pg.client";
import CoreDatamapper from "./core.datamapper";

export default class CardDataMapper extends CoreDatamapper {
  readTableName = "card";

  writeTableName = "card";

  async findAllCardsByDeckID(deckId) {
    const result = await pool.query(
      `SELECT * FROM "${this.readTableName}" WHERE "deck_id" = $1`,
      [deckId]
    );
    return result.rows;
  }
}
