populateCart();

function populateCart() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  let markup = "";
  var grandTotal = 0;
  if (cart && cart.length > 0) {
    cart.forEach(function (product) {
      markup += `
          <div class="row border">
            <div class="col-12 col-lg-2 my-2">
              <img class="img-fluid" src="${product.img}">
            </div>
            <div class="col-12 col-lg-2 my-2">
              <h4><b>Produkt</b>:</h4>
              <h4>${product.title}</h4>
            </div>
            <div class="col-12 col-lg-2 my-2">
              <h4><b>Pris</b>:</h4>  
              <h4>${product.price}kr</h4>
            </div>
            <div class="col-12 col-lg-2 my-2">
              <h4><b>Antal</b>:</h4>
              <h4>${product.number}</h4>
            </div>
            <div class="col-12 col-lg-2 my-2">
              <h4><b>Summa</b>:</h4>
              <h4>${product.number * product.price}kr</h4>
            </div>
            <div class="col-12 col-lg-2 y-2">
              
              <div class="mt-4">
                <input type="number" style="width: 100px" class="form-control text-center" value="${
                  product.number
                }" id="${product.id}" min="0">
              </div>
              <div class="my-1">
                <button style="width: 100px" class="btn btn-info" onclick="updateItemInCart(${
                  product.id
                })">Uppdatera</button>  
              </div>
              <div class="mt-3 mb-1">
                <button style="width: 100px" class="btn btn-warning my-2" onclick="removeItemFromCart(${
                  product.id
                })">Ta bort</button>  
              </div>
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
      </div>
      <div class="text-center my-4">
          <button class="btn btn-danger" onclick="emptyCart()">🗑️ Töm varukorg</button>
      </div>
      <div class="text-center">
        <button class="btn btn-primary" onclick="window.location.href='order.html';placeOrder()">💳 Gå vidare till beställning</button>
      </div>`;
  } else {
    markup = "<div class='text-center'><p>Din varukorg är tom</p></div>";
  }
  document.getElementById("cartContainer").innerHTML = markup;
}

function removeItemFromCart(id) {
  var cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart || cart.length === 0) {
    return;
  }
  var indexToRemove = cart.findIndex((product) => product.id === id);
  if (indexToRemove === -1) {
    return;
  }
  if (confirm("Är du säker på att du ta bort varan?")) {
    cart.splice(indexToRemove, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateNavbar();
    populateCart();
  } else {
    return;
  }
}

function updateItemInCart(id) {
  var cart = JSON.parse(localStorage.getItem("cart"));
  var newQuantity = document.getElementById(id).valueAsNumber;
  if (!cart || cart.length === 0) {
    return;
  }
  var productToUpdate = cart.find((product) => product.id === id);
  if (!productToUpdate) {
    return;
  }
  productToUpdate.number = newQuantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateNavbar();
  populateCart();
}

function emptyCart() {
  if (confirm("Är du säker på att du vill tömma din varukorg?")) {
    localStorage.removeItem("cart");
    updateNavbar();
    populateCart();
  } else {
    return;
  }
}
