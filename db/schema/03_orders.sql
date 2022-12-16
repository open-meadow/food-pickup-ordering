DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users ON DELETE CASCADE,
  menu_item_id INTEGER REFERENCES menu_items ON DELETE CASCADE,
  price INTEGER NOT NULL, -- price in cents, will be SUM(menu_items.price) in most/all cases
  user_notes VARCHAR(255),
  tip INTEGER,            -- in cents
  tax INTEGER NOT NULL,   -- in cents
  updated TIMESTAMP,      -- make it automatic?
  created TIMESTAMP,
  completed TIMESTAMP
)