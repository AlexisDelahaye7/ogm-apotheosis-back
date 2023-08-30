import Joi from 'joi';

export default Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  age: Joi.number().required(),
  duration: Joi.number().required(),
  nb_players: Joi.number().required(),
  category_id: Joi.number().required(),
  author_id: Joi.number().required(),
  is_verified: Joi.boolean().required(),
});
