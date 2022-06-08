import { useEffect, useState } from 'react';
import axios from 'axios';
import Countries from './components/Countries';
import Search from './components/Search';

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  // display details of the referred country
  const displayCountry = (country) => {
    setSearch(country);
  }

  // fetch the countries data from restcountries API
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  // filtering the countries to match with search text
  const filteredCountries = countries.filter(country => 
    country.name.official.toLowerCase().match(search.toLowerCase()));

  return (
    <div>
      <Search search={search} handleSearch={handleSearch}/>
      {filteredCountries.length > 10
       ? <p>Too many matches, specify another filter</p> 
       : <Countries countries={filteredCountries} displayCountry={displayCountry}/>}
    </div>
  );
}

export default App;
