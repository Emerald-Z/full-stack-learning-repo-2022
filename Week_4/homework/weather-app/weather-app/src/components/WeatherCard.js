import React from "react";
import {useState} from "react";

export default function WeatherCard(props) {
    return (
        <div className="weather-item">
            <h4 className="date">{props.date}</h4>
            <img src={`icons/${props.weather[0].icon}.svg`} alt={props.weather.main} ></img>
            <h3 className="temp-range">{`${props.main.temp_min}° to ${props.main.temp_max}°`}</h3>
        </div>
    );
}