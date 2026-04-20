const Joi = require('joi');
const Schema = require('@/config/validationSchema');

exports.validationSchema = {
  params: Joi.object({
    id: Schema.uuid().required(),
  }),
  body: Joi.object({
    name: Schema.name().optional(),
    description: Schema.description().optional(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const updated = await db.queryOne(
    `
      UPDATE categories
      SET
        name = $1,
        description = $2,
        updated_by = $3,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `,
    [name, description, req.user?.id || null, id],
  );
  if(!updated) {
    throw new ServerError('NOT_FOUND', 'Category not found');
  }

  res.status(200).json(updated);
};

