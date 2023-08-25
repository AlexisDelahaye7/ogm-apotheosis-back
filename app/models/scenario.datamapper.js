import client from '../config/client.db.js';

export default {

  async findAll() {
    const result = await client.query('SELECT * FROM scenario');
    return result.rows;
  },

  async findById(id) {
    const result = await client.query(
      'SELECT * FROM scenario WHERE id = $1',
      [id],
    );
    return result.rows[0];
  },

};
