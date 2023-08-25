import { ApiError } from '../middlewares/error.middleware.js';
import registerDatamapper from '../models/register.datamapper.js';

export default {
  async createUser(req, res) {
    const user = await registerDatamapper.newUser(
      req.body.username,
      req.body.email,
      req.body.password,
    );

    if (!user) {
      throw new ApiError('User not found', { statusCode: 404 });
    }
    return res.json(user);
  },
};
