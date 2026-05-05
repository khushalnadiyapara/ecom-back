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

  // Ops alert emails (route failures, uncaught errors)
  alertEmailEnabled: process.env.ALERT_EMAIL_ENABLED === "true",
  alertEmailTo: process.env.ALERT_EMAIL_TO || "",
  alertRateLimitMs: parseInt(process.env.ALERT_RATE_LIMIT_MS, 10) || 60000,
  alertIncludeStack: process.env.ALERT_INCLUDE_STACK === "true",

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

  alertEmailEnabled: Joi.boolean().default(false),
  alertEmailTo: Joi.string().allow("").default(""),
  alertRateLimitMs: Joi.number().integer().min(0).max(86400000).default(60000),
  alertIncludeStack: Joi.boolean().default(false),

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

if (value.alertEmailEnabled) {
  const recipients = value.alertEmailTo
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (recipients.length === 0) {
    throw new Error(
      "ALERT_EMAIL_TO is required (comma-separated) when ALERT_EMAIL_ENABLED=true"
    );
  }
  for (const addr of recipients) {
    const { error: emailErr } = Joi.string().email().validate(addr);
    if (emailErr) {
      throw new Error(`ALERT_EMAIL_TO invalid address: ${addr}`);
    }
  }
}

module.exports = value;
