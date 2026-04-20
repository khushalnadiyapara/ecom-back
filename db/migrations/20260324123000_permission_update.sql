-- migrate:up
WITH permission_seed(name, description) AS (
    VALUES
        ('users.read', 'Read users'),
        ('users.create', 'Create users'),
        ('users.update', 'Update users'),
        ('users.delete', 'Delete users'),

        ('roles.read', 'Read roles'),
        ('roles.create', 'Create roles'),
        ('roles.update', 'Update roles'),
        ('roles.delete', 'Delete roles'),

        ('categories.read', 'Read categories'),
        ('categories.create', 'Create categories'),
        ('categories.update', 'Update categories'),
        ('categories.delete', 'Delete categories'),

        ('sub_categories.read', 'Read sub categories'),
        ('sub_categories.create', 'Create sub categories'),
        ('sub_categories.update', 'Update sub categories'),
        ('sub_categories.delete', 'Delete sub categories'),

        ('products.read', 'Read products'),
        ('products.create', 'Create products'),
        ('products.update', 'Update products'),
        ('products.delete', 'Delete products'),

        ('product_images.read', 'Read product images'),
        ('product_images.create', 'Create product images'),
        ('product_images.update', 'Update product images'),
        ('product_images.delete', 'Delete product images'),

        ('specifications.read', 'Read specifications'),
        ('specifications.create', 'Create specifications'),
        ('specifications.update', 'Update specifications'),
        ('specifications.delete', 'Delete specifications'),

        ('category_specifications.read', 'Read category specifications'),
        ('category_specifications.create', 'Create category specifications'),
        ('category_specifications.update', 'Update category specifications'),
        ('category_specifications.delete', 'Delete category specifications'),

        ('product_specifications.read', 'Read product specifications'),
        ('product_specifications.create', 'Create product specifications'),
        ('product_specifications.update', 'Update product specifications'),
        ('product_specifications.delete', 'Delete product specifications'),

        ('product_variants.read', 'Read product variants'),
        ('product_variants.create', 'Create product variants'),
        ('product_variants.update', 'Update product variants'),
        ('product_variants.delete', 'Delete product variants'),

        ('variant_specifications.read', 'Read variant specifications'),
        ('variant_specifications.create', 'Create variant specifications'),
        ('variant_specifications.update', 'Update variant specifications'),
        ('variant_specifications.delete', 'Delete variant specifications'),

        ('inventory.read', 'Read inventory'),
        ('inventory.create', 'Create inventory'),
        ('inventory.update', 'Update inventory'),
        ('inventory.delete', 'Delete inventory'),

        ('inventory_transactions.read', 'Read inventory transactions'),
        ('inventory_transactions.create', 'Create inventory transactions'),
        ('inventory_transactions.update', 'Update inventory transactions'),
        ('inventory_transactions.delete', 'Delete inventory transactions'),

        ('carts.read', 'Read carts'),
        ('carts.create', 'Create carts'),
        ('carts.update', 'Update carts'),
        ('carts.delete', 'Delete carts'),

        ('cart_items.read', 'Read cart items'),
        ('cart_items.create', 'Create cart items'),
        ('cart_items.update', 'Update cart items'),
        ('cart_items.delete', 'Delete cart items'),

        ('orders.read', 'Read orders'),
        ('orders.create', 'Create orders'),
        ('orders.update', 'Update orders'),
        ('orders.delete', 'Delete orders'),

        ('order_items.read', 'Read order items'),
        ('order_items.create', 'Create order items'),
        ('order_items.update', 'Update order items'),
        ('order_items.delete', 'Delete order items'),

        ('order_status_history.read', 'Read order status history'),
        ('order_status_history.create', 'Create order status history'),
        ('order_status_history.update', 'Update order status history'),
        ('order_status_history.delete', 'Delete order status history'),

        ('reviews.read', 'Read reviews'),
        ('reviews.create', 'Create reviews'),
        ('reviews.update', 'Update reviews'),
        ('reviews.delete', 'Delete reviews'),

        ('wishlists.read', 'Read wishlists'),
        ('wishlists.create', 'Create wishlists'),
        ('wishlists.update', 'Update wishlists'),
        ('wishlists.delete', 'Delete wishlists'),

        ('wishlist_items.read', 'Read wishlist items'),
        ('wishlist_items.create', 'Create wishlist items'),
        ('wishlist_items.update', 'Update wishlist items'),
        ('wishlist_items.delete', 'Delete wishlist items'),

        ('coupons.read', 'Read coupons'),
        ('coupons.create', 'Create coupons'),
        ('coupons.update', 'Update coupons'),
        ('coupons.delete', 'Delete coupons'),

        ('audit_logs.read', 'Read audit logs'),
        ('audit_logs.create', 'Create audit logs'),
        ('audit_logs.update', 'Update audit logs'),
        ('audit_logs.delete', 'Delete audit logs'),

        ('settings.read', 'Read settings'),
        ('settings.create', 'Create settings'),
        ('settings.update', 'Update settings'),
        ('settings.delete', 'Delete settings'),

        ('category_discounts.read', 'Read category discounts'),
        ('category_discounts.create', 'Create category discounts'),
        ('category_discounts.update', 'Update category discounts'),
        ('category_discounts.delete', 'Delete category discounts'),

        ('product_discounts.read', 'Read product discounts'),
        ('product_discounts.create', 'Create product discounts'),
        ('product_discounts.update', 'Update product discounts'),
        ('product_discounts.delete', 'Delete product discounts'),

        ('countries.read', 'Read countries'),
        ('countries.create', 'Create countries'),
        ('countries.update', 'Update countries'),
        ('countries.delete', 'Delete countries'),

        ('states.read', 'Read states'),
        ('states.create', 'Create states'),
        ('states.update', 'Update states'),
        ('states.delete', 'Delete states'),

        ('cities.read', 'Read cities'),
        ('cities.create', 'Create cities'),
        ('cities.update', 'Update cities'),
        ('cities.delete', 'Delete cities'),

        ('addresses.read', 'Read addresses'),
        ('addresses.create', 'Create addresses'),
        ('addresses.update', 'Update addresses'),
        ('addresses.delete', 'Delete addresses')
)
INSERT INTO permissions (name, description)
SELECT name, description
FROM permission_seed
ON CONFLICT (name) DO UPDATE
SET description = EXCLUDED.description,
    updated_at = CURRENT_TIMESTAMP;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
JOIN permissions p ON 1 = 1
WHERE r.name = 'admin'
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- migrate:down
WITH permission_seed(name) AS (
    VALUES
        ('users.read'), ('users.create'), ('users.update'), ('users.delete'),
        ('roles.read'), ('roles.create'), ('roles.update'), ('roles.delete'),
        ('categories.read'), ('categories.create'), ('categories.update'), ('categories.delete'),
        ('sub_categories.read'), ('sub_categories.create'), ('sub_categories.update'), ('sub_categories.delete'),
        ('products.read'), ('products.create'), ('products.update'), ('products.delete'),
        ('product_images.read'), ('product_images.create'), ('product_images.update'), ('product_images.delete'),
        ('specifications.read'), ('specifications.create'), ('specifications.update'), ('specifications.delete'),
        ('category_specifications.read'), ('category_specifications.create'), ('category_specifications.update'), ('category_specifications.delete'),
        ('product_specifications.read'), ('product_specifications.create'), ('product_specifications.update'), ('product_specifications.delete'),
        ('product_variants.read'), ('product_variants.create'), ('product_variants.update'), ('product_variants.delete'),
        ('variant_specifications.read'), ('variant_specifications.create'), ('variant_specifications.update'), ('variant_specifications.delete'),
        ('inventory.read'), ('inventory.create'), ('inventory.update'), ('inventory.delete'),
        ('inventory_transactions.read'), ('inventory_transactions.create'), ('inventory_transactions.update'), ('inventory_transactions.delete'),
        ('carts.read'), ('carts.create'), ('carts.update'), ('carts.delete'),
        ('cart_items.read'), ('cart_items.create'), ('cart_items.update'), ('cart_items.delete'),
        ('orders.read'), ('orders.create'), ('orders.update'), ('orders.delete'),
        ('order_items.read'), ('order_items.create'), ('order_items.update'), ('order_items.delete'),
        ('order_status_history.read'), ('order_status_history.create'), ('order_status_history.update'), ('order_status_history.delete'),
        ('reviews.read'), ('reviews.create'), ('reviews.update'), ('reviews.delete'),
        ('wishlists.read'), ('wishlists.create'), ('wishlists.update'), ('wishlists.delete'),
        ('wishlist_items.read'), ('wishlist_items.create'), ('wishlist_items.update'), ('wishlist_items.delete'),
        ('coupons.read'), ('coupons.create'), ('coupons.update'), ('coupons.delete'),
        ('audit_logs.read'), ('audit_logs.create'), ('audit_logs.update'), ('audit_logs.delete'),
        ('settings.read'), ('settings.create'), ('settings.update'), ('settings.delete'),
        ('category_discounts.read'), ('category_discounts.create'), ('category_discounts.update'), ('category_discounts.delete'),
        ('product_discounts.read'), ('product_discounts.create'), ('product_discounts.update'), ('product_discounts.delete'),
        ('countries.read'), ('countries.create'), ('countries.update'), ('countries.delete'),
        ('states.read'), ('states.create'), ('states.update'), ('states.delete'),
        ('cities.read'), ('cities.create'), ('cities.update'), ('cities.delete'),
        ('addresses.read'), ('addresses.create'), ('addresses.update'), ('addresses.delete')
)
DELETE FROM role_permissions rp
USING permissions p, permission_seed s
WHERE rp.permission_id = p.id
  AND p.name = s.name;

WITH permission_seed(name) AS (
    VALUES
        ('users.read'), ('users.create'), ('users.update'), ('users.delete'),
        ('roles.read'), ('roles.create'), ('roles.update'), ('roles.delete'),
        ('categories.read'), ('categories.create'), ('categories.update'), ('categories.delete'),
        ('sub_categories.read'), ('sub_categories.create'), ('sub_categories.update'), ('sub_categories.delete'),
        ('products.read'), ('products.create'), ('products.update'), ('products.delete'),
        ('product_images.read'), ('product_images.create'), ('product_images.update'), ('product_images.delete'),
        ('specifications.read'), ('specifications.create'), ('specifications.update'), ('specifications.delete'),
        ('category_specifications.read'), ('category_specifications.create'), ('category_specifications.update'), ('category_specifications.delete'),
        ('product_specifications.read'), ('product_specifications.create'), ('product_specifications.update'), ('product_specifications.delete'),
        ('product_variants.read'), ('product_variants.create'), ('product_variants.update'), ('product_variants.delete'),
        ('variant_specifications.read'), ('variant_specifications.create'), ('variant_specifications.update'), ('variant_specifications.delete'),
        ('inventory.read'), ('inventory.create'), ('inventory.update'), ('inventory.delete'),
        ('inventory_transactions.read'), ('inventory_transactions.create'), ('inventory_transactions.update'), ('inventory_transactions.delete'),
        ('carts.read'), ('carts.create'), ('carts.update'), ('carts.delete'),
        ('cart_items.read'), ('cart_items.create'), ('cart_items.update'), ('cart_items.delete'),
        ('orders.read'), ('orders.create'), ('orders.update'), ('orders.delete'),
        ('order_items.read'), ('order_items.create'), ('order_items.update'), ('order_items.delete'),
        ('order_status_history.read'), ('order_status_history.create'), ('order_status_history.update'), ('order_status_history.delete'),
        ('reviews.read'), ('reviews.create'), ('reviews.update'), ('reviews.delete'),
        ('wishlists.read'), ('wishlists.create'), ('wishlists.update'), ('wishlists.delete'),
        ('wishlist_items.read'), ('wishlist_items.create'), ('wishlist_items.update'), ('wishlist_items.delete'),
        ('coupons.read'), ('coupons.create'), ('coupons.update'), ('coupons.delete'),
        ('audit_logs.read'), ('audit_logs.create'), ('audit_logs.update'), ('audit_logs.delete'),
        ('settings.read'), ('settings.create'), ('settings.update'), ('settings.delete'),
        ('category_discounts.read'), ('category_discounts.create'), ('category_discounts.update'), ('category_discounts.delete'),
        ('product_discounts.read'), ('product_discounts.create'), ('product_discounts.update'), ('product_discounts.delete'),
        ('countries.read'), ('countries.create'), ('countries.update'), ('countries.delete'),
        ('states.read'), ('states.create'), ('states.update'), ('states.delete'),
        ('cities.read'), ('cities.create'), ('cities.update'), ('cities.delete'),
        ('addresses.read'), ('addresses.create'), ('addresses.update'), ('addresses.delete')
)
DELETE FROM permissions p
USING permission_seed s
WHERE p.name = s.name;
