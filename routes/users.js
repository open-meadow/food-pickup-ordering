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

const { sendClientText, sendRestoText } = require("../db/queries/twilio.js");

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

  // Currently testing
  router.post('/complete_order', (req, res) => {
    console.log(req.body);

    let name = req.body.name;
    let phone = req.body.phone;
    let cart = req.body.cart;
    let totalCost = req.body.totals["totalCost"];
    let fees = req.body.totals["fees"];
    let taxes = req.body.totals["taxes"];

    console.log("totalCost", totalCost);

    console.log("Cart", cart)

    for (menuitem in cart) {
      menuItemId = menuitem.split('_')[2]
      console.log("Menu Item ID", menuItemId);
    }

    return db
    .query(`
      INSERT INTO USERS (name, phone)
      VALUES ($1, $2)
      RETURNING ID
      `,
      [`${req.body.name}`, `${req.body.phone}`]
    )
    .then ((result) => {
      console.log("result.rows", result.rows[0]);
      const userID = result.rows[0].id;

      console.log("userID", userID);

      // initialize values to send to database
      const created = new Date();
      const required_time = created;
      const completed = false;

      const queryParams = [userID, totalCost, fees, taxes, created, required_time, completed];

      return db
      .query(`
        INSERT INTO orders (user_id, total_cost, fees, tax, created, required_time, completed)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id;
      `,
      queryParams)
      .then((result) => {
        const orderID = result.rows[0];
        const queryParams2 = [orderID, menu_item_id, quantity];

        return db
        .query(`
          INSERT INTO orders_menu_items (order_id, menu_item_id, quantity)
          VALUES ($1, $2, $3)
        `, queryParams2)
        .then((result) => {
          console.log("Successsssssss!!!!!!")
        })
        .catch((err) => {
          console.log("who cares");
        })
      })
    })
    // [req.body.cart] items
    // database.addOrderToDatabase()
    // .then(user => {
    //   if (!user) {
    //     res.send({error: "error"});
    //     return;
    //   }
    //   req.session.userId = user.id;
    //   res.send("🤗");
    // })
    // .catch(e => res.send(e));
  });

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
    // increase required_time
    const order_id = req.body["order_id"];

    let additionalTime = req.body["extra-time"];
    additionalTime = additionalTime * 60000;

    return db
    .query(`
      SELECT * FROM orders
      JOIN users ON orders.user_id = users.id
      WHERE orders.id = $1;
    `,
      [order_id])
    .then((result) => {
      // calculate new time
      const reqTime = new Date(result.rows[0].required_time).getTime();
      const newTime = new Date(reqTime + additionalTime);

      let phoneNumber = Number(result.rows[0].phone);
      console.log("result.rows", result.rows[0].phone);

      const queryParams = [ newTime, order_id ]

      return db
      .query(`UPDATE orders
              SET required_time = $1
              WHERE id = $2
              RETURNING *;`, queryParams)
        .then((result) => {
          sendClientText(`${phoneNumber}`, `${req.body["extra-time"]}`);
          return res.redirect('/restaurant');
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
