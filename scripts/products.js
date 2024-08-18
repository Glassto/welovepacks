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
