"use strict";
let userCart = JSON.parse(localStorage.getItem("userCart"));
console.log(userCart);

const cartProduct = document.querySelector(".cartproduct");

const renderDisplyCart = (userCart) => {
  return userCart
    .map(
      (item) => `
    <div class="row main align-items-center">
        <div class="col-2">
                <img
                  class="img-fluid addtoCartImg"
                  src="${item.img}"
                />
              </div>
              <div class="col">
                <div class="row text-muted">${item.title}</div>
              </div>
              <form style="width:auto">
              <div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease Value">-</div>
  <input type="number" id="number" value="0" />
  <div class="value-button" id="increase" onclick="increaseValue()" value="Increase Value">+</div>
  </form>
              <div class="col">
                <div class="row text-muted">FREE</div>
              </div>
              <div class="col">
                $ ${item.price}
                <span class="close"
                  ><img
                    src="./assest/Delete.png"
                    alt=""
                    class="h-25,w-25"
                    height="20px"
                    width="20px"
                /></span>
              </div>
        `
    )
    .join("");
};
const html = renderDisplyCart(userCart);
cartProduct.innerHTML = html;

function increaseValue() {
  var value = parseInt(document.getElementById("number").value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById("number").value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementById("number").value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? (value = 1) : "";
  value--;
  document.getElementById("number").value = value;
}
