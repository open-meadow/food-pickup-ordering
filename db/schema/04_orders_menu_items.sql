DROP TABLE IF EXISTS orders_menu_items.sql CASCADE;

CREATE TABLE orders_menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id  INT NOT NULL REFERENCES orders ON DELETE CASCADE,
  menu_item_id INT NOT NULL REFERENCES menu_items ON DELETE CASCADE,
  quantity INT NOT NULL
)