DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users ON DELETE CASCADE,
  total_cost INTEGER NOT NULL, -- price in cents, will be SUM(menu_items.price) in most/all cases
  user_notes VARCHAR(255),
  fees INTEGER NOT NULL,  -- in cents
  tax INTEGER NOT NULL,   -- in cents
  created TIMESTAMP,
  required_time TIMESTAMP,      -- make it automatic?
  completed BOOLEAN
)
