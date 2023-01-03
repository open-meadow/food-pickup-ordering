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

 
  // router.post('/completePersonalInfo', (req, res) => {
  //   return db
  //   .query(
  //     `INSERT INTO USERS (name, phone)
  //     VALUES ($1, $2)
  //     RETURNING ID
  //     `,
  //     []
  //   )
  //   .then((result) => {
  //     console.log("ID pushed to DB")
  //   })
  // });

  // router.post('/completeOrder', (currentCart) => {
  //   return db
  //   .query(
  //     `INSERT INTO ORDERS (total_cost, fees, tax, created)
  //     VALUES ($1, $2, $3, $4)
  //     RETURNING ID
  //     `,
  //     []
  //   )
  //   .then((result) => {
  //     console.log("complete order then push to DB");
  //     orderMenuItems(res);
  //   })
  // });

  // const orderMenuItems = (orderID) => {
  //   return db
  //   .query(
  //     `INSERT INTO ORDERS_MENU_ITEMS (order_id, menu_item_id, quantity)
  //     VALUES ($1, $2, $3)
  //     `,
  //     [orderID]
  //   )
  //   console.log("complete order then push to DB")
  // };


  return router;
  }