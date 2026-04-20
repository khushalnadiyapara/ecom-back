const Joi = require('joi');
// const Vars = require('./var');
const Constants = require('./constant');

module.exports = {
  uuid: () => Joi.string().guid({ version: 'uuidv4' }),

  gender: () => Joi.string().valid('male', 'female'),
  phoneNumber: () => Joi.string().min(10).max(10),
  email: () => Joi.string().email(),
  month: () => Joi.number().min(0).max(11),
  year: () => Joi.number().integer().min(2000).max(3000),
  password: () => Joi.string().min(5).max(30),
  name: () => Joi.string().trim().max(200),
  token: () => Joi.string(),
  description: () => Joi.string().max(1000),
  search: () => Joi.string().allow('', null).default(''),

  address: () => Joi.string().min(5).max(250),
  remark: () => Joi.string().max(500),
  info: () => Joi.string().max(500).allow(''),
  file: () => Joi.object(),

  fileName: () => Joi.string()
    .pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.[a-zA-Z0-9]+$/)
    .message('Invalid file name format. Must be UUID followed by file extension'),

  barcode: () => Joi.string().length(6).pattern(/^[0-9]+$/).message('Barcode must contain only digits'),

  pagination: {
    offset: () => Joi.number().min(0).default(0),
    limit: () => Joi.number().min(1).max(100)
      .default(30),
  },

  product: {
    code: () => Joi.string().pattern(/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/).min(1).max(50),
  },

  transaction: {
    amount: () => Joi.number().min(0).max(10000000000),
    type: () => Joi.string().valid('credit', 'debit'),
    method: () => Joi.string().valid('cash', 'online', 'cheque', 'bank'),
    category: () => Joi.string().valid('rent', 'lightBill', 'penalty', 'other', 'adjustment'),
  },

  user: {
    permissions: () => Joi.array()
      .items(Joi.string().valid(...Constants.user.permissions))
      .unique(),
  },

};
