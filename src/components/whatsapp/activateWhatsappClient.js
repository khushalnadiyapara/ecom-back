const Joi = require('joi');
const Schema = require('@/config/validationSchema');
const Whatsapp = require('@/service/whatsapp');

exports.validationSchema = {
  params: Joi.object({
    whatsapp_id: Schema.uuid().required(),
  }),
};

exports.controller = async (req, res, next) => {
  try {
    const { whatsapp_id } = req.params;

    Whatsapp.activateClient(whatsapp_id);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
