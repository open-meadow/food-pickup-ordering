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
    .then ((result) => {
      return res.json(result.rows); 
    });
  });

  // 
  router.post('/completeOrder', (req, res) => {
    return db
    .query(
      `INSERT INTO `
    )
    console.log("complete order then push to DB")
  });

  return router;
  }