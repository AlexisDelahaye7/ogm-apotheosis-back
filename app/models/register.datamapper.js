export default {
  async createUser(req, res) {
    const query = `
      INSERT INTO "user" ("email", "password", "role")
      VALUES ($1, $2, $3);`;
    const values = [
      req.body.email,
      req.body.password,
      req.body.role,
    ];

    const result = await registerDatamapper.query(query, values);

    if (result.rowCount === 0) {
      throw new ApiError('User not found', { statusCode: 404 });
    }
  },
};
