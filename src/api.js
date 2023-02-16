export default fetchCountries;

function fetchCountries(name) {
    const URL = `https://restcountries.com/v3.1/name/${name}`;
    return fetch(`${URL}?fields=name,capital,population,flags,languages`)
        .then((response) => response.json());
}
// fetchCountries('peru').then(console.log);
// fetchCountries('poland');

// fetch(URL)
//     .then((response) => response.json())
//     .then((data) => console.log(data));
