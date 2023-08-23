import loginDatamapper from '../models/login.datamapper.js';
import { ApiError } from '../middlewares/error.middleware.js';

export default {
  async login(req, res) {
    const user = await loginDatamapper.findByPk(req.params.id);

    if (!user) {
      throw new ApiError('User not found', { statusCode: 404 });
    }
    res.json(user);
  },
};
