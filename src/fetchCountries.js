const filterOptions = '?fields=name,capital,population,flags,languages';

function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  // console.log(url + filterOptions);
  return fetch(url + filterOptions)
    .then(response => {
      // console.log(response);
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(countries => {
      return countries;
    });
}

export { fetchCountries };
