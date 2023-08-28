import scenarioDatamapper from '../models/scenario.datamapper.js';
import { ApiError } from '../middlewares/error.middleware.js';
import logger from '../helpers/logger.js';

export default {
  async getAll(req, res) {
    const scenarios = await scenarioDatamapper.findAll();
    return res.json(scenarios);
  },

  async getOne(req, res) {
    const scenario = await scenarioDatamapper.findById(req.params.id);

    if (!scenario) {
      throw new ApiError('Scenario not found', { statusCode: 404 });
    }
    return res.json(scenario);
  },

  async createOne(req, res) {
    const scenario = await scenarioDatamapper.insert(req.body);
    return res.json(scenario);
  },

  async updateOne(req, res) {
    try {
      const scenario = await scenarioDatamapper.update(req.params.id, req.body);

      if (!scenario) {
        throw new ApiError('Scenario not found', { statusCode: 404 });
      }

      return res.json(scenario);
    } catch (error) {
      logger.error(error);
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  },

  async deleteOne(req, res) {
    const scenario = await scenarioDatamapper.delete(req.params.id);
    return res.json(scenario);
  },
};
