var stripe = Stripe("pk_test_51PgNVqRt0dowyNS878vrcvajElZ6OItdFHWCsr6h0KUymChtQpNP2ay4Zd7ChrEDBwu4Sym9JQ0FTmhwDDd8Nj8J00nUr7kUbi");

function buyItem() {
  stripe.redirectToCheckout({
    lineItems: [cartToStripe],

    mode: "payment",
    shippingAddressCollection: {
      allowedCountries: ["RO"],
    },
    successUrl: "https://www.glassto.github.io/welovepacks/products.html",
    cancelUrl: "https://www.glassto.github.io/welovepacks/products.html",
  });
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
      let pricePer = `${item.cost} RON <span class="sm:text-base phoneM:text-sm phoneS:text-xs text-gray-500 tracking-wide"> / ${item.per}</span>`;

      if (item.cost <= _activePrice) {
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
      let pricePer = `${item.cost} RON <span class="text-base sm:text-base phoneM:text-sm phoneS:text-xs text-gray-500 tracking-wide"> / ${item.per}</span>`;
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

let cartToStripe = [];
function cartToBuy(numberOfProducts) {
  let quantityToAdd = { quantity: 1 };
  let cartToBuy = { price: `${shoppingCart[numberOfProducts].price}` };
  cartToStripe = { ...cartToStripe, ...cartToBuy, ...quantityToAdd };
  console.log(cartToStripe);
}

let shoppingCart = [];
let itemsInCart = 0;
let numberOfProducts = -1;
let cartPrice = 0;
let deliveryFee = 0;
let totalSum = 0;

function addToCart(index) {
  let cartPriceWindow = document.getElementById("cartPriceWindow");
  let cartButtons = document.getElementById("cartButtons");
  let cartEmptyMessage = document.getElementById("cartEmptyMessage");

  if (index >= 0 && index < products.length) {
    let item = products[index];
    shoppingCart.push(item);
    cartPrice += Number(item.cost);
    totalSum = cartPrice + deliveryFee;
    numberOfProducts += 1;
    itemsInCart += 1;

    if (cartPrice > 0) {
      cartEmptyMessage.classList.add("hidden");
      cartPriceWindow.classList.add("flex");
      cartButtons.classList.add("flex");
      cartPriceWindow.classList.remove("hidden");
      cartButtons.classList.remove("hidden");
    } else {
      cartEmptyMessage.classList.remove("hidden");
      cartEmptyMessage.classList.add("block");
      cartPriceWindow.classList.add("hidden");
      cartButtons.classList.add("hidden");
    }
  } else {
    console.log("Nu se poate adăuga produsul");
  }

  document.querySelector(".cart-subtotal").innerText = cartPrice;
  document.querySelector(".cart-total").innerText = totalSum;
  document.querySelector(".itemsInCart").innerText = itemsInCart;
  displayCart(numberOfProducts, index);
  deliveryCost();
  cartToBuy(numberOfProducts);
}

function removeFromCart(index) {
  let cartPriceWindow = document.getElementById("cartPriceWindow");
  let cartButtons = document.getElementById("cartButtons");
  let cartEmptyMessage = document.getElementById("cartEmptyMessage");

  console.log(index);
  if (index >= 0 && index < shoppingCart.length) {
    let item = shoppingCart[index];
    shoppingCart.splice(index, 1); // Elimină produsul din coș
    cartPrice -= Number(item.cost);
    totalSum = cartPrice + deliveryFee;
    updateCart();
    deliveryCost();
    numberOfProducts -= 1;
    itemsInCart -= 1;

    if (cartPrice > 0) {
      cartEmptyMessage.classList.add("hidden");
      cartPriceWindow.classList.add("flex");
      cartButtons.classList.add("flex");
      cartPriceWindow.classList.remove("hidden");
      cartButtons.classList.remove("hidden");
    } else {
      cartEmptyMessage.classList.remove("hidden");
      cartEmptyMessage.classList.add("flex");
      cartPriceWindow.classList.add("hidden");
      cartButtons.classList.add("hidden");
    }
  } else {
    console.log("Nu se poate elimina produsul");
  }

  document.querySelector(".cart-subtotal").innerText = cartPrice;
  document.querySelector(".cart-total").innerText = totalSum;
  document.querySelector(".itemsInCart").innerText = itemsInCart;
}
function deliveryCost() {
  if (cartPrice >= 500) {
    deliveryFee = 0;
    document.querySelector(".delivery-fee").innerText = deliveryFee;
  } else {
    deliveryFee = 50;
    document.querySelector(".delivery-fee").innerText = deliveryFee;
  }
}

function updateCart() {
  let cartOutput = "";
  shoppingCart.forEach((item, index) => {
    cartOutput += `
      <div>
        <div class="flex items-start justify-between mb-2 pt-6 px-2">
          <div class="flex items-start gap-4 flex-nowrap">
            <div>
              <img class="sm:min-w-24 sm:w-24 sm:h-24 phoneS:min-w-16 phoneS:w-16 phoneS:h-16 w-full rounded-lg" src="${item.image}" alt="" />
            </div>
            <div class="grid grid-cols-1 content-between min-h-24 w-full">
              <div>
                <div class="flex items-center gap-5 flex-wrap">
                  <p class="font-display font-bold md:text-lg sm:text-base phoneS:text-15 text-main-blue">${item.title}</p>
                </div>
                <div class="divide-x divide-solid divide-gray-200 flex items-center space-x-2">
                  <p class="specification2 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-gray-600/90">${item.specification1}</p>
                  <p class="specification2 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-gray-600/90 pl-2">${item.specification2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <button class="flex items-center gap-2 sm:ml-30 phoneS:ml-22 py-1 rounded-lg" onclick="removeFromCart(${index})">
            <img class="w-4 h-4" src="img/icons/delete.svg" alt="" />
            <p class="md:text-sm phoneS:text-xs font-semibold text-gray-600 bg-transparent">Elimină</p>
          </button>
          <div class="flex flex-row items-center gap-3 mr-3">
            <p class="font-display font-extrabold sm:text-xs phoneS:text-[10px] px-3 pt-0.5 bg-gray-100 rounded-full text-gray-700 uppercase">${item.per}</p>
            <p class="font-display font-black sm:text-xl phoneM:text-base phoneS:text-sm text-main-blue">${item.cost} RON</p>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector(".cartMenu").innerHTML = cartOutput;
}

function displayCart(numberOfProducts) {
  let cartItems = "";
  cartItems += `
    <div>
      <div class="flex items-start justify-between mb-2 pt-6 px-2">
        <div class="flex items-start gap-4 flex-nowrap">
          <div>
            <img class="sm:min-w-24 sm:w-24 sm:h-24 phoneS:min-w-16 phoneS:w-16 phoneS:h-16 w-full rounded-lg" src="${shoppingCart[numberOfProducts].image}" alt="" />
          </div>
          <div>
            <div>
              <div class="flex items-center sm:gap-5 phoneS:gap-1 flex-wrap">
                <p class="font-display font-bold md:text-lg sm:text-base phoneS:text-15 text-main-blue">${shoppingCart[numberOfProducts].title}</p>
              </div>
              <div class="divide-x divide-solid divide-gray-200 flex items-center space-x-2">
                <p class="specification2 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-gray-600/90">${shoppingCart[numberOfProducts].specification1}</p>
                <p class="specification2 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-gray-600/90 pl-2">${shoppingCart[numberOfProducts].specification2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <button class="flex items-center gap-2 sm:ml-30 phoneS:ml-22 py-1 rounded-lg" onclick="removeFromCart(${numberOfProducts})">
          <img class="w-4 h-4" src="img/icons/delete.svg" alt="" />
          <p class="md:text-sm phoneS:text-xs font-semibold text-gray-600 bg-transparent">Elimină</p>
        </button>
        <div class="flex flex-row items-center gap-3 mr-3">
          <p class="font-display font-extrabold sm:text-xs phoneS:text-[10px] px-3 pt-0.5 bg-gray-100 rounded-full text-gray-700 uppercase">${shoppingCart[numberOfProducts].per}</p>
          <p class="font-display font-black sm:text-xl phoneM:text-base phoneS:text-sm text-main-blue">${shoppingCart[numberOfProducts].cost} <span class="text-gray-500"> RON</span></p>
        </div>
      </div>
    </div>
  `;
  document.querySelector(".cartMenu").innerHTML += cartItems;
}

function displayCategoryProducts() {
  let _activeListStyle = document.getElementById("_activeListStyle").innerText;
  let _activeCategoryStyle = document.getElementById("_activeCategoryStyle").innerText;
  let _activePrice = document.getElementById("_activePrice").innerText;
  let productsOutput = "";

  if (_activeListStyle === "List") {
    products.forEach((item, index) => {
      let pricePer = `${item.cost} RON <span class="sm:text-base phoneM:text-xs phoneS:text-[10px] text-gray-500 tracking-wide"> / ${item.per}</span>`;

      if ((item.category === _activeCategoryStyle || _activeCategoryStyle === "Toate") && item.cost <= _activePrice) {
        productsOutput += `
          <div class="product relative flex bg-slate-50 border border-solid border-slate-200 hover:border-slate-400/40 hover:shadow-sm rounded-xl p-3">
            <div>
              <img class="sm:min-w-32 sm:w-32 sm:h-32 phoneS:min-w-28 phoneS:w-28 phoneS:h-28 w-full rounded-lg" src="${item.image}" alt="${item.image}">
            </div>
            <div class="flex flex-col justify-between ml-6 mt-1 w-full">
              <div>
                <p class="font-extrabold sm:text-xs phoneS:text-[10px] text-gray-400 uppercase">${item.category}</p>
                <p class="font-bold md:text-lg sm:text-base phoneS:text-15 text-main-blue">${item.title}</p>
                <p class="specification1 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-gray-600/90">${item.specification1}</p>
                <p class="specification2 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-gray-600/90">${item.specification2}</p>
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
      let pricePer = `${item.cost} RON <span class="text-base sm:text-base phoneM:text-sm phoneS:text-xs text-gray-500 tracking-wide"> / ${item.per}</span>`;

      if ((item.category === _activeCategoryStyle || _activeCategoryStyle === "Toate") && item.cost <= _activePrice) {
        productsOutput += `
          <div class="product relative flex flex-col bg-slate-50 border border-solid border-slate-200 hover:border-slate-300 rounded-xl p-3">
            <div>
              <img class="h-full w-full rounded-lg" src="${item.image}" alt="${item.image}">
            </div>
            <div class="flex flex-col justify-between ml-2 mt-2 h-full">
              <div class="mb-4">
                <p class="font-bold sm:text-lg phoneS:text-base">${item.title}</p>
                <p class="specification1 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-[15px] text-gray-600/90">${item.specification1}</p>
                <p class="specification2 font-context font-medium lg:text-[15px] phoneS:text-[13px] text-[15px] text-gray-600/90">${item.specification2}</p>
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
