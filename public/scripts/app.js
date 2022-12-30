// Client facing scripts here

const { getUsers } = require('db/queries/users.js');

// let menuItems = [
//   {
//     id: 1,
//     name: "hi",
//     photo_url: `https://4.bp.blogspot.com/-jVIeFuFIhjE/WmSaPH8yEiI/AAAAAAAAAGw/hEhlpQkI6y8lnnaCZeg0ojQf8mHLB23zQCEwYBhgL/w1200-h630-p-k-no-nu/Krabby+P.jpg`,
//     descrip: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     price: 1001
//   },
//   {
//     id: 2,
//     name: "hi",
//     photo_url: `https://4.bp.blogspot.com/-jVIeFuFIhjE/WmSaPH8yEiI/AAAAAAAAAGw/hEhlpQkI6y8lnnaCZeg0ojQf8mHLB23zQCEwYBhgL/w1200-h630-p-k-no-nu/Krabby+P.jpg`,
//     descrip: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     price: 1002
//   },
//   {
//     id: 3,
//     name: "hi",
//     photo_url: `https://4.bp.blogspot.com/-jVIeFuFIhjE/WmSaPH8yEiI/AAAAAAAAAGw/hEhlpQkI6y8lnnaCZeg0ojQf8mHLB23zQCEwYBhgL/w1200-h630-p-k-no-nu/Krabby+P.jpg`,
//     descrip: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     price: 1003
//   },
//   {
//     id: 4,
//     name: "hi",
//     photo_url: `https://4.bp.blogspot.com/-jVIeFuFIhjE/WmSaPH8yEiI/AAAAAAAAAGw/hEhlpQkI6y8lnnaCZeg0ojQf8mHLB23zQCEwYBhgL/w1200-h630-p-k-no-nu/Krabby+P.jpg`,
//     descrip: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     price: 1004
//   },
//   {
//     id: 5,
//     name: "hi",
//     photo_url: `https://4.bp.blogspot.com/-jVIeFuFIhjE/WmSaPH8yEiI/AAAAAAAAAGw/hEhlpQkI6y8lnnaCZeg0ojQf8mHLB23zQCEwYBhgL/w1200-h630-p-k-no-nu/Krabby+P.jpg`,
//     descrip: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     price: 1005
//   },
// ];

//FUNCTIONS
//  MENU ITEM GENERATION
const createMenu = function(){
  // creates the hard coded menu above
  console.log(getMenuItems());
  let menuItems = getMenuItems();
  return menuItems;
}
const renderMenuItems = function(menuItems) {
  for (let menuItem of menuItems) {
    let $menuItem = createMenuItem(menuItem);
    $('.menu_box').append($menuItem);
  }
};
const createMenuItem = function(menuItem) {
  let $menuItem = (
    `<div class = "menu_item">
      <img src = "${menuItem.photo_url}"></img>
      <section class = "menu_text">
        <span><b>${menuItem.name}</b></span>
        <span>$${(menuItem.price)/100}</span>
        <p>${menuItem.descrip}</p>
      </section>
      <button type = "submit">(+)</button>
    </div>`);
  return $menuItem;
}

//  CART GENERATION/MODIFICATION
const createCartItem = function () {
  // from the menu we take the price and menuitemID then increment up quantity by 1
  // create an item like :
  // object1 =
    // {orderItem,
    // quantity,
    // price}
  // return object1
}
const addCartItem = function () {
  // check the cart to see if duplicate name/price if yes +1 quantity else new object
}
const removeCartItem = function () {
  // reduce quantity of specified object by 1; if 0, "delete" object
}

const calculateFees = function () {

};
const calculateTaxes = function () {

};
const calculateTotalCost = function () {

};
  // function calculates Fees
    // iterate through cartitem array
    // add all prices
    // *.1
  // function calculates tax
  // function calculates total cost

const confirmOrder = () => {
  // take cart items from addCartItem
  // take total cost
  // export to database
}

//SCRIPTS
$(document).ready(function() {
  console.log("website is loaded ok");
  renderMenuItems(createMenu());

  // move currentOrderCart init to login success
  let currentOrderCart = [];
  console.log("cart initialized", currentOrderCart);

//MENU SCRIPTS
  // $(document) ready
  // generate the menu item objects and render

// HEADER SCRIPT
  // $(my_account).onclick
    // animate left pane appearing
  // $(cart).onclick
    // animate right pane appearing

//LEFT PANE SCRIPTS
  // $(edit information button) onclick
    // create field to update users.name/phone/password
    // $(submit edit?) onclick set change to DB
  // current order
    // has a timer once $(submit order) onclick confirmed?
    // start after API usage

//RIGHT PANE SCRIPTS
  // $(add order button from menu/right-pane) onclick add item
    // createCartItem()
    // addCartItem()
  // $(add order button from menu/right-pane) onclick calculate fees, taxes, total
    // calculateFees()
    // calculateTaxes()
    // calculateTotalCost()
    // reload right pane items

  // $(remove order button from right-pane) onclick calculate fees, taxes, total
    // remove right pane item
    // calculateFees()
    // calculateTaxes()
    // calculateTotalCost()
    // reload right pane items

  // $(submit order) onclick push all to DB
    // send fees, taxes, totalcost to orders table
    // send each object with attached usersID to orders_menu_items table

  // $(cancel order) onlcikc delete all objects in currentOrderCart array
    // remove right pane items
    // calculateFees()
    // calculateTaxes()
    // calculateTotalCost()
    // reload right pane items
});
