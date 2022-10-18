import React from "react";

export default function WeatherCard(props) {
    return (
        <div className="weather-item">
            <h4 className="date">{props.date}</h4>
            <img src={`/icons/${props.data.weather[0].icon}.svg`} alt={props.data.weather[0].main} ></img>
            <h3 className="temp-range">{`${props.data.main.temp_min}° to ${props.data.main.temp_max}°`}</h3>
        </div>
    );
}