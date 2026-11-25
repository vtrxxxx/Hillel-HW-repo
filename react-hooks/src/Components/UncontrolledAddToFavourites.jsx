
import { useRef, useState } from 'react';

export default function UncontrolledAddToFavourites({
    onSearch,
    validateCity
}) {
    const cityInputRef = useRef(null);
    const [favourites, SetFavourites] = useState([]);
    const [error, SetError] = useState('');
    const [isChecking, SetIsChecking] = useState(false);

    const AddToFavourites = async (event) => {
        event.preventDefault();

        const cityName = cityInputRef.current.value.trim();

        if (!cityName) return;

        SetError('');

        const alreadyExist = favourites.some(
            c => c.toLowerCase() === cityName.toLowerCase()
        );

        if (alreadyExist) {
            SetError("City already in favourites");
            return;
        }

        SetIsChecking(true);

        try {
            await validateCity(cityName);

            SetFavourites(previous => [...previous, cityName]);
            cityInputRef.current.value = '';
        }
        catch (error) {
            SetError(error.message);
        }
        finally {
            SetIsChecking(false);
        }
    };

    return (
        <div>
            <h1>Favourites</h1>

            <form onSubmit={AddToFavourites}>
                <input
                    ref={cityInputRef}
                    placeholder="Enter city name..."
                    type="text"
                />

                <button type="submit" disabled={isChecking}>
                    {isChecking ? 'Checking...' : 'Add to Favourites'}
                </button>
            </form>

            {error && <p>{error}</p>}

            <h2>Favourite cities</h2>

            <ul>
                {favourites.map(c => (
                    <li key={c}>
                        <button
                            type="button"
                            onClick={() => onSearch(c)}
                        >
                            {c}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
