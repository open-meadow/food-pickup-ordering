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
      <td>$${(item.price * item.quantity) / 100}</td>
    </tr>
    `;
  }

  return row;
};

// creates single order item
const createOrderItem = function (order) {

  // get start time from datetime
  const time = order.created.split("T");
  time[1] = time[1].slice(0, time[1].length - 8);

  // console.log(time[1]);

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
            <span>Created at: ${time[1]}</span>

  `;

  if (!order.completed) {
    if(order.created === order.required_time) {
      $order += `
    <form action="/send-sms" class="time-form" method="POST">
              <input
                type="text"
                id="time"
                placeholder="Time till order finishes"
              />
    <button type="submit">Submit</button>
    </form>
  </section>
</section>`;
    } else {
      $order += `
    <form action="/send-sms" class="time-form" method="POST">
              <input
                type="text"
                id="time"
                placeholder="Time till order finishes"
              />
    <button type="submit">Submit</button>
    </form>
  </section>
</section>`;
    }
  } else {
    // get start time from datetime
    const finishedTime = order.created.split("T");
    finishedTime[1] = finishedTime[1].slice(0, finishedTime[1].length - 8);

    $order += `
    <span>Finished at: ${finishedTime[1]}</span>
  </section>
</section>`;
  }

  return $order;
};

$(document).ready(function () {
  console.log("restaurant....ACTIVATE!!!!");

  // if 'new button' is pressed, show new orders
  $("#new-button").click(function () {
    console.log("You have clicked New");
    $(".order-items").empty();

    $.get("/users/generateOrders").then((response) => {
      console.log("This is the response", response);
      const correctItems = [];

      for (const singleResponse of response) {
        console.log("Single response", singleResponse);

        // for new orders, created time and required time is same
        if (
          !singleResponse.completed &&
          singleResponse.created === singleResponse.required_time
        ) {
          console.log("singletime is same");
          correctItems.push(singleResponse);
        }
      }

      renderOrders(correctItems);
    });
  });

  // if 'completed button' is pressed, show completed orders
  $("#completed-button").click(function () {
    console.log("You have clicked completed");
    $(".order-items").empty();

    $.get("/users/generateOrders").then((response) => {
      console.log("This is the response", response);
      const correctItems = [];

      for (const singleResponse of response) {
        console.log("Single response", singleResponse);

        // check if order is completed
        if (singleResponse.completed) {
          console.log("single is true");
          correctItems.push(singleResponse);
        }
      }

      renderOrders(correctItems);
    });
  });

  // if pending button is pressed
  $("#pending-button").click(function () {
    console.log("You have clicked pending");
    $(".order-items").empty();

    $.get("/users/generateOrders").then((response) => {
      console.log("This is the response", response);
      const correctItems = [];

      for (const singleResponse of response) {
        console.log("Single response", singleResponse);

        // check if order is completed
        if (
          !singleResponse.completed &&
          singleResponse.created !== singleResponse.required_time
        ) {
          let reqDate = new Date(singleResponse.required_time);
          let createdDate = new Date(singleResponse.created);

          console.log("req date", reqDate);
          console.log("created date", createdDate);

          console.log("time difference", (reqDate.getTime() - createdDate.getTime()));
          const timeDifference = reqDate.getTime() - createdDate.getTime();
          console.log(typeof(timeDifference));
          console.log("time difference to string", timeDifference.toString());

          correctItems.push(singleResponse);
        }
      }

      renderOrders(correctItems);
    });
  });

  // default - render all orders
  $.get("/users/generateOrders").then((response) => {
    console.log(response);
    renderOrders(response);
  });
});
