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
    behavior: "smooth",
  });
}
function disableFixedCategory() {
  let categoryMenu = document.getElementById("sideCategory");
  let fixedCategoryMenu = document.getElementById("fixedCategory");
  let lastProduct = document.getElementById("productsDiv");
  let lastProductBottomCoord = lastProduct.getBoundingClientRect().bottom;
  if (window.innerHeight <= lastProductBottomCoord + 60) {
    fixedCategoryMenu.classList.add("fixed");
  } else {
    fixedCategoryMenu.classList.remove("fixed");
  }
}
window.addEventListener("scroll", disableFixedCategory);

disableFixedCategory();

let isSideMenuOpened = false;
function openSideMenu() {
  let sideButton = document.getElementById("sideMenuButton");
  let toggleButton = document.getElementById("sideMenu");
  let toggleImage = document.getElementById("sideMenuImageToggle");
  let stopScroll = document.getElementById("body");

  sideButton.classList.toggle("hidden");
  toggleButton.classList.toggle("w-56");
  toggleButton.classList.toggle("px-2");
  stopScroll.classList.toggle("h-full");
  stopScroll.classList.toggle("overflow-hidden");
  document.getElementById("overlay").classList.toggle("backdrop-blur-sm");
  document.getElementById("overlay").classList.toggle("w-screen");

  if (isSideMenuOpened === false) {
    toggleImage.src = "./img/icons/close.svg";
    isSideMenuOpened = true;
  } else {
    toggleImage.src = "./img/icons/menu.svg";
    isSideMenuOpened = false;
  }
}
function openCategoryMenu() {
  let categoryButton = document.getElementById("categoryMenuButton");
  let toggleButton = document.getElementById("categoryMenu");
  let toggleSideImage = document.getElementById("sideMenuImageToggle");
  let toggleCategoryImage = document.getElementById("categoryMenuImageToggle");
  let stopScroll = document.getElementById("body");

  categoryButton.classList.toggle("hidden");
  toggleSideImage.classList.toggle("hidden");
  toggleCategoryImage.classList.toggle("hidden");
  toggleButton.classList.toggle("w-56");
  toggleButton.classList.toggle("px-2");
  stopScroll.classList.toggle("h-full");
  stopScroll.classList.toggle("overflow-hidden");
  document.getElementById("overlay").classList.toggle("backdrop-blur-sm");
  document.getElementById("overlay").classList.toggle("w-screen");

  if (isSideMenuOpened === false) {
    toggleCategoryImage.src = "./img/icons/close.svg";
    isSideMenuOpened = true;
  } else {
    toggleCategoryImage.src = "./img/icons/menu.svg";
    isSideMenuOpened = false;
  }
}
function openCartMenu() {
  let showCartMenu = document.getElementById("cartMenu");
  let stopScroll = document.getElementById("body");

  showCartMenu.classList.toggle("sm:w-3/4");
  showCartMenu.classList.toggle("phoneS:w-full");
  stopScroll.classList.toggle("h-full");
  stopScroll.classList.toggle("overflow-hidden");
  document.getElementById("overlayEffect").classList.toggle("backdrop-blur-sm");
  document.getElementById("overlayEffect").classList.toggle("w-screen");
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
    displayCategoryProducts();
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
      displayCategoryProducts();
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
      displayCategoryProducts();
    }
  };
}

function displayProducts() {
  let _activeListStyle = document.getElementById("_activeListStyle").innerText;
  let _activePrice = document.getElementById("_activePrice").innerText;
  let productsOutput = "";

  if (_activeListStyle === "List") {
    for (let item of products) {
      let pricePer = `${item.price} RON <span class="sm:text-base phoneM:text-sm phoneS:text-xs text-gray-500 tracking-wide"> / ${item.per}</span>`;

      if (item.price <= _activePrice) {
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

// input = document.querySelector(".productQuantity");
// input.value = 1;
// productQuantityValue = Number(input.value);
// function changeProductQuantity(operation) {
//   if (operation === "add") {
//     productQuantityValue++;
//     input.value = productQuantityValue;
//   } else if (operation !== "add" && productQuantityValue > 1) {
//     productQuantityValue--;
//     input.value = productQuantityValue;
//   }
// }

let shoppingCart = [];
let itemsInCart = 0;
let numberOfProducts = -1;

function addToCart(index) {
  if (index >= 0 && index < products.length) {
    let item = products[index];
    shoppingCart.push(item);
    numberOfProducts += 1;
    itemsInCart += 1;
  } else {
    console.log("Nu se poate adăuga produsul");
  }

  document.querySelector(".itemsInCart").innerHTML = itemsInCart;
  displayCart(numberOfProducts, index);
}
function removeFromCart(index) {
  console.log(index);
  if (index >= 0 && index < shoppingCart.length) {
    let item = shoppingCart[index];
    shoppingCart.splice(index, 1); // Elimină produsul din coș
    updateCart();
    numberOfProducts -= 1;
    itemsInCart -= 1;
  } else {
    console.log("Nu se poate elimina produsul");
  }
  document.querySelector(".itemsInCart").innerHTML = itemsInCart;
}

function updateCart() {
  let cartOutput = "";
  shoppingCart.forEach((item, index) => {
    cartOutput += `
      <div class="flex items-start justify-between pt-4 px-2">
      <div class="flex items-start gap-4 flex-nowrap">
        <div>
          <img class="sm:min-w-24 sm:w-24 sm:h-24 phoneS:min-w-16 phoneS:w-16 phoneS:h-16 w-full rounded-lg" src="${item.image}" alt="" />
        </div>
        <div class="grid grid-cols-1 content-between min-h-24">
          <div>
            <div class="flex items-center gap-5 flex-nowrap">
              <p class="font-display font-bold sm:text-lg phoneS:text-base text-main-blue">${item.title}</p>
              <p class="font-display font-extrabold pt-0.5 px-3 sm:text-xs phoneS:text-[10px] border border-gray-200 rounded-full text-gray-400 uppercase">${item.category}</p>
            </div>
            <div class="divide-x divide-solid divide-gray-200 flex items-center space-x-2">
              <p class="specification2 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-gray-600">${item.specification1}</p>
              <p class="specification2 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-gray-600 pl-2">${item.specification2}</p>
            </div>
          </div> 
        <div class="flex items-center justify-start">
          <button class="flex items-center gap-2 py-1 rounded-lg">
            <img class="w-4 h-4" src="img/icons/delete.svg" alt="" />
            <p class="md:text-sm sm:text-xs font-semibold text-gray-600 bg-transparent" onclick="removeFromCart(${index})">Elimină</p>
          </button>
        </div>
        </div>
      </div>
      
      <div class="flex flex-col items-end justify-between flex-nowrap min-h-24 mr-5">
        <p class="font-display font-extrabold sm:text-xs phoneS:text-[10px] px-3  pt-0.5 bg-gray-100 rounded-full text-gray-700 uppercase">${item.per}</p>
        <p class="font-display font-black sm:text-xl phoneM:text-base phoneS:text-sm text-main-blue">${item.price} RON</p>
      </div>
    </div>
    `;
  });

  document.querySelector(".cartMenu").innerHTML = cartOutput;
}

function displayCart(numberOfProducts) {
  let cartItems = "";
  cartItems += `
    <div class="flex items-start justify-between pt-4 px-2">
      <div class="flex items-start gap-4 flex-nowrap">
        <div>
          <img class="sm:min-w-24 sm:w-24 sm:h-24 phoneS:min-w-16 phoneS:w-16 phoneS:h-16 w-full rounded-lg" src="${shoppingCart[numberOfProducts].image}" alt="" />
        </div>
        <div class="grid grid-cols-1 content-between min-h-24">
          <div>
            <div class="flex items-center gap-5 flex-nowrap">
              <p class="font-display font-bold sm:text-lg phoneS:text-base text-main-blue">${shoppingCart[numberOfProducts].title}</p>
              <p class="font-display font-extrabold pt-0.5 px-3 sm:text-xs phoneS:text-[10px] border border-gray-200 rounded-full text-gray-400 uppercase">${shoppingCart[numberOfProducts].category}</p>
            </div>
            <div class="divide-x divide-solid divide-gray-200 flex items-center space-x-2">
              <p class="specification2 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-gray-600">${shoppingCart[numberOfProducts].specification1}</p>
              <p class="specification2 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-gray-600 pl-2">${shoppingCart[numberOfProducts].specification2}</p>
            </div>
          </div> 
        <div class="flex items-center justify-start">
          <button class="flex items-center gap-2 py-1 rounded-lg">
            <img class="w-4 h-4" src="img/icons/delete.svg" alt="" />
            <p class="md:text-sm sm:text-xs font-semibold text-gray-600 bg-transparent" onclick="removeFromCart(${numberOfProducts})">Elimină</p>
          </button>
        </div>
        </div>
      </div>
      
      <div class="flex flex-col items-end justify-between flex-nowrap min-h-24 mr-5">
        <p class="font-display font-extrabold sm:text-xs phoneS:text-[10px] px-3  pt-0.5 bg-gray-100 rounded-full text-gray-700 uppercase">${shoppingCart[numberOfProducts].per}</p>
        <p class="font-display font-black sm:text-xl phoneM:text-base phoneS:text-sm text-main-blue">${shoppingCart[numberOfProducts].price} RON</p>
      </div>
    </div>
  `;
  console.log(shoppingCart[numberOfProducts].title);
  document.querySelector(".cartMenu").innerHTML += cartItems;
}

function displayCategoryProducts() {
  let _activeListStyle = document.getElementById("_activeListStyle").innerText;
  let _activeCategoryStyle = document.getElementById("_activeCategoryStyle").innerText;
  let _activePrice = document.getElementById("_activePrice").innerText;
  let productsOutput = "";

  if (_activeListStyle === "List") {
    products.forEach((item, index) => {
      let pricePer = `${item.price} RON <span class="sm:text-base phoneM:text-xs phoneS:text-[10px] text-gray-500 tracking-wide"> / ${item.per}</span>`;

      if ((item.category === _activeCategoryStyle || _activeCategoryStyle === "Toate") && item.price <= _activePrice) {
        productsOutput += `
          <div class="product relative flex bg-slate-50 border border-solid border-slate-200 hover:border-slate-400/40 hover:shadow-sm rounded-xl p-3">
            <div>
              <img class="sm:min-w-32 sm:w-32 sm:h-32 phoneS:min-w-28 phoneS:w-28 phoneS:h-28 w-full rounded-lg" src="${item.image}" alt="${item.image}">
            </div>
            <div class="flex flex-col justify-between ml-6 mt-1 w-full">
              <div>
                <p class="font-extrabold sm:text-xs phoneS:text-[10px] text-gray-400 uppercase">${item.category}</p>
                <p class="font-bold sm:text-lg phoneS:text-base text-main-blue">${item.title}</p>
                <p class="specification1 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-gray-600">${item.specification1}</p>
                <p class="specification2 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-gray-600">${item.specification2}</p>
              </div>
              <div class="">
                <p class="price font-black sm:text-xl phoneM:text-base phoneS:text-sm text-main-blue text-right sm:pr-2">${pricePer}</p>
              </div>
            </div>
            <button class="add-to-cart-btn  absolute flex items-center justify-center bg-white border border-slate-200 top-2 right-2 font-bold py-3 px-3 rounded-lg" onclick="addToCart(${index})">
              <img class="sm:w-5 sm:h-5 phoneS:w-4 phoneS:h-4" src="./img/icons/addToCart.svg">
            </button>
          </div>
          
        `;
      }
    });
    document.querySelector(".products-list").innerHTML = productsOutput;
  } else {
    products.forEach((item, index) => {
      let pricePer = `${item.price} RON <span class="text-base sm:text-base phoneM:text-sm phoneS:text-xs text-gray-500 tracking-wide"> / ${item.per}</span>`;

      if ((item.category === _activeCategoryStyle || _activeCategoryStyle === "Toate") && item.price <= _activePrice) {
        productsOutput += `
          <div class="product relative flex flex-col bg-slate-50 border border-solid border-slate-200 hover:border-slate-300 rounded-xl p-3">
            <div>
              <img class="h-full w-full rounded-lg" src="${item.image}" alt="${item.image}">
            </div>
            <div class="flex flex-col justify-between ml-2 mt-2 h-full">
              <div>
                <p class="font-bold sm:text-lg phoneS:text-base ">${item.title}</p>
                <p class="specification1 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-[15px] text-gray-600">${item.specification1}</p>
                <p class="specification2 mb-4 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-[15px] text-gray-600">${item.specification2}</p>
              </div>
              <div class="">
                <p class="price font-black sm:text-title phoneM:text-[20px] phoneS:text-[17px] text-right pr-2">${pricePer}</p>
              </div>
            </div>
            <button class="add-to-cart-btn z-10 absolute flex items-center justify-center backdrop-blur-sm dark:bg-white/50 border border-slate-200 top-4 right-4 font-bold py-3 px-3 rounded-lg" onclick="addToCart(${index})">
              <img class="sm:w-5 sm:h-5 phoneS:w-4 phoneS:h-4" src="./img/icons/addToCart.svg">
            </button>
          </div>
          `;
      }
    });
    document.querySelector(".products-grid").innerHTML = productsOutput;
  }
}

function categoryProduct(category, element) {
  let buttons = document.getElementsByClassName("categoryB");
  for (let button of buttons) {
    button.classList.remove("border-green-500", "text-green-600", "font-medium");
  }
  element.classList.add("border-green-500", "text-green-600", "font-medium");

  let _activeCategoryStyle = document.getElementById("_activeCategoryStyle");
  _activeCategoryStyle.innerHTML = category;
  displayCategoryProducts();

  window.scrollTo(0, 0);
}
function choosedPrice(price, element) {
  let buttons = document.getElementsByClassName("priceB");
  for (let button of buttons) {
    button.classList.remove("border-green-500", "text-green-600", "font-medium", "bg-green-100/60", "rounded-r-lg");
  }
  element.classList.add("border-green-500", "text-green-600", "font-medium", "bg-green-100/60", "rounded-r-lg");

  let _activePrice = document.getElementById("_activePrice");
  _activePrice.innerHTML = price;
  displayCategoryProducts();

  window.scrollTo(0, 0);
}
window.onload = document.getElementById("allPricesDesktop").classList.add("border-green-500", "text-green-600", "font-medium", "bg-green-100/60", "rounded-r-lg");
window.onload = document.getElementById("allProductsDesktop").classList.add("border-green-500", "text-green-600", "font-medium");
window.onload = document.getElementById("allPricesMobile").classList.add("border-green-500", "text-green-600", "font-medium", "bg-green-100/60", "rounded-r-lg");
window.onload = document.getElementById("allProductsMobile").classList.add("border-green-500", "text-green-600", "font-medium");
window.onload = function () {
  document.getElementById("form").reset();
};
