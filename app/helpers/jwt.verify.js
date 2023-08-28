import jwt from 'jsonwebtoken';
import logger from './logger.js';

/**
 * Verify a JWT
 * @param {string} token
 * @returns {boolean|object} false if invalid, decoded token if valid
 */

export default function verifyJwt(token) {
  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY).replace('BEarer ', '');
    return decoded;
  } catch (err) {
    logger.error(err);
    return false;
  }
}
