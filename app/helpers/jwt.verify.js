export default function verifyJwt(token) {
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    return decoded;
  });
}
