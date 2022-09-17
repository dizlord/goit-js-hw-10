import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
  searchInput: document.querySelector('#search-box'),
  countryListUl: document.querySelector('.country-list'),
  countryInfoDiv: document.querySelector('.country-info'),
};

refs.searchInput.addEventListener('input', debounce(onInput, 300));

function onInput() {
  const searchName = String(refs.searchInput.value);

  if (searchName.trim()) {
    fetchCountries(searchName)
      .then(countries => {
        if (countries.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (countries.length >= 2 && countries.length < 10) {
          makeMarkupCountires(countries);
        } else {
          makeMarkupCountry(countries);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        clearCountryContainer();
      });
  } else {
    clearCountryContainer();
  }
}

function clearCountryContainer() {
  refs.countryListUl.innerHTML = '';
  refs.countryInfoDiv.innerHTML = '';
}

function makeMarkupCountires(countries = []) {
  clearCountryContainer();
  const markupCounries = countries
    .map(country => {
      return `
        <li class="country-list__item">
          <img class="country-list__icon" width="40px" height="30px"
           src="${country.flags.svg}" alt="${country.name.official}">
          <span class="country-list__countryName">
            ${country.name.official}
          </span>
        </li>
      `;
    })
    .join('');
  refs.countryListUl.innerHTML = markupCounries;
}

function makeMarkupCountry(countries = []) {
  clearCountryContainer();
  const markupCounries = countries
    .map(country => {
      return `
        <div class="country-info__item">
          <img class="country-list__icon" src="${country.flags.svg}" alt="${
        country.name.official
      }" width="40px" height="30px" />
          <h2 class="country-info__title">${country.name.official}</h2>
        </div>
        <div class="article-wrapper">
          <p class="country-info__article">
            Capital:
          </p><span class="country-info__span">${country.capital}</span>
        </div>
        <div class="article-wrapper">
          <p class="country-info__article">
            Population:
          </p><span class="country-info__span">${country.population}</span>
        </div>
        <div class="article-wrapper">
          <p class="country-info__article">
            Languahes:
          </p><span class="country-info__span">${Object.values(
            country.languages
          ).join(',')}</span>
        </div>
      `;
    })
    .join('');
  refs.countryInfoDiv.innerHTML = markupCounries;
}
