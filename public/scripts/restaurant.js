// renders order item and places it inside order-items
const renderOrders = function (orders) {
  for (let order of orders) {
    let $orderItem = createOrderItem(order);
    $(".order-items").prepend($orderItem);
  }
};

// generates multiple order items
const generateItem = function (items) {
  let row = ``;
  for (const item of items) {
    row += `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price / 100}</td>
    </tr>
    `;
  }
  return row;
};

// create timer
const createTimer = (order, id_name) => {
  let reqDate = new Date(order.required_time).getTime();
  sessionStorage["newTime_" + id_name] = reqDate;

  const timer = setInterval(
    (id_name) => {
      // get current date and time
      let currentTime = new Date().getTime();
      let timeDifference = sessionStorage["newTime_" + id_name] - currentTime;

      document.getElementById(`${id_name}`).innerHTML = `${msToTime(timeDifference)}`;
      if (timeDifference < 0) {
        clearInterval(timer);
        document.getElementById(`${id_name}`).innerHTML = "Time up";
        document.getElementById(`${id_name}`).innerHTML += `
          <div>
            <form action="/users/updateComplete" class="time-form" method="POST">
              <input type="hidden" name="order_id" value="${order.id}"/>
              <button type="submit">click here</button>
            </form>
          </div>`;
      }
    },
    1000,
    id_name
  );

  return timer;
};

// Creates single order item
const createOrderItem = function (order) {
  // Get start time from datetime
  const time = order.created.split("T");
  time[1] = time[1].slice(0, time[1].length - 8);

  let $order = `
  <section class="order-item">
          <div class="order-no">Order #${order.id}</div>

          <!-- Actual Order -->
          <table class="order-table">
            <tr>
              <th class="column-names">Menu Item</th>
              <th class="column-names">Quantity</th>
              <th class="column-names">Price</th>
            </tr>
            ${generateItem(order.items)}
          </table>

          <table>
            <td>Fees</td>
            <td>$${order.fees / 100}</td>
          </table>

          <table>
            <td>Tax</td>
            <td>$${order.tax / 100}</td>
          </table>

          <table class="total-cost">
            <td>Total Cost</td>
            <td>$${order.total_cost / 100}</td>
          </table>

          <section class="time-values">
            <span>Created at: ${time[1]} UTC</span>
  `;
  if (!order.completed) {
    if (order.created === order.required_time) {
      $order += `
          <form action="/users/addTime" class="time-form" method="POST">
              <input
                type="text"
                name="extra-time"
                placeholder="Time till order finishes"
              />
              <input
                type="hidden"
                name="order_id"
                value="${order.id}"
              />
              <button type="submit">Submit</button>
          </form>
        </section>
      </section>`;
    } else {
      let id_name = "order_" + order.id;
      $order += `<div id=${id_name}></div>`;
      // Create interactive timer
      createTimer(order, id_name);
      $order += `
          </section>
        </section>`;
    }
  } else {
    // Get required time from datetime
    const finishedTime = order.required_time.split("T");
    finishedTime[1] = finishedTime[1].slice(0, finishedTime[1].length - 8);

    $order += `
          <span>Finished at: ${finishedTime[1]}</span>
        </section>
      </section>`;
  }
  return $order;
};

// Converts milliseconds to time. source: https://stackoverflow.com/a/19700358
function msToTime(duration) {
  let 
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  return hours + ":" + minutes + ":" + seconds;
};

// If 'new button' is pressed, show new orders
const showNewOrders = () => {
  $(".order-items").empty();
  $.get("/users/generateOrders").then((response) => {
    const correctItems = [];
    for (const singleResponse of response) {
      // for new orders, created time and required time is same
      if (
        !singleResponse.completed &&
        singleResponse.created === singleResponse.required_time
      ) {
        correctItems.push(singleResponse);
      }
    }
    renderOrders(correctItems);
  });
};

// If 'completed button' is pressed, show completed orders
const showCompletedOrders = () => {
  $(".order-items").empty();

  $.get("/users/generateOrders").then((response) => {
    const correctItems = [];
    for (const singleResponse of response) {
      // check if order is completed
      if (singleResponse.completed) {
        correctItems.push(singleResponse);
      }
    }
    renderOrders(correctItems);
  });
};

// If pending button is pressed
const showPendingOrders = () => {
  $(".order-items").empty();
  $.get("/users/generateOrders").then((response) => {
    const correctItems = [];

    for (const singleResponse of response) {
      // check if order is completed
      if (
        !singleResponse.completed &&
        singleResponse.created !== singleResponse.required_time
      ) {
        correctItems.push(singleResponse);
      }
    }
    renderOrders(correctItems);
  });
};

//  SCRIPTS
$(document).ready(function () {
  // button presses
  $("#new-button").click(showNewOrders);
  $("#completed-button").click(showCompletedOrders);
  $("#pending-button").click(showPendingOrders);

  // default - render all orders
  $.get("/users/generateOrders").then((response) => {
    renderOrders(response);
  });
});