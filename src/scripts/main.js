const replaceCurrencyButton = document.querySelector(".fa-exchange-alt");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modal__close");
const exchangeRate = document.querySelector("#exchangeRate");
const convertButton = document.querySelector(".convert-btn");
const currencyNameFrom = document.querySelector(".currency__name--from");
const currencyNameTo = document.querySelector(".currency__name--to");
const currencyButtonFrom = document.querySelector(".currency__button--from");
const currencyButtonTo = document.querySelector(".currency__button--to");
let flag = document.querySelectorAll(".modal__country-flag");
let whichButtonClicked = null;

// modal close and open
currencyButtonFrom.addEventListener("click", () => {
  modal.style.display = "block";
  whichButtonClicked = "from";
});

currencyButtonTo.addEventListener("click", () => {
  modal.style.display = "block";
  whichButtonClicked = "to";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  whichButtonClicked = null;
});

// ui of countries
const countries = document.querySelector(".modal__country-list");

const addFirstLetter = () => {
  const firstLetters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  firstLetters.forEach((letter) => {
    const html = `
    <div class="modal__sort-first-letter">
      <p class="first-letter">${letter}</p>
      <ul class="modal__sorted-items">
      </ul>
    </div>
    `;
    countries.insertAdjacentHTML("beforeend", html);
  });
};

const addCountries = () => {
  const countryCodes = Object.keys(countryList);

  countryCodes.forEach((code) => {
    const html = `
    <li class="modal__country-item">
      <img
        src="https://flagcdn.com/48x36/${countryList[code].toLowerCase()}.png"
        class="modal__country-flag"
        />
      <span class="modal__country-code">${code}</span>
    </li>
    `;
    const firstLetter = document.querySelectorAll(".first-letter");
    firstLetter.forEach((letter) => {
      if (code.charAt(0) === letter.innerHTML) {
        const ul = letter.nextElementSibling;
        ul.innerHTML += html;
      }
    });
  });
};

addFirstLetter();
addCountries();

// search
const search = document.querySelector("#searchCountry");
const countryItems = document.querySelectorAll(".modal__country-item");

search.addEventListener("keyup", (e) => {
  const searchValue = e.target.value.toLowerCase().trim();
  countryItems.forEach((item) => {
    const countryName = item.querySelector(".modal__country-code").innerHTML;
    if (countryName.toLowerCase().indexOf(searchValue) !== -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  const divFirstLetter = document.querySelectorAll(".modal__sort-first-letter");
    divFirstLetter.forEach((letter) => {
      const countryItems = letter.querySelectorAll(".modal__country-item");
      let allHidden = true;
      countryItems.forEach((item) => {
        if (item.style.display === "block") {
          allHidden = false;
        }
      });
      if (allHidden) {
        letter.style.display = "none";
      }
      if (!allHidden) {
        letter.style.display = "block";
      }
    })
});

// swap currencies on click on replaceCurrencyButton

replaceCurrencyButton.addEventListener("click", () => {
  let temp1 = currencyNameTo.textContent;
  let temp2 = currencyNameFrom.textContent;
  let temp3 = document.querySelector(".currency__button--from img").src;
  let temp4 = document.querySelector(".currency__button--to img").src;  
  document.querySelector(".currency__button--from img").src = temp4;
  document.querySelector(".currency__button--to img").src = temp3;
  currencyNameFrom.textContent = temp1;
  currencyNameTo.textContent = temp2; 
  temp1 = currencyNameTo.textContent;
  temp2 = currencyNameFrom.textContent;
  temp3 = document.querySelector(".currency__button--from img").src;
  temp4 = document.querySelector(".currency__button--to img").src;

  // INPUT VALUES
  let temp5 = document.querySelector(".currency__from .currency__input").value;
  let temp6 = document.querySelector(".currency__to .currency__input").value;
  document.querySelector(".currency__from .currency__input").value = temp6;
  document.querySelector(".currency__to .currency__input").value = temp5;
  temp5 = document.querySelector(".currency__from .currency__input").value;
  temp6 = document.querySelector(".currency__to .currency__input").value;
});

// selecting currency by clicking on country item
countryItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    const countryCode = e.target.querySelector(".modal__country-code").textContent;
    if (whichButtonClicked === "from") {
      currencyNameFrom.textContent = countryCode;
      flag = document.querySelector(".currency__button--from img");
      flag.src = `https://flagcdn.com/48x36/${countryList[countryCode].toLowerCase()}.png`;
    } else if (whichButtonClicked === "to") {
      currencyNameTo.textContent = countryCode;
      flag = document.querySelector(".currency__button--to img");
      flag.src = `https://flagcdn.com/48x36/${countryList[countryCode].toLowerCase()}.png`;
    }
    whichButtonClicked = null;
    modal.style.display = "none";
    getExchangeRate();
  })
})


// API call
const api_key = "f2f09b7262300fe483f42e38";

function getExchangeRate() {
  const amount = document.querySelector("#amount").value;
  exchangeRate.value = "Загрузка...";
  let url = `https://v6.exchangerate-api.com/v6/${api_key}/latest/${currencyNameFrom.textContent}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let fromValue = result.conversion_rates[currencyNameTo.textContent]; 
      let totalExRate = (amount * fromValue).toFixed(2); 
      exchangeRate.value = totalExRate;
    })
    .catch(() => {
      exchangeRate.value = "Упс... Помилка";
    });
}

convertButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

window.addEventListener("load", () => {
  getExchangeRate();
});