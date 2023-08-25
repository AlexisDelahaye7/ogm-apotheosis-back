import jwt from 'jsonwebtoken';

function jwtGuard(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const idToken = req.headers.authorization;
  if (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export default jwtGuard;
