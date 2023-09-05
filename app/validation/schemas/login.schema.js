import Joi from 'joi';

export default Joi.object({
  email: Joi.string().email().pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).required(),
  password: Joi.string().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%#*?&])[^\s]{8,}$/) // Minimum eight characters, at least one letter, one number and one special character
    .required(),
});
