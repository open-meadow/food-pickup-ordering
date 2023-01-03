// Client facing scripts here

// const { getUsers } = require('db/queries/users.js');

//FUNCTIONS
//  MENU ITEM GENERATION
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
      <button type = "submit">(-)</button>
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
  $.get("/users/createMenu")
    .then((response) => {
      renderMenuItems(response);
      // console.log(response);
    });

  // move currentOrderCart init to login success
  let currentOrderCart = [];
  console.log("cart initialized", currentOrderCart);

  //MENU SCRIPTS
  // $(document) ready
  // generate the menu item objects and render
  renderMenuItems(menuItems);

// HEADER SCRIPT
  // $(my_account).onclick
    // animate left pane appearing
  $("#my_acc").click(function() {
    $(".left_pane pure-u-1-5").toggle(500);
  });

  // $(cart).onclick
    // animate right pane appearing
  $(".cart_icon").click(function() {
    $(".right_pane pure-u-1-5").toggle(500);
  });

// HEADER SCRIPT
  // $(cart).onclick
    // animate right pane appearing

// CURRENT ORDER
    // has a timer once $(submit order) onclick confirmed?
    // start after API usage

//RIGHT PANE SCRIPTS
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
