"use strict";
let userCart = JSON.parse(localStorage.getItem("userCart"));
console.log(userCart);

const cartProduct = document.querySelector(".cartproduct");

const renderDisplyCart = (userCart) => {
  return userCart
    .map(
      (item) => `
  <div class="row main align-items-center">
      <div class="col-2 add__cart__img">
              <img
                class="img-fluid addtoCartImg"
                src="${item.img}"
              />
            </div>
            <div class="col-2">
              <div class="row">${item.title}</div>
            </div>
            <div class="col-2">
              <div class="row text-muted addToCarTitle">${item.price}</div>
            </div>
            <form style="width:auto">
            <div class="value-button" id="decrease" onclick="decreaseValue(${
              item.id
            })" value="Decrease Value">-</div>
            <input type="number" id="number" value="${item.qty}" />
                 <div class="value-button" id="increase" onclick="increaseValue(${
                   item.id
                 })" value="Increase Value">+</div>
          </form>
            <div class="col-2">
              <div class="row text-muted">FREE</div>
            </div>
            <div class="col-2">
              $ ${item.price.toFixed(2) * item.qty}
              <span class="close"
                ><img
                  src="./assest/Delete.png"
                  alt=""
                  height="20px"
                  width="20px"
                  onclick="delCartItem(${item.id})"
              /></span>
            </div>
  </div> 


  
  `
    )
    .join("");
};
const renderHTML = function (userCart) {
  const html = renderDisplyCart(userCart);
  cartProduct.innerHTML = html;
};
renderHTML(userCart);

//////////////////total of all items//////////////////////////
const subTotal = document.querySelector(".subTotal");
const delivery = document.querySelector(".delivery");
const grand__total = document.querySelector(".grand__total");

const getPriceAndQty = function () {
  let getPrice = userCart.map((item) => item.price);
  console.log(getPrice);
  let getqty = userCart.map((item) => item.qty);
  console.log(getqty);
  const GrandTotal = getPrice
    .map((item, index) => item * getqty[index])
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  // console.log(GrandTotal);
  subTotal.innerHTML = GrandTotal.toFixed(2);

  if (GrandTotal >= 300) {
    delivery.innerHTML = 50;
    grand__total.innerHTML = `${(
      +subTotal.textContent + +delivery.textContent
    ).toFixed(2)}`;
  } else {
    grand__total.innerHTML = `${(+subTotal.textContent).toFixed(2)}`;
  }
};
getPriceAndQty();

// Delete item from cart
const delCartItem = (id) => {
  console.log(id);
  const conformDel = confirm("are you sure to delete your item");
  if (conformDel) {
    const newProDisplay = userCart.findIndex((item) => item.id == id);
    userCart.splice(newProDisplay, 1);
    localStorage.setItem("userCart", JSON.stringify(userCart));

    renderDisplyCart(userCart);
  }
};

function increaseValue(id) {
  var value = parseInt(document.getElementById("number").value, 10);
  value = isNaN(value) ? 0 : value;
  value += 1;
  document.getElementById("number").value = value;
  let updatePrice = userCart.findIndex((item) => item.id == id);
  console.log(updatePrice);
  userCart[updatePrice].qty += 1;
  localStorage.setItem("userCart", JSON.stringify(userCart));
  renderDisplyCart(userCart);
  // location.reload();
}

function decreaseValue(id) {
  var value = parseInt(document.getElementById("number").value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? (value = 1) : "";
  value -= 1;
  document.getElementById("number").value = value;
  let updateminusPrice = userCart.findIndex((item) => item.id == id);
  userCart[updateminusPrice].qty -= 1;
  localStorage.setItem("userCart", JSON.stringify(userCart));
  renderDisplyCart(userCart);
  // location.reload();
}

const proccedTo = document.querySelector(".proccedTo");

proccedTo.addEventListener("click", function (e) {
  Swal.fire({
    title: "Good job!",
    text: "Your Order in Proccsed!",
    icon: "success",
    allowOutsideClick: false,
  }).then(() => {
    localStorage.removeItem("userCart");
    window.location.reload();
  });
  renderDisplyCart(userCart);
});
