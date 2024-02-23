import * as Joi from 'joi';

export const ConfigSchema = Joi.object().keys({
  NODE_ENV: Joi.string().valid('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
