const Joi = require('joi');
const Schema = require('@/config/validationSchema');
const ServerError = require('@/utils/serverError');

exports.validationSchema = {
  body: Joi.object({
    category_id: Schema.uuid().required(),
    name: Schema.name().required(),
    description: Schema.description().allow('', null).optional(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { category_id, name, description } = req.body;

  const created = await db.queryOne(
    `
      INSERT INTO sub_categories (category_id, name, description, created_by, updated_by)
      VALUES ($1, $2, $3, $4, $4)
      RETURNING *
    `,
    [category_id, name.trim(), description || null, req.user?.id || null],
  );

  res.status(201).json(created);
};

