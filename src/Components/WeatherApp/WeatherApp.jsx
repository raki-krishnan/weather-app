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

    let api_key = "b619c02ef0d0c5ea4a66d9ddf680e09f";
    const element = document.getElementsByClassName("cityInput");

    const [wicon, setWicon] = useState(cloud_icon);
    const [error, setError] = useState("");

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
            setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
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
            <div className="weather-image">
                <img src={wicon} alt="cloud" className="main-icon"/>
            </div>
            <div className="weather-temp">
                24°F
            </div>
            <div className="weather-location">Ann Arbor</div>
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
        </div>
    )
}

export default WeatherApp;
