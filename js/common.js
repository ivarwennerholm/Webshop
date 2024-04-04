updateNavbar();

function updateNavbar() {
  markup = `
    <nav class="navbar navbar-light bg-light sticky-top">
        <a class="navbar-brand mx-4 mt-1" href="index.html">
            <h2>Webshop</h2>
        </a>
        <div class="end-0">
            <span class="position-absolute translate-middle badge rounded-pill bg-primary">
                ${getItemsInCart()}
            </span>
            <a class="mx-4" href="cart.html" style="text-decoration: none">
            <h2>🛒</h2>
            </a>
        </div>
    </nav>
`;
  document.getElementById("navbar").innerHTML = markup;
}

function getItemsInCart() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  var total = 0;
  if (cart && cart.length > 0) {
    cart.forEach(function (product) {
      total += product.number;
    });
  }
  return total;
}
