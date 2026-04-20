const Joi = require('joi');
const Schema = require('@/config/validationSchema');
const ServerError = require('@/utils/serverError');

exports.validationSchema = {
  body: Joi.object({
    name: Schema.name().required(),
    description: Schema.description().allow('', null).optional(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { name, description } = req.body;

  const existing = await db.queryOne(
    'SELECT id FROM categories WHERE LOWER(name) = LOWER($1)',
    [name],
  );

  if (existing) {
    throw new ServerError('ALREADY_EXISTS', 'Category with same name already exists');
  }

  const created = await db.queryOne(
    `
      INSERT INTO categories (name, description, created_by, updated_by)
      VALUES ($1, $2, $3, $3)
      RETURNING *
    `,
    [name.trim(), description || null, req.user?.id || null],
  );

  res.status(201).json(created);
};

