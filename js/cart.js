getCart();

function getCart() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  var output = "";
  var grandTotal = 0;
  if (cart && cart.length > 0) {
    cart.forEach(function (product) {
      output += `
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
              <button class="btn btn-danger" onclick="removeItemFromCart(${product.id})">Ta bort</button>  
              <input type="number" value="${product.number}" id="${product.id}" min="0">
              <button class="btn btn-info" onclick="updateItemInCart(${product.id})">Uppdatera</button>  
            </div>
          </div>
        `;
      grandTotal += product.number * product.price;
    });
    output += `<div class="row border"><div class="col-12 text-center py-3"><h3><b>Totalt</b>: ${grandTotal}kr</h3></div></div>`;
  } else {
    output = "<p>Your cart is empty</p>";
  }

  document.getElementById("cartContainer").innerHTML = output;
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
  
