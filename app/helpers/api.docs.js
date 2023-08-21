import * as url from 'url';
import expressJSDocSwagger from 'express-jsdoc-swagger';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

const options = {
  info: {
    version: '0.0.1',
    title: 'OGM API',
    description: 'API for OGM',
  },
  baseDir: dirname,
  filesPattern: ['../routers/**/*.js', '../errors/*.js', '../models/*.js'],
  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE ?? '/api-docs',
  exposeApiDocs: true,
  apiDocsPath: '/api/docs',
};
/**
 * Swagger middleware factory
 * @param {object} app Express application
 * @returns Express JSDoc Swagger middleware that creates web documentation
 */

export default (app) => expressJSDocSwagger(app)(options);
