import { useState, useEffect } from "react";
import axios from "axios";  
  
const WeatherData = ({city}) => {

  const [weather, setWeather] = useState(null);
  
  //fetch weather data from API
  useEffect(() => {
      const api_key = process.env.REACT_APP_API_KEY;
      axios
          .get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + api_key + '&units=metric')
          .then(response => {
              setWeather(response.data);
          });
  }, [city])


    return (
        <div>
            {weather && <DisplayWeather weather={weather} capital={city}/>}
        </div>
    )
}

// display the weather from weather state
const DisplayWeather = ({ weather, capital }) => {
  return (
      <div>
          <h3>Weather in {capital}</h3>
          <p>temperature {weather.main.temp} Celcius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          <p>wind {weather.wind.speed} m/s</p>
      </div>
  )
}

export default WeatherData;