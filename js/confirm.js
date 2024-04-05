populateOrderEmptyCart();
populateCustomer();

function populateOrderEmptyCart() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  localStorage.setItem("order", JSON.stringify(cart));
  var order = JSON.parse(localStorage.getItem("order"));
  localStorage.removeItem("cart");
  updateNavbar();
  let markup = "";
  if (order && order.length > 0) {
    order.forEach(function (product) {
      markup += `
              <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-2">
                <img class="img-samesize img-thumbnail" src="${product.img}">
              </div>
          `;
    });
  } else {
    markup = "<div class='text-center'><p>Din varukorg är tom</p></div>";
  }
  document.getElementById("orderDisplay").innerHTML = markup;
}

function populateCustomer() {
  const customer = JSON.parse(localStorage.getItem("customer"));

  const custName = customer.name;
  const custEmail = customer.email;
  const custPhone = customer.phone;
  const custStreet = customer.street;
  const custZip = customer.zip;
  const custCity = customer.city;

  markup = `<div class="border w-50">
        <div class="p-2">
            <h5><b>🧑‍🦲 Kund</b>:</h5>
            <h5>${custName}</h5>
            <h5>${custEmail}</h5>
            <h5>${custPhone}</h5>
        </div>
        <div class="p-2">
            <h5><b>🏠 Adress</b>:</h5>
            <h5>${custStreet}</h5>
            <h5>${custZip}, ${custCity}</h5>
        </div>
    </div>
  `;
  document.getElementById("customerDisplay").innerHTML = markup;
}