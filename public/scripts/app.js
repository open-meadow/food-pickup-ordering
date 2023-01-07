// Client facing scripts here
//FUNCTIONS
//  MENU ITEM GENERATION
// Loop through menu items from DB and call render function for each
const renderMenu = function (menuItems) {
  for (let menuItem of menuItems) {
    let $menuItem = createMenuItem(menuItem);
    $(".menu_box").append($menuItem);
  }
};

// Create HTML body for each menu item passed in
const createMenuItem = function (menuItem) {
  let $menuItem = `<div id = "${menuItem.id}" class = "menu_item">
      <img src = "${menuItem.photo_url}"></img>
      <section class = "menu_text">
        <span><b>${menuItem.name}</b></span>
        <span>$${menuItem.price / 100}</span>
        <p>${menuItem.descrip}</p>
      </section>
      <div class = "menu_item_buttons">
        <button class = "increment_order" type="button" onclick="incrementClick(${
          menuItem.id
        })">(+)</button>
        <button class = "decrement_order" type="button" onclick="decrementClick(${
          menuItem.id
        })">(-)</button>
      </div>
    </div>`;
  allMenuItems.push({
    id: menuItem.id,
    name: menuItem.name,
    photo_url: menuItem.photo_url,
    descrip: menuItem.descrip,
    price: menuItem.price,
  });
  return $menuItem;
};

// CART GENERATION/MODIFICATION
// Increment sesion storage per menu item by ID
function incrementClick(idNum) {
  if (typeof Storage !== "undefined") {
    if (localStorage.getItem(idNum)) {
      let clicks = parseInt(localStorage.getItem(idNum));
      localStorage.setItem(`${idNum}`, ++clicks);
    } else {
      localStorage.setItem(`${idNum}`, 1);
    }
    renderCurrentOrderPane();
    renderTotals();
  }
}

// Decrement session storage per menu item by ID
function decrementClick(idNum) {
  if (typeof Storage !== "undefined") {
    if (localStorage[idNum] > 0) {
      localStorage[idNum] = Number(localStorage[idNum]) - 1;
      if (Number(localStorage[idNum]) === 0) {
        localStorage.removeItem(idNum);
      }
    }
    renderCurrentOrderPane();
    renderTotals();
  }
}

// Render right pane current order menu items (cart items)
function renderCurrentOrderPane() {
  document.getElementById("cart_items").innerHTML = "";

  if (typeof Storage !== "undefined") {
    for (key in localStorage) {
      if (typeof localStorage[key] !== "function" && key !== "length") {
        document.getElementById("cart_items").innerHTML += `<li>${
          localStorage[key]
        } x ${allMenuItems[key - 1].name} - $${
          (allMenuItems[key - 1].price * localStorage[key]) / 100
        }</li>`;
      }
    }
  }
}

// Calculate cost and fees for cart items
function calculateTotals() {
  let grossOrder = 0;
  let fees = 3000;
  let taxes = 0;
  let totalOrder = 0;

  if (typeof Storage !== "undefined") {
    for (key in localStorage) {
      if (typeof localStorage[key] !== "function" && key !== "length") {
        grossOrder += allMenuItems[key - 1].price * localStorage[key];
        taxes = Math.round(grossOrder * 0.13);
        totalOrder = grossOrder + fees + taxes;
      }
    }
  }
  return {
    gross: grossOrder,
    fees: fees,
    taxes: taxes,
    totalCost: totalOrder,
  };
}

// Create cart object
function createCartObj() {
  let currentOrderCart = {};

  if (typeof Storage !== "undefined") {
    for (key in localStorage) {
      if (typeof localStorage[key] !== "function" && key !== "length") {
        currentOrderCart[`menu_item_${key}`] = localStorage[key];
      }
    }
  }
  return currentOrderCart;
}

// Render cost and fees for cart items
function renderTotals() {
  document.getElementById("fees_box").innerHTML = "";
  let feesObject = calculateTotals();

  document.getElementById("fees_box").innerHTML += `
      <p> Subtotal: $${(feesObject.gross / 100).toFixed(2)}</p>
      <p> Fees: $${(feesObject.fees / 100).toFixed(2)}</p>
      <p> Taxes: $${(feesObject.taxes / 100).toFixed(2)}</p>
      <hr>
      <!-- <div class="horizontal_line"></div> -->
      <p> Total: $${(feesObject.totalCost / 100).toFixed(2)}</p>`;
}

// Call complete order post route, insert information in object to DB
const completeOrder = (userInfo) => {
  // Create the object of info needed to pass to server
  let databaseInfo = {};
  databaseInfo.name = userInfo.name;
  databaseInfo.phone = userInfo.phone;
  databaseInfo.cart = createCartObj();
  databaseInfo.totals = calculateTotals();

  $.post("/users/complete_order", databaseInfo);
  clearOrder();
};

// Clear localstorage cart & sessionstorage
const clearOrder = () => {
  localStorage.clear();
  sessionStorage.clear();
  renderCurrentOrderPane();
  renderTotals();
};

// Count down timer on latest order from DB
function timer() {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  let timeDiff = Math.ceil((expectedTime - timestamp) / 1000);

  if (timeDiff >= 0) {
    let minutes = Math.floor(timeDiff / 60);
    let seconds = timeDiff - minutes * 60;

    if (seconds >= 10) {
      document.getElementById(
        "order_timer"
      ).innerHTML = `Expected order time: ${minutes}:${seconds}`;
    } else {
      document.getElementById(
        "order_timer"
      ).innerHTML = `Expected order time: ${minutes}:0${seconds}`;
    }
  }
  if (timeDiff < 0) {
    document.getElementById("order_timer").innerHTML = `Order pending.`;
  }
}

// Add order ID of last order
const addConfirmation = () => {
  $.get("/users/complete_order").then((result) => {
    let text = `
        <p>ID: ${result[0].id}</p>
    `;

    $("#order_timer").prepend(text);
  });
};

//SCRIPTS
//  onload
$(document).ready(function () {
  allMenuItems = [];

  // when screen is small, this shows and hides the cart
  let hidden = false;
  $(".cart_icon").click(() => {
    hidden = !hidden;
    $(".right_pane").slideToggle(() => {
      if (hidden) {
        $("body").css("overflow", "hidden");
      } else {
        $("body").css("overflow", "auto");
      }
    });
  });

  $.get("/users/getUpdateTime").then((response) => {
    expectedTime = new Date(response[0].required_time);

    if (localStorage) {
      setInterval(timer, 1000);
    } else {
      document.getElementById("order_timer").innerHTML = "";
    }
  });

  $.get("/users/createMenu").then((response) => {
    renderMenu(response);
    renderCurrentOrderPane();
    renderTotals();
  });

  $("#confirm").click(function () {
    // if pane is active, remove pane
    if(hidden) {
      hidden = !hidden;
      $(".right_pane").slideToggle();
    }

    $("#myModal").css("display", "flex");
  });

  $("#cancel").click(function () {
    clearOrder();

    // if pane is active, remove pane
    if(hidden) {
      hidden = !hidden;
      $(".right_pane").slideToggle();
    }
  });

  $("#close_order_button").click(function () {
    $("#myModal").css("display", "none");
  });

  $("#complete_order_button").click(function (event) {
    event.preventDefault();

    let userInfo = {};
    userInfo.name = $("#name").val();
    userInfo.phone = $("#phone").val();

    completeOrder(userInfo);

    $("#myModal").css("display", "none");
  });

  addConfirmation();
});
