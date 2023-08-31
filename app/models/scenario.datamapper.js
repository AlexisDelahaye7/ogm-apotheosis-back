import client from '../config/client.db.js';

export default {

  async findAll() {
    const result = await client.query('SELECT * FROM "scenario"');
    return result.rows;
  },

  async findByPk(id) {
    const result = await client.query(
      'SELECT * FROM "scenario" WHERE id = $1',
      [id],
    );
    return result.rows[0];
  },

  async findByName(name) {
    const result = await client.query(
      'SELECT * FROM "scenario" WHERE name = $1',
      [name],
    );
    return result.rows[0];
  },

  async insert(scenario) {
    const result = await client.query(
      `
      INSERT INTO "scenario" ("name", "description", "age", "duration", "nb_players")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `,
      [
        scenario.name,
        scenario.description,
        scenario.age,
        scenario.duration,
        scenario.nb_players,
        scenario.category_id,
      ],
    );
    return result.rows[0];
  },

  async update(id, scenario) {
    const values = Object.values(scenario);
    values.unshift(Number(id));
    values.join(', ');

    const keys = Object.keys(scenario);
    const placeholders = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');

    const result = await client.query(
      `
      UPDATE "scenario"
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
      DELETE FROM "scenario"
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );
    return result.rows[0];
  },
};
