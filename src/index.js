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
// debounce(func, 300);
// Notiflix.Notify.success('Sol lucet omnibus');
// Notiflix.Notify.failure('Qui timide rogat docet negare');
// Notiflix.Notify.warning('Memento te hominem esse');
// Notiflix.Notify.info('Cogito ergo sum');

refs.searchInput.addEventListener('input', debounce(onInput, 300));

function onInput() {
  // evt.preventDefault();

  const searchName = String(refs.searchInput.value);
  // console.log(searchName);

  if (searchName.trim()) {
    fetchCountries(searchName)
      .then(countries => {
        console.log(countries);
        if (countries.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (countries.length >= 2 && countries.length < 10) {
          makeMarkupCountires(countries);
        }
      })
      .catch(error =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  } else {
    clearCountryContainer();
  }
}

function clearCountryContainer() {
  refs.countryListUl.innerHTML = '';
  refs.countryInfoDiv.innerHTML = '';
}

function makeMarkupCountires(countries = []) {
  const markupCounries = countries
    .map(country => {
      console.log(country);
      return `
        <li class="country-list__item">
          <svg class="country-list__icon" width="30px" height="30px">
            <use href="${country.flags.svg}"></use>
          </svg>
          ${country.name.official}
        </li>
      `;
    })
    .join();
  console.log(markupCounries);
  refs.countryListUl.innerHTML = markupCounries;
}
