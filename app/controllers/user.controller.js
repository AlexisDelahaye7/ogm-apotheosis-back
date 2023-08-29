import userDatamapper from '../models/user.datamapper.js';
import roleDatamapper from '../models/role.datamapper.js';
import { ApiError } from '../middlewares/error.middleware.js';
import logger from '../helpers/logger.js';

// TODO : add data validation

export default {
  async getAll(req, res) {
    const users = await userDatamapper.findAll();
    return res.json(users);
  },

  async getOne(req, res) {
    const result = await userDatamapper.findByPk(req.params.id);

    if (!result[0]) {
      throw new ApiError('User not found', { statusCode: 404 });
    }
    return res.json(result[0]);
  },

  async createOne(req, res) {
    const user = await userDatamapper.insert(req.body);
    return res.json(user);
  },

  async updateOne(req, res) {
    try {
      console.log('TEST');
      const user = await userDatamapper.update(req.params.id, req.body);

      if (!user) {
        throw new ApiError('User not found', { statusCode: 404 });
      }

      return res.json(user);
    } catch (error) {
      logger.error(error);
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  },

  async deleteOne(req, res) {
    const user = await userDatamapper.delete(req.params.id);
    return res.json(user);
  },

  async getCurrent(req, res) {
    const user = await userDatamapper.findByPk(req.user.id);

    if (!user) {
      throw new ApiError('User not found', { statusCode: 404 });
    }
    return res.json(user);
  },

  async getAuthLevel(req, res) {
    const userRole = await roleDatamapper.findRoleByUserPk(req.params.id);
    return res.json(userRole.auth_level);
  },
};
