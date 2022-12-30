const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

// DB FUNCTIONS

// Function 1: fetch name, email, password, phone
const getUserInfo = (email) => {
  return db.query(
    `SELECT name, email, password, phone
    FROM users
    WHERE email = $1;`,
    [`${email}`])
  .then((result) => {
    if (result.rows.length !== 0 ) {
      return result.rows;
    } else {
      return null;
    }
  });
}

// Function 2: fetch previous order by #, menu items with quantity, total cost
// We can add time
const getOrderInfo = (email) => {
  return db.query(
    `SELECT email, orders.id, order_menu_items.quantity, menu_items.name, orders.total_cost
    FROM users
    JOIN orders ON users.usersID = orders.id
    JOIN orders_menu_items ON orders.id = orders_menu_items.order_id
    JOIN menu_items ON orders_menu_items.menu_item_id = menu_items.id
    WHERE email = $1
    `,
    [`${email}`]
  )
  .then((result) => {
    if (result.rows.length !== 0 ) {
      return result.rows;
    } else {
      return null;
    }
  });
}



// Function 3: Login/registration - Check if user email exists (getUserByEmail)
// Use getuserbyemail (revisit if needed)


// Function 4: Check if user is logged in (cookies) (encryption)
// revisit when we implement cookies

const verifyCookie = () => {
  const userId = req.session.userId;
  if(!userId) {
    res.send("Not logged in")
  }
}


// Function 5: Compare hashed passwords (hash)
// revisit when we implement password hash

const verifyPassword = () => {


}

// Function 6: post to database
const addUser

  return db.



// NON DATABASE FUNCTIONS
// Function: Create right pane element??? may be a script
// Function: Create left pane element??? may be a script
// Function: manipulate Current-order object


// SCRIPTS
// show right pane on click
// Pull price from database (right pane)
// Calculate Fees/tax
// Calculate total


// show left pane on click






module.exports = { getUsers };
