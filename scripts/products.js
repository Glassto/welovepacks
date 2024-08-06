function dropdownProducts() {
  document.getElementById("selectDisplayNumber").classList.toggle("hidden");
}
function dropdownMenu() {
  document.getElementById("selectInMenu").classList.toggle("hidden");
}

function scrollToDiv(object) {
  var target = document.getElementById(object);
  var offset = 114;

  // Poziția elementului
  var elementPosition = target.getBoundingClientRect().top;
  var offsetPosition = elementPosition + window.scrollY - offset;

  // Scroll la poziția div-ului
  window.scrollTo({
    top: offsetPosition,
  });
}

let isOpened = false;
function sideMenu() {
  let toggleButton = document.getElementById("sideMenu");
  let toggleImage = document.getElementById("sideMenuImageToggle");

  toggleButton.classList.toggle("hidden");
  document.getElementById("sideMenu").classList.toggle("w-56");
  document.getElementById("overlay").classList.toggle("hidden");

  if (isOpened === false) {
    toggleImage.src = "./img/icons/close.svg";
    isOpened = true;
  } else {
    toggleImage.src = "./img/icons/menu.svg";
    isOpened = false;
  }
}

let products = [];
let http = new XMLHttpRequest();
http.open("get", "data/produse.json", true);
http.send();

http.onload = function () {
  document.querySelector(".products-grid").style.display = "none";
  document.getElementById("list").style.background = "white";
  document.getElementById("grid").style.background = "transparent";
  if (this.readyState == 4 && this.status == 200) {
    products = JSON.parse(this.responseText);
    let _activeListStyle = document.getElementById("_activeListStyle");
    _activeListStyle.innerHTML = "List";
    displayProducts();
  }
};

function listItems() {
  let http = new XMLHttpRequest();
  http.open("get", "data/produse.json", true);
  http.send();

  http.onload = function () {
    document.querySelector(".products-list").style.display = "grid";
    document.querySelector(".products-grid").style.display = "none";
    document.getElementById("list").style.background = "white";
    document.getElementById("grid").style.background = "transparent";
    if (this.readyState == 4 && this.status == 200) {
      products = JSON.parse(this.responseText);
      let _activeListStyle = document.getElementById("_activeListStyle");
      _activeListStyle.innerHTML = "List";
      let _activeCategoryStyle = document.getElementById("_activeCategoryStyle");
      if (_activeCategoryStyle.innerText != "Toate") {
        displayCategoryProducts();
      } else {
        displayProducts();
      }
    }
  };
}

function gridItems() {
  let http = new XMLHttpRequest();
  http.open("get", "data/produse.json", true);
  http.send();

  http.onload = function () {
    document.querySelector(".products-list").style.display = "none";
    document.querySelector(".products-grid").style.display = "grid";
    document.getElementById("grid").style.background = "white";
    document.getElementById("list").style.background = "transparent";
    if (this.readyState == 4 && this.status == 200) {
      products = JSON.parse(this.responseText);
      let _activeListStyle = document.getElementById("_activeListStyle");
      _activeListStyle.innerHTML = "Grid";
      let _activeCategoryStyle = document.getElementById("_activeCategoryStyle");
      if (_activeCategoryStyle.innerText != "Toate") {
        displayCategoryProducts();
      } else {
        displayProducts();
      }
    }
  };
}

function displayProducts() {
  let _activeListStyle = document.getElementById("_activeListStyle").innerText;
  let productsOutput = "";

  if (_activeListStyle === "List") {
    for (let item of products) {
      let pricePer = `${item.price} RON <span class="sm:text-base phoneM:text-sm phoneS:text-xs text-gray-500 tracking-wide"> / ${item.per}</span>`;

      productsOutput += `
          <div class="product flex bg-slate-50 border border-solid border-slate-200 hover:border-slate-400/40 hover:shadow-sm rounded-xl p-3">
            <div>
              <img class="sm:min-w-32 sm:h-32 phoneS:min-w-28 phoneS:h-28 w-full rounded-lg" src="${item.image}" alt="${item.image}">
            </div>
            <div class="flex flex-col justify-between ml-6 my-1 w-full">
              <div>
                <p class="font-extrabold sm:text-xs phoneS:text-[11px] text-gray-500 uppercase">${item.category}</p>
                <p class="font-bold sm:text-lg phoneS:text-base text-main-blue">${item.title}</p>
                <p class="specification1 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-gray-600">${item.specification1}</p>
                <p class="specification2 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-gray-600">${item.specification2}</p>
              </div>
              <div>
                <p class="price font-black sm:text-title phoneM:text-[20px] phoneS:text-[17px] text-main-blue text-right pr-4">${pricePer}</p>
              </div>
            </div>
          </div>
        `;
    }
    document.querySelector(".products-list").innerHTML = productsOutput;
    // if(maxProductsToDisplay === 24) {
    // document.querySelector(".number-product").innerHTML = 'Toate';
    // } else {
    // document.querySelector(".number-product").innerHTML = maxProductsToDisplay;
    // }
  } else {
    for (let item of products) {
      let pricePer = `${item.price} RON <span class="text-base sm:text-base phoneM:text-sm phoneS:text-xs text-gray-500 tracking-wide"> / ${item.per}</span>`;
      productsOutput += `
        <div class="product flex flex-col bg-slate-50 border border-solid border-slate-200 hover:border-slate-300 rounded-xl p-3">
          <div>
            <img class="h-full w-full rounded-lg" src="${item.image}" alt="${item.image}">
          </div>
          <div class="flex flex-col justify-between ml-2 my-2 h-full">
            <div>
              <p class="font-bold sm:text-lg phoneS:text-base ">${item.title}</p>
              <p class="specification1 font-context font-medium      lg:text-[15px] phoneS:text-[13px] text-[15px] text-gray-600">${item.specification1}</p>
              <p class="specification2 mb-4 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-[15px] text-gray-600">${item.specification2}</p>
            </div>
            <div>
              <p class="price font-black sm:text-title phoneM:text-[20px] phoneS:text-[17px] text-right pr-2">${pricePer}</p>
            </div>
          </div>
        </div>
      `;
    }
    document.querySelector(".products-grid").innerHTML = productsOutput;
    // if(maxProductsToDisplay === 24) {
    // document.querySelector(".number-product").innerHTML = 'Toate';
    // } else {
    // document.querySelector(".number-product").innerHTML = maxProductsToDisplay;
    // }
  }
}

function displayCategoryProducts() {
  let _activeListStyle = document.getElementById("_activeListStyle").innerText;
  let _activeCategoryStyle = document.getElementById("_activeCategoryStyle").innerText;
  let productsOutput = "";

  if (_activeListStyle === "List") {
    for (let item of products) {
      let pricePer = `${item.price} RON <span class="sm:text-base phoneM:text-sm phoneS:text-xs text-gray-500 tracking-wide"> / ${item.per}</span>`;

      if (item.category === _activeCategoryStyle) {
        productsOutput += `
          <div class="product flex bg-slate-50 border border-solid border-slate-200 hover:border-slate-400/40 hover:shadow-sm rounded-xl p-3">
            <div>
              <img class="sm:min-w-32 sm:h-32 phoneS:min-w-28 phoneS:h-28 w-full rounded-lg" src="${item.image}" alt="${item.image}">
            </div>
            <div class="flex flex-col justify-between ml-6 my-1 w-full">
              <div>
                <p class="font-extrabold sm:text-xs phoneS:text-[11px] text-gray-500 uppercase">${item.category}</p>
                <p class="font-bold sm:text-lg phoneS:text-base text-main-blue">${item.title}</p>
                <p class="specification1 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-gray-600">${item.specification1}</p>
                <p class="specification2 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-gray-600">${item.specification2}</p>
              </div>
              <div>
                <p class="price font-black sm:text-title phoneM:text-[20px] phoneS:text-[17px] text-main-blue text-right pr-4">${pricePer}</p>
              </div>
            </div>
          </div>
        `;
      } else {
        productsOutput += ``;
      }
    }
    document.querySelector(".products-list").innerHTML = productsOutput;
    // if(maxProductsToDisplay === 24) {
    // document.querySelector(".number-product").innerHTML = 'Toate';
    // } else {
    // document.querySelector(".number-product").innerHTML = maxProductsToDisplay;
    // }
  } else {
    for (let item of products) {
      let pricePer = `${item.price} RON <span class="text-base sm:text-base phoneM:text-sm phoneS:text-xs text-gray-500 tracking-wide"> / ${item.per}</span>`;

      if (item.category === _activeCategoryStyle) {
        productsOutput += `
              <div class="product flex flex-col bg-slate-50 border border-solid border-slate-200 hover:border-slate-300 rounded-xl p-3">
                <div>
                  <img class="h-full w-full rounded-lg" src="${item.image}" alt="${item.image}">
                </div>
                <div class="flex flex-col justify-between ml-2 my-2 h-full">
                  <div>
                    <p class="font-bold sm:text-lg phoneS:text-base ">${item.title}</p>
                    <p class="specification1 font-context font-medium      lg:text-[15px] phoneS:text-[13px] text-[15px] text-gray-600">${item.specification1}</p>
                    <p class="specification2 mb-4 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-[15px] text-gray-600">${item.specification2}</p>
                  </div>
                  <div>
                    <p class="price font-black sm:text-title phoneM:text-[20px] phoneS:text-[17px] text-right pr-2">${pricePer}</p>
                  </div>
                </div>
              </div>
            `;
      } else {
        productsOutput += ``;
      }
    }
    document.querySelector(".products-grid").innerHTML = productsOutput;
    // if(maxProductsToDisplay === 24) {
    // document.querySelector(".number-product").innerHTML = 'Toate';
    // } else {
    // document.querySelector(".number-product").innerHTML = maxProductsToDisplay;
    // }
  }
}

function categoryProduct(category, element) {
  let buttons = document.getElementsByClassName("pcategory");
  for (let button of buttons) {
    button.classList.remove("border-green-500", "text-green-600");
  }
  element.classList.add("border-green-500", "text-green-600");

  let _activeCategoryStyle = document.getElementById("_activeCategoryStyle");
  _activeCategoryStyle.innerHTML = category;
  if (category === "Toate") {
    displayProducts();
  } else {
    displayCategoryProducts();
  }

  return _activeCategoryStyle.innerText;
}

window.onload = document.getElementsByClassName("pcategory")[0].classList.add("border-green-500", "text-green-600");
window.onload = function () {
  document.getElementById("form").reset();
};
