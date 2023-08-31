import logger from '../helpers/logger.js';
import roleDatamapper from '../models/role.datamapper.js';

import scenarioDatamapper from '../models/scenario.datamapper.js';

export default async function checkIfAuthor(req, res, next) {
  const userRole = await roleDatamapper.findRoleByUserPk(req.user.id);
  const result = await scenarioDatamapper.findByPk(req.params.id);
  req.user.auth_level = userRole.auth_level;

  if (req.user.auth_level < 3 && req.user.id !== result.author_id) return res.status(401).json({ message: 'Unauthorized' });

  // ! sinon, next(new ApiError('Unauthorized', { statusCode: 401 }));

  return next();
}
