import verifyJwt from '../helpers/jwt.verify.js';
import { ApiError } from './error.middleware.js';

function getUserToken(req, res, next) {
  try {
    // pas de token
    if (!req.headers.authorization) throw new ApiError('Unauthorized', { statusCode: 401 });
    const decodedToken = verifyJwt(req.headers.authorization);
    // token invalide
    if (!decodedToken) throw new ApiError('Unauthorized', { statusCode: 401 });

    req.user = decodedToken;

    return next();
  } catch (err) {
    return next(err);
  }
}

export default getUserToken;
