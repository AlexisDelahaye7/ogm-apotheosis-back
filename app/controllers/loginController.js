import jwt from 'jsonwebtoken';
import loginDatamapper from '../models/login.datamapper.js';
import { ApiError } from '../middlewares/error.middleware.js';

export default {
  async login(req, res) {
    const user = await loginDatamapper.findByData(req.body.email, req.body.password);

    if (!user) {
      throw new ApiError('User not found', { statusCode: 404 });
    }

    const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, { algorithm: 'RS256' });
    res.json(token);
  },
};
