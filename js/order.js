// Parse:a inparametern 'id' i länken till order.html
function getQueryParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Plocka ut värdet av 'id'-parametern
const id = getQueryParam("id");
console.log("ID:", id);

// Värden att använda globalt
var productId;
var productTitle;
var productImg;
var productPrice;
let custName;
let custEmail;
let custPhone;
let custStreet;
let custZip;
let custCity;

// Hämta växlingskurs för SEK-USD
fetch(
  "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_hhkRg7lGTkXHkwwJMNEg7fzRgksTinGzfpVHeqOh&currencies=SEK"
)
  .then((res) => res.json())
  .then((data) => {
    fetchProducts(data.data.SEK);
  });

// Hämta produkterna
function fetchProducts(xRate) {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      data.forEach(function (product) {
        if (product.id == id) {
          productId = product.id;
          productTitle = product.title;
          productImg = product.image;
          productPrice = (product.price * xRate).toFixed(0);
          output = `
              <div class="row">
                  
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 text-center">
                  <img class="img-fluid" src="${productImg}">
                </div>
                    
                <div class="col-12 col-md-6 col-lg-3 text-center">
                  <h3>Produkt:</h3>
                  <h3>${productTitle}</h3>
                </div>
                    
                <div class="col-12 6 col-md-6 col-lg-3 text-center">
                  <h3>Pris:</h3>  
                  <h3>${productPrice}kr</h3>
                </div>

                <div class="col-12 col-md-6 col-lg-3 text-center">
                  <h3>Antal:</h3>
                  <h3>1</h3>
                </div>

              </div>
            `;
        }
      });
      document.getElementById("product").innerHTML = output;
    });
}

// Hitta och addera lyssnare till order-knappen
const orderBtn = document.getElementById("orderBtn");
orderBtn.addEventListener("click", validateForm);

// Validera värdena i formuläret
function validateForm() {
  // Hämta värden från formuläret
  custName = document.getElementById("nameInput").value;
  custEmail = document.getElementById("emailInput").value;
  custPhone = document.getElementById("phoneInput").value;
  custStreet = document.getElementById("streetInput").value;
  custZip = document.getElementById("zipInput").value;
  custCity = document.getElementById("cityInput").value;

  /*
  // Validera namn
  if (custName.length < 2 || custName.length > 50) {
    alert("Namnet måste vara mellan 2 och 50 tecken långt");
    return false;
  }

  // Validera e-postadress
  if (!custEmail.includes("@") || custEmail.length > 50) {
    alert("Fyll i en giltig epost-adress (max 50 tecken)");
    return false;
  }

  if (!/^[\d()-]{0,50}$/.test(custPhone)) {
    alert("Fyll i ett giltigt telefonnummmer (max 50 siffror)");
    return false;
  }

  // Validera gatuadress
  if (custStreet.length < 2 || custStreet.length > 50) {
    alert("Gatuadressen måste vara mellan 2 och 50 tecken lång");
    return false;
  }

  // Validera postkod
  if (!/^[\d]{5}$/.test(custZip)) {
    alert("Fyll i en giltig postkod (5 siffror totalt)");
    return false;
  }

  // Validera postort
  if (custCity.length < 2 || custCity.length > 50) {
    alert("Postorten måste vara mellan 2 och 50 tecken lång");
    return false;
  }
  */

  // Om allt är giltigt, skicka formuläret
  //placeOrderLog();
  placeOrder();
  return true;
}

function placeOrderLog() {
  console.log("order placed: ");
  console.log("Produkt-ID: " + productId);
  console.log("Produkt-namn: " + productTitle);
  console.log("Kund: " + custName);
  console.log("Epost: " + custEmail);
  console.log("Telefon: " + custPhone);
  console.log("Adress: " + custStreet + " " + custZip + " " + custCity);
}

function placeOrder() {
  output = `
    <div class="form-control" id="order">
      <div class="row">

      <div class="col-2 text-center">
        <img class="img-fluid" src="${productImg}">
      </div>
                  
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center">
        <h5>Produkt:</h5>
        <h5>${productTitle}</h5>
      </div>
                  
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center">
        <h5>Pris:</h5>  
        <h5>${productPrice}kr</h5>
      </div>

      <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center">
        <h5>Antal:</h5>
        <h5>1</h5>
      </div>

      <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center">
        <h5>Kund</h5>
        <h5>${custName}</h5>
        <h5>${custEmail}</h5>
        <h5>${custPhone}</h5>
      </div>

      <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center">
        <h5>Adress:</h5>
        <h5>${custStreet}</h5>
        <h5>${custZip}, ${custCity}</h5>
      </div>

    </div>

  </div>
  `;
  document.getElementById("order").innerHTML = output;
}
