import bcrypt from 'bcrypt';
import userDatamapper from '../models/user.datamapper.js';
import { ApiError } from '../middlewares/error.middleware.js';

import createJwt from '../helpers/jwt.sign.js';

export default {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await userDatamapper.findByEmail(email);

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new ApiError('Bad log', { statusCode: 401 });

    if (!user) {
      throw new ApiError('User not found', { statusCode: 404 });
    }

    const token = createJwt(user.id);

    req.headers.authorization = token;
    res.status(200).json(token);
  },

  async register(req, res) {
    const { email, password } = req.body;
    const userFound = await userDatamapper.findByEmail(email);
    if (userFound) res.status(409).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await userDatamapper.insert({
      ...req.body,
      password: encryptedPassword,
    });

    const returnedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      token: createJwt(user.id),
    };

    res.status(201).json(returnedUser);
  },
};
