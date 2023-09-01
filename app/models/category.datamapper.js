import client from '../config/client.db.js';

export default {
  async findAll() {
    const result = await client.query(`
      SELECT "category".* FROM "category"
    `);
    return result.rows;
  },

  async findByPk(id) {
    const result = await client.query(`
      SELECT "category".* FROM "category"
      WHERE "category".id = $1
    `, [id]);
    return result.rows[0];
  },

  async findByName(name) {
    const result = await client.query(`
      SELECT "category".* FROM "category"
      WHERE "category".name = $1
    `, [name]);
    return result.rows[0];
  },

  async insert(category) {
    const result = await client.query(`
      INSERT INTO "category" (name)
      VALUES ($1)
      RETURNING *
    `, [category.name]);
    return result.rows[0];
  },

  async update(id, category) {
    const result = await client.query(`
      UPDATE "category"
      SET name = $2, updated_at = $3
      WHERE id = $1
      RETURNING *
    `, [id, category.name, category.updated_at]);
    return result.rows[0];
  },

  async delete(id) {
    const result = await client.query(`
      DELETE FROM "category"
      WHERE id = $1
      RETURNING *
    `, [id]);
    return result.rows[0];
  },
};
