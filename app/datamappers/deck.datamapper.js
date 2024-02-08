import client from "../pg.client.js";
import CoreDatamapper from "./core.datamapper.js";

export default class DeckDatamapper extends CoreDatamapper {
  static readTableName = 'deck';

  static writeTableName = 'deck';

  static async insert(data) {
    const result = await client.query(
      'SELECT * FROM create_deck($1)',
      [data]
    );
    return result.rows[0];
  }

  static async findAllDecksByUserID(userid) {
    const result = await client.query(
      `SELECT * FROM "${this.readTableName}" WHERE "user_id" = $1`, [userid]
    );
    return result.rows;
  }
}