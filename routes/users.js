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
    .query(`SELECT *
    FROM orders
    JOIN orders_menu_items ON orders.id = orders_menu_items.id
    JOIN menu_items ON orders_menu_items.menu_item_id = menu_items.id
    ;`
    )
    .then((result) => {
      return res.json(result.rows);
    })
  });

  return router;
  }
