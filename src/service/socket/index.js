const { Server } = require('socket.io');
const Logger = require('@/service/logger');
const initHandlers = require('./initHandlers');

let socketIo = null;

module.exports = {

  get io() { return socketIo; },

  getSocketIo: () => socketIo,

  listen: (server) => {

    const io = new Server(server, {
      transports: ['websocket'],
      cors: { origin: true, credentials: true },
    });

    socketIo = io;

    // io.engine.use(privateRoute);

    io.on('connection', (socket) => {
      initHandlers(io, socket);
    });

    io.on('disconnect', (socket) => {
      Logger.info(`User disconnected: ${socket.id}`);
    });

    return io;
  },
};
