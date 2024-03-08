const navcategory = document.querySelector("#categoryList");
const AllProductContainer = document.querySelector(".allProducts");

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

if (document.URL.includes("allProduct.html")) {
  const getAllProductData = () => {
    fetch(`https://fakestoreapi.com/products`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // searchFunctionality(data);
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

        filteringData(data);
      });
  };
  getAllProductData();
  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////

  const filterData = document.querySelector(".filterData");
  const PriceSelect = document.querySelector(".PriceSelect");
  const procuctDropDown = document.querySelector("#procuctDropDown");

  const filteringData = (data) => {
    filterData.addEventListener("click", (e) => {
      const selectedCategory = procuctDropDown.value;
      const selectedPrice = PriceSelect.value;

      const allData = [...new Set(data.map((item) => item.category))];

      if (
        allData.includes(selectedCategory) &&
        selectedPrice === "lessHundred"
      ) {
        fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
          .then((response) => response.json())
          .then((data) => {
            let filteredData = data.filter((product) => product.price <= 100);

            filteredData
              .map((product) => {
                const html = `
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
                return html;
              })
              .join("");
            AllProductContainer.innerHTML = filterData;
          });
      }

      // console.log(selectedCategory);
      // console.log(selectedPrice);
    });
  };
  filteringData();
  // const renderHTML=(data)=>{
  //   return data.map((product)=>`
  //               <div class="col-md-3">
  //                 <div class="card shadow p-3 mb-5 bg-white rounded" >
  //                   <img class="card-img-top product-img" src="${product.image}" alt="Card image cap">
  //                   <div class="card-body">
  //                     <p class="card-text">${product.title}</p>
  //                     <h5 class="card-title">${product.price}$</h5>
  //                     <p class="card-text">${product.category}</p>
  //                     <button type="button" class="btn btn-primary" onclick="openModal(${product.id})">More Details</button>
  //                   </div>
  //                 </div>
  //               </div>
  //             `)
  //             .join("")

  // }
  //////////////////////filter Price////////////////////////////
  // const getPriceSelect = () => {
  //   const selectPrice = priceDropDown.value;

  //   fetch(`https://fakestoreapi.com/products`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       let filteredData;

  //       if (selectPrice === "lessHundred") {
  //         filteredData = data.filter((product) => product.price <= 100);
  //       } else if (selectPrice === "greaterHundred") {
  //         filteredData = data.filter((product) => product.price > 100);
  //       } else {
  //         filteredData = data;
  //       }

  //       const setdata = filteredData
  //         .map((product) => {
  //           return `<div class="col-md-3">
  //           <div class="card shadow p-3 mb-5 bg-white rounded">
  //             <img class="card-img-top product-img" src="${product.image}" alt="Card image cap">
  //             <div class="card-body">
  //               <p class="card-text">${product.title}</p>
  //               <h5 class="card-title">${product.price}</h5>
  //               <p class="card-text">${product.category}</p>
  //               <button type="button" class="btn btn-primary" onclick="openModal(${product.id})">More Details</button>
  //             </div>
  //           </div>
  //         </div>`;
  //         })
  //         .join("");

  //       AllProductContainer.innerHTML = setdata;
  //     });
  // };

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

//////////////////Select Categories////////////////////////////////////
const selectedData = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const setdata = data.map(
        (category) => `<option value="${category}">${category}</option>`
      );
      const defaultOption = `<option value="selected" selected disabled > Here </option>`;
      procuctDropDown.innerHTML = defaultOption + setdata.join("");
      // console.log(data);
    });
};

selectedData();
///////////////////////////////////////////////////////////////

// const countriesDropDown = document.getElementById("countriesDropDown");

// const getValueSelect = () => {
//   const selectedCategory = countriesDropDown.value;

//   if (selectedCategory !== "selected") {
//     fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
//       .then((response) => response.json())
//       .then((data) => {
//         const setdata = data
//           .map((number, index) => {
//             const html = `<div class="col-md-3 ">
//         <div class="card shadow p-3 mb-5 bg-white rounded" >
//   <img class="card-img-top product-img" src="${data[index].image}" alt="Card image cap">
//   <div class="card-body">
//     <h5 class="card-title">${data[index].price}</h5>
//     <p class="card-text">${data[index].category}</p>
//     <button type="button" class="btn btn-primary" onclick="openModal(${data[index].id})">More Details</button>
//      </div>
//   </div>
// </div>`;
//             return html;
//           })
//           .join("");
//         AllProductContainer.innerHTML = setdata;
//       });
//   }
// };

// countriesDropDown.addEventListener("change", getValueSelect);

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
                      <button type="button" onchange="openModel()" class="btn btn-dark">More</button>
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
