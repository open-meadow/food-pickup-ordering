/*
 * All routes for Users are defined here * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { sendClientText, sendRestoText } = require("../db/queries/twilio.js")

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

  // Complete order, insert to DB the following: users, orders, order menu items
  router.post('/complete_order', (req, res) => {  
    return db
    .query(`
    INSERT INTO USERS (name, phone)
    VALUES ($1, $2)
    RETURNING ID
    `,
    [`${req.body.name}`, `${req.body.phone}`])
    .then((result) => {
      insertOrders(req, result)
      .then((result) => { 
        insertOrdersMenuItems(req, result);
      });
    });
  });
// DB query to insert order to orders
  const insertOrders = function (req, result) {
    const created = new Date();
    const required_time = created;
    const queryParams = [
      result.rows[0].id, 
      req.body.totals["totalCost"], 
      req.body.totals["fees"], 
      req.body.totals["taxes"], 
      created, 
      required_time, 
      false
    ];
    
    return db
    .query(`
    INSERT INTO orders (user_id, total_cost, fees, tax, created, required_time, completed)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id;
    `, queryParams)
  };
// DB query to insert all menu items for a order to orders_menu_items
  const insertOrdersMenuItems = function(req, result) {
    let orderID = result.rows[0].id;
    let cart = req.body.cart;
    let menuItemId;
    let quantity = 0;
    let lateQuery = `INSERT INTO orders_menu_items (order_id, menu_item_id, quantity) VALUES `
    // Create the query string
    for (let menuitem in cart) {
      menuItemId = menuitem.split('_')[2];
      quantity = cart[menuitem];
      lateQuery += `(${orderID}, ${menuItemId}, ${quantity}),`
    }
    lateQuery = lateQuery.slice(0, lateQuery.length - 1);
    lateQuery += `;`
    // Insert query string into DB orders_menu_items table and send SMS
    return db
    .query(lateQuery)
      .then((result) => {
        sendRestoText(orderID);
      })
      .catch((err) => {
        console.log("DB write error:", err);
      })
  };
// Generate all orders information
  router.get('/generateOrders', (req, res) => {
    return db
      .query(`SELECT * FROM orders;`)
      .then((result) => {
        const orders = result.rows;

        return db.query(`SELECT *
      FROM orders_menu_items
      JOIN menu_items ON orders_menu_items.menu_item_id = menu_items.id;`)
          .then((result2) => {
            orders.forEach(order => {
              order.items = getItems(order.id, result2.rows);
            });
            return res.json(orders);
          })
      })
  });

  router.post('/addTime', (req, res) => {
    // increase timer required_time
    const order_id = req.body["order_id"];
    let additionalTime = req.body["extra-time"];
    additionalTime = additionalTime * 60000;

    return db
      .query(`
      SELECT * FROM orders
      JOIN users ON orders.user_id = users.id
      WHERE orders.id = $1;
    `,[order_id])
    .then((result) => {
      // calculate new time
      const reqTime = new Date().getTime();
      const newTime = new Date(reqTime + additionalTime);
      const queryParams = [newTime, order_id]
      let phoneNumber = Number(result.rows[0].phone);
      // console.log("result.rows", result.rows[0].phone);

      return db
      .query(`UPDATE orders
          SET required_time = $1
          WHERE id = $2
          RETURNING *;`, queryParams)
      .then((result) => {
        // sendClientText(`${phoneNumber}`, `${req.body["extra-time"]}`);
        return res.redirect('/restaurant');
      })
    })
    .catch((err) => {
      console.log("no required-time yet")
      console.log("why are you running right now?");
    })
  });

  router.post('/updateComplete', (req, res) => {
    console.log("updateComplete req.body", req.body);
    let order_id = req.body.order_id;

    return db
    .query(`
      UPDATE orders
      SET completed = $1
      WHERE id = $2
      RETURNING *;
    `, [true, order_id])
    .then((result) => {
      return res.redirect('/restaurant');
    })
  })

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
};
