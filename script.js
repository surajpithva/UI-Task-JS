const navcategory = document.querySelector("#categoryList");
const AllProductContainer = document.querySelector(".allProducts");
const productsContainer = document.querySelector(".products");

if (document.URL.includes("index.html")) {
  /////////////////fetch categories from api////////////////////////
  const selectData = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((category) => {
          const listItem = document.createElement("li");
          listItem.className = "nav-item";
          listItem.innerHTML = `<a class="nav-link" href="./categories.html?category=${category}">${category}</a>`;
          document.querySelector("#categoryList2").appendChild(listItem);
        });
      });
  };
  selectData();
  ////////////////////////////////////////////////////////////////////////////////////////
  // first 4 data of api new arrival part
  const getProductsData = () => {
    fetch(`https://fakestoreapi.com/products?limit=4`)
      .then((response) => response.json())
      .then((data) => {
        let setdata = data
          .map((product) => {
            return `
              <div class="col-md-3 mb-4">
                <div class="card product-card">
                  <img src="${product.image}" class="card-img-top scale" alt="Product Image">
                  <div class="card-body">
                    <p class="card-text newArrival__catText">${product.category}</p>
                  </div>
                </div>
              </div>
            `;
          })
          .join("");
        productsContainer.innerHTML = setdata;
      });
  };

  getProductsData();

  /////////////fetch  all data of men categorys//////////////////////
  const productsContainers = document.querySelector(".allMensProduct");
  const getProductssData = () => {
    fetch(`https://fakestoreapi.com/products/category/men's clothing`)
      .then((response) => response.json())
      .then((data) => {
        let setdata = data
          .map((product) => {
            return `
              <div class="col-md-3 mb-4">
                <div class="card product-card">
                  <img src="${product.image}" class="card-img-top scale" alt="Product Image">
                  <div class="card-body">
                    <p class="card-text">${product.category}</p>
                  </div>
                </div>
              </div>
            `;
          })
          .join("");
        productsContainers.innerHTML = setdata;
      });
  };

  getProductssData();
  /////////////////////fetch first 4  data of women's categories///////////////////////
  const productsWomen = document.querySelector(".allWomenProduct");
  const getWomenProducts = () => {
    fetch(`https://fakestoreapi.com/products/category/women's clothing?limit=4`)
      .then((response) => response.json())
      .then((data) => {
        let setdata = data
          .map((product) => {
            return `
                <div class="col-md-3 mb-4">
                  <div class="card product-card">
                    <img src="${product.image}" class="card-img-top scale" alt="Product Image">
                    <div class="card-body">
                      <p class="card-text">${product.category}</p>
                      <a href="#" class="removeul">Explore Now!</a>
                      <a href="./categories.html"> <button type="button" onchange="openModel()" class="btn btn-dark float-end">More</button></a>
                      </div>
                  </div>
                </div>
              `;
          })
          .join("");
        productsWomen.innerHTML = setdata;
      });
  };
  getWomenProducts();
}

////////////////////////////////// open model/////////////////////////////////////
function openModals(productId) {
  console.log(`Opening modal for product with ID: ${productId}`);
}

const openModal = function (id) {
  console.log(id);
  document.querySelector(".myModal").style.display = "block";
  const title = document.getElementById("title");
  const image = document.getElementById("myImage");
  const desc = document.getElementById("description");
  const category = document.getElementById("category");
  const price = document.getElementById("price");
  const rate = document.getElementById("rate");
  // const btncart = document.getElementById(".btncart");
  // const ppid = document.getElementById("ppid");

  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      image.src = data.image;
      title.innerHTML = data.title;
      desc.innerHTML = data.description;
      category.innerHTML = data.category;
      price.innerHTML = data.price;
      rate.innerHTML = data.rating.rate;
      prodid.value = data.id;
    });
  btn.addEventListener("click", (e) => {
    addToCart(e, data.id);
  });
};
const addToCart = (e, id) => {
  console.log(id);
};
function closeModal() {
  document.querySelector(".myModal").style.display = "none";
}

let uCart = JSON.parse(localStorage.getItem("userCart")) || [];

function addTooCart() {
  const proid = document.getElementById("prodid").value;
  fetch(`https://fakestoreapi.com/products/${proid}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let Cart = {
        id: data.id,
        category: data.category,
        price: data.price,
        title: data.title,
        img: data.image,
        qty: 1,
      };

      let calqty = uCart.findIndex((item) => item.id === data.id);
      console.log(calqty);
      if (calqty >= 0) {
        uCart[calqty].qty += 1;
        localStorage.setItem("userCart", JSON.stringify(uCart));
      } else {
        uCart.push(Cart);
        localStorage.setItem("userCart", JSON.stringify(uCart));
      }
    });
}

//script of allproduct.html page

if (document.URL.includes("allProduct.html")) {
  //////////////////////Show All Product in allProduct page ////////////////////

  document.addEventListener("DOMContentLoaded", function () {
    const getAllProductData = () => {
      fetch(`https://fakestoreapi.com/products`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let setdata = data
            .map((product) => {
              return `<div class="col-md-3">
                            <div class="card shadow p-3 mb-5 bg-white rounded">
                                <img class="card-img-top product-img" src="${product.image}" alt="Card image cap">
                                <div class="card-body">
                                    <p class="card-text">${product.title}</p>
                                    <h5 class="card-title">${product.price}$</h5>
                                    <p class="card-text">${product.category}</p>
                                    <button type="button" class="btn btn-primary" onclick="openModal(${product.id})">More Details</button>
                                </div>
                            </div>
                        </div>`;
            })
            .join("");

          AllProductContainer.innerHTML = setdata;
        });
    };

    getAllProductData();
  });

  ////////////////Three func work toghther////////////////////////////////////////

  const filterData = document.querySelector(".filterData");
  const PriceSelect = document.querySelector(".PriceSelect");
  const procuctDropDown = document.querySelector("#procuctDropDown");
  const serchInput = document.querySelector(".data-search");

  // Function to handle search functionality
  function searchFunctionality(data) {
    serchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();

      const filterData = data.filter((item) => {
        const searchedData = item.title.toLowerCase().includes(value);
        return searchedData;
      });

      renderFilteredProducts(filterData);
    });
  }

  // Function to render filtered products to the DOM
  const renderFilteredProducts = (filteredData) => {
    AllProductContainer.innerHTML = filteredData
      .map((product) => {
        return `
            <div class="col-md-3">
              <div class="card shadow p-3 mb-5 bg-white rounded" >
                <img class="card-img-top product-img" src="${product.image}" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text">${product.title}</p>
                  <h5 class="card-title">${product.price}$</h5>
                  <p class="card-text">${product.category}</p>
                  <button type="button" class="btn btn-primary" onclick="openModal(${product.id})">More Details</button>
                </div>
              </div>
            </div>
          `;
      })
      .join("");
  };

  // Function to handle filtering based on category and price
  const filteringData = (data) => {
    filterData.addEventListener("click", (e) => {
      const selectedCategory = procuctDropDown.value;
      const selectedPrice = PriceSelect.value;
      console.log(selectedCategory);
      console.log(selectedPrice);

      // filtering logic here
      const filteredData = data.filter((product) => {
        return (
          (selectedCategory === "all" ||
            product.category === selectedCategory) &&
          (selectedPrice === "all" ||
            (selectedPrice === "lessHundred" && product.price <= 100) ||
            (selectedPrice === "greaterHundred" && product.price > 100))
        );
      });
      console.log(filterData);
      renderFilteredProducts(filteredData);
    });
  };

  // Assume you have product data available in the 'products' array

  const products = []; // Replace with your actual product data
  filteringData(products);
  // Call search functionality with your product data
  searchFunctionality(products);
}

//////////////////Select Categories////////////////////////////////////
const selectedData = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((response) => response.json())
    .then((data) => {
      const setdata = data.map(
        (category) => `<option value="${category}">${category}</option>`
      );
      const defaultOption = `<option value="selected" selected disabled > Here </option>`;
      procuctDropDown.innerHTML = defaultOption + setdata.join("");
      // console.log(data);
    });
};

selectedData();
