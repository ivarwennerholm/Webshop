var xRate;

fetch(
  "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_hhkRg7lGTkXHkwwJMNEg7fzRgksTinGzfpVHeqOh&currencies=SEK"
)
  .then((res) => res.json())
  .then((data) => {
    xRate = data.data.SEK;
    fetchProducts();
  });

function fetchProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      let output = "<h2>🛒 Web Shop</h2>";
      data.forEach(function (product) {
        output += `
              <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-4">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <br><br>
                    <img class="img-fluid" src="${product.image}">
                    <br><br>
                    <h4>Pris: ${(product.price * xRate).toFixed(0)}kr</h4>
                    <input type="number" value="1" min="1" max="10" id="${product.id}">
                    <button class="btn btn-primary" onclick="addItemToCart(${product.id})">Köp</button>
                    
              </div>
            `;
      });
      document.getElementById("output").innerHTML = output;
    });
}

function addItemToCart(id) {
  var number = document.getElementById(id).valueAsNumber;
  console.log(number);
  var cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    data.forEach(function (product) {
      if (product.id == id) {
        var existingProductIndex = cart.findIndex(item => item.id == id);
        if (existingProductIndex !== -1) {
          cart[existingProductIndex].number += number;
        } else {
          cart.push({
            id: product.id,
            title: product.title,
            img: product.image,
            price: (product.price * xRate).toFixed(0),
            number: number
          });
        }
      }
    });
    
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(localStorage.getItem("cart"));
  });
}

/*
function removeBackground(image) {}

fetch("json/bg-colors.json")
  .then((res) => res.json())
  .then((data) => {
    bgColors = data;
    getNextBgColor();
  });

function getNextBgColor() {
  bgColors.forEach((color) => {
    console.log(color.color);
    //return `${color.color}`;
  });
}
*/