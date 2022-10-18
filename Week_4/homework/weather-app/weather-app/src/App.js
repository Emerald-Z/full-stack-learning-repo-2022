import SearchButton from './components/SearchButton';
import './App.css';
import WeatherCard from './components/WeatherCard';
import CurrentWeather from './components/CurrentWeather';
import {useEffect, useState} from "react";

function App() {
  const [data, setData] = useState([]);
  const [aqi, setAqi] = useState('');
  const [list, setList] = useState([]);
  let state = "";

  function formatDate(daysFromNow = 0) {
    let output = '';
    var date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    output += date.toLocaleString('en-US', { weekday: 'long' }).toUpperCase();
    output += ' ' + date.getDate();
    return output;
  }

  function selectCity(fullName, name, state, lat, lon) {
    
        const apiKey = "229f5cca99439a8f7a557affeee01cb8";
        let weatherCall = `http://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&units=imperial&cnt=7&appid=${apiKey}`;
        let aqiCall = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
        state = fullName;
        fetch(weatherCall)
            .then((response) => 
                response.json()
            )
            .then((data) => {
                setData(data);
                let temp = [];
                for (let i = 1; i <=5; i++) {
                  list.push(data.list[i]);
                }
                
                setList(temp);
            });

        fetch(aqiCall)
            .then((response) => 
              response.json()
            )
            .then((data) => {

              setAqi(data);
            });

    }
  
  return (
    <div className='App'>
      <div id="main-container">
        
      
        {(typeof data != 'undefined') && (
          <>
          <div id="weather-container">
            <h4 id="date">{formatDate(0)}</h4>
            <h2 id="weather-for">Weather for {state}</h2>
          </div>
        <div> {
                  list.map((item) => 
                    <WeatherCard
                        date={formatDate(1)}s
                        data={item}
                    ></WeatherCard>)
              }
          
        </div>
          </>
        )}
        
    </div>
		  <SearchButton selectCity={selectCity}></SearchButton>
    </div>
  );
}

export default App;
