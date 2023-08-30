import scenarioDatamapper from '../models/scenario.datamapper.js';
import { ApiError } from '../middlewares/error.middleware.js';

export default {
  async getAll(req, res) {
    const scenarios = await scenarioDatamapper.findAll();
    return res.json(scenarios);
  },

  async getOne(req, res) {
    const scenario = await scenarioDatamapper.findByPk(req.params.id);

    if (!scenario) {
      throw new ApiError('Scenario not found', { statusCode: 404 });
    }
    return res.json(scenario);
  },

  async createOne(req, res) {
    const foundScenario = await scenarioDatamapper.findByName(req.body.name);
    if (foundScenario) throw new ApiError('Scenario already exists', { statusCode: 409 });

    const scenario = await scenarioDatamapper.insert(req.body);
    return res.json(scenario);
  },

  async updateOne(req, res) {
    req.body.updated_at = new Date();
    const scenario = await scenarioDatamapper.update(req.params.id, req.body);

    if (!scenario) {
      throw new ApiError('Scenario not found', { statusCode: 404 });
    }

    return res.json(scenario);
  },

  async deleteOne(req, res) {
    const scenario = await scenarioDatamapper.delete(req.params.id);

    if (!scenario) {
      throw new ApiError('Scenario not found', { statusCode: 404 });
    }

    return res.json(scenario);
  },
};
