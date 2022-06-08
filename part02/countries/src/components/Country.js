  import { useEffect ,useState } from "react";
  import WeatherData from "./WeatherData";
  
  const Country = ({country}) => {
    const [city, setCity] = useState('');
    const languages = Object.values(country.languages);

    useEffect(() => {
        setCity(country.capital[0])
    }, [country])

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital[0]} </p>
        <p>Area {country.area} </p>
        <h3>languages:</h3>
        <ul>
          {languages.map(lang =>
            <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.name.official + " flag"} />
        {city && <WeatherData city={city}/>}
      </div>
    )
  }

  export default Country;