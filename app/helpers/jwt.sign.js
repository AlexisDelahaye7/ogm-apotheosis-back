import jwt from 'jsonwebtoken';

/**
 * Generate a JWT
 * @param {number} userId
 * @returns {string} Json Web Token
 */

export default function createJwt(userId) {
  const payload = { id: userId };
  const expiresInInSeconds = 86400;
  const token = jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: expiresInInSeconds });
  return token;
}
