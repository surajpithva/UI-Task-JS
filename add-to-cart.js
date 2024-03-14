"use strict";
let userCart = JSON.parse(localStorage.getItem("userCart")) || [];
console.log(userCart);

const cartProduct = document.querySelector(".cartproduct");

const count__item = document.querySelector(".count__item");
count__item.innerHTML = uCart.length;

const renderDisplyCart = (userCart) => {
  cartProduct.innerHTML = userCart
    .map(
      (item) => `
      <div class="row main align-items-center">
          <div class="col add__cart__img">
              <img class="img-fluid addToCartImg" src="${item.img}" />
          </div>
          <div class="col CartTitle">
              <div class="row addToCartTitle">${item.title}</div>
          </div>
          <div class="col">
              <div class="row text-muted addToCarTitle">${item.price}</div>
          </div>
          <form style="width:auto">
              <div class="value-button" onclick="decreaseValue(${
                item.id
              })">-</div>
              <input type="number" class="quantity" value="${item.qty}" />
              <div class="value-button" onclick="increaseValue(${
                item.id
              })">+</div>
          </form>
          <div class="col">
              <div class="row text-muted">FREE</div>
          </div>
          <div class="col">
              $ ${item.price.toFixed(2) * item.qty}
              <span class="close">
                  <img src="./assest/Delete.png" alt="" height="20px" width="20px" onclick="delCartItem(${
                    item.id
                  })"/>
              </span>
          </div>
      </div> 
  `
    )
    .join("");
};

const renderHTML = function () {
  renderDisplyCart(userCart);
};

renderHTML();

function increaseValue(id) {
  const index = userCart.findIndex((item) => item.id === id);
  if (index !== -1) {
    userCart[index].qty++;
    localStorage.setItem("userCart", JSON.stringify(userCart));
    renderHTML();
    getPriceAndQty(); // Recalculate total after increasing quantity
  }
}

function decreaseValue(id) {
  const index = userCart.findIndex((item) => item.id === id);
  if (index !== -1 && userCart[index].qty > 1) {
    userCart[index].qty--;
    localStorage.setItem("userCart", JSON.stringify(userCart));
    renderHTML();
    getPriceAndQty(); // Recalculate total after decreasing quantity
  }
}

const delCartItem = (id) => {
  const confirmDel = confirm("Are you sure you want to delete this item?");
  if (confirmDel) {
    userCart = userCart.filter((item) => item.id !== id);
    localStorage.setItem("userCart", JSON.stringify(userCart));
    renderHTML();
    getPriceAndQty(); // Recalculate total after deleting item
  }
};
const subTotal = document.querySelector(".subTotal");
const delivery = document.querySelector(".delivery");
const grand__total = document.querySelector(".grand__total");

const getPriceAndQty = function () {
  let totalPrice = userCart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  subTotal.textContent = totalPrice.toFixed(2);

  if (totalPrice >= 300) {
    delivery.textContent = 50;
    grand__total.textContent = (totalPrice + 50).toFixed(2);
  } else {
    delivery.textContent = 0;
    grand__total.textContent = totalPrice.toFixed(2);
  }
};

getPriceAndQty();

const proccedTo = document.querySelector(".proccedTo");

proccedTo.addEventListener("click", function () {
  Swal.fire({
    title: "Good job!",
    text: "Your order has been processed!",
    icon: "success",
    allowOutsideClick: false,
  }).then(() => {
    localStorage.removeItem("userCart");
    window.location.reload();
  });
});
