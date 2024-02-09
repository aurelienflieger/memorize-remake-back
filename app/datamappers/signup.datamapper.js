import client from "../pg.client.js";

const signupDatamapper = {
  async newUser(name, email, hashedPassword) {
    const sqlQuery = {
      // eslint-disable-next-line quotes
      text: 'INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      values: [name, email, hashedPassword],
    };

    const result = await client.query(sqlQuery);
    return result.rows[0];
  },
};

export default signupDatamapper;
