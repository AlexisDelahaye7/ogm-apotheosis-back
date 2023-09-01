import roleDatamapper from '../models/role.datamapper.js';
import { ApiError } from './error.middleware.js';

import scenarioDatamapper from '../models/scenario.datamapper.js';

export default async function checkIfAuthor(req, res, next) {
  try {
    const userRole = await roleDatamapper.findRoleByUserPk(req.user.id);
    const result = await scenarioDatamapper.findByPk(req.params.id);
    req.user.auth_level = userRole.auth_level;

    if (req.user.auth_level < 3 && req.user.id !== result.author_id) throw new ApiError('Unauthorized', { statusCode: 401 });

    return next();
  } catch (err) {
    return next();
  }
}
