import scenarioDatamapper from '../models/scenario.datamapper.js';
import { ApiError } from '../middlewares/error.middleware.js';

export default {
  async getAll(req, res, next) {
    try {
      const scenarios = await scenarioDatamapper.findAll();
      return res.json(scenarios);
    } catch (err) {
      return next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const scenario = await scenarioDatamapper.findById(req.params.id);

      if (!scenario) {
        throw new ApiError('Scenario not found', { statusCode: 404 });
      }
      return res.json(scenario);
    } catch (err) {
      return next(err);
    }
  },

  async createOne(req, res, next) {
    try {
      const scenario = await scenarioDatamapper.insert(req.body);
      return res.json(scenario);
    } catch (err) {
      return next(err);
    }
  },

  async updateOne(req, res, next) {
    try {
      const scenario = await scenarioDatamapper.update(req.params.id, req.body);

      if (!scenario) {
        throw new ApiError('Scenario not found', { statusCode: 404 });
      }

      return res.json(scenario);
    } catch (err) {
      return next(err);
    }
  },

  async deleteOne(req, res, next) {
    try {
      const scenario = await scenarioDatamapper.delete(req.params.id);
      return res.json(scenario);
    } catch (err) {
      return next(err);
    }
  },
};
