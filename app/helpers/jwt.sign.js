import jwt from 'jsonwebtoken';

/**
 * Generate a JWT
 * @param {number} userId
 * @returns {string} Json Web Token
 */

export default function createJwt(userId) {
  const token = `Bearer ${jwt.sign({ id: userId }, process.env.PRIVATE_KEY)}`;
  return token;
}
