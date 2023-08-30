import Joi from 'joi';

export default Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  age: Joi.number(),
  duration: Joi.number(),
  nb_players: Joi.number(),
  category_id: Joi.number(),
  author_id: Joi.number(),
});
