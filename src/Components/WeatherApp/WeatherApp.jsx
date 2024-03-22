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
    return (
        <div className = "container">
            <div className="topbar">
                <input type="text" className="cityInput" placeholder = "Search"/>
                <div className = "search-icon">
                    <img src={search_icon} alt="search"/>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;