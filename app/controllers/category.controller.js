import categoryDatamapper from '../models/category.datamapper.js';
import { ApiError } from '../middlewares/error.middleware.js';

export default {
  async getAll(req, res) {
    const categories = await categoryDatamapper.findAll();
    return res.json(categories);
  },
};
