import ressourceDatamapper from '../datamappers/ressource.datamapper.js';
import { ApiError } from '../middlewares/error.middleware.js';

export default {
  async getAll(req, res) {
    // TODO
    // req.query.scenario_id=[ID]
    // req.query.ressource_type=[TYPE]

    const ressources = await ressourceDatamapper.findAll();
    return res.json(ressources);
  },

  async getOne(req, res) {
    const ressource = await ressourceDatamapper.findByPk(req.params.id);

    if (!ressource) {
      throw new ApiError('Ressource not found', { statusCode: 404 });
    }
    return res.json(ressource);
  },

  async createOne(req, res) {
    const ressource = await ressourceDatamapper.insert(req.body);
    return res.json(ressource);
  },

};
