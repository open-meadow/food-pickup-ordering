DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS menuitems CASCADE;
DROP TABLE IF EXISTS orders CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
)

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL  -- price in cents
)

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users ON DELETE CASCADE,
  menu_item_id INTEGER REFERENCES menu_items ON DELETE CASCADE,
  price INTEGER NOT NULL, -- price in cents, will be SUM(menu_items.price) in most/all cases
  user_notes VARCHAR(255)
  tip INTEGER,            -- in cents
  tax INTEGER NOT NULL,   -- in cents
  updated TIMESTAMP,      -- make it automatic?
  created TIMESTAMP,
  completed TIMESTAMP
)

-- 1. users: id, name
-- 2.  menu: id,  name, price
-- 3. order: id, price, tip ( ? )