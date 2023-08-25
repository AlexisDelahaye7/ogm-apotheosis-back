import jwt from 'jsonwebtoken';

function jwtGuard(req, res, next) {
  const idToken = req.headers.authorization;

  jwt.verify(idToken, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.userToken = decoded;
    next();
  });
}

export default jwtGuard;
