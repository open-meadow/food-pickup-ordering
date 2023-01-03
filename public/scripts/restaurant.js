const renderOrders = function(orders) {
  for(let order of orders) {
    let $orderItem = createOrderItem(order);
    $('.order-items').prepend($orderItem);
  }
};

const createOrderItem = function(order) {
  let $order = (`
  <p>${order.completed}</p>
  <p>${order.id}</p>
  <p>${order.name}</p>
  <p>${order.quantity}</p>
  <p>${order.fees}</p>
  <p>${order.tax}</p>
  <p>${order.total_cost}</p>
  <p>${order.created}</p>
  `);
  return $order;
}


$(document).ready(function () {
  console.log("restaurant....ACTIVATE!!!!");

  $.get("/users/generateOrders")
    .then((response) => {
      console.log("u r inside me");
      console.log(response);
      renderOrders(response);
    })
})
