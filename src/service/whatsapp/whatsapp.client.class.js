/* eslint-disable func-names */
const path = require('path');
const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');
const constant = require('@/config/constant');
const Vars = require('@/config/var');
const initHandlers = require('./initHandlers');

function WhatsappClient(id, name) {
  if (!id) throw new Error('Client id is required');

  this.id = id;
  if (name) this.name = name;
  this.status = 'inactive';
  this.info = null;
  this.connection = null;
  this.cachePath = path.join(constant.whatsappCachePath, this.id);
  this.metaFilePath = path.join(this.cachePath, 'meta.json');

  if (!fs.existsSync(this.cachePath)) fs.mkdirSync(this.cachePath, { recursive: true });
  if (!fs.existsSync(this.metaFilePath)) {
    if (!name) throw new Error('Client name is required');
    fs.writeFileSync(this.metaFilePath, JSON.stringify({ id, name, status: 'inactive', info: null }));
  }

  if (fs.existsSync(this.metaFilePath)) {
    const meta = JSON.parse(fs.readFileSync(this.metaFilePath, 'utf8'));
    this.id = meta.id;
    this.name = meta.name;
    this.status = meta.status;
    this.info = meta.info;
  }
}

WhatsappClient.prototype.getInfo = function () {
  const metaFilePath = path.join(constant.whatsappCachePath, this.id, 'meta.json');
  const fileData = fs.readFileSync(metaFilePath, 'utf8');
  try {
    return JSON.parse(fileData);
  } catch (error) {
    return null;
  }
};

WhatsappClient.prototype.updateMeta = function (newMeta = {}) {

  if (newMeta.status) this.status = newMeta.status;
  if (newMeta.info) this.info = newMeta.info;
  if (newMeta.name) this.name = newMeta.name;
  if (newMeta.id) this.id = newMeta.id;

  const metaToWrite = {
    id: this.id,
    name: this.name,
    status: this.status,
    info: this.info,
    ...newMeta,
  };

  fs.writeFileSync(this.metaFilePath, JSON.stringify(metaToWrite));
};

WhatsappClient.prototype.getMeta = function () {
  return {
    id: this.id,
    name: this.name,
    status: this.status,
    info: this.info,
  };
};

WhatsappClient.prototype.setInfo = function (info) {
  this.updateMeta({ info });
};

WhatsappClient.prototype.activate = function (io) {

  try {

    const whatsappOptions = {
      qrMaxRetries: 4,
      puppeteer: {
        // headless: false,
      },
      authStrategy: new LocalAuth({
        dataPath: this.cachePath,
      }),
    };

    if (Vars.chrome.executablePath) {
      whatsappOptions.puppeteer.executablePath = Vars.chrome.executablePath;
      whatsappOptions.puppeteer.args = ['--no-sandbox', '--disable-setuid-sandbox'];
    }

    this.connection = new Client(whatsappOptions);

    this.connection.initialize().catch((err) => { console.log(err); });

    initHandlers(this, io);
  } catch (error) {
    console.error('Failed to activate WhatsApp client:', error);
  }
};

WhatsappClient.prototype.deactivate = function () {
  if (this.status === 'active') this.connection.destroy();
  this.updateMeta({ status: 'inactive', info: null });
  this.connection = null;
};

WhatsappClient.prototype.delete = function () {
  this.deactivate();
  fs.rmSync(this.cachePath, { recursive: true, force: true });
};

module.exports = WhatsappClient;
