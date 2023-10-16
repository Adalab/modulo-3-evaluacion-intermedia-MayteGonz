import '../styles/App.scss';
// Fichero src/components/App.jsx
import { useEffect, useState } from 'react';
import callToApi from '../services/api'; // Importamos el servicio que acabamos de crear

const App = () => {
  // Estados

  const [countriesList, setcountriesList] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [continentSelect, setContinentSelect] = useState('');
  const [newCountry, setNewcountry] = useState({
    flag: '',
    name: '',
    capital: '',
    continent: '',
  });
  const [error, setError] = useState('');

  //petición a la api

  useEffect(() => {
    callToApi().then((response) => {
      setcountriesList(response);
    });
  }, []);

  //handle

  const handleSelect = (ev) => {
    setContinentSelect(ev.target.value);
  };

  const handleInputSearch = (ev) => {
    setNameSearch(ev.target.value);
  };
  const handleForm = (ev) => {
    ev.preventDefault();
  };

  const handleClickAdd = () => {
    if (
      newCountry.name === '' ||
      newCountry.flag === '' ||
      newCountry.capital === '' ||
      newCountry.continent === ''
    ) {
      setError('Debes rellenar todos los campos');
    } else {
      setcountriesList([...countriesList, newCountry]);
      setError('');
      setNewcountry({
        flag: '',
        name: '',
        capital: '',
        continent: '',
      });
    }
  };
  const handleInputAdd = (ev) => {
    setNewcountry({ ...newCountry, [ev.target.id]: ev.target.value });
  };

  //render
  const renderCountries = () => {
    return countriesList
      .filter((eachCountry) =>
        eachCountry.name.toLowerCase().includes(nameSearch.toLowerCase())
      )
      .filter((eachCountry) =>
        eachCountry.continent
          .toLowerCase()
          .includes(continentSelect.toLowerCase())
      )

      .map((eachCountry, index) => (
        <li key={index}>
          <i>{eachCountry.flag}</i>
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
          <form onSubmit={handleForm}>
            <label htmlFor="search">By Country: </label>
            <input
              type="search"
              name="search"
              placeholder="Spain..."
              value={nameSearch}
              onChange={handleInputSearch}
            />
            <label htmlFor="continent"> By Continent: </label>
            <select
              name="continent"
              id="continent"
              onChange={handleSelect}
              value={continentSelect}
            >
              <option value="">All</option>
              <option value="Africa">Africa</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Europe">Europe</option>
              <option value="Asia">Asia</option>
              <option value="Oceania">Oceania</option>
            </select>
          </form>
        </section>
        <section>
          <h2>Add Country</h2>
          <form onSubmit={handleForm}>
            <input
              type="text"
              name="name"
              id="name"
              value={newCountry.name}
              placeholder="Country Name"
              onChange={handleInputAdd}
            />
            <input
              type="text"
              name="capital"
              id="capital"
              value={newCountry.capital}
              placeholder="Capital"
              onChange={handleInputAdd}
            />
            <input
              type="text"
              name="flag"
              id="flag"
              value={newCountry.flag}
              placeholder="Flag Icon"
              onChange={handleInputAdd}
            />
            <input
              type="text"
              name="continent"
              id="continent"
              value={newCountry.continent}
              placeholder="Continent"
              onChange={handleInputAdd}
            />
            <input type="submit" value="Add Country" onClick={handleClickAdd} />
          </form>
          <p>{error}</p>
        </section>
        <section>
          <ul>{renderCountries()}</ul>
        </section>
      </main>
    </div>
  );
};

export default App;
