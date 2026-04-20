const Joi = require('joi');
const Schema = require('@/config/validationSchema');
const ServerError = require('@/utils/serverError');

exports.validationSchema = {
  params: Joi.object({
    id: Schema.uuid().required(),
  }),
  body: Joi.object({
    category_id: Schema.uuid().optional(),
    name: Schema.name().optional(),
    description: Schema.description().allow('', null).optional(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { id } = req.params;
  const { category_id, name, description } = req.body;

  const updated = await db.query(
    `
      UPDATE sub_categories
      SET
        category_id = $1,
        name = $2,
        description = $3,
        updated_by = $4,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `,
    [category_id, name, description , req.user?.id || null, id],
  );
  if(!updated) {
    throw new ServerError('NOT_FOUND', 'Subcategory not found');
  }

  res.status(204).end();
};

