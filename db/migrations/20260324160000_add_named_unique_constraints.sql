-- migrate:up
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'users_email_key'
    ) AND NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'uq_users_email'
    ) THEN
        ALTER TABLE users RENAME CONSTRAINT users_email_key TO uq_users_email;
    END IF;
END
$$;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'coupons_code_key'
    ) AND NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'uq_coupons_code'
    ) THEN
        ALTER TABLE coupons RENAME CONSTRAINT coupons_code_key TO uq_coupons_code;
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'uq_sub_categories_category_name'
    ) THEN
        ALTER TABLE sub_categories
        ADD CONSTRAINT uq_sub_categories_category_name UNIQUE (category_id, name);
    END IF;
END
$$;

-- migrate:down
ALTER TABLE sub_categories DROP CONSTRAINT IF EXISTS uq_sub_categories_category_name;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'uq_users_email'
    ) AND NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'users_email_key'
    ) THEN
        ALTER TABLE users RENAME CONSTRAINT uq_users_email TO users_email_key;
    END IF;
END
$$;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'uq_coupons_code'
    ) AND NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'coupons_code_key'
    ) THEN
        ALTER TABLE coupons RENAME CONSTRAINT uq_coupons_code TO coupons_code_key;
    END IF;
END
$$;

