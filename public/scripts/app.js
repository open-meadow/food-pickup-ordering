// Client facing scripts here
//FUNCTIONS
//  MENU ITEM GENERATION
const createMenuItem = function(){

}
const renderMenuItem = function(){

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
