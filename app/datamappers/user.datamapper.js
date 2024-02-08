import pool from "../../database/index.js";
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

  static async createUser(username, email, password) {
    const result = await pool.query(
      // eslint-disable-next-line quotes
      'INSERT INTO "user" (username, email, password) VALUES ($1,$2,$3) RETURNING *',
      [username, email, password]
    );
    return result.rows[0];
  }
}
