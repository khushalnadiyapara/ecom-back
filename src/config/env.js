const Joi = require('joi');
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '../../.env'),
  override: true,
});

const env = {
  env: process.env.NODE_ENV || 'local',
  port: process.env.SERVER_PORT || 3007,
  serviceName: process.env.SERVICE_NAME || 'pem',
  jwtSecret: process.env.JWT_SECRET,

  // Database
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbDatabase: process.env.DB_NAME,
  email: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASS,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,

  // Log levels
  consoleLogLevel: process.env.CONSOLE_LOG_LEVEL || 'info',
  fileLogLevel: process.env.FILE_LOG_LEVEL || 'false',

  // Whatsapp
  whatsappService: process.env.WHATSAPP_SERVICE || 'false',

  // Chrome
  chromeExecutablePath: process.env.CHROME_EXECUTABLE_PATH,
};

// Define validation for all the env vars
const envSchema = Joi.object({
  env: Joi.string().required().valid('local', 'dev', 'stage', 'prod'),
  port: Joi.number().required().min(0).max(65535),
  serviceName: Joi.string().required().min(3).max(255),
  jwtSecret: Joi.string().required().min(3).max(1024),

  // Database
  dbHost: Joi.string().required().min(3).max(255),
  dbPort: Joi.number().required().min(1024).max(65535),
  dbUser: Joi.string().required().min(1).max(255),
  dbPassword: Joi.string().allow(''),
  dbDatabase: Joi.string().required().min(3).max(255),
  email: Joi.string().email().required(),
  emailPassword: Joi.string().required(),
  smtpHost: Joi.string().required(),
  smtpPort: Joi.number().required(),

  // Log levels
  consoleLogLevel: Joi.string()
    .required()
    .valid(
      'false',
      'error',
      'warn',
      'info',
      'http',
      'verbose',
      'debug',
      'silly',
    ),
  fileLogLevel: Joi.string()
    .required()
    .valid(
      'false',
      'error',
      'warn',
      'info',
      'http',
      'verbose',
      'debug',
      'silly',
    ),

  // Whatsapp
  whatsappService: Joi.boolean().required(),

  // Chrome
  chromeExecutablePath: Joi.string().max(500).allow(''),
});

// Validate env vars
const { error, value } = envSchema.validate(env);

// Throw an error if env vars are not valid
if (error) throw new Error(`ENV validation error: ${error.message}`);

module.exports = value;
