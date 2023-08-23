import client from '../config/client.db.js';

export default {

  async findByData(email, password) {
    const result = await client.query(
      'SELECT * FROM user WHERE email = $1 AND password = $2',
      [email, password],
    );
    return result.rows;
  },
};
