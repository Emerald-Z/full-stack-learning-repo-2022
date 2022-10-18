import React from "react";
import './components.css';

export default function CurrentWeather(props) {
    console.log(props.aqiData)
    return (
        <div id="weather-and-icon">
            <div id="todayWeather">
                <h3 id="weather-type">{props.data.list[0].weather[0].main}</h3>
                <h1 id="temp">{props.data.list[0].main.temp}°</h1>
                <h4 id="aqi">AQI: {props.aqiData.list[0].main.aqi}</h4>
            </div>
            <img id="daily-icon" src={props.src} alt={props.dalt}></img>
        </div>
    );
}


