const navcategory = document.querySelector("#categoryList");
const AllProductContainer = document.querySelector(".allProducts");
const productsContainer = document.querySelector(".products");

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  loader.classList.add("loader-hidden");
  loader.addEventListener("transitioned", () => {
    document.body.removeChild(".loader");
  });
});

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
  const productsMen = document.querySelector(".allMensProduct");
  const getMenCateData = () => {
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
        productsMen.innerHTML = setdata;
      });
  };

  getMenCateData();
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
  Swal.fire({
    title: "Good job!",
    text: "Your Product add in cart!",
    icon: "success",
  });
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

  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const categorySelect = document.getElementById("categoryDropDown");
    const priceSelect = document.getElementById("priceDropDown");
    const filterDataButton = document.querySelector(".filterData");
    const allProductContainer = document.querySelector(".allProducts");

    function getAllProductData() {
      fetch(`https://fakestoreapi.com/products`)
        .then((response) => response.json())
        .then((data) => {
          renderProducts(data);
          populateCategories(data);
          // Call filtering and search functionalities with product data
          filteringData(data);
          searchFunctionality(data);
        });
    }

    function renderProducts(products) {
      allProductContainer.innerHTML = products
        .map(
          (product) => `
            <div class="col-md-3">
                <div class="card shadow p-3 mb-5 bg-white rounded">
                    <img class="card-img-top product-img" src="${product.image}" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-text">${product.title}</p>
                        <h5 class="card-title">${product.price}$</h5>
                        <p class="card-text">${product.category}</p>
                        <button type="button" class="btn btn-primary" onclick="openModal(${product.id})">More Details</button>
                    </div>
                </div>
            </div>
        `
        )
        .join("");
    }

    function searchFunctionality(data) {
      searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();

        const filteredData = data.filter((item) =>
          item.title.toLowerCase().includes(value)
        );

        renderProducts(filteredData);
      });
    }

    function filteringData(data) {
      filterDataButton.addEventListener("click", () => {
        const selectedCategory = categorySelect.value;
        const selectedPrice = priceSelect.value;

        const filteredData = data.filter((product) => {
          const categoryMatch =
            selectedCategory === "all" || product.category === selectedCategory;
          const priceMatch =
            selectedPrice === "all" ||
            (selectedPrice === "lessHundred" && product.price <= 100) ||
            (selectedPrice === "greaterHundred" && product.price > 100);
          return categoryMatch && priceMatch;
        });

        renderProducts(filteredData);
      });
    }

    function populateCategories(products) {
      const categories = products.reduce((acc, product) => {
        if (!acc.includes(product.category)) {
          acc.push(product.category);
        }
        return acc;
      }, []);

      const categoryOptions = categories.map(
        (category) => `<option value="${category}">${category}</option>`
      );

      categorySelect.innerHTML += categoryOptions.join("");
    }

    getAllProductData();
  });
}
