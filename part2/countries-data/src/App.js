import { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const Outlet = ({ countries, handleClick }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (countries.length === 1) {
      const country = countries[0];
      const [lat, lon] = country.capitalInfo.latlng;
      const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${lat},${lon}`;

      axios.get(weatherUrl).then((response) => setWeatherData(response.data));
    }
  }, [countries]);

  if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt='' />
        {weatherData && (
          <>
            <h2>Weather in {weatherData.location.name}</h2>
            <p>temperature {weatherData.current.temp_c} Celcius</p>
            <img src={`https:${weatherData.current.condition.icon}`} alt='' />
            <p>wind {weatherData.current.wind_kph} km/h</p>
          </>
        )}
      </div>
    );
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map((country) => (
          <p key={country.name.common}>
            {country.name.common}{' '}
            <button onClick={() => handleClick(country)}>show</button>
          </p>
        ))}
      </div>
    );
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};

const App = () => {
  const [input, setInput] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  const handleClick = (country) => {
    setFilteredCountries([country]);
  };

  return (
    <div>
      <div>
        find countries <input value={input} onChange={handleInputChange} />
      </div>
      <Outlet countries={filteredCountries} handleClick={handleClick} />
    </div>
  );
};

export default App;
