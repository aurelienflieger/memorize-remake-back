import CoreDataMapper from "./core.datamapper.js";
import pool from "../database/pg.client.js";

/* The methods from the CoreDataMapper are available in addition to those specific to the Deck. */
export default class DeckDataMapper extends CoreDataMapper {
  tableName = "deck";

  findAllDecksByUserID = async (id) => {
    const result = await pool.query(
      `SELECT * FROM "${this.tableName}" WHERE "user_id" = $1`,
      [id]
    );
    return result.rows;
  };
}
