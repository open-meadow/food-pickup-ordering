// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
  // host: 'localhost',
  // port: 5432,
  // user: 'labber',
  // password: 'labber',
  // database: 'midterm'
};

const db = new Pool(dbParams);

db.connect();
console.log("DB connected");

// Unfinished function to add order to database
// Currently testing
const addOrderToDatabase = function () {
  return db
  .query(`INSERT INTO orders (quantity) VALUES (1)`)
  .then(res => {
    console.log(res.rows[0])
    return res.rows[0];
  })
  .catch(e => console.error(e.stack))
}

exports.addOrderToDatabase = addOrderToDatabase;

module.exports = db;
