import './css/styles.css';
import fetchCountries from './api';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;


// export default fetchCountries;

// const URL = "https://restcountries.com/v3.1/name/peru";
// const URL = "https://restcountries.com/v3.1/name/{name}";

// function fetchCountries(name) {
//     const URL = `https://restcountries.com/v3.1/name/${name}`;
//     return fetch(URL)
//         .then((response) => response.json());
// }

const refs = {
    textInput: document.getElementById('search-box'),
    countryList: document.querySelector('country-list'),
    countryInfo: document.querySelector('country-info'),
}
console.log(refs.textInput);

refs.textInput.addEventListener("input", debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
    event.preventDefault();
    // const value = refs.textInput.value.trim();
    const inputValue = event.target.value.trim();
    console.log(inputValue);

    fetchCountries(inputValue).then(console.log);
    // fetchCountries(value).then(({apital}) =>
    // { console.log(capital)});

fetchCountries(inputValue)
    .then(data => {
        if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }
        else if (data.length >= 2 & data.length <= 10) {
            createMarkupCountriesList(data);
        }
        else {
            createMarkupCountryInfo(data)
        }
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    })
    // .finally(() => {
    //     resetInput();
    // })
};

function createMarkupCountriesList(country) {
    const markup = country.map(({ flags, name }) => {
    return `<li class="country-list-item">
    <img class="country-list-img src="${flags.svg}" alt="Flag of ${name.official}" />
    <h2 class="country-list-name">${name.official}</h2>
    </li>`;
    })
    .join('')

    // return refs.countryList.insertAdjacentHTML('beforeend', markup);
    // return refs.countryList.innerHTML= markup;

    console.log('list');
    console.log(markup);

}

    
function createMarkupCountryInfo(country) {
    const markup = country.map(({ name, capital, population, flags, languages }) => {
        return `<div class="country-wrap">
        <img class="country-list-img src="${flags.svg}" alt="Flag of ${name.official}" />
        <h1 class="country-name"></h1>
        </div>
        <ul class="country-info">
        <li class="country-capital">Capital: ${capital}</li>
        <li class="country-population">Population: ${population}</li>
        <li class="country-languages">Languages: ${Object.values(languages).join(', ')}</li>
        </ul>`;
    })
        .join('');

    // return refs.countryInfo.insertAdjacentHTML('beforeend', markup);
    
    console.log(markup);
}

function resetInput() { };

// Якщо користувач повністю очищає поле пошуку, то HTTP-запит не виконується, а розмітка списку країн або інформації про країну зникає.
