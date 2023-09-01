import client from '../config/client.db.js';

export default {
  async findAll() {
    const result = await client.query('SELECT * FROM ressource');
    return result.rows;
  },

  async findByPk(id) {
    const result = await client.query('SELECT * FROM ressource WHERE id=$1', [id]);
    return result.rows[0];
  },

  async insert(ressource) {
    const result = await client.query(
      `INSERT INTO "ressource" (name, description, type, scenario_id, url)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [ressource.name, ressource.description, ressource.type, ressource.scenario_id, ressource.url],
    );
    return result.rows[0];
  },

  async update(id, ressource) {
    const values = Object.values(ressource);
    values.unshift(Number(id));
    values.join(', ');

    const keys = Object.keys(ressource);
    const placeholders = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');

    const result = await client.query(
      `
      UPDATE "ressource"
      SET = ${placeholders}
      WHERE id = $1
      RETURNING *
      `,
      [values],
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await client.query(
      'DELETE FROM "ressource" WHERE id = $1 RETURNING *',
      [id],
    );
    return result.rows[0];
  },
};
