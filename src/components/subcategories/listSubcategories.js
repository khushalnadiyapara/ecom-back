const Joi = require('joi');
const Schema = require('@/config/validationSchema');

exports.validationSchema = {
  query: Joi.object({
    search: Schema.search(),
    category_id: Schema.uuid().optional(),
    offset: Schema.pagination.offset(),
    limit: Schema.pagination.limit(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const {
    offset, limit, search, category_id,
  } = req.customQuery || {};

  const conditions = [];
  const namedParams = { limit, offset };

  if (search) {
    conditions.push('s.name ILIKE $search');
    namedParams.search = `%${search}%`;
  }

  if (category_id) {
    conditions.push('s.category_id = $category_id');
    namedParams.category_id = category_id;
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const query = `
    SELECT
      s.*,
      c.name AS category_name
    FROM sub_categories s
    LEFT JOIN categories c ON c.id = s.category_id
    ${whereClause}
    ORDER BY s.created_at DESC
    LIMIT $limit OFFSET $offset
  `;

  const subcategories = await db.namedQueryAll(query, namedParams);
  res.status(200).json(subcategories);
};

