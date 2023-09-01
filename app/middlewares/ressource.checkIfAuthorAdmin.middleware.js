import ressourceDatamapper from '../models/ressource.datamapper.js';
import roleDatamapper from '../models/role.datamapper.js';
import scenarioDatamapper from '../models/scenario.datamapper.js';

import { ApiError } from './error.middleware.js';

export default async function checkIfAuthor(req, res, next) {
  try {
    const userRole = await roleDatamapper.findRoleByUserPk(req.user.id);

    const ressource = await ressourceDatamapper.findByPk(req.params.id);
    const scenario = await scenarioDatamapper.findByPk(ressource.scenario_id);

    req.user.auth_level = userRole.auth_level;

    if (req.user.auth_level < 3 && req.user.id !== scenario.author_id) throw new ApiError('Unauthorized', { statusCode: 401 });

    return next();
  } catch (err) {
    return next(err);
  }
}
