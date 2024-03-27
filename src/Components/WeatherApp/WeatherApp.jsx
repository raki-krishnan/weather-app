import { useState, useEffect } from 'react';
import './WeatherApp.css';
import Papa from 'papaparse';
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
    const [cities, setCities] = useState([]);
    const [error, setError] = useState("");    
    
    const citiesList = ["Tokyo", "New York", "London", "Paris", "Sydney", 
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
    "Normandy", "Taipei", "Auckland", "Wellington", "Christchurch", "Brisbane", "Perth",
    "Adelaide", "Canberra", "Hobart", "Darwin", "Alice Springs", "Cairns", "Gold Coast",
    "Townsville", "Mackay", "Rockhampton", "Bundaberg", "Hervey Bay", "Fraser Island", 
    "Luzhou", "Chengdu", "Chongqing", "Wuhan", "Nanjing", "Hangzhou", "Puyang", "Suzhou",
    "Charlotte", "Indianapolis", "Columbus", "Fort Worth", "El Paso", "Louisville", "Nashville",
    "Memphis", "Oklahoma City", "Santa Monica", "Baltimore", "Milwaukee", "Albuquerque", "Tucson",
    "Fresno", "Sacramento", "Long Beach", "Kansas City", "Mesa", "Virginia Beach", "Santa Clara",
    "Manhattan", "The Bronx", "Buffalo", "Rochester", "Kolkata", "Pune", "Ahmedabad", "Hyderabad",
    "Lahore", "Karachi", "Islamabad", "Dhaka", "Chittagong", "Colombo", "Kandy", "Galle", "Jaffna",
    "Munich", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence", "Hamburg", "Bari",
    "Manchester", "Birmingham", "Leeds", "Glasgow", "Sheffield", "Liverpool", "Bristol", "Cardiff",
    "Blacksburg", "Durban", "Bloemfontein", "Port Elizabeth", "East London", "Pietermaritzburg",
    "Jinja", "Kampala", "Tampa", "Mombasa", "Kisumu", "Eldoret", "Nakuru", "Kisii", "Kakamega",
    "Austin", "Little Rock", "Des Moines", "Boise", "Jackson", "Billings", "Helena", "Cheyenne",
    "Santa Fe", "Olympia", "Salem", "Carson City", "Juneau", "Fairfax", "Bethesda", "Fairbanks",
    "Annapolis", "Harrisburg", "Trenton", "Albany", "Hartford", "Providence", "Concord", "Montpelier",
    "Green Bay", "Madison", "Springfield", "Lansing", "Topeka", "Jefferson City", "Lincoln", "Pierre", 
    "Ann Arbor", "Boulder", "Bloomington", "Champaign", "Evanston", "Ithaca", "Lawrence", "Lexington"];


    const loadCities = async () => {
        // Assuming your CSV file is located in the `public` directory.
        const response = await fetch('/simplemaps_worldcities_basicv1.77/worldcities.csv');

        if (!response.ok) {
            // If the response is not OK, log the error and return early
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }

        // If the response is OK, read the text (CSV content)
        const csv = await response.text();

        // Now parse the CSV text
        const results = Papa.parse(csv, { header: true });
        const rows = results.data; // array of objects
        setCities(rows);
        
        if (rows.length > 0) {
            console.log("First city from the loaded data:", rows[0]);
        } else {
            console.log("No data in CSV");
        }
    };
    
    useEffect(() => {
        loadCities();
        fetchWeatherData("Ann Arbor");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchRandomWeather = () => {
        if (cities.length > 0) {
            const tryFetch = () => {
                const randomIndex = Math.floor(Math.random() * cities.length);
                const randomCity = cities[randomIndex];
    
                if (!randomCity || randomCity.city === "") {
                    // Invalid city object, retry
                    tryFetch();
                    return;
                }
    
                fetchWeatherData(randomCity.city, () => {
                    // onSuccess: Log the success or perform other actions
                    console.log("Weather data fetched successfully for: " + randomCity.city);
                }, () => {
                    // onError: Retry with another random city
                    console.log("Retrying with another city");
                    tryFetch();
                });
            };
    
            tryFetch();
        }
    };



    let api_key = "b619c02ef0d0c5ea4a66d9ddf680e09f";
    const element = document.getElementsByClassName("cityInput");

    // const whereElseInTheWorld = async () => {
    //     const currentCity = document.getElementsByClassName("weather-location")[0].innerHTML;
    //     const currentCityTemperature = document.getElementsByClassName("weather-temp")[0].innerHTML;;
    
    //     // A helper function to delay the loop execution
    //     const delay = ms => new Promise(res => setTimeout(res, ms));
    
    //     // Assuming cities is an array of city objects with a city name property
    //     const maxAttempts = cities.length;
    //     const attemptIntervalMs = 10; // Delay between attempts in milliseconds
    
    //     for (let i = 0; i < maxAttempts; i++) {
    //         const randomIndex = Math.floor(Math.random() * cities.length);
    //         const city = cities[randomIndex].city;
    
    //         // Avoid re-checking the current city
    //         if (city === currentCity) {
    //             continue;
    //         }
    
    //         try {
    //             // You will call the fetchWeatherData function with a callback
    //             const checkTemperatureMatch = (onSuccess, onError) => {
    //                 fetchWeatherData(city, onSuccess, onError);
    //             };
    
    //             await new Promise((resolve, reject) => {
    //                 checkTemperatureMatch(() => {
    //                     // If the temperature matches, we resolve the promise
    //                     if (currentCityTemperature === currentTemp) {
    //                         resolve();
    //                     } else {
    //                         // Otherwise, we reject and try the next city after a delay
    //                         setTimeout(() => reject(), attemptIntervalMs);
    //                     }
    //                 }, () => {
    //                     // If the API call fails, we try the next city after a delay
    //                     setTimeout(() => reject(), attemptIntervalMs);
    //                 });
    //             });
    
    //             // If we've found a match, we break out of the loop
    //             break;
    //         } catch {
    //             // Continue to the next iteration after a delay
    //             await delay(attemptIntervalMs);
    //         }
    //     }
    // };
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
            randomIndex = Math.floor(Math.random() * citiesList.length);
            randomCity = citiesList[randomIndex];
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

    const fetchWeatherData = async (city, onSuccess, onError) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    
        try {
            const response = await fetch(url);
            console.log("HOLLAAAAAA " + response);
            if (!response.ok) {
                throw new Error("City not found");
            }
    
            const data = await response.json();
            console.log(data);
            const cityTemperature = Math.floor((data.main.temp - 273.15) * 9/5 + 32);
    
            // Update the UI with the new data
            const humidity = document.getElementsByClassName("humidity-percentage");
            const wind = document.getElementsByClassName("wind-speed");
            const temperature = document.getElementsByClassName("weather-temp");
            const location = document.getElementsByClassName("weather-location");
    
            humidity[0].innerHTML = data.main.humidity + "%";
            wind[0].innerHTML = data.wind.speed + " mph";
            temperature[0].innerHTML = cityTemperature + "°F";
            location[0].innerHTML = data.name + ", " + data.sys.country;
    
            // Update weather icon based on the API response
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
            if (onSuccess) {
                onSuccess(cityTemperature); 
            }
        } catch (error) {
            console.error(error);
            setError("City not found");
            setTimeout(() => setError(""), 3000);
            if (onError) {
                onError();
            }
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
                        <div className="weather-location">Ann Arbor, United States</div>
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
