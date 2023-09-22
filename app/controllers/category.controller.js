import categoryDatamapper from '../models/category.datamapper.js';
import { ApiError } from '../middlewares/error.middleware.js';

export default {
  async getAll(req, res) {
    const categories = await categoryDatamapper.findAll();
    return res.json(categories);
  },

  async getOne(req, res) {
    const category = await categoryDatamapper.findByPk(req.params.id);

    if (!category) {
      throw new ApiError('Category not found', { statusCode: 404 });
    }
    return res.json(category);
  },

  async createOne(req, res) {
    const foundCategory = await categoryDatamapper.findByName(req.body.name);
    if (foundCategory) throw new ApiError('Category already exists', { statusCode: 409 });

    const category = await categoryDatamapper.insert(req.body);
    return res.json(category);
  },

  async updateOne(req, res) {
    req.body.updated_at = new Date();
    const category = await categoryDatamapper.update(req.params.id, req.body);

    if (!category) {
      throw new ApiError('Category not found', { statusCode: 404 });
    }

    return res.json(category);
  },

  async deleteOne(req, res) {
    const category = await categoryDatamapper.delete(req.params.id);

    if (!category) {
      throw new ApiError('Category not found', { statusCode: 404 });
    }

    return res.json(category);
  },
};
