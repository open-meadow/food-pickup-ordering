// Client facing scripts here

// const { getUsers } = require('db/queries/users.js');

//FUNCTIONS
//  MENU ITEM GENERATION
const renderMenu = function(menuItems) {
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
      localStorage.setItem(`${idNum}`, ++clicks);
    } else {
      localStorage.setItem(`${idNum}`, 1);
    }
    renderCurrentOrderPane();
    renderTotals();
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
    renderTotals();
  }
};
// Render right pane current order menu items (cart items)
function renderCurrentOrderPane() {
  document.getElementById("cart_items").innerHTML = "";

  if (typeof(Storage) !== "undefined") {
    for (key in localStorage) {
      if (typeof localStorage[key] !== "function" && key !== "length") {
        document.getElementById("cart_items").innerHTML += `<li>${localStorage[key]} times x ${allMenuItems[key-1].name} name $${allMenuItems[key-1].price * localStorage[key] / 100} price</li>`
      }
    }
  }
};
// Calculate cost and fees for cart items
function calculateTotals() {
  let grossOrder = 0;
  let fees = 300;
  let taxes = 0;
  let totalOrder = 0;

  if (typeof(Storage) !== "undefined") {
    for (key in localStorage) {
      if (typeof localStorage[key] !== "function" && key !== "length") {
        grossOrder += allMenuItems[key-1].price * localStorage[key];
        taxes = Math.round(grossOrder * 0.13);
        totalOrder = grossOrder + fees + taxes;
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
// Render cost and fees for cart items
function renderTotals() {
  document.getElementById("fees_box").innerHTML = "";
  let feesObject = calculateTotals();

  document.getElementById("fees_box").innerHTML += `
      <p>  $${(feesObject.gross/100).toFixed(2)} net</p>
      <p>+ $${(feesObject.fees/100).toFixed(2)} fees</p>
      <p>+ $${(feesObject.taxes/100).toFixed(2)} taxes</p>
      <p> ----- </p>
      <p>$${(feesObject.totalCost/100).toFixed(2)}</p>`;
}

const confirmOrder = (fieldname, fieldphone) => {
  // confirm name & phone #
  // place into session storage
  // sessionStorage.name = fieldname
  // sessionStorage.phone = fieldphone
}
const completeOrder = () => {
  // INSERT USERS FROM SESSION STORAGE <== different function?
  // INSERT INTO users (name, phone) VALUES () RETURNING id; from localstage confirmOrder
  // $.post the order insert from  object
  
  // INSERT ORDERS (TOTAL) FROM FUNCTION <== different function?
    // let x = calculateTotals();
    // x.user_id (from comfirm Order <-> local storage), x.total_cost, x.fees, x.tax, x.timestamp (generate)
    // INSERT INTO orders (total_cost, tax, created) VALUES ();  
  
  // INSERT ORDERS_MENU_ITEM FROM FUNCTION
    if (typeof(Storage) !== "undefined") {
      for (key in localStorage) {
        if (typeof localStorage[key] !== "function" && key !== "length") {
          currentOrderCart[key] = localStorage[key]
        }
      }
    };
    // console.log(currentOrderCart)
    // (FOR EACH menu item) - INSERT INTO orders_menu_items (quantity) VALUES ();
    for (key in currentOrderCart) {
      // POST INSERT
    };
  localStorage.clear();
  sessionStorage.clear();
}; 
const cancelOrder = () => {
  localStorage.clear();
  sessionStorage.clear();
  renderCurrentOrderPane();
  renderTotals();
};

//SCRIPTS
// onload
$(document).ready(function() {
  console.log("website is loaded ok");

  let cartObject = {};

  $.get("/users/createMenu")
    .then((response) => {
      renderMenu(response);
      renderCurrentOrderPane();
      renderTotals();
      // console.log(response);
    });

// currentOrderCart init on load
  allMenuItems = [];
  currentOrderCart = {};

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
