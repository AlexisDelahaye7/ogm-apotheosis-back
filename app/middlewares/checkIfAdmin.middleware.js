import logger from '../helpers/logger.js';
import findRoleByUserPk from '../models/role.datamapper.js';

export default async function checkIfAdmin(req, res, next) {
  const userRole = await findRoleByUserPk(req.user.id);
  req.user.auth_level = userRole.auth_level;

  if (req.user.auth_level < 3) return res.status(401).json({ message: 'Unauthorized' });

  // ! next(new ApiError('Unauthorized', { statusCode: 401 }));

  next();
}
