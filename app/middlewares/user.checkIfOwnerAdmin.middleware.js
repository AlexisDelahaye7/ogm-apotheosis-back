import roleDatamapper from '../models/role.datamapper.js';
import { ApiError } from './error.middleware.js';

export default async function checkIfOwner(req, res, next) {
  try {
    const userRole = await roleDatamapper.findRoleByUserPk(req.user.id);
    req.user.auth_level = userRole.auth_level;

    if (req.user.auth_level < 3 && req.user.id !== Number(req.params.id)) throw new ApiError('Unauthorized', { statusCode: 401 });

    return next();
  } catch (err) {
    return next(err);
  }
}
