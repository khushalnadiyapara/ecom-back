-- migrate:up
ALTER TABLE users
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

INSERT INTO roles (name)
VALUES ('admin')
ON CONFLICT (name) DO NOTHING;

INSERT INTO permissions (name, description)
VALUES
    ('users.create', 'Create users'),
    ('users.read', 'View users'),
    ('users.update', 'Update users'),
    ('users.delete', 'Delete users'),
    ('roles.manage', 'Manage roles and permissions'),
    ('products.create', 'Create products'),
    ('products.read', 'View products'),
    ('products.update', 'Update products'),
    ('products.delete', 'Delete products'),
    ('categories.manage', 'Manage categories'),
    ('inventory.manage', 'Manage inventory and stock transactions'),
    ('orders.manage', 'Manage all orders'),
    ('coupons.manage', 'Manage coupons and discounts'),
    ('settings.manage', 'Manage application settings')
ON CONFLICT (name) DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'admin'
ON CONFLICT (role_id, permission_id) DO NOTHING;

INSERT INTO users (name, email, password, phone_number, is_admin, role_id)
SELECT
    'admin',
    'k.k.nadiyapara3107@gmail.com',
    '$2b$10$pcK4V8mPSA1.1J.kWKtTlusAw3F5Vx1YQWh.ljHs06aAj65omHq5i',
    '9876543210',
    TRUE,
    r.id
FROM roles r
WHERE r.name = 'admin'
ON CONFLICT (email) DO UPDATE
SET
    name = EXCLUDED.name,
    phone_number = EXCLUDED.phone_number,
    is_admin = EXCLUDED.is_admin,
    role_id = EXCLUDED.role_id;


-- migrate:down
DELETE FROM users WHERE email = 'k.k.nadiyapara3107@gmail.com';
DELETE FROM role_permissions
WHERE role_id IN (SELECT id FROM roles WHERE name = 'admin');
DELETE FROM permissions
WHERE name IN (
    'users.create',
    'users.read',
    'users.update',
    'users.delete',
    'roles.manage',
    'products.create',
    'products.read',
    'products.update',
    'products.delete',
    'categories.manage',
    'inventory.manage',
    'orders.manage',
    'coupons.manage',
    'settings.manage'
);
DELETE FROM roles WHERE name = 'admin';

