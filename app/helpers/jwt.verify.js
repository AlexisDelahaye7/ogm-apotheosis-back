import jwt from 'jsonwebtoken';
import { el } from '@faker-js/faker';
import logger from './logger.js';

/**
 * Verify a JWT
 * @param {string} token
 * @returns {boolean|object} false if invalid, decoded token if valid
 */

export default function verifyJwt(bearerToken) {
  try {
    const token = bearerToken.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    return decoded;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      logger.warn('Token expired', err);
      return false;
    }
    logger.error(err);
    return false;
  }
}
