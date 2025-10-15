require('module-alias/register');
const http = require('http');
const vars = require('@/config/var');
const app = require('@/app');
const Logger = require('@/service/logger');
const Socket = require('@/service/socket');
const Whatsapp = require('@/service/whatsapp');

const { port, env } = vars;

const server = http.createServer(app);
const io = Socket.listen(server);

Whatsapp.initialize(io);

Logger.info(`ENV : ${env}`);

server.listen(port, () => {
  Logger.info(`Server PORT : ${port}`);
});

module.exports = app;
