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

  const existing = await db.queryOne('SELECT id FROM products WHERE id = $1', [id]);
  if (!existing) {
    throw new ServerError('NOT_FOUND', 'Product not found');
  }

  const usage = await db.queryOne(
    `
      SELECT
        (SELECT COUNT(*)::int FROM product_variants WHERE product_id = $1) AS variants,
        (SELECT COUNT(*)::int FROM product_specifications WHERE product_id = $1) AS specs,
        (SELECT COUNT(*)::int FROM inventory WHERE product_id = $1) AS inventory_rows,
        (SELECT COUNT(*)::int FROM inventory_transactions WHERE product_id = $1) AS inventory_tx,
        (SELECT COUNT(*)::int FROM cart_items WHERE product_id = $1) AS cart_items,
        (SELECT COUNT(*)::int FROM order_items WHERE product_id = $1) AS order_items,
        (SELECT COUNT(*)::int FROM reviews WHERE product_id = $1) AS reviews,
        (SELECT COUNT(*)::int FROM wishlist_items WHERE product_id = $1) AS wishlist_items
    `,
    [id],
  );

  const blocked = Object.entries(usage || {}).some(([, count]) => (count || 0) > 0);
  if (blocked) {
    throw new ServerError('ERROR', 'Cannot delete product that has variants, specifications, inventory, orders, or cart references');
  }

  await db.query('DELETE FROM products WHERE id = $1', [id]);
  res.status(204).end();
};
