const Joi = require('joi');
const Schema = require('@/config/validationSchema');
const ServerError = require('@/utils/serverError');

exports.validationSchema = {
  body: Joi.object({
    category_id: Schema.uuid().required(),
    sub_category_id: Joi.alternatives().try(Schema.uuid(), Joi.valid(null, '')).optional(),
    name: Schema.name().required(),
    description: Schema.description().allow('', null).optional(),
    base_price: Joi.number().min(0).max(1e12).allow(null).optional(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const {
    category_id, sub_category_id, name, description, base_price,
  } = req.body;

  const categoryExists = await db.queryOne('SELECT id FROM categories WHERE id = $1', [category_id]);
  if (!categoryExists) {
    throw new ServerError('NOT_FOUND', 'Category not found');
  }

  const subId = sub_category_id && String(sub_category_id).trim() !== '' ? sub_category_id : null;
  if (subId) {
    const sub = await db.queryOne('SELECT id, category_id FROM sub_categories WHERE id = $1', [subId]);
    if (!sub) {
      throw new ServerError('NOT_FOUND', 'Sub category not found');
    }
    if (sub.category_id !== category_id) {
      throw new ServerError('INVALID_DATA', 'Sub category does not belong to selected category');
    }
  }

  const created = await db.queryOne(
    `
      INSERT INTO products (
        category_id,
        sub_category_id,
        name,
        description,
        base_price,
        created_by,
        updated_by
      )
      VALUES ($1, $2, $3, $4, $5, $6, $6)
      RETURNING *
    `,
    [
      category_id,
      subId,
      name.trim(),
      description || null,
      base_price === undefined || base_price === null ? null : base_price,
      req.user?.id || null,
    ],
  );

  res.status(201).json(created);
};
