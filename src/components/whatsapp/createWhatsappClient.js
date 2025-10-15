const Joi = require('joi');
const Schema = require('@/config/validationSchema');
const Whatsapp = require('@/service/whatsapp');

exports.validationSchema = {
  body: Joi.object({
    name: Schema.name().required(),
  }),
};

exports.controller = async (req, res, next) => {
  try {
    const { name } = req.body;

    const whatsapp = Whatsapp.createClient(name);

    res.status(200).json(whatsapp);
  } catch (error) {
    next(error);
  }
};
