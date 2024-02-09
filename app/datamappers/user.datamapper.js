import pool from "../pg.client.js";
import CoreDatamapper from "./core.datamapper.js";

/* The methods from the CoreDataMapper are available in addition to those specific to the User. */
export default class UserDataMapper extends CoreDatamapper {
  static readTableName = "user";

  static writeTableName = "user";

  static async getUserByEmail(email) {
    // eslint-disable-next-line quotes
    const users = await pool.query('SELECT * FROM "user" WHERE email = $1', [
      email,
    ]);
    return users.rows[0];
  }
}
