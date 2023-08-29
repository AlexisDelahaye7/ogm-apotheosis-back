import userDatamapper from '../models/user.datamapper.js';
import roleDatamapper from '../models/role.datamapper.js';
import { ApiError } from '../middlewares/error.middleware.js';
import logger from '../helpers/logger.js';

// TODO : add data validation

export default {
  async getAll(req, res) {
    const users = await userDatamapper.findAll();

    const cleanUsers = users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
    }));
    return res.json(cleanUsers);
  },

  async getOne(req, res) {
    const result = await userDatamapper.findByPk(req.params.id);

    if (!result) {
      throw new ApiError('User not found', { statusCode: 404 });
    }
    const cleanUser = {
      id: result.id,
      username: result.username,
      email: result.email,
    };
    return res.json(cleanUser);
  },

  async updateOne(req, res, next) {
    try {
      const user = await userDatamapper.update(req.params.id, req.body);
      if (!user) {
        throw new ApiError('User not found', { statusCode: 404 });
      }
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  },

  async deleteOne(req, res, next) {
    try {
      const user = await userDatamapper.delete(req.params.id);
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  },

  async getCurrent(req, res, next) {
    try {
      const user = await userDatamapper.findByPk(req.user.id);
      if (!user) {
        throw new ApiError('User not found', { statusCode: 404 });
      }
      const cleanUser = { id: user.id };
      return res.json(cleanUser);
    } catch (err) {
      return next(err);
    }
  },

  async getAuthLevel(req, res, next) {
    try {
      const userRole = await roleDatamapper.findRoleByUserPk(req.params.id);
      if (!userRole) { throw new ApiError('User not found', { statusCode: 404 }); }
      return res.json(userRole.auth_level);
    } catch (err) {
      return next(err);
    }
  },
};
