const Joi = require('joi');

const _config = require('../../config');

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .lowercase()
  .trim()
  .required();
const firstname = Joi.string().min(3).max(128).trim().required();
const lastname = Joi.string().min(3).max(128).trim().required();
const phone = Joi.string()
  .length(13)
  .pattern(/^[0-9]+$/)
  .trim();
const password = Joi.string()
  .min(8)
  .max(_config.passwordLength, 'utf8')
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .message(
    '"{#label}" must contain one uppercase, one lowercase letter and one digit'
  )
  .required();
const passwordConfirmation = Joi.valid(Joi.ref('password')).required();
const registerSchema = Joi.object({
  email,
  firstname,
  lastname,
  phone,
  password,
  passwordConfirmation,
});

const loginSchema = Joi.object({
  email,
  password,
});

module.exports = {
  registerSchema,
  loginSchema,
};
