const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const Client = require('./whatsapp.client.class');
const ServerError = require('@/utils/serverError');
const Vars = require('@/config/var');

const constant = require('@/config/constant');

let whatsappClients = [];
let socketIo = null;

const createNewWhatsappClient = (name) => {
  if (!name) throw new Error('Name is required');
  if (!socketIo) throw new Error('Socket.io is not initialized');

  const id = uuidv4();
  const client = new Client(id, name);
  whatsappClients.push(client);
  return client.getMeta();
};

const initialize = (io) => {
  if (!Vars.whatsapp.service) return;
  socketIo = io;

  const existingClients = fs.readdirSync(constant.whatsappCachePath)
    .filter((file) => fs.statSync(path.join(constant.whatsappCachePath, file)).isDirectory());

  // whatsappClients = existingClients.map((clientId) => {
  //   const client = new Client(clientId);
  //   if (client.status === 'active') client.activate(io);
  //   return client;
  // });
};

const listClients = () => {

  const result = whatsappClients.map((client) => client.getMeta());
  return result;
};

const getClient = (id) => whatsappClients.find((client) => client.id === id)?.getMeta();

const deleteClient = (id) => {
  const client = whatsappClients.find((c) => c.id === id);
  if (!client) throw new ServerError('NOT_FOUND', 'Whatsapp Client not found');
  client.delete();
  whatsappClients = whatsappClients.filter((c) => c.id !== id);
};

function activateClient(id) {
  const client = whatsappClients.find((c) => c.id === id);
  if (!client) throw new ServerError('NOT_FOUND', 'Whatsapp Client not found');
  client.activate(socketIo);
}

const isValidWhatsappId = (id) => whatsappClients.some((c) => c.id === id);

const getClientConnection = (id) => {
  const client = whatsappClients.find((c) => c.id === id);
  if (!client) throw new ServerError('NOT_FOUND', 'Whatsapp Client not found');
  return client.connection;
};

const updateClient = (id, name) => {
  const client = whatsappClients.find((c) => c.id === id);
  if (!client) throw new ServerError('NOT_FOUND', 'Whatsapp Client not found');
  client.updateMeta({ name });
};

module.exports = {
  createClient: createNewWhatsappClient,
  initialize,
  listClients,
  getClient,
  deleteClient,
  activateClient,
  isValidWhatsappId,
  getClientConnection,
  updateClient,
  isEnabled: Vars.whatsapp.service,
};
