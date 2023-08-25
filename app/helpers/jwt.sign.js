import jwt from 'jsonwebtoken';

export default function createJwt(userId) {
  const token = jwt.sign({ id: userId }, process.env.PRIVATE_KEY);
  return token;
}
