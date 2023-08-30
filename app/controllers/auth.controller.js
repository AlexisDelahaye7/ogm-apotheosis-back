import bcrypt from 'bcrypt';
import userDatamapper from '../models/user.datamapper.js';
import { ApiError } from '../middlewares/error.middleware.js';

import createJwt from '../helpers/jwt.sign.js';

export default {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await userDatamapper.findByEmail(email);

    if (!user) {
      throw new ApiError('Incorrect mail or password', { statusCode: 404 });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError('Incorrect mail or password', { statusCode: 404 });
    }
    // statusCode 404 because user doesn't need too much infos

    const token = createJwt(user.id);

    req.headers.authorization = token;
    return res.status(200).json(token);
  },

  async register(req, res) {
    const { username, email, password } = req.body;

    const userFound = await userDatamapper.findByEmail(email);
    if (userFound) {
      throw new ApiError('Email already taken', { statusCode: 409 });
    }

    const userFound2 = await userDatamapper.findByUsername(username);
    if (userFound2) {
      throw new ApiError('Username already taken', { statusCode: 409 });
    }

    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await userDatamapper.insert({
      username,
      email,
      password: encryptedPassword,
      role_id: 1,
    });

    const returnedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      token: createJwt(user.id),
    };

    return res.status(201).json(returnedUser);
  },

  async getCurrent(req, res) {
    const user = await userDatamapper.findByPk(req.user.id);
    if (!user) {
      throw new ApiError('User not found', { statusCode: 404 });
    }
    const cleanUser = { id: user.id };
    return res.json(cleanUser);
  },
};
