import scenarioDatamapper from '../models/scenario.datamapper.js';
import { ApiError } from '../middlewares/error.middleware.js';

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
};
