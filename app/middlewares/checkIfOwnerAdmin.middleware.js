import logger from '../helpers/logger.js';
import findRoleByUserPk from '../models/role.datamapper.js';

export default async function checkIfOwner(req, res, next) {
  const userRole = await findRoleByUserPk(req.user.id);
  req.user.auth_level = userRole.auth_level;

  if (req.user.auth_level < 3 && req.user.id !== Number(req.params.id)) return res.status(401).json({ message: 'Unauthorized' });

  // ! sinon, next(new ApiError('Unauthorized', { statusCode: 401 }));

  next();
}
