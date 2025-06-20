import pool from '../database/pg.client.js'
import CoreDatamapper from './core.datamapper.js'

/* The methods from the CoreDataMapper are available in addition to those specific to the User. */
export default class UserDataMapper extends CoreDatamapper {
  tableName = 'user'

  getUserByEmail = async (email) => {
    const users = await pool.query('SELECT * FROM "user" WHERE email = $1', [
      email,
    ])
    return users.rows[0]
  }

  findByPkWithNoReturnedPassword = async (id) => {
    const result = await pool.query(`SELECT * FROM get_${this.tableName}($1)`, [
      id,
    ])

    return result.rows[0]
  }
}
