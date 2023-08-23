import client from '../config/client.db.js';

export default {

  async findByPk(userId) {
    const result = await client.query(
      'SELECT * FROM users WHERE id = $1',
      [userId],
    );
    return result.rows[0];
  },
};
