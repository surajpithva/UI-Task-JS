"use strict";
let userCart = JSON.parse(localStorage.getItem("userCart")) || [];
console.log(userCart);

const cartProduct = document.querySelector(".cartproduct");

const countCartItem = function () {
  const count__item = document.querySelector(".count__item");
  count__item.innerHTML = uCart.length;
  localStorage.setItem("userCart", JSON.stringify(userCart));
};
countCartItem();

const renderDisplyCart = (userCart) => {
  cartProduct.innerHTML = userCart
    .map(
      (item) => `
      <div class="row main align-items-center">
          <div class="col add__cart__img">
              <img class="img-fluid addToCartImg" src="${item.img}" />
              <span class="row addToCartTitle mx-1">${item.title}</span>
          </div>
          <div class="col">
              <div class="row  addToCartPrice">${item.price}</div>
          </div>
          <form  class="form_Inc_Dec" style="width:auto">
              <div class="value-button addTobtnDecrease" onclick="decreaseValue(${
                item.id
              })">-</div>
              <input type="number" class="quantity" value="${item.qty}" />
              <div class="value-button addTobtnIncrease" onclick="increaseValue(${
                item.id
              })">+</div>
          </form>
          <div class="col ">
              <div class="row text-muted shippingFee shipping" style="margin-left:-110px;">FREE</div>
          </div>
          <div class="col">
          <span class="addToCartSub">
              $ ${Math.round(item.price) * item.qty}
              </span>
              <span class="close">
                  <img src="./assest/Delete.png" alt="" height="20px" width="20px" class="addToCartDelImg" onclick="delCartItem(${
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
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your Product has been deleted.",
        icon: "success",
      });
      userCart = userCart.filter((item) => item.id !== id);
      localStorage.setItem("userCart", JSON.stringify(userCart));
      renderHTML();
      getPriceAndQty();
      countCartItem();
      window.location.reload();

      // countCartItem();

      // Recalculate total after deleting item
    }
  });
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
    const shippingFee = document.querySelector(".shippingFee");
    shippingFee.textContent = 50;

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
  const params = {
    name: "suraj Pithva",
    email: "aniketsuraj8@gmail.com",
    message: `Your order Delivered Soon`,
  };

  const serviceID = "service_pkte8ol";
  const templateID = "template_7jyg1cb";
  emailjs.send(serviceID, templateID, params).then((res) => {
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
});

// loader
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  loader.classList.add("loader-hidden");
  loader.addEventListener("transitioned", () => {
    document.body.removeChild(".loader");
  });
});
