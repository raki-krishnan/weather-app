import react from 'react';
import './WeatherApp.css';
import search_icon from "../Assets/search.png";
import cloud_icon from "../Assets/cloud.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import humidity_icon from "../Assets/humidity.png";
import drizzle_icon from "../Assets/drizzle.png";
import clear_icon from "../Assets/clear.png";
import wind_icon from "../Assets/wind.png";

const WeatherApp = () => {

    let api_key = "b619c02ef0d0c5ea4a66d9ddf680e09f";


    return (
        <div className = "container">
            <div className="topbar">
                <input type="text" className="cityInput" placeholder = "Search"/>
                <div className = "search-icon">
                    <img src={search_icon} alt="search"/>
                </div>
            </div>
            <div className="weather-image">
                <img src={cloud_icon} alt="cloud"/>
            </div>
            <div className="weather-temp">
                24°C
            </div>
            <div className="weather-location">London</div>
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
                        <div className="humidity-percentage">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;