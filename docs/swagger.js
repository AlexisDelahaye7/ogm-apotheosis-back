import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    titre: 'Mon API',
    description: 'Description',
  },
  hôte: 'localhost:3000',
  schémas: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app/routers/index.router.js'];

/* REMARQUE : si vous utilisez le routeur express, vous devez transmettre dans les
   'endpointsFiles' uniquement le fichier racine où commence la route,
   tel que index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
