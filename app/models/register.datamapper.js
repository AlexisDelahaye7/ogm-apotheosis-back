import client from '../config/client.db.js';

export default {
  async newUser(dataUser) {
    const query = `
      INSERT INTO "user" ("username", "email", "password", "role_id")
      VALUES ($1, $2, $3, $4);`;
    const values = [
      dataUser.username,
      dataUser.email,
      dataUser.password,
      1,
    ];

    const result = await client.query(query, values);
    return result.rows;
  },
};
