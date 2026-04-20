const Joi = require('joi');
const Schema = require('@/config/validationSchema');

exports.validationSchema = {
  query: Joi.object({
    search: Schema.search(),
    offset: Schema.pagination.offset(),
    limit: Schema.pagination.limit(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const { offset, limit, search } = req.customQuery || {};

  const conditions = [];
  const namedParams = { limit, offset };

  if (search) {
    conditions.push('name ILIKE $search');
    namedParams.search = `%${search}%`;
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const query = `
    SELECT *
    FROM categories
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT $limit OFFSET $offset
  `;

  const categories = await db.namedQueryAll(query, namedParams);

  res.status(200).json(categories);
};

