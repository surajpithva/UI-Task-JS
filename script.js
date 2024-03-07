const navcategory = document.querySelector("#categoryList");

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

//////////////////////Show All Product////////////////////

const AllProductContainer = document.querySelector(".allProducts");

if (document.URL.includes("allProduct.html")) {
  const getAllProductData = () => {
    fetch(`https://fakestoreapi.com/products`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        searchFunctionality(data);
        let setdata = data
          .map((product) => {
            const html = `<div class="col-md-3">
        <div class="card shadow p-3 mb-5 bg-white rounded" >
  <img class="card-img-top product-img" src="${product.image}" alt="Card image cap">
  <div class="card-body">
  <p class="card-text">${product.title}</p>

    <h5 class="card-title">${product.price}$</h5>
    <p class="card-text">${product.category}</p>
    <button type="button" class="btn btn-primary" onclick="openModal(${product.id})">More Details</button>
     </div>
  </div>
</div>`;
            return html;
          })
          .join("");
        AllProductContainer.innerHTML = setdata;
      });
  };
  getAllProductData();

  //////////////////////filter Price////////////////////////////
  const getPriceSelect = () => {
    const selectPrice = priceDropDown.value;

    fetch(`https://fakestoreapi.com/products`)
      .then((response) => response.json())
      .then((data) => {
        let filteredData;

        if (selectPrice === "lessHundred") {
          filteredData = data.filter((product) => product.price <= 100);
        } else if (selectPrice === "greaterHundred") {
          filteredData = data.filter((product) => product.price > 100);
        } else {
          filteredData = data;
        }

        const setdata = filteredData
          .map((product) => {
            return `<div class="col-md-3">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <img class="card-img-top product-img" src="${product.image}" alt="Card image cap">
              <div class="card-body">
                <p class="card-text">${product.title}</p>
                <h5 class="card-title">${product.price}</h5>
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

  //////////////////////////////////////////////////////////

  /////////////////////////Serch By name///////////////////////////////////
  const serchInput = document.querySelector(".data-search");

  function searchFunctionality(data) {
    // console.log(data);
    serchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      console.log(value, "my val");

      const filterData = data.filter((item) => {
        const searchedData = item.title.toLowerCase().includes(value);
        return searchedData;
      });

      let setdata = filterData
        .map((product) => {
          const html = `<div class="col-md-3">
        <div class="card shadow p-3 mb-5 bg-white rounded" >
  <img class="card-img-top product-img" src="${product.image}" alt="Card image cap">
  <div class="card-body">
  <p class="card-text">${product.title}</p>

    <h5 class="card-title">${product.price}</h5>
    <p class="card-text">${product.category}</p>
    <button type="button" class="btn btn-primary" onclick="openModal(${product.id})">More Details</button>
     </div>
  </div>
</div>`;
          return html;
        })
        .join("");
      AllProductContainer.innerHTML = setdata;
    });
  }
  searchFunctionality();
}

///////////////////////////////////////////////////////////////////////

////////////////fetch  4 products from api//////////////////

if (document.URL.includes("index.html")) {
  const productsContainer = document.querySelector(".products");

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
                    <p class="card-text">${product.category}</p>
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

  /////////////////////////////////////////////////////////////////////////

  /////////////fetch data 8 products of men category//////////////////////
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

  ////////////////////////////////////////////////////////////////////

  /////////////////////fetch data of women's categories///////////////////////
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
                      <button type="button" onchange="openModel()">More</button>
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
/* <a href="#"><img src="./assest/right-arrow.png" class="setArrow" alt="" srcset=""/></a> */

/////////////////////////////
