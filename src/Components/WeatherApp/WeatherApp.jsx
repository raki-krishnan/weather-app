import { useState, useEffect } from 'react';
import './WeatherApp.css';
import search_icon from "../Assets/search.png";
import cloud_icon from "../Assets/cloud.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import humidity_icon from "../Assets/humidity.png";
import drizzle_icon from "../Assets/drizzle.png";
import clear_icon from "../Assets/clear.png";
import wind_icon from "../Assets/wind.png";
import thunderstorm_icon from "../Assets/thunderstorm.png";
import nightrain_icon from "../Assets/nightrain.png";
import nightclear_icon from "../Assets/nightclear.png";
import nightcloud_icon from "../Assets/nightcloud.png";
import nightthunderstorm_icon from "../Assets/nightthunderstorm.png";
import nightsnow_icon from "../Assets/nightsnow.png";

const WeatherApp = () => {

    const [wicon, setWicon] = useState(cloud_icon);
    const [error, setError] = useState("");
    
    const cities = ["Tokyo", "New York", "London", "Paris", "Sydney", 
    "Moscow", "Cairo", "Rio de Janeiro", "Toronto", "Beijing", "Berlin", "Rome", "Madrid",
    "Dubai", "Seoul", "Istanbul", "Mumbai", "Bangkok", "Los Angeles", "Chicago", "Miami",
    "Las Vegas", "San Francisco", "Washington", "Boston", "Seattle", "Dallas", "Houston",
    "Atlanta", "Philadelphia", "Phoenix", "Denver", "Minneapolis", "Detroit", "Honolulu",
    "Anchorage", "Mexico City", "Buenos Aires", "Sao Paulo", "Cape Town", "Johannesburg",
    "Nairobi", "Copenhagen", "Stockholm", "Oslo", "Helsinki", "Warsaw", "Prague", "Vienna",
    "Budapest", "Athens", "Melbourne", "Edinburgh", "St. Petersburg", "Kiev", "Minsk", "Pretoria",
    "New Delhi", "Chennai", "Bombay", "Cologne", "Frankfurt", "Zurich", "Geneva", " Bogota",
    "Lima", "Caracas", "Santiago", "Cancun", "Quito", "Guayaquil", "La Paz", "Asuncion",
    "San Diego", "San Antonio", "San Jose", "New Orleans", "Portland", "Salt Lake City",
    "Barcelona", "Venice", "Milan", "Amsterdam", "Brussels", "Dublin", "Lisbon", "Bucharest",
    "Shanghai", "Hong Kong", "Singapore", "Kuala Lumpur", "Jakarta", "Manila", "Hanoi", 
    "Normandy", "Taipei", "Auckland", "Wellington", "Christchurch", "Brisbane", "Perth"];

    const fetchRandomWeather = () => {
        const randomIndex = Math.floor(Math.random() * cities.length);
        const randomCity = cities[randomIndex];
        fetchWeatherData(randomCity);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    const whereElseInTheWorld = async () => {
        //We want to show the weather of a different city with the same temperature as the current city
        const temperature = document.getElementsByClassName("weather-temp")[0].innerHTML;
        console.log(temperature);
        const currentCity = document.getElementsByClassName("weather-location")[0].innerHTML;
        console.log(currentCity);
        let randomCity = "";
        let randomIndex = 0;
        let found = false;
        const startTime = Date.now(); // Get the current time at the start of the loop
        while (!found) {
            console.log("found before: " + found)
            randomIndex = Math.floor(Math.random() * cities.length);
            randomCity = cities[randomIndex];
            console.log(randomCity);
            await fetchWeatherData(randomCity);
            console.log("getElembyclass : " + document.getElementsByClassName("weather-temp")[0].innerHTML)
            if (document.getElementsByClassName("weather-temp")[0].innerHTML === temperature && randomCity !== currentCity) {
                found = true;
            }
            console.log(document.getElementsByClassName("weather-temp")[0].innerHTML);
            console.log(found);
            if (Date.now() - startTime > 10000) { // If more than 10 seconds have passed
                console.log("Time's up! Displaying the original city.");
                fetchWeatherData(currentCity); // Fetch the weather data for the original city
                break; // Break the loop
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    let api_key = "b619c02ef0d0c5ea4a66d9ddf680e09f";
    const element = document.getElementsByClassName("cityInput");

    useEffect(() => {
        fetchWeatherData("Ann Arbor");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchWeatherData = async (city) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error("City not found");
            }
            let data = await response.json();
            const humidity = document.getElementsByClassName("humidity-percentage");
            const wind = document.getElementsByClassName("wind-speed");
            const temperature = document.getElementsByClassName("weather-temp");
            const location = document.getElementsByClassName("weather-location");

            humidity[0].innerHTML = data.main.humidity + "%";
            wind[0].innerHTML = data.wind.speed + " mph";
            temperature[0].innerHTML = Math.floor((data.main.temp - 273.15) * 9/5 + 32) + "°F";
            location[0].innerHTML = data.name;
            console.log("HELLOOOOO " + data.name)

            if(data.weather && data.weather[0].icon) {
                switch(data.weather[0].icon) {
                    case "01d":
                        setWicon(clear_icon);
                        break;
                    case "01n":
                        setWicon(nightclear_icon);
                        break;
                    case "02d":
                    case "03d":
                    case "04d":
                        setWicon(cloud_icon);
                        break;
                    case "02n":
                    case "03n":
                    case "04n":
                        setWicon(nightcloud_icon);
                        break;
                    case "09d":
                        setWicon(drizzle_icon);
                        break;
                    case "09n":
                        setWicon(nightrain_icon);
                        break;
                    case "10d":
                        setWicon(rain_icon);
                        break;
                    case "10n":
                        setWicon(nightrain_icon);
                        break;
                    case "11d":
                        setWicon(thunderstorm_icon);
                        break;
                    case "11n":
                        setWicon(nightthunderstorm_icon);
                        break;
                    case "13d":
                        setWicon(snow_icon);
                        break;
                    case "13n":
                        setWicon(nightsnow_icon);
                        break;
                    default:
                        setWicon(cloud_icon);
                }
            }
        } catch (error) {
            setError("City not found");
            setTimeout(() => setError(""), 3000);
        }
    };

    const search = () => {
        if (element[0].value === "") {
            return;
        }
        fetchWeatherData(element[0].value);
    };

    return (
        <div className="container">
            <div className="top-bar">
                <input 
                    type="text" 
                    className="cityInput" 
                    placeholder="Search"
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            search();
                        }
                    }}
                />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="search"/>
                </div>
            </div>
            {error && <div className="error">{error}</div>}
            <div className="weather-info-container">
                <div className="weather-image">
                    <img src={wicon} alt="cloud" className="main-icon" />
                </div>
                
                <div className="weather-details-button-container">
                    <div className="weather-details">
                        <div className="weather-temp">57°F</div>
                        <div className="weather-location">Ann Arbor</div>
                    </div>
                    <button className="where-else" onClick={whereElseInTheWorld}>Twin</button>
                </div>
            </div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percentage">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-speed">10 mph</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
            <button className="lucky-button" onClick={fetchRandomWeather}>I'm Feeling Lucky</button>
        </div>
    )
}

export default WeatherApp;
