const replaceCurrencyButton = document.querySelector(".fa-exchange-alt");
const currencyButton = document.querySelectorAll(".currency__button");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".modal__close");
const exchangeRate = document.querySelector("#exchangeRate");
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
    const countryCode = item.querySelector(".modal__country-code").innerHTML;
    const countryName = countryList[countryCode].toLowerCase();
    if (countryName.indexOf(searchValue) !== -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
    const divFirstLetter = document.querySelectorAll(".modal__sort-first-letter");
    divFirstLetter.forEach((letter) => {
      if (letter.querySelector(".modal__country-item").style.display === "none") {
        letter.style.display = "none";
      } else {
        letter.style.display = "block";
      }
    })
  });
})

// swap currencies on click on replaceCurrencyButton
let temp1 = currencyNameTo.textContent;
let temp2 = currencyNameFrom.textContent;
let temp3 = document.querySelector(".currency__button--from img").src;
let temp4 = document.querySelector(".currency__button--to img").src;

replaceCurrencyButton.addEventListener("click", () => {
  document.querySelector(".currency__button--from img").src = temp4;
  document.querySelector(".currency__button--to img").src = temp3;
  currencyNameFrom.textContent = temp1;
  currencyNameTo.textContent = temp2;
  temp1 = currencyNameTo.textContent;
  temp2 = currencyNameFrom.textContent;
  temp3 = document.querySelector(".currency__button--from img").src;
  temp4 = document.querySelector(".currency__button--to img").src;
});

// selecting currency by clicking on country item
countryItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    const countryCode = e.target.querySelector(".modal__country-code").textContent;
    if (whichButtonClicked === "from") {
      currencyNameFrom.textContent = countryCode;
      temp2 = countryCode;
      flag = document.querySelector(".currency__button--from img");
      flag.src = `https://flagcdn.com/48x36/${countryList[countryCode].toLowerCase()}.png`;
      temp3 = flag.src;
    } else if (whichButtonClicked === "to") {
      currencyNameTo.textContent = countryCode;
      temp1 = countryCode;
      flag = document.querySelector(".currency__button--to img");
      flag.src = `https://flagcdn.com/48x36/${countryList[countryCode].toLowerCase()}.png`;
      temp4 = flag.src;
    }
    whichButtonClicked = null;
    modal.style.display = "none";
  })
})
