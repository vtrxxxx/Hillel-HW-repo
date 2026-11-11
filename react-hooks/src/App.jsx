import './App.css';
import {useEffect, useState} from 'react';
import  WeatherInfo  from './Components/WeatherInfo.jsx'  
import  ControlledCitySearch  from './Components/ControlledCitySearch.jsx'
import UncontrolledAddToFavourites from './Components/UncontrolledAddToFavourites.jsx'

const API_KEY = '175adc3740515fd3782e322b97fc7fc8'; 


function App() {
  
  const [city, SetCity] = useState('Lviv');
  const [weather, SetWeather] = useState(null);
  const [isLoading, SetIsLoading] = useState(false);

  useEffect(() => {
    async function GetWeather() {
      
      SetIsLoading(true);

      try {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
        const response = await fetch(URL);
        if (response.status === "404") {
          throw new Error("City not found");
        }
        const data = await response.json();
        
        SetWeather(data)

        
      }
      catch (error) {
        throw new Error(`Error message: ${error.message}`);
      }
      finally {
        SetIsLoading(false)
      }
    }
    GetWeather()
  }, [city])

  return (
    <>
      <div className="App">
        <h1>App</h1>
        <ControlledCitySearch onSearch={SetCity} isLoading={isLoading}/>
        <WeatherInfo weather={weather} isLoading={isLoading} />
        <UncontrolledAddToFavourites onSearch={SetCity} />
      </div>
    </>
  )
}

export default App
