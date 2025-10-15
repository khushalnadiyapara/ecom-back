const Logger = require('@/service/logger');

/**
 *
 * @param {object} client
 * @param {object} client.connection
 * @param {object} client.id
 * @param {object} client.info
 * @param {object} io
 */
module.exports = (client, io) => {
  const handleDisconnect = (reason) => {
    Logger.error(`WhatsApp disconnected: ${reason}`);
    try {
      if (client.connection) {
        client.deactivate();
      }
      io.emit('whatsapp-disconnected', client.id);
    } catch (error) {
      Logger.error(`Error during WhatsApp disconnect cleanup: ${error.message}`);
    }
  };

  client.connection.on('ready', () => {
    Logger.info('WhatsApp client ready');
    client.updateMeta({ status: 'active' });
    io.emit('whatsapp-ready', {
      id: client.id,
      name: client.name,
      status: client.status,
      info: client.connection.info,
    });
  });

  client.connection.on('message', (message) => {
    Logger.info(`Message received from store ${client.id}: ${message.body}`);
    Logger.info(`phone number from store ${client.id}: ${message.from}`);
  });

  client.connection.on('qr', (qr) => {
    Logger.info(`WhatsApp QR received: ${qr}`);
    client.updateMeta({ status: 'inactive', info: null });
    io.emit('whatsapp-qr', { id: client.id, qr });
  });

  client.connection.on('authenticated', () => {
    Logger.info('WhatsApp authenticated');
    client.updateMeta({ status: 'inactive', info: null });
    io.emit('whatsapp-authenticated', client.id);
  });

  client.connection.on('auth_failure', () => {
    handleDisconnect('Auth failure');
  });

  client.connection.on('disconnected', (reason) => {
    handleDisconnect(reason);
  });
};
