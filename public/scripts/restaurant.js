const renderOrders = function(orders) {
  for(let order of orders) {
    let $orderItem = createOrderItem(order);
    $('.order-items').prepend($orderItem);
  }
};

const generateItem = function(items) {
  let row = ``;
  for (const item of items) {
    row += `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${(item.price * item.quantity) / 100}</td>
    </tr>
  `
  }

  return row;
}

const createOrderItem = function(order) {

  let $order = (`
  <p>${order.completed}</p>

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
            <td>$${order.total_cost/ 100}</td>
          </table>

          <section class="time-values">
            <span>Created at: ${order.created}</span>
            <form action="/send-sms" class="time-form" method="POST">
              <input
                type="text"
                id="time"
                placeholder="Time till order finishes"
              />
              <button type="submit">Submit</button>
            </form>
          </section>

        </section>
  `);
  return $order;
}


$(document).ready(function () {
  console.log("restaurant....ACTIVATE!!!!");

  $("#new-button").click(function() {
    console.log("You have clicked New");
    $('.order-items').empty();

    $.get("/users/generateOrders")
    .then((response) => {
      renderOrders(response);
    })

  })

  $.get("/users/generateOrders")
    .then((response) => {
      console.log(response);
      console.log("second", response[0].created);
      renderOrders(response);
    })
})
