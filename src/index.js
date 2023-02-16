import './css/styles.css';
import fetchCountries from './api';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    textInput: document.getElementById('search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}
// console.log(refs.textInput);
// console.log(refs.countryList);
// console.log(refs.countryInfo);

refs.textInput.addEventListener("input", debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
    event.preventDefault();

    const inputValue = event.target.value.trim();
    resetInput();
    if (!inputValue) return;
    console.log(inputValue);

    // fetchCountries(inputValue).then(console.log);
fetchCountries(inputValue)
    .then(data => {
        if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }
        else if (data.length >= 2 & data.length <= 10) {
            createMarkupCountriesList(data);
            // resetInput();
        }
        else {
            createMarkupCountryInfo(data);
            // resetInput();
        }
    })
    .catch(() => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        // resetInput();
    })
};

function createMarkupCountriesList(country) {
    const markup = country.map(({ flags, name }) => {
    return `<li class="country-list-item">
    <img class="country-list-img" src="${flags.svg}" 
    alt="Flag of ${name.official}" width = "50"/>
    <h2 class="country-list-name">${name.official}</h2>
    </li>`;
    })
        .join('')

    return refs.countryList.insertAdjacentHTML("beforeend", markup);
    // console.log('list');
    // console.log(markup);
}

    
function createMarkupCountryInfo(country) {
    const markup = country.map(({ name, capital, population, flags, languages }) => {
        return `<div class="country-wrap">
        <img class="country-list-img" src="${flags.svg}" 
        alt="Flag of ${name.official}" width = "50"/>
        <h1 class="country-name">${name.official}</h1>
        </div>
        <ul class="country-info">
        <li class="country-item">Capital:
        <span class="country-item-span">${capital}</span>
        </li>
        <li class="country-item">Population: 
        <span class="country-item-span">${population}</span>
        </li>
        <li class="country-item">Languages: 
        <span class="country-item-span">${Object.values(languages).join(', ')}</span>
        </li>
        </ul>`;
    })
        .join('');

    return refs.countryInfo.insertAdjacentHTML('beforeend', markup);
    // console.log(markup);
}

function resetInput() { 
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
};
