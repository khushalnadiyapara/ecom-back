const Joi = require('joi');
const Schema = require('@/config/validationSchema');
const ServerError = require('@/utils/serverError');

exports.validationSchema = {
  params: Joi.object({
    id: Schema.uuid().required(),
  }),
  body: Joi.object({
    category_id: Schema.uuid().optional(),
    sub_category_id: Joi.alternatives().try(Schema.uuid(), Joi.valid(null, '')).optional(),
    name: Schema.name().optional(),
    description: Schema.description().allow('', null).optional(),
    base_price: Joi.number().min(0).max(1e12).allow(null).optional(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { id } = req.params;
  const {
    category_id, sub_category_id, name, description, base_price,
  } = req.body;

  const hasBasePriceKey = Object.prototype.hasOwnProperty.call(req.body, 'base_price');
  const hasSubKey = Object.prototype.hasOwnProperty.call(req.body, 'sub_category_id');


  await db.queryOne(
    `
      UPDATE products
      SET
        category_id = COALESCE($1, category_id),
        name = COALESCE($2, name),
        description = COALESCE(NULLIF($3, ''), description),
        base_price = CASE WHEN $4::boolean THEN $5::numeric ELSE base_price END,
        sub_category_id = CASE WHEN $6::boolean THEN $7::uuid ELSE sub_category_id END,
        updated_by = $8,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING *
    `,
    [
      category_id,
      name !== undefined ? name.trim() : null,
      description,
      hasBasePriceKey,
      hasBasePriceKey ? base_price : null,
      hasSubKey,
      hasSubKey ? sub_category_id : null,
      req.user?.id || null,
      id,
    ],
  );

  res.status(204).end();
};
