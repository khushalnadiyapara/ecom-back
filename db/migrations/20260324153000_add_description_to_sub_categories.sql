-- migrate:up
ALTER TABLE sub_categories
ADD COLUMN IF NOT EXISTS description TEXT;

-- migrate:down
ALTER TABLE sub_categories
DROP COLUMN IF EXISTS description;

