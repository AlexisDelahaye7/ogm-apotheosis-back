import userDatamapper from '../models/user.datamapper.js';
import { ApiError } from '../middlewares/error.middleware.js';

// TODO : add data validation

export default {
  async getAll(req, res) {
    const users = await userDatamapper.findAll();
    return res.json(users);
  },

  async getOne(req, res) {
    const user = await userDatamapper.findByPk(req.params.id);

    if (!user) {
      throw new ApiError('User not found', { statusCode: 404 });
    }
    return res.json(user);
  },

  async createOne(req, res) {
    const user = await userDatamapper.insert(req.body);
    return res.json(user);
  },

  async updateOne(req, res) {
    const user = await userDatamapper.update(req.params.id, req.body);
    return res.json(user);
  },

  async deleteOne(req, res) {
    const user = await userDatamapper.delete(req.params.id);
    return res.json(user);
  },
};
