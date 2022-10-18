import React from "react";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import './components.css';

export default function SearchButton({selectCity}) {
    const [input, setInput] = useState('');
    const [list, setList] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [data, setData] = useState('');
    //on input change store and pass it to button onClick
    

    const apiKey = "77ea2ba1b8eb857ff9a096e1106a1ded";

    const handleChange = event => {
        setInput(event.target.value);
    }

    function onClickHandler() {
    // takes the value from the search input
        let apiCall = `https://api.openweathermap.org/geo/1.0/direct?q=${input},,US&limit=5&appid=${apiKey}`;
        fetch(apiCall)
            .then((response) => 
                response.json()
            )
            .then((data) => {
                setData(data);
                let tempArr = [];
                // loops through each search result and creates and attaches a list item for the unordered list
                data.forEach((data, index) => {
                    const fullName = data.name + ', ' + data.state;
                    tempArr.push(data);
                })

                setList(tempArr);
                setShowResults(true);
            });

    }

    return (
        <div id="side-container">
            <input id='search-input' placeholder='search for a city' onChange={handleChange}></input>
            <Button id="search-button" onClick={onClickHandler}> search</Button>
            <ul id='search-results-list'>{
                list.length > 0 && list.map((item) => <li className="search-result" 
                onClick={() => selectCity(item.name + ', '+ item.state, item.name, item.state, item.lat, item.lon)}>{item.name + ", " + item.state}</li>)
            } </ul>
        </div>
        
    );
}