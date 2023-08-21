/**
 * @typedef {Object} ApiError
 * @property {string} message - Message d'erreur
 * @property {string} name - Error name
 * @property {Object} infos - Additional informations
 */

export default class ApiError extends Error {
  constructor(message, infos) {
    super(message);
    this.name = 'ApiError';
    this.infos = infos;
  }
}
