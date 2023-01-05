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
      <td>$${(item.price) / 100}</td>
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
      // create interactive timer
      let id_name = "order_" + order.id;
      $order += `<div id=${id_name}></div>`;

      // let reqDate = new Date(order.required_time).getTime();
      // let createdDate = new Date(order.created).getTime();

      // console.log("order id", order.id);
      // console.log("req date", new Date(reqDate));

      let newTime = new Date().getTime();
      newTime += 5000;


      const timer = setInterval((id_name) => {
        // get current date and time
        let currentTime = new Date().getTime();
        let timeDifference = newTime - currentTime;
        console.log("order id", order.id, "time difference", new Date(timeDifference));

        // distance between currentTime and timeDifference
        // let remaining =  currentTime - timeDifference;

        let now = msToTime(timeDifference);

        document.getElementById(`${id_name}`).innerHTML = now;

        if(timeDifference < 0) {
          clearInterval(timer);
          document.getElementById(`${id_name}`).innerHTML = "Time up";
          // order.completed = true;
          // return;
          document.getElementById(`${id_name}`).innerHTML += `
          <div>
            <form action="/users/updateComplete" class="time-form" method="POST">
              <input type="hidden" name="order_id" value="${order.id}"/>
              <button type="submit">click here</button>
            </form>
          </div>`
          // $.post("users/updateComplete")
          // .then((response) => {
          //   console.log("compleeeete");
          // })
        }

      }, 1000, id_name)

      $order += `
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

// converts milliseconds to time. source: https://stackoverflow.com/a/19700358
function msToTime(duration) {
  let milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  // hours = hours < 10 ? "0" + hours : hours;
  // minutes = minutes < 10 ? "0" + minutes : minutes;
  // seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

$(document).ready(function () {
  console.log("restaurant....ACTIVATE!!!!");

  // if 'new button' is pressed, show new orders
  $("#new-button").click(function () {
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
  });

  // if 'completed button' is pressed, show completed orders
  $("#completed-button").click(function () {
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
  });

  // if pending button is pressed
  $("#pending-button").click(function () {
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
  });

  // default - render all orders
  $.get("/users/generateOrders").then((response) => {
    renderOrders(response);
  });

  // post button - onclick
  // $.post("/users/addTime")
  // .then((res) => {
  //   console.log("cool");
  // })
  // .catch((err) => {
  //   console.log("who cares");
  // })

});
