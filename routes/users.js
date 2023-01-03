/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
module.exports = (db) => {
  router.get('/', (req, res) => {
    res.render('users');
  });

  // route to create menu items /users/createMenu
  router.get('/createMenu', (req, res) => {
    return db
    .query(
      `SELECT *
      FROM menu_items`
      )
    .then((result) => {
      return res.json(result.rows);
    })
  });

  //
  router.post('/completeOrder', (req, res) => {
    return db
    .query(
      `INSERT INTO `
    )
    console.log("complete order then push to DB")
  });

  router.get('/generateOrders', (req, res) => {
    return db
    .query(`SELECT * FROM orders;`)
    .then((result) => {
      console.log("++++", result.rows);
      const orders = result.rows;

      return db.query(`SELECT *
      FROM orders_menu_items
      JOIN menu_items ON orders_menu_items.menu_item_id = menu_items.id;`)
      .then((result2) => {
        console.log("----", result2.rows);
        orders.forEach(order => {
          order.items = getItems(order.id, result2.rows);
        });

        console.log("After orders...", orders);


        return res.json(orders);

      })
    })
  });

  const getItems = (orderId, items) => {
    const result = [];
    for (const item of items) {
      if (item.order_id === orderId) {
        result.push(item);
      }
    }

    return result;
  }

  return router;
  }
