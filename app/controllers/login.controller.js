import loginDatamapper from '../models/login.datamapper.js';
import { ApiError } from '../middlewares/error.middleware.js';

import createJwt from '../helpers/jwt.sign.js';

export default {
  async login(req, res) {
    const user = await loginDatamapper.findByData(req.body.email, req.body.password);

    console.log(req.body);

    if (!user) {
      throw new ApiError('User not found', { statusCode: 404 });
    }

    const token = createJwt(user.id);

    req.headers.authorization = token;
    res.status(200).json(token);
  },
};
