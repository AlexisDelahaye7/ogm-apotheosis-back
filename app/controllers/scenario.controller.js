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

  async getReviews(req, res) {
    const reviews = await scenarioDatamapper.findReviewsByScenarioPk(req.params.id);

    if (reviews === 0) throw new ApiError(`Reviews not found for scenario ${req.params.id}`, { statusCode: 404 });

    return res.json(reviews);
  },

  async getRessources(req, res) {
    const ressources = await scenarioDatamapper.findRessourcesByScenarioPk(req.params.id);

    if (ressources.length === 0) throw new ApiError(`Ressources not found for scenario ${req.params.id}`, { statusCode: 404 });

    return res.json(ressources);
  },

  async getItems(req, res) {
    const items = await scenarioDatamapper.findItemsByScenarioPk(req.params.id);

    if (items.length === 0) throw new ApiError(`No items found for scenario ${req.params.id}`, { statusCode: 404 });

    return res.json(items);
  },

  async getHeros(req, res) {
    const heros = await scenarioDatamapper.findHerosByScenarioPk(req.params.id);

    if (heros.length === 0) throw new ApiError(`No heros found for scenario ${req.params.id}`, { statusCode: 404 });

    return res.json(heros);
  },

  async getNpc(req, res) {
    const npc = await scenarioDatamapper.findNpcByScenarioPk(req.params.id);

    if (npc.length === 0) throw new ApiError(`No NPCs found for scenario ${req.params.id}`, { statusCode: 404 });

    return res.json(npc);
  },

};
