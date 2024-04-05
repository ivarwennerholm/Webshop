populateOrderEmptyCart();

function populateOrderEmptyCart() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  localStorage.setItem("order", JSON.stringify(cart));
  var order = JSON.parse(localStorage.getItem("order"));
  //localStorage.removeItem("cart");

  let markup = "";
  var grandTotal = 0;
  if (order && order.length > 0) {
    order.forEach(function (product) {
      markup += `
          <div class="row border">
            <div class="col-12 col-lg-2 my-2">
              <img class="img-fluid" src="${product.img}">
            </div>
            <div class="col-12 col-lg-2 my-2">
              <h4>${product.title}</h4>
            </div>
          </div>
        `;
      grandTotal += product.number * product.price;
    });
    markup += `
      <div class="row border">
        <div class="col-12 text-center py-3">
          <h3><b>Totalt</b>: ${grandTotal}kr</h3>
        </div>
      </div>`;
  } else {
    markup = "<div class='text-center'><p>Din varukorg är tom</p></div>";
  }
  document.getElementById("orderContainer").innerHTML = markup;
}
