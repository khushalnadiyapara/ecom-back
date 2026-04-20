const Joi = require('joi');
const Schema = require('@/config/validationSchema');
const ServerError = require('@/utils/serverError');

exports.validationSchema = {
  params: Joi.object({
    id: Schema.uuid().required(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { id } = req.params;

  const deleted = await db.query('DELETE FROM sub_categories WHERE id = $1', [id]);
  if(!deleted) {
    throw new ServerError('NOT_FOUND', 'Subcategory not found');
  }
  res.status(204).end();
};

