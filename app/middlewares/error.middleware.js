/* eslint-disable no-unused-vars */
/**
 * Appelé en cas de passage d'une erreur à la fonction next()
 */

import logger from '../helpers/logger.js';

// relais
export { default as ApiError } from '../errors/api.error.js';

/**
 * @param { object } err Error class
 * @param { object } res Express response object
 * @param { object } next Express next function
 * @returns { object } Express response object
 * @description Error managment middleware
 */

export const errorHandler = (err, _, res, next) => {
  const { message } = err;
  let userMessage = message;
  let statusCode = err.infos?.statusCode;

  if (!statusCode || Number.isNaN(Number.statusCode)) {
    statusCode = 500;
  }

  if (statusCode === 500 && res.app.get('env') !== 'development') {
    userMessage = 'Internal Server Error';
  }

  if (statusCode === 500) {
    logger.error(userMessage, err);
  }

  // Le client attend une page HTML : on renvoie l'erreur au format HTML
  // Le client attend du JSON : on renvoie l'erreur au format JSON

  if (res.get('Content-Type')?.includes('html')) {
    res.status(statusCode).render('error', {
      statusCode,
      message: userMessage,
      title: `Error ${statusCode}`,
    });
  } else {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message: userMessage,
      stack: res.app.get('env') === 'development' ? err.stack : {},
    });
  }
};
