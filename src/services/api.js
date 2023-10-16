const callToApi = () => {
  // Llamamos a la API
  return fetch(
    'https://restcountries.com/v3.1/all?fields=name,capital,flag,continents,cca2'
  )
    .then((response) => response.json())
    .then((response) => {
      // Cuando responde la API podemos limpiar los datos aquí
      console.log(response);

      const country = response.map((country) => ({
        flag: country.flag,
        name: country.name.common,
        capital: country.capital[0],
        continent: country.continents[0],
        id: country.cca2,
      }));

      return country;
    });
};

export default callToApi;
