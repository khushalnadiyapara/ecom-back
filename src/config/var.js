const env = require('./env');

module.exports = {
  env: env.env,
  port: env.port,
  jwtSecret: env.jwtSecret,
  // masterKey: env.masterKey,

  database: {
    host: env.dbHost,
    port: env.dbPort,
    user: env.dbUser,
    password: env.dbPassword,
    database: env.dbDatabase,
  },

  loggerOptions: {
    env: env.env,
    consoleLogLevel: env.consoleLogLevel,
    fileLogLevel: env.fileLogLevel,
    appName: env.serviceName,
  },

  whatsapp: {
    service: env.whatsappService,
  },

  chrome: {
    executablePath: env.chromeExecutablePath,
  },

  email: {
    id: env.email,
    password: env.emailPassword,
    smtpHost: env.smtpHost,
    smtpPort: env.smtpPort,
  },

  alerts: {
    enabled: env.alertEmailEnabled,
    to: env.alertEmailTo
      ? env.alertEmailTo.split(",").map((s) => s.trim()).filter(Boolean)
      : [],
    rateLimitMs: env.alertRateLimitMs,
    includeStack: env.alertIncludeStack,
  },
};
