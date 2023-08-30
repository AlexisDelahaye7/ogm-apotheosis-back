import Joi from 'joi';

export default Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
});
