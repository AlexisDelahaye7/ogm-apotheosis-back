import verifyJwt from '../helpers/jwt.verify.js';

function getUserToken(req, res, next) {
  try {
    // pas de token
    if (!req.headers.authorization) res.status(401).json({ message: 'Unauthorized' });
    const decodedToken = verifyJwt(req.headers.authorization);
    // token invalide
    if (!decodedToken) res.status(401).json({ message: 'Unauthorized' });

    req.user = decodedToken;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'Unauthorized' });
  }
}

export default getUserToken;
