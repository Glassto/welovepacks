
  let http = new XMLHttpRequest();
  http.open('get', 'produse.json', true);
  http.send();

  http.onload = function() {
    document.querySelector(".products-grid").style.display = 'none'
  document.getElementById('list').style.background = 'white';
  document.getElementById('grid').style.background = 'transparent';
  if(this.readyState == 4 && this.status == 200) {
    let products = JSON.parse(this.responseText)

    let output = "";

    for (let item of products) {
      let pricePer = `${item.price} RON <span class="sm:text-base phoneM:text-sm phoneS:text-xs text-gray-500 tracking-wide"> / ${item.per}</span>`
      output += `
        <div class="product flex bg-slate-50 border border-solid border-slate-200 hover:border-slate-400/40 hover:shadow-sm rounded-xl p-3">
          <div>
            <img class="sm:min-w-32 sm:h-32 phoneS:min-w-28 phoneS:h-28 w-full rounded-lg" src="${item.image}" alt="${item.image}">
          </div>
          <div class="flex flex-col justify-between ml-6 my-1 w-full">
            <div>
              <p class="font-bold sm:text-lg phoneS:text-base ">${item.title}</p>
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
    document.querySelector(".products-list").innerHTML = output;
  }
}

function listItems() {
  document.querySelector(".products-list").style.display = 'grid'
   document.querySelector(".products-grid").style.display = 'none'
   document.getElementById('list').style.background = 'white';
   document.getElementById('grid').style.background = 'transparent';
  let http = new XMLHttpRequest();
  http.open('get', 'produse.json', true);
  http.send();

  http.onload = function() {
  if(this.readyState == 4 && this.status == 200) {
    let products = JSON.parse(this.responseText)

    let output = "";

    for (let item of products) {
      let pricePer = `${item.price} RON <span class="sm:text-base phoneM:text-sm phoneS:text-xs text-gray-500 tracking-wide"> / ${item.per}</span>`
      output += `
        <div class="product flex bg-slate-50 border border-solid border-slate-200 hover:border-slate-400/40 hover:shadow-sm rounded-xl p-3">
          <div>
            <img class="sm:min-w-32 sm:h-32 phoneS:min-w-28 phoneS:h-28 w-full rounded-lg" src="${item.image}" alt="${item.image}">
          </div>
          <div class="flex flex-col justify-between ml-6 my-1 w-full">
            <div>
              <p class="font-bold sm:text-lg phoneS:text-base ">${item.title}</p>
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
    document.querySelector(".products-list").innerHTML = output;
  }
}
}

function gridItems() {
  document.querySelector(".products-list").style.display = 'none'
   document.querySelector(".products-grid").style.display = 'grid'
   document.getElementById('grid').style.background = 'white';
   document.getElementById('list').style.background = 'transparent';
  let http = new XMLHttpRequest();
  http.open('get', 'produse.json', true);
  http.send();

  http.onload = function() {
  if(this.readyState == 4 && this.status == 200) {
    let products = JSON.parse(this.responseText)

    let output = "";

    for (let item of products) {
        let pricePer = `${item.price} RON <span class="text-base text-gray-500 tracking-wide"> / ${item.per}</span>`
      output += `
        <div class="product flex flex-col bg-slate-50 border border-solid border-slate-200 hover:border-slate-300 rounded-xl p-3">
          <div>
            <img class="min-w-80 h-80 w-80 rounded-lg" src="${item.image}" alt="${item.image}">
          </div>
          <div class="flex flex-col justify-between ml-2 my-2 h-full">
            <div>
              <p class="font-bold text-lg ">${item.title}</p>
              <p class="specification1 font-context font-medium text-[15px] text-gray-600">${item.specification1}</p>
              <p class="specification2 font-context font-medium text-[15px] text-gray-600">${item.specification2}</p>
            </div>
            <div>
              <p class="price font-black text-title text-right pr-4">${pricePer}</p>
            </div>
          </div>
        </div>
      `;
    }
    document.querySelector(".products-grid").innerHTML = output;
  }
}
}




