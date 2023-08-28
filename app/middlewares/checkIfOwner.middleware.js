import logger from '../helpers/logger.js';
import findRoleByUserPk from '../models/role.datamapper.js';

export default async function checkIfOwner(req, res, next) {
  if (req.user.id !== Number(req.params.id)) return res.status(401).json({ message: 'Unauthorized' });

  // ! sinon, next(new ApiError('Unauthorized', { statusCode: 401 }));

  next();
}
