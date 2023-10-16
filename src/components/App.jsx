import '../styles/App.scss';
// Fichero src/components/App.jsx
import { useEffect, useState } from 'react';
import callToApi from '../services/api'; // Importamos el servicio que acabamos de crear

const App = () => {
  // Estados

  const [countriesList, setcountriesList] = useState([]);

  useEffect(() => {
    callToApi().then((response) => {
      setcountriesList(response);
      console.log(response);
    });
  }, []);

  const renderCountries = () => {
    return countriesList.map((eachCountry, index) => (
      <li key={index}>
        <p>{eachCountry.flag}</p>
        <p>{eachCountry.name}</p>
        <p>{eachCountry.capital}</p>
        <p>{eachCountry.continent}</p>
      </li>
    ));
  };

  return (
    <div>
      <header>
        <h1>Country Info App </h1>
        <p>
          Explore Information about countries, capitals, and flags. Add new
          countries and filter through the list!
        </p>
      </header>
      <main>
        <section>
          <h2>Filters</h2>
          <form>
            <label htmlFor="search">By Country: </label>
            <input type="search" name="search" placeholder="Spain..." />
            <label htmlFor="select">By Continnent: </label>
          </form>
        </section>
        <section>
          <ul>{renderCountries()}</ul>
        </section>
      </main>
    </div>
  );
};

export default App;
