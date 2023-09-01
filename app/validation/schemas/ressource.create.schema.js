import Joi from 'joi';

export default Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().required(),
  scenario_id: Joi.number().required(),
  url: Joi.string().required(),
});
