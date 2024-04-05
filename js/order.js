populateCart();
valAllFieldsAndUpdateOrdBtn();

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
  phoneInput = document.getElementById("phoneInput");
  custPhone = phoneInput.value;
  if (!/^[\d()-]{1,50}$/.test(custPhone)) {
    phoneInput.className = "form-control is-invalid";
    return false;
  } else {
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

function valAllFieldsAndUpdateOrdBtn() {
  validateName();
  validateEmail();
  validatePhone();
  validateStreet();
  validateZip();
  validateCity();
  updateOrderButton();
}

function areAllFieldsValid() {
  if (
    validateName() &&
    validateEmail() &&
    validatePhone() &&
    validateStreet() &&
    validateZip() &&
    validateCity()
  ) {
    return true;
  } else {
    return false;
  }
}

function updateOrderButton() {
  orderButton = document.getElementById("orderButton");
  if (areAllFieldsValid()) {
    orderButton.disabled = false;
  } else {
    orderButton.disabled = true;
  }
}

function setCustomer() {
  if ("customer" in localStorage) {
    localStorage.removeItem("customer");
  }
  custName = document.getElementById("nameInput").value;
  custEmail = document.getElementById("emailInput").value;
  custPhone = document.getElementById("phoneInput").value;
  custStreet = document.getElementById("streetInput").value;
  custZip = document.getElementById("zipInput").value;
  custCity = document.getElementById("cityInput").value;
  var customer = {
    name: custName,
    email: custEmail,
    phone: custPhone,
    street: custStreet,
    zip: custZip,
    city: custCity,
  };
  localStorage.setItem("customer", JSON.stringify(customer));
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
