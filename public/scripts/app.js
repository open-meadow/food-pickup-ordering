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
    `<div id = "${menuItem.id}" class = "menu_item">
      <img src = "${menuItem.photo_url}"></img>
      <section class = "menu_text">
        <span><b>${menuItem.name}</b></span>
        <span>$${(menuItem.price)/100}</span>
        <p>${menuItem.descrip}</p>
      </section>
      <button type="button" onclick="incrementClick(${menuItem.id})">(+)</button>
      <button type="button" onclick="decrementClick(${menuItem.id})">(-)</button>
    </div>`);
  allMenuItems.push({
    id: menuItem.id,
    name: menuItem.name,
    photo_url: menuItem.photo_url,
    descrip: menuItem.descrip,
    price: menuItem.price,
  })
  console.log(allMenuItems)
  return $menuItem;
};

//  CART GENERATION/MODIFICATION
// Increment sesion storage per menu item by ID

function incrementClick(idNum) {
  if (typeof(Storage) !== "undefined") {
    if (localStorage.getItem(idNum)) {
      let clicks = parseInt(localStorage.getItem(idNum));
      // console.log(`storage value for key, ${idNum} = ${clicks}`);
      localStorage.setItem(`${idNum}`, ++clicks);
    } else {
      localStorage.setItem(`${idNum}`, 1);
    }
    renderCurrentOrderPane();
    // console.log("localstorage", localStorage)
  }
};
// Decrement session storage per menu item by ID
function decrementClick(idNum) {
  if (typeof(Storage) !== "undefined") {
    if (localStorage[idNum] > 0) {
      localStorage[idNum] = Number(localStorage[idNum]) - 1;
      if (Number(localStorage[idNum]) === 0) {
        localStorage.removeItem(idNum)
      }
    }
    renderCurrentOrderPane();
  }
};
function renderCurrentOrderPane() {
  document.getElementById("cart_items").innerHTML = "";
  document.getElementById("fees_box").innerHTML = "";

  let netOrder = 0;
  let fees = 300;
  let taxes = 0;
  let totalOrder = 0;

  if (typeof(Storage) !== "undefined") {
    for (key in localStorage) {
      // push keys to array, sort and return by sorted
      if (typeof localStorage[key] !== "function" && key !== "length") {
        document.getElementById("cart_items").innerHTML += `<li>${localStorage[key]} times x ${allMenuItems[key-1].name} name $${allMenuItems[key-1].price * localStorage[key] / 100} price</li>`

        // moMoneyCalculator (move out calculations)
        netOrder = netOrder + allMenuItems[key-1].price * localStorage[key];
        taxes = Math.round(netOrder * 0.13);
        totalOrder = netOrder + fees + taxes;
      }
    }
    document.getElementById("fees_box").innerHTML += `
      <p>  $${(netOrder/100).toFixed(2)} net</p>
      <p>+ $${(fees/100).toFixed(2)} fees</p>
      <p>+ $${(taxes/100).toFixed(2)} taxes</p>
      <p> ----- </p>
      <p>$${(totalOrder/100).toFixed(2)}</p>`;
  }
  currentTotals.fee = fees;
  currentTotals.tax = taxes;
  currentTotals.total = totalOrder;
  console.log(localStorage);
};

// Calculate cost and fees
function calculateTotals () {
  let grossOrder = 0;
  let fees = 300;
  let taxes = 0;
  let totalOrder = 0;

  if (typeof(Storage) !== "undefined") {
    for (key in localStorage) {
      if (typeof localStorage[key] !== "function" && key !== "length") {
        grossOrder += allMenuItems[key-1].price * localStorage[key];
        taxes = Math.round(netOrder * 0.13);
        totalOrder = netOrder + fees + taxes;
      }
    }
  }
  return {
    "gross": grossOrder,
    "fees": fees,
    "taxes": taxes,
    "totalCost": totalOrder
  }
}

// Render cost and fees
function renderTotals (object) {
  document.getElementById("fees_box").innerHTML += `
      <p>  $${(object.gross/100).toFixed(2)} net</p>
      <p>+ $${(object.fees/100).toFixed(2)} fees</p>
      <p>+ $${(object.taxes/100).toFixed(2)} taxes</p>
      <p> ----- </p>
      <p>$${(object.totalCost/100).toFixed(2)}</p>`;
}

// Meant to pull the storage cart from local session
function pullStorageCart () {

}


const confirmOrder = () => {
  // confirm name & phone #
}


const completeOrder = () => {

    // Insert statements:
    // INSERT INTO users (name, phone) VALUES ();
    // (FOR EACH menu item) - INSERT INTO orders_menu_items (quantity) VALUES ();
      // Use pullStorageCart function
    // INSERT INTO orders (total_cost, tax, created) VALUES ();


  localStorage.clear();
}
const cancelOrder = () => {
  localStorage.clear();
  renderCurrentOrderPane();
};

//SCRIPTS
// onload
$(document).ready(function() {
  console.log("website is loaded ok");

  let cartObject = {};

  $.get("/users/createMenu")
    .then((response) => {
      renderMenuItems(response);
      // console.log(response);
    });

// currentOrderCart init on load
  currentOrderCart = {localStorage};
  console.log(localStorage)

  allMenuItems = [];



  $("confirm").click(function(){

    completeOrder();
    // $.post("/users/completeOrder")
  });
});

// HEADER SCRIPTS TO BE IMPLEMENTED
  // $(cart).onclick
    // animate right pane appearing
  // $(".cart_icon").click(function() {
  //   $(".right_pane pure-u-1-5").toggle(500);
  // });

//RIGHT PANE SCRIPTS TO BE IMPLEMENTED
  // $(submit order) onclick push all to DB
    // send fees, taxes, totalcost to orders table
    // send each object with attached usersID to orders_menu_items table
