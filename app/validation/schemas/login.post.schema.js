import Joi from 'joi';

export default Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/) // Minimum eight characters, at least one letter, one number and one special character
    .required(),
});
