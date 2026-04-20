const Joi = require('joi');
const Schema = require('@/config/validationSchema');

exports.validationSchema = {
  query: Joi.object({
    search: Schema.search(),
    category_id: Schema.uuid().optional(),
    sub_category_id: Schema.uuid().optional(),
    offset: Schema.pagination.offset(),
    limit: Schema.pagination.limit(),
  }),
};

exports.controller = async (req, res, next, db) => {
  const {
    offset, limit, search, category_id, sub_category_id,
  } = req.customQuery || {};

  const conditions = [];
  const namedParams = { limit, offset };

  if (search) {
    conditions.push('p.name ILIKE $search');
    namedParams.search = `%${search}%`;
  }

  if (category_id) {
    conditions.push('p.category_id = $category_id');
    namedParams.category_id = category_id;
  }

  if (sub_category_id) {
    conditions.push('p.sub_category_id = $sub_category_id');
    namedParams.sub_category_id = sub_category_id;
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const query = `
    SELECT
      p.*,
      c.name AS category_name,
      sc.name AS sub_category_name
    FROM products p
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN sub_categories sc ON sc.id = p.sub_category_id
    ${whereClause}
    ORDER BY p.created_at DESC
    LIMIT $limit OFFSET $offset
  `;

  const products = await db.namedQueryAll(query, namedParams);
  res.status(200).json(products);
};
