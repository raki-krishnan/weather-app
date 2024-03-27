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
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [currentGradient, setCurrentGradient] = useState(0);   
    
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
    "Ann Arbor", "Boulder", "Bloomington", "Champaign", "Evanston", "Ithaca", "Lawrence", "Lexington",
    "Morgantown", "Norman", "Oxford", "Palo Alto", "Princeton", "Raleigh", "State College", "Tallahassee",
    "New Mexico", "Urbana", "Anaheim", "Berkeley", "Cambridge", "Chapel Hill", "Columbia", "Davis", 
    "Gainesville", "Montreal", "Quebec City", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg",
    "Halifax", "St. John's", "Regina", "Saskatoon", "Victoria", "Fredericton", "Charlottetown", "Whitehorse",
    "Farmington Hills", "West Bloomfield", "Troy", "Novi", "Royal Oak", "Birmingham", "Southfield", "Livonia",
    "Salvador", "Betis", "Girona", "Vigo", "Granada", "Alicante", "Cordoba", "Valladolid", "Bilbao",
    "San Sebastian", "Santander", "Oviedo", "Pamplona", "Logrono", "Zaragoza", "Villereal", "Malaga",
    "Prades", "Tarragona", "Lleida", "Reus", "Terrassa", "Sabadell", "Badalona", "Mataro", "Gava",
    "Nice", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Nantes", "Rennes", "Lille", "Strasbourg",
    "Hyderabad", "Goa", "Kerala", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Odisha", "Patna", "Punjab",
    "West Bengal", "Srinagar", "Agra", "Allahabad", "Amritsar", "Bhopal", "Chandigarh", "Dehradun",
    "Busan", "Daegu", "Incheon", "Gwangju", "Daejeon", "Ulsan", "Jeju", "Sejong", "Suwon", "Goyang",
    "Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Rabat", "Casablanca", "Fes", "Tangier", "Marrakesh",
    "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "Oklahoma",
    "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
    "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Alabama", "Alaska", "Arizona",
    "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kathmandu", "Pokhara", "Biratnagar", "Birgunj", "Butwal", "Hetauda",];



    const countryCodes = {
        'AD': 'Andorra',
        'AE': 'United Arab Emirates',
        'AF': 'Afghanistan',
        'AG': 'Antigua & Barbuda',
        'AI': 'Anguilla',
        'AL': 'Albania',
        'AM': 'Armenia',
        'AN': 'Netherlands Antilles',
        'AO': 'Angola',
        'AQ': 'Antarctica',
        'AR': 'Argentina',
        'AS': 'American Samoa',
        'AT': 'Austria',
        'AU': 'Australia',
        'AW': 'Aruba',
        'AZ': 'Azerbaijan',
        'BA': 'Bosnia and Herzegovina',
        'BB': 'Barbados',
        'BD': 'Bangladesh',
        'BE': 'Belgium',
        'BF': 'Burkina Faso',
        'BG': 'Bulgaria',
        'BH': 'Bahrain',
        'BI': 'Burundi',
        'BJ': 'Benin',
        'BM': 'Bermuda',
        'BN': 'Brunei Darussalam',
        'BO': 'Bolivia',
        'BR': 'Brazil',
        'BS': 'Bahama',
        'BT': 'Bhutan',
        'BU': 'Burma (no longer exists)',
        'BV': 'Bouvet Island',
        'BW': 'Botswana',
        'BY': 'Belarus',
        'BZ': 'Belize',
        'CA': 'Canada',
        'CC': 'Cocos (Keeling) Islands',
        'CF': 'Central African Republic',
        'CG': 'Congo',
        'CH': 'Switzerland',
        'CI': 'Côte D\'ivoire (Ivory Coast)',
        'CK': 'Cook Iislands',
        'CL': 'Chile',
        'CM': 'Cameroon',
        'CN': 'China',
        'CO': 'Colombia',
        'CR': 'Costa Rica',
        'CS': 'Czechoslovakia (no longer exists)',
        'CU': 'Cuba',
        'CV': 'Cape Verde',
        'CX': 'Christmas Island',
        'CY': 'Cyprus',
        'CZ': 'Czech Republic',
        'DD': 'German Democratic Republic (no longer exists)',
        'DE': 'Germany',
        'DJ': 'Djibouti',
        'DK': 'Denmark',
        'DM': 'Dominica',
        'DO': 'Dominican Republic',
        'DZ': 'Algeria',
        'EC': 'Ecuador',
        'EE': 'Estonia',
        'EG': 'Egypt',
        'EH': 'Western Sahara',
        'ER': 'Eritrea',
        'ES': 'Spain',
        'ET': 'Ethiopia',
        'FI': 'Finland',
        'FJ': 'Fiji',
        'FK': 'Falkland Islands (Malvinas)',
        'FM': 'Micronesia',
        'FO': 'Faroe Islands',
        'FR': 'France',
        'FX': 'France, Metropolitan',
        'GA': 'Gabon',
        'GB': 'United Kingdom (Great Britain)',
        'GD': 'Grenada',
        'GE': 'Georgia',
        'GF': 'French Guiana',
        'GH': 'Ghana',
        'GI': 'Gibraltar',
        'GL': 'Greenland',
        'GM': 'Gambia',
        'GN': 'Guinea',
        'GP': 'Guadeloupe',
        'GQ': 'Equatorial Guinea',
        'GR': 'Greece',
        'GS': 'South Georgia and the South Sandwich Islands',
        'GT': 'Guatemala',
        'GU': 'Guam',
        'GW': 'Guinea-Bissau',
        'GY': 'Guyana',
        'HK': 'Hong Kong',
        'HM': 'Heard & McDonald Islands',
        'HN': 'Honduras',
        'HR': 'Croatia',
        'HT': 'Haiti',
        'HU': 'Hungary',
        'ID': 'Indonesia',
        'IE': 'Ireland',
        'IL': 'Israel',
        'IN': 'India',
        'IO': 'British Indian Ocean Territory',
        'IQ': 'Iraq',
        'IR': 'Islamic Republic of Iran',
        'IS': 'Iceland',
        'IT': 'Italy',
        'JM': 'Jamaica',
        'JO': 'Jordan',
        'JP': 'Japan',
        'KE': 'Kenya',
        'KG': 'Kyrgyzstan',
        'KH': 'Cambodia',
        'KI': 'Kiribati',
        'KM': 'Comoros',
        'KN': 'St. Kitts and Nevis',
        'KP': 'North Korea',
        'KR': 'South Korea',
        'KW': 'Kuwait',
        'KY': 'Cayman Islands',
        'KZ': 'Kazakhstan',
        'LA': 'Lao People\'s Democratic Republic',
        'LB': 'Lebanon',
        'LC': 'Saint Lucia',
        'LI': 'Liechtenstein',
        'LK': 'Sri Lanka',
        'LR': 'Liberia',
        'LS': 'Lesotho',
        'LT': 'Lithuania',
        'LU': 'Luxembourg',
        'LV': 'Latvia',
        'LY': 'Libyan Arab Jamahiriya',
        'MA': 'Morocco',
        'MC': 'Monaco',
        'MD': 'Moldova, Republic of',
        'MG': 'Madagascar',
        'MH': 'Marshall Islands',
        'ML': 'Mali',
        'MN': 'Mongolia',
        'MM': 'Myanmar',
        'MO': 'Macau',
        'MP': 'Northern Mariana Islands',
        'MQ': 'Martinique',
        'MR': 'Mauritania',
        'MS': 'Monserrat',
        'MT': 'Malta',
        'MU': 'Mauritius',
        'MV': 'Maldives',
        'MW': 'Malawi',
        'MX': 'Mexico',
        'MY': 'Malaysia',
        'MZ': 'Mozambique',
        'NA': 'Namibia',
        'NC': 'New Caledonia',
        'NE': 'Niger',
        'NF': 'Norfolk Island',
        'NG': 'Nigeria',
        'NI': 'Nicaragua',
        'NL': 'Netherlands',
        'NO': 'Norway',
        'NP': 'Nepal',
        'NR': 'Nauru',
        'NT': 'Neutral Zone (no longer exists)',
        'NU': 'Niue',
        'NZ': 'New Zealand',
        'OM': 'Oman',
        'PA': 'Panama',
        'PE': 'Peru',
        'PF': 'French Polynesia',
        'PG': 'Papua New Guinea',
        'PH': 'Philippines',
        'PK': 'Pakistan',
        'PL': 'Poland',
        'PM': 'St. Pierre & Miquelon',
        'PN': 'Pitcairn',
        'PR': 'Puerto Rico',
        'PT': 'Portugal',
        'PW': 'Palau',
        'PY': 'Paraguay',
        'QA': 'Qatar',
        'RE': 'Réunion',
        'RO': 'Romania',
        'RU': 'Russian Federation',
        'RW': 'Rwanda',
        'SA': 'Saudi Arabia',
        'SB': 'Solomon Islands',
        'SC': 'Seychelles',
        'SD': 'Sudan',
        'SE': 'Sweden',
        'SG': 'Singapore',
        'SH': 'St. Helena',
        'SI': 'Slovenia',
        'SJ': 'Svalbard & Jan Mayen Islands',
        'SK': 'Slovakia',
        'SL': 'Sierra Leone',
        'SM': 'San Marino',
        'SN': 'Senegal',
        'SO': 'Somalia',
        'SR': 'Suriname',
        'ST': 'Sao Tome & Principe',
        'SU': 'Union of Soviet Socialist Republics (no longer exists)',
        'SV': 'El Salvador',
        'SY': 'Syrian Arab Republic',
        'SZ': 'Swaziland',
        'TC': 'Turks & Caicos Islands',
        'TD': 'Chad',
        'TF': 'French Southern Territories',
        'TG': 'Togo',
        'TH': 'Thailand',
        'TJ': 'Tajikistan',
        'TK': 'Tokelau',
        'TM': 'Turkmenistan',
        'TN': 'Tunisia',
        'TO': 'Tonga',
        'TP': 'East Timor',
        'TR': 'Turkey',
        'TT': 'Trinidad & Tobago',
        'TV': 'Tuvalu',
        'TW': 'Taiwan, Province of China',
        'TZ': 'Tanzania, United Republic of',
        'UA': 'Ukraine',
        'UG': 'Uganda',
        'UM': 'United States Minor Outlying Islands',
        'US': 'USA',
        'UY': 'Uruguay',
        'UZ': 'Uzbekistan',
        'VA': 'Vatican City State (Holy See)',
        'VC': 'St. Vincent & the Grenadines',
        'VE': 'Venezuela',
        'VG': 'British Virgin Islands',
        'VI': 'Virgin Islands',
        'VN': 'Vietnam',
        'VU': 'Vanuatu',
        'WF': 'Wallis & Futuna Islands',
        'WS': 'Samoa',
        'YD': 'Democratic Yemen (no longer exists)',
        'YE': 'Yemen',
        'YT': 'Mayotte',
        'YU': 'Yugoslavia',
        'ZA': 'South Africa',
        'ZM': 'Zambia',
        'ZR': 'Zaire',
        'ZW': 'Zimbabwe',
        'ZZ': 'Unknown or unspecified country',
    }

    const gradients = [
        'linear-gradient(180deg, #130754 0%, #3b2f80 100%)',               // Dark violet to dark blue
        'linear-gradient(180deg, #ff758c 0%, #ff7eb3 100%)',               // Pink to light pink
        'linear-gradient(180deg, #00bf8f 0%, #001510 100%)',               // Green to dark green
        'linear-gradient(180deg, #4facfe 0%, #00f2fe 100%)',               // Sky blue to light blue
        'linear-gradient(180deg, #5ee7df 0%, #b490ca 100%)',               // Light blue to light violet
        'linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', // Deep blue to gray
        'linear-gradient(180deg, #232526 0%, #414345 100%)',               // Dark slate
        'linear-gradient(180deg, #414345 0%, #232526 100%)',               // Dark slate to lighter slate
        'linear-gradient(180deg, #4b6cb7 0%, #182848 100%)',               // Mid blue to dark blue
        'linear-gradient(180deg, #1f1c2c 0%, #928dab 100%)',               // Dark violet to mid-light violet
        'linear-gradient(180deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)',  // Purple to rosy pink to light peach
        'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',  // Dark violet to dark slate
        'linear-gradient(180deg, #16222a 0%, #3a6073 100%)',               // Dark slate to steel blue
        'linear-gradient(180deg, #1e3c72 0%, #2a5298 100%)',               // Dark blue to lighter blue
        'linear-gradient(180deg, #1e130c 0%, #9a8478 100%)',               // Dark brown to dusty gray
        'linear-gradient(180deg, #000000 0%, #434343 100%)',               // Black to mid-gray
        'linear-gradient(180deg, #2b5876 0%, #4e4376 100%)',               // Dark blue to dark purple
        'linear-gradient(180deg, #00467f 0%, #a5cc82 100%)',               // Dark azure to pale leaf
        'linear-gradient(180deg, #614385 0%, #516395 100%)',               // Dusky purple to dusky blue
        'linear-gradient(180deg, #29323c 0%, #485563 100%)',               // Charcoal to slate blue
        'linear-gradient(180deg, #1c92d2 0%, #f2fcfe 50%, #1c92d2 100%)'   // Sky blue to light mist (white text visible in darker areas)
      ];
    
    function adjustTextSize(id, initialFontSize, step) {
        const element = document.getElementById(id);
        let currentSize = initialFontSize;
      
        // Set the initial font size
        element.style.fontSize = `${currentSize}px`;
      
        // Reduce the font size until the text fits or reaches a minimum size
        while (element.scrollWidth > element.offsetWidth && currentSize > 12) { // minimum size = 12px
          currentSize -= step;
          element.style.fontSize = `${currentSize}px`;
        }
    }
    
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

    const handleContainerClick = (event) => {
        // Check if the click is not on an input or button
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'BUTTON') {
          // Change the background gradient
          setCurrentGradient((current) => (current + 1) % gradients.length);
        }
      };
    
    useEffect(() => {
        loadCities();
        fetchWeatherData("Ann Arbor").catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchRandomWeather = () => {
        let retryCount = 0;
        const maxRetries = 10; // Set a maximum number of retries to prevent infinite loops
    
        const tryFetch = () => {
            if (retryCount >= maxRetries) {
                console.log("Maximum retries reached, stopping the fetch attempts.");
                return;
            }
    
            const randomIndex = Math.floor(Math.random() * cities.length);
            const randomCity = cities[randomIndex];
    
            if (!randomCity || randomCity.city === "") {
                // Invalid city object, increment retry count and retry
                retryCount++;
                tryFetch();
                return;
            }
    
            fetchWeatherData(randomCity.city, () => {
                // onSuccess: Log the success or perform other actions
                console.log("Weather data fetched successfully for: " + randomCity.city);
            }, () => {
                // onError: Log the error, increment retry count, and retry with another random city
                console.log("Failed to fetch data for city: " + randomCity.city + ", retrying with another city");
                retryCount++;
                tryFetch();
            });
        };
    
        tryFetch();
    };
    



    let api_key = "b619c02ef0d0c5ea4a66d9ddf680e09f";
    const element = document.getElementsByClassName("cityInput");

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

        setLoading(true);
        setError(null);
    
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
            location[0].innerHTML = data.name + ", " + countryCodes[data.sys.country];
            adjustTextSize('weather-location', 50, 1); // Initial size = 60, step = 1
    
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
            setLoading(false); 
        } catch (error) {
            console.error(error);
            setLoading(false);
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
        <div className="container" onClick={handleContainerClick} style={{ backgroundImage: gradients[currentGradient] }}>
            {loading && <div className="loading">Loading...</div>}
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
                    <img src={wicon} alt="weather icon" className="main-icon" />
                </div>
                <div className="weather-details-button-container">
                    <div className="weather-details">
                        <div className="weather-temp">...</div>
                        <div className="weather-location">Ann Arbor, USA</div>
                    </div>
                    <button className="where-else" onClick={whereElseInTheWorld}>Twin</button>
                </div>
            </div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="humidity icon" className="icon" />
                    <div className="data">
                        <div className="humidity-percentage">...%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="wind icon" className="icon" />
                    <div className="data">
                        <div className="wind-speed">... mph</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
            <button className="lucky-button" onClick={fetchRandomWeather}>I'm Feeling Lucky</button>
        </div>
    )
}    
export default WeatherApp;
