import { countryList } from "./country-list.js";
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
const countryCodes = Object.keys(countryList);

const addFirstLetter = () => {
  const firstLetters = [...new Set(countryCodes.map(code => code[0]))];
  firstLetters.forEach(letter => {
    const html = `
    <ul class="modal__sort-first-letter">
      <p class="first-letter">${letter}</p>
      <div class="modal__sorted-items">
      </div>
    </ul>
    `;
    countries.insertAdjacentHTML("beforeend", html);
  });
};

const signFrom = document.querySelector("#signFrom");
const signTo = document.querySelector("#signTo");

const addCountries = () => {
  countryCodes.forEach(code => {
    const html = `
    <li class="modal__country-item">
      <img
        src="https://flagcdn.com/48x36/${countryList[
          code
        ][0].toLowerCase()}.png"
        class="modal__country-flag"
        />
      <span class="modal__country-code">${code}</span>
    </li>
    `;
    const firstLetter = document.querySelectorAll(".first-letter");
    firstLetter.forEach(letter => {
      if (code.charAt(0) === letter.textContent) {
        letter.nextElementSibling.insertAdjacentHTML("beforeend", html);
      }
    });
  });
};

addFirstLetter();
addCountries();

// search
const search = document.querySelector("#searchCountry");
const countryItems = document.querySelectorAll(".modal__country-item");

search.addEventListener("keyup", e => {
  const searchValue = e.target.value.toLowerCase().trim();
  countryItems.forEach(item => {
    const countryName = item.querySelector(".modal__country-code").innerHTML;
    if (countryName.toLowerCase().indexOf(searchValue) !== -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  const divFirstLetter = document.querySelectorAll(".modal__sort-first-letter");
  divFirstLetter.forEach(letter => {
    const countryItems = letter.querySelectorAll(".modal__country-item");
    let allHidden = true;
    countryItems.forEach(item => {
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
  });
});

// swap currencies on click on replaceCurrencyButton

replaceCurrencyButton.addEventListener("click", () => {
  // swap currencies names
  let temp1 = currencyNameTo.textContent;
  currencyNameTo.textContent = currencyNameFrom.textContent;
  currencyNameFrom.textContent = temp1;

  // change flag
  const fromFlag = document.querySelector(".currency__button--from img");
  const toFlag = document.querySelector(".currency__button--to img");
  let temp2 = fromFlag.src;
  fromFlag.src = toFlag.src;
  toFlag.src = temp2;

  // change sign
  let temp3 = signTo.textContent;
  signTo.textContent = signFrom.textContent;
  signFrom.textContent = temp3;

  getExchangeRate();
});

// selecting currency by clicking on country item
countryItems.forEach(item => {
  item.addEventListener("click", e => {
    const countryCode = e.target
      .closest(".modal__country-item")
      .querySelector(".modal__country-code").textContent;
    if (whichButtonClicked === "from") {
      currencyNameFrom.textContent = countryCode;
      signFrom.textContent = countryList[countryCode][1];
      flag = document.querySelector(".currency__button--from img");
      flag.src = `https://flagcdn.com/48x36/${countryList[
        countryCode
      ][0].toLowerCase()}.png`;
    } else if (whichButtonClicked === "to") {
      currencyNameTo.textContent = countryCode;
      signTo.textContent = countryList[countryCode][1];
      flag = document.querySelector(".currency__button--to img");
      flag.src = `https://flagcdn.com/48x36/${countryList[
        countryCode
      ][0].toLowerCase()}.png`;
    }
    whichButtonClicked = null;
    modal.style.display = "none";
    getExchangeRate();
  });
});

// API call
const api_key = "f2f09b7262300fe483f42e38";

function getExchangeRate() {
  const amount = document.querySelector("#amount").value;
  exchangeRate.value = "Загрузка...";
  let url = `https://v6.exchangerate-api.com/v6/${api_key}/pair/${currencyNameFrom.textContent}/${currencyNameTo.textContent}/${amount}`;
  fetch(url)
    .then(response => response.json())
    .then(result => {
      exchangeRate.value = result.conversion_result.toFixed(2);
    })
    .catch(() => {
      exchangeRate.value = "Упс... Помилка";
    });
}

amount.addEventListener("keypress", event => {
  if (event.key === "Enter") {
    getExchangeRate();
  }
});

convertButton.addEventListener("click", e => {
  e.preventDefault();
  getExchangeRate();
});

window.addEventListener("load", () => {
  getExchangeRate();
});

// dark and light themes
const toggleThemes = document.querySelector("#checkbox");
const currentTheme = localStorage.getItem("theme");
const sun = document.querySelector(".fa-sun");
const moon = document.querySelector(".fa-cloud-moon");
sun.style.display = "none";
moon.style.display = "block";

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleThemes.checked = true;
    sun.style.display = "block";
    moon.style.display = "none";
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    moon.style.display = "none";
    sun.style.display = "block";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    moon.style.display = "block";
    sun.style.display = "none";
  }
}

toggleThemes.addEventListener("change", switchTheme, false);
