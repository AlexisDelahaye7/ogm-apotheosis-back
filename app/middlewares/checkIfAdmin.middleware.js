import logger from '../helpers/logger.js';

export default function (req, _, next) {
  // récupérer le payload du token req.userToken
  // vérifier si l'utilisateur est admin
  // si oui, next()
  // sinon, next(new ApiError('Unauthorized', { statusCode: 401 }));
  console.log(req.userToken.payload);
  next();
}
