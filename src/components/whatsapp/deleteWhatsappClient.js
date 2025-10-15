const Joi = require('joi');
const Schema = require('@/config/validationSchema');
const Whatsapp = require('@/service/whatsapp');

exports.validationSchema = {
  params: Joi.object({
    whatsapp_id: Schema.uuid().required(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { whatsapp_id } = req.params;

  Whatsapp.deleteClient(whatsapp_id);
  await db.query('update stores set whatsapp_id = null where whatsapp_id = $1', [whatsapp_id]);

  res.status(204).end();

};
