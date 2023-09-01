import verifyJwt from '../helpers/jwt.verify.js';
import logger from '../helpers/logger.js';

function getUserToken(req, res, next) {
  try {
    // pas de token
    if (!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });
    const decodedToken = verifyJwt(req.headers.authorization);
    // token invalide
    if (!decodedToken) return res.status(401).json({ message: 'Unauthorized' });

    req.user = decodedToken;

    return next();
  } catch (err) {
    logger.error(err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export default getUserToken;
