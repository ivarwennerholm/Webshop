getCart();

function getCart() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  let markup = "";
  var grandTotal = 0;
  if (cart && cart.length > 0) {
    cart.forEach(function (product) {
      markup += `
          <div class="row border">
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 text-center my-2">
              <img class="img-fluid" src="${product.img}">
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 text-center my-2">
              <h4>Produkt:</h4>
              <h4>${product.title}</h4>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 text-center my-2">
              <h4>Pris:</h4>  
              <h4>${product.price}kr</h4>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 text-center my-2">
              <h4>Antal:</h4>
              <h4>${product.number}</h4>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 text-center my-2">
              <h4>Summa:</h4>
              <h4>${product.number * product.price}kr</h4>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-2 text-center my-2">
              <div class="my-2">
                <button class="btn btn-danger" onclick="removeItemFromCart(${product.id})">Ta bort</button>  
              </div>
              <div class="mt-4">
                <input type="number" class="col-3" value="${product.number}" id="${product.id}" min="0">
              </div>
              <div class="mt-1">
                <button class="btn btn-info" onclick="updateItemInCart(${product.id})">Uppdatera</button>  
              </div>
            </div>
          </div>
        `;
      grandTotal += product.number * product.price;
    });
    markup += `<div class="row border"><div class="col-12 text-center py-3"><h3><b>Totalt</b>: ${grandTotal}kr</h3></div></div>`;
    markup += `<div class="row"><div class="col-12 text-center py-3"><button class="btn btn-danger" onclick="emptyCart()">Töm varukorg</button></div></div>`;
  } else {
    markup = "<div class='text-center'><p>Your cart is empty</p></div>";
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
  cart.splice(indexToRemove, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  getCart();
}

function updateItemInCart(id) {
    var cart = JSON.parse(localStorage.getItem("cart"));
    var newQuantity = document.getElementById(id).valueAsNumber;
    if (!cart || cart.length === 0) {
      return;
    }
    var productToUpdate = cart.find(product => product.id === id);
    if (!productToUpdate) {
      return;
    }
    productToUpdate.number = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }

  function emptyCart() {
    localStorage.removeItem("cart");
    getCart();
  }
  
