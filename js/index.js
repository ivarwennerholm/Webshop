var xRate;
getXrate();
populateProducts();


function getXrate() {
  fetch(
    "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_hhkRg7lGTkXHkwwJMNEg7fzRgksTinGzfpVHeqOh&currencies=SEK"
  )
    .then((res) => res.json())
    .then((data) => {
      xRate = data.data.SEK;
    });
}

function populateProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      let markup = "";
      data.forEach(function (product) {
        markup += `
              <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-4">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <br><br>
                    <img class="img-fluid" src="${product.image}">
                    <br><br>
                    <h4>Pris: ${(product.price * xRate).toFixed(0)}kr</h4>
                    <div class="container row text-center">
                    <input class="form-control mt-4 mb-2 text-center" type="number" value="1" min="1" id="${
                      product.id
                    }">
                    <button class="btn btn-primary" onclick="addItemToCart(${
                      product.id
                    })">Köp</button>
                    </div>
                    
              </div>
            `;
      });
      document.getElementById("productsContainer").innerHTML = markup;
    });
}

function addItemToCart(id) {
  var number = document.getElementById(id).valueAsNumber;
  var cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      data.forEach(function (product) {
        if (product.id == id) {
          var existingProductIndex = cart.findIndex((item) => item.id == id);
          if (existingProductIndex !== -1) {
            cart[existingProductIndex].number += number;
          } else {
            cart.push({
              id: product.id,
              title: product.title,
              img: product.image,
              price: (product.price * xRate).toFixed(0),
              number: number,
            });
          }
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    });
    updateNavbar();
}
