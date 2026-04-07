import Joi from 'joi';

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export const signUpSchema = Joi.object({
  email: Joi.string().email().max(100).required(),
  fullname: Joi.string().trim().max(100).required(),
  password: Joi.string().pattern(passwordPattern).required().messages({
    'string.pattern.base':
      'password must have at least 8 characters, uppercase, lowercase, number and special character',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().required(),
});
