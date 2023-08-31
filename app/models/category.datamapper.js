import client from '../config/client.db.js';

export default {
  async findAll() {
    const result = await client.query(`
      SELECT "category".* FROM "category"
    `);
    return result.rows;
  },
};
