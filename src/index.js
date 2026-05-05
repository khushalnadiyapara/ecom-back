require('module-alias/register');
const http = require('http');
const vars = require('@/config/var');
const app = require('@/app');
const Logger = require('@/service/logger');
const Socket = require('@/service/socket');

const { port, env } = vars;
const alertOps = require('@/service/mail/alertOps');
const { exec } = require('child_process');

const doRestart = () => {
  if (vars.pm2.restartCmd) {
    Logger.info(`Executing PM2 restart command: ${vars.pm2.restartCmd}`);
    exec(vars.pm2.restartCmd, (error) => {
      if (error) {
        Logger.error('PM2 restart failed', { error });
        process.exit(1);
      }
    });
  } else {
    process.exit(1);
  }
};

process.on('uncaughtException', (err) => {
  Logger.error('uncaughtException', { message: err.message, stack: err.stack });
  void alertOps.sendProcessFailure('uncaughtException', err).finally(doRestart);
});

process.on('unhandledRejection', (reason) => {
  const err = reason instanceof Error ? reason : new Error(String(reason));
  Logger.error('unhandledRejection', { message: err.message, stack: err.stack });
  void alertOps.sendProcessFailure('unhandledRejection', err).finally(doRestart);
});

const server = http.createServer(app);
const io = Socket.listen(server);


Logger.info(`ENV : ${env}`);

server.listen(port, () => {
  Logger.info(`Server PORT : ${port}`);
  // Notify ops that the server has started (or restarted via PM2)
  void alertOps.sendServerRestart();
});

module.exports = app;
