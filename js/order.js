// Värden att använda globalt
let custName;
let custEmail;
let custPhone;
let custStreet;
let custZip;
let custCity;

// Hitta och addera lyssnare till order-knappen
//const orderBtn = document.getElementById("orderBtn");
//orderBtn.addEventListener("click", validateForm);
populateCart();
validateAllTest();

function populateCart() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  let markup = "";
  if (cart && cart.length > 0) {
    cart.forEach(function (product) {
      markup += `
              <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-2">
                <img class="img-samesize img-thumbnail" src="${product.img}">
              </div>
          `;
    });
  } else {
    markup = "<div class='text-center'><p>Din varukorg är tom</p></div>";
  }
  document.getElementById("cartDisplay").innerHTML = markup;
}

function validateName() {
  nameInput = document.getElementById("nameInput");
  custName = nameInput.value;
  if (custName.length < 2 || custName.length > 50) {
    nameInput.className = "form-control is-invalid";
    return false;
  } else {
    nameInput.className = "form-control is-valid";
    return true;
  }
}

function validateEmail() {
  emailInput = document.getElementById("emailInput");
  custEmail = emailInput.value;
  if (!custEmail.includes("@") || custEmail.length > 50) {
    emailInput.className = "form-control is-invalid";
    return false;
  } else {
    emailInput.className = "form-control is-valid";
    return true;
  }
}

function validatePhone() {
  console.log("validatePhone()");
  phoneInput = document.getElementById("phoneInput");
  custPhone = phoneInput.value;
  console.log(custPhone);
  if (!/^[\d()-]{0,50}$/.test(custPhone)) {
    console.log("invalid");
    phoneInput.className = "form-control is-invalid";
    return false;
  } else {
    console.log("valid");
    phoneInput.className = "form-control is-valid";
    return true;
  }
}

function validateStreet() {
  streetInput = document.getElementById("streetInput");
  custStreet = streetInput.value;
  if (custStreet.length < 2 || custStreet.length > 50) {
    streetInput.className = "form-control is-invalid";
    return false;
  } else {
    streetInput.className = "form-control is-valid";
    return true;
  }
}

function validateZip() {
  zipInput = document.getElementById("zipInput");
  custZip = zipInput.value;
  if (!/^[\d]{5}$/.test(custZip)) {
    zipInput.className = "form-control is-invalid";
    return false;
  } else {
    zipInput.className = "form-control is-valid";
    return true;
  }
}


function validateCity() {
  cityInput = document.getElementById("cityInput");
  custCity = cityInput.value;
  if (custCity.length < 2 || custCity.length > 50) {
    cityInput.className = "form-control is-invalid";
    return false;
  } else {
    cityInput.className = "form-control is-valid";
    return true;
  }
}

function validateAllTest() {
  validateName();
  validateEmail();
  validatePhone();
  validateStreet();
  validateZip();
  validateCity();
}

function validateAll() {
  //orderButton = document.getElementById("orderButton");
  if (validateName() && validateEmail() && validatePhone() && validateStreet() && validateZip() && validateCity()) {
    //orderButton.removeAttribute("disabled");
    return true;
  } else {
    return false;
  }
}

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
