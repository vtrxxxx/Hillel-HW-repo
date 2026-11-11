

export default function WeatherInfo(props) {

    const { weather, isLoading } = props;

    if (isLoading) {
        return <>
            Loading...
        </>
    }
    if (!weather) {
        return null;
    }
    const icon = weather.weather[0].icon;

    return <>
        <div className="weatherInfo">
            <h1>City: {weather.name}</h1>
            <p>temp: {weather.main.temp} °C</p>

            <p>pressure: {weather.main.pressure}</p>

            <p>description: {weather.weather[0].description}</p>

            <p>humidity: {weather.main.humidity}%</p>

            <p>speed: {weather.wind.speed}</p>

            <p>deg: {weather.wind.deg}°</p>

            <img src={`http://openweathermap.org/img/w/${icon}.png`}></img>
        </div>
    </>


}