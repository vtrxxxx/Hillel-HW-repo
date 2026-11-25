import './App.css';
import {Suspense, useState} from 'react';
import { ErrorBoundary } from 'react-error-boundary';
  
import  ControlledCitySearch  from './Components/ControlledCitySearch.jsx'
import UncontrolledAddToFavourites from './Components/UncontrolledAddToFavourites.jsx'
import { WeatherFetcher } from './Components/WeatherFetcher.jsx';
import {  } from 'react';

const API_KEY = '5d066958a60d315387d9492393935c19'; 


const weatherCache = new Map();

// Твоя оригинальная функция
const fetchWeather = (city) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;

    return fetch(URL).then(response => {
        if (!response.ok) {
            throw new Error(
                response.status === 404
                    ? "City not found"
                    : `HTTP error: ${response.status}`
            );
        }

        return response.json();
    });
};

// Новая функция для кэширования
const getWeatherPromise = (city) => {
    const key = city.trim().toLowerCase();

    if (!weatherCache.has(key)) {
        weatherCache.set(key, fetchWeather(city));
    }

    return weatherCache.get(key);
};


function ErrorFallback({ error }) {
    return (
        <div>
            <h2>Something went wrong!</h2>
            <p>{error.message}</p>
        </div>
    );
}

function LoadingComponent(){
  return(
    <div>
      Loading...
    </div>
  );
}

function App() {
  
  const [city, SetCity] = useState('Lviv');
  const [isLoading, SetIsLoading]= useState(false);

  

  return (
    <>
      <div className="App">
        <h1>App</h1>
        <ControlledCitySearch onSearch={SetCity} isLoading={isLoading}/>

        <ErrorBoundary key={city} FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingComponent />}>
            <WeatherFetcher weatherFetched={getWeatherPromise(city)} />
          </Suspense>
        </ErrorBoundary>

<UncontrolledAddToFavourites
    onSearch={SetCity}
    validateCity={fetchWeather}
/>

        
      </div>
    </>
  )
}

export default App
