const path = require('path');
const fs = require('fs');
const errorCodes = require('./errorCode');

const fileStoragePath = path.join(__dirname, '../../files');
const whatsappCachePath = path.join(__dirname, '../../whatsapp_cache');
const tmpStoragePath = path.join(__dirname, '../../tmp');

if (!fs.existsSync(fileStoragePath)) fs.mkdirSync(fileStoragePath);
if (!fs.existsSync(whatsappCachePath)) fs.mkdirSync(whatsappCachePath);
if (!fs.existsSync(tmpStoragePath)) fs.mkdirSync(tmpStoragePath);

module.exports = {
  fileStoragePath,
  whatsappCachePath,
  tmpStoragePath,

  user: {
    token: {
      expiryInSeconds: 86400,
    },
    permissions: [
      'product.read',
      'product.create',
      'product.update',
      'inventory.read',
      'inventory.create',
      'inventory.update',
      'inventory.delete',
      'party.read',
      'party.create',
      'party.update',
      'transaction.read',
      'transaction.create',
      'transaction.update',
      'transaction.delete',
      'store.account',
      'note.create',
      'note.read',
      'note.update',
      'note.delete',
      'reminder.create',
      'reminder.read',
      'reminder.update',
      'reminder.delete',
      'stockTransfer.create',
      'stockTransfer.read',
      'stockTransfer.update',
      'stockTransfer.delete',
      'productConversion.create',
      'productConversion.read',
      'productConversion.update',
      'productConversion.delete',
      'store.profile',
      'employee.read',
      'employee.create',
      'employee.update',
      'employee.delete',

      // other permissions
      'purchasePrice.read',
      'product.schema.read',
      'product.schema.create',
      'product.schema.update',
      'product.schema.delete',
    ],
  },

  errorCodes,

};
