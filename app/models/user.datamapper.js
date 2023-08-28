import client from '../config/client.db.js';

export default {
  async findAll() {
    const result = await client.query(
      `
      SELECT * FROM "user"
      `,
    );
    return result.rows;
  },

  async findByPk(id) {
    const result = await client.query(
      `
      SELECT * FROM "user" WHERE id = $1
      `,
      [id],
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await client.query(
      `
      SELECT * FROM "user" WHERE email = $1
      `,
      [email],
    );
    return result.rows[0];
  },

  async insert(user) {
    const result = await client.query(
      `
        INSERT INTO "user" ("username", "email", "password", "role_id")
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [user.username, user.email, user.password, 1],
    );
    return result.rows[0];
  },

  async update(id, user) {
    const values = Object.values(user);
    values.unshift(Number(id));
    values.join(', ');

    const keys = Object.keys(user);
    const placeholders = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');

    const result = await client.query(
      `
        UPDATE "user"
        SET ${placeholders}
        WHERE id = $1
        RETURNING *
      `,
      values,
    );

    return result.rows[0];
  },

  async delete(id) {
    const result = await client.query(
      `
        DELETE FROM "user"
        WHERE id = $1
        RETURNING *
      `,
      [id],
    );
    return result.rows[0];
  },
};

/*
findall
findbyPK
insert
update
delete
*/
