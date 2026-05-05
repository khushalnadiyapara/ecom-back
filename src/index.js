require('module-alias/register');
const http = require('http');
const vars = require('@/config/var');
const app = require('@/app');
const Logger = require('@/service/logger');
const Socket = require('@/service/socket');

const { port, env } = vars;
const alertOps = require('@/service/mail/alertOps');

process.on('uncaughtException', (err) => {
  Logger.error('uncaughtException', { message: err.message, stack: err.stack });
  void alertOps.sendProcessFailure('uncaughtException', err).finally(() => {
    process.exit(1);
  });
});

process.on('unhandledRejection', (reason) => {
  const err = reason instanceof Error ? reason : new Error(String(reason));
  Logger.error('unhandledRejection', { message: err.message, stack: err.stack });
  void alertOps.sendProcessFailure('unhandledRejection', err);
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
