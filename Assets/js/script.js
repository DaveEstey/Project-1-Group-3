function showStockResults(resultObj) {
  var contentEl = document.getElementById("content");
  contentEl.innerHTML = `<textarea class="textarea h-full w-full" placeholder="Bio">${JSON.stringify(
    resultObj
  )}</textarea>`;

  
}
function showCryptoResults(resultObj) {
  var inputData = document.querySelector("#textResult");
  inputData.innerHTML = "";

  for (var i = 0; i < resultObj.length; i++) {
    var result = document.createElement("button");
    result.innerHTML = resultObj[i].name;
    result.setAttribute("class", resultObj[i].category_id )

    inputData.appendChild(result);
  }
}
/* 
function getCryptoApi(value) {
  var coinGeckoApi = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${value}&order=market_cap_desc&per_page=10&page=1&sparkline=false`;

  fetch(coinGeckoApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          showStockResults(data);
          makeOptions(data)
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function () {
      alert("Unable to connect to GitHub");
    });
} */

function getCryptoCatagories() {
  var coinGeckoApi = "https://api.coingecko.com/api/v3/coins/categories/list"

  fetch(coinGeckoApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          showCryptoResults(data);
          makeOptions(data)
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function () {
      alert("Unable to connect to GitHub");
    });
}

///////// Query "value" from stock API /////////
function getStockApi(value) {
  coinPolygonReference = `https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&search=${value}&apiKey=UAmJhIVKMGMQmJfv7Tja6hKiWkViJV6z`;

  fetch(coinPolygonReference)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          showStockResults(data);
          makeOptions(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function () {
      alert("Unable to connect to GitHub");
    });
}

///////// Defines the HTML elements /////////
var toggleEl = document.getElementById("cryptoStockToggle");
var searchEl = document.getElementById("searchBtn");
var searchInputEl = document.getElementById("searchInput");

///////// Add the Search button event listener /////////
searchEl.addEventListener("click", () => {
  if (toggleEl.checked) getStockApi(searchInputEl.value);
  if (!toggleEl.checked) getCryptoCatagories();
});


function makeOptions(data) { //needs STYLING AND CHANGE TO OTHER INPUT FEILD
  var makeOption = [];
  if (toggleEl.checked){
    for (var i = 0; i < data.results.length; i++) {
   makeOption = makeOption.concat(data.results[i].ticker);
  }
}else {
  for (var i = 0; i < data.length; i++) {
    makeOption = makeOption.concat(data[i].name);
}
  $(function () {
    $("#searchInput").autocomplete({
      source: makeOption
    });
  });
    }
}

/* function makeCatagories(cataData){
 for (var i = 0; i < resultObj.results.length; i++) {
    var result = document.createElement("div");
    result.innerHTML = resultObj.results[i].ticker;

    .appendChild(result);
  }
 } */
