import verifyJwt from '../helpers/jwt.verify.js';
import logger from '../helpers/logger.js';
import userDatamapper from '../models/user.datamapper.js';

async function getUserToken(req, res, next) {
  try {
    // pas de token
    if (!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });
    const decodedToken = verifyJwt(req.headers.authorization);
    // token invalide
    if (!decodedToken) return res.status(401).json({ message: 'Unauthorized' });

    req.user = decodedToken;

    // ! Selon plusieurs tuteurs, on ne doit pas décoder le token en front
    // A la demande du front, on ajoute les infos de l'utilisateur dans le payload du token
    /*
    const user = await userDatamapper.findByPk(req.user.id);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    req.user.username = user.username;
    req.user.email = user.email;
    */

    next();
  } catch (err) {
    logger.error(err);
    res.status(401).json({ message: 'Unauthorized' });
  }
}

export default getUserToken;
