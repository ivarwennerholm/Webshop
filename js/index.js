fetch(
  "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_hhkRg7lGTkXHkwwJMNEg7fzRgksTinGzfpVHeqOh&currencies=SEK"
)
  .then((res) => res.json())
  .then((data) => {
    fetchProducts(data.data.SEK);
  });

function fetchProducts(xRate) {
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
                    <a href="order.html?id=${product.id}">
                    <button class="btn btn-primary" id="${product.id}">Köp</button>
                    </a>
              </div>
            `;
      });
      document.getElementById("output").innerHTML = output;
    });
}

function removeBackground(image) {
}

fetch("json/bg-colors.json")
  .then((res) => res.json())
  .then((data) => {
    bgColors = data;
    getNextBgColor();
  });

function getNextBgColor() {
  bgColors.forEach(color => {
    console.log(color.color);
    //return `${color.color}`;
  });
}
