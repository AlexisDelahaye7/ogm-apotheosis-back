import logger from '../helpers/logger.js';
import scenarioDatamapper from '../models/scenario.datamapper.js';

export default async function checkIfAuthor(req, res, next) {
  console.log('GOOD');
  const scenario = await scenarioDatamapper.findById(req.params.id);

  console.log(scenario);

  if (req.user.id !== Number(scenario.author_id)) return res.status(401).json({ message: 'Unauthorized' });

  // ! sinon, next(new ApiError('Unauthorized', { statusCode: 401 }));

  next();
}
