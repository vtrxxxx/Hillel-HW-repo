import {useRef, useState} from 'react';
const API_KEY = '175adc3740515fd3782e322b97fc7fc8'; 



export default function UncontrolledAddToFavourites({onSearch}){

    const cityInputRef = useRef(null);
    const [favourites, SetFavourites] = useState([]);

    async function IsValid(cityName) {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${API_KEY}`
        const response = await fetch(URL);
        if(response.status === "404"){
            return false;
        }
        if(!response.ok){
            return false
        }
        return true

    }

    const  AddToFavourites = async(event) => {
        event.preventDefault();

        const cityName = cityInputRef.current.value.trim();
        if (!cityName) {
            return;
        }

        const alreadyExist = favourites.some((c) => c.toLowerCase() === cityName.toLowerCase());
        

        if (alreadyExist) {
            throw new Error("City already in favourites");
        }
        const isValid = await IsValid(cityName)
        if(!isValid){
            return;
        }

        SetFavourites((previous) => [...previous, cityName]);
        cityInputRef.current.value = '';

    }

    return (
        <>
            <div>
                <h1>Favourites</h1>
                <form onSubmit={AddToFavourites}>
                    <input id="uncontroller-Favourites"
                    placeholder="Enter city name to add to favourites: ..."
                    name="controlledCity" 
                    type="text"
                    ref={cityInputRef}/>
                    <button type="submit">Add to Favourites</button>
                </form>
                <h2>Favourite cities</h2>
                <ul>
                    {favourites.map((c) => (
                        <li key={c}>
                            <button type='button' onClick={() => onSearch(c)}>
                                {c}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )





}