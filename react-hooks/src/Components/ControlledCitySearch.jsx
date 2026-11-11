import { useState } from "react";

export default function ControlledCitySearch(props){

    const {onSearch, isLoading} = props;
    const [city, SetCity] = useState('');
    const [errorMessage, SetErrorMessage] = useState('')

    const CitySearch = (event) => {
        event.preventDefault();

        const cityName = city.trim();
        if (!cityName) {
            return;
        }

        onSearch(cityName);

    }

    return(
            <>
                <form onSubmit={CitySearch}>
                    <input id="controller-input"
                    placeholder="Enter city name: ..."
                    name="controlledCity" 
                    type="text" 
                    value={city} 
                    onChange={(event) => SetCity(event.target.value)} />
                    <button type="submit" disabled={isLoading}>{isLoading ? "isLoading..." : "Submit"}</button>
                </form>
                
            </>
        )

    

    
}

// const GetWeather = (input) => {
    //     let inputText = input.value;

    //     if (inputText = "" || !inputText)
    //         SetErrorMessage("Field is empty");

    //     const cityName = inputText.ToUpperCase();
    //     const cityData = WeatherInfo(cityName);

    //     if (!data)
    //         SetErrorMessage("Error");
    //     else if(data.cod == "404")
    //         SetErrorMessage(data.message);
    //     else
    //         SetErrorMessage('');
    // }