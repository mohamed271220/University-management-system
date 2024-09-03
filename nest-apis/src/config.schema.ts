import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PWD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  STAGE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
