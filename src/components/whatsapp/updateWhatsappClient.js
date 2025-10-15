const Joi = require('joi');
const Schema = require('@/config/validationSchema');
const Whatsapp = require('@/service/whatsapp');

exports.validationSchema = {
  params: Joi.object({
    whatsapp_id: Schema.uuid().required(),
  }),
  body: Joi.object({
    name: Schema.name().required(),
  }),
};

exports.controller = async (req, res, next) => {
  const { whatsapp_id } = req.params;
  const { name } = req.body;

  Whatsapp.updateClient(whatsapp_id, name);

  res.status(204).send();
};
