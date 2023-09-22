import Joi from 'joi';

export default Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  type: Joi.string(),
  scenario_id: Joi.number(),
  url: Joi.string(),
});
