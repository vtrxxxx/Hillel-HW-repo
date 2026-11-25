import {use} from 'react';
import  {WeatherInfo}  from './WeatherInfo.jsx';

export function WeatherFetcher(props){

    const {weatherFetched} = props;
    const weather = use(weatherFetched);

     return <WeatherInfo weather={weather} />
}