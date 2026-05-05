# Server Crash & PM2 Alert Implementation

This document details all the changes made to implement automated PM2 server restarts and email alerts (including SSH credentials) whenever the Node.js application crashes or encounters a 5xx error.

## 1. Environment Configurations

### `.env`
Added configurations for the alerting system and SSH access details:
```env
# Ops alerts
ALERT_EMAIL_ENABLED=true
ALERT_EMAIL_TO=k.k.nadiyapara3107@gmail.com
ALERT_RATE_LIMIT_MS=60000
ALERT_INCLUDE_STACK=false
```

### `src/config/env.js`
Added validation for the new alert and SSH environment variables using Joi.
```javascript
// ... existing config
  alertEmailEnabled: process.env.ALERT_EMAIL_ENABLED,
  alertEmailTo: process.env.ALERT_EMAIL_TO ,
  alertRateLimitMs: parseInt(process.env.ALERT_RATE_LIMIT_MS, 10) || 60000,
  alertIncludeStack: process.env.ALERT_INCLUDE_STACK,
// ...
```

### `src/config/var.js`
Wired the validated variables into the exported configuration object.
```javascript
  alerts: {
    enabled: env.alertEmailEnabled,
    to: env.alertEmailTo
      ? env.alertEmailTo.split(",").map((s) => s.trim()).filter(Boolean)
      : [],
    rateLimitMs: env.alertRateLimitMs,
    includeStack: env.alertIncludeStack,
  },
```

---

## 2. Mail & Alert Services

### `src/service/mail/transport.js`
Updated the transporter configuration to use `Vars.email.smtpPort` and determine secure status based on the port number.

### `src/service/mail/alertOps.js`
Created the `alertOps` file to send API route failures, process crashes, and server restart alerts. Integrated PM2 and SSH detection into the restart email.
```javascript
// New function added for PM2 server restarts
async function sendServerRestart() {
  const { alerts } = Vars;
  if (!alerts.enabled || !alerts.to.length) return;

  const restarts = process.env.restart_time || 0;
  const isPM2 = typeof process.env.pm_id !== 'undefined';

  const service = Vars.loggerOptions?.appName || 'api';
  const subject = `[${Vars.env}][${service}] PM2 App Restarted`.slice(0, 250);
  const html = `
    <h2>Application Started / Restarted</h2>
    <p><strong>Environment:</strong> ${escapeHtml(Vars.env)}</p>
    <p><strong>Time:</strong> ${new Date().toISOString()}</p>
    ${isPM2 ? `<p><strong>PM2 Restart Count:</strong> ${restarts}</p>` : '<p>Started without PM2.</p>'}
    <p>The Node.js server process has successfully booted up and is listening for connections.</p>
  `;

  // sends email...
}
```

---

## 3. Application Execution & Error Hooks

### `src/middleware/errorHandler.js`
Shortened the logic and implemented `process.exit(1)` directly after triggering the alert email. Exiting the process forces PM2 to execute an automatic restart.
```javascript
const triggerCrash = (req, err, statusCode) => {
  if (Vars.alerts.enabled && statusCode >= 500) {
    void alertOps.sendRouteFailure(req, err, { statusCode }).finally(() => {
      setTimeout(() => process.exit(1), 500); // Trigger PM2 restart
    });
  }
};
// Applied triggerCrash to all 5xx responses...
```

### `src/index.js`
Bound `sendServerRestart` to the successful `server.listen` event, and added `process.exit(1)` to all major process exceptions.
```javascript
const alertOps = require('@/service/mail/alertOps');

process.on('uncaughtException', (err) => {
  Logger.error('uncaughtException', { message: err.message, stack: err.stack });
  void alertOps.sendProcessFailure('uncaughtException', err).finally(() => process.exit(1));
});

process.on('unhandledRejection', (reason) => {
  const err = reason instanceof Error ? reason : new Error(String(reason));
  Logger.error('unhandledRejection', { message: err.message, stack: err.stack });
  void alertOps.sendProcessFailure('unhandledRejection', err).finally(() => process.exit(1));
});

server.listen(port, () => {
  Logger.info(`Server PORT : ${port}`);
  void alertOps.sendServerRestart(); // Emails ops upon PM2 boot
});
```

## 4. PM2 Configuration

### `ecosystem.config.js`
Set up the `ecosystem.config.js` file to handle PM2 instances with `autorestart: true` tracking.
```javascript
module.exports = {
  apps: [
    {
      name: "ems-backend",
      script: "src/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: { NODE_ENV: "development" },
      env_production: { NODE_ENV: "production" },
    },
  ],
};
```
