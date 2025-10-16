// Creating class variables
    let cityName = document.querySelector(".weather-city");
    let dateTime = document.querySelector('.weather-date-time');
    let forecast = document.querySelector('.weather-forecast');
    let icon = document.querySelector('.weather-icon');
    let temperature = document.querySelector('.weather-temperature');
    let minTemp = document.querySelector('.weather-min');
    let maxTemp = document.querySelector('.weather-max');
    let feelsLike = document.querySelector('.weather-feels-like');
    let humidity = document.querySelector('.weather-humidity');
    let windspeed = document.querySelector('.weather-wind');
    let pressure = document.querySelector('.weather-pressure');

    // default city data
        let city = "Delhi";
        
        // search city
        let citySearch = document.querySelector('.weather-search');
        let city_name = document.querySelector('.city-name');
        citySearch.addEventListener('submit', (event) => {
            event.preventDefault();
            city = city_name.value;
            getWeatherData();
            citySearch.reset();
        });

// API Key
    let key = '9fbd221ec2b6ceff514788832f29487b';

// using Internationalization API to get country name from country code
    const getCountryName = (countryCode) => {
        return new Intl.DisplayNames([countryCode], {type: 'region'}).of(countryCode);
    }

// using Internationalization API to format date and time
    const getDateTime = (dt) => {
        return new Intl.DateTimeFormat("en-IN", {
            dateStyle: "full",
            timeStyle: "long",
            timeZone: "Asia/Kolkata",
        } ).format(dt);
    }

// on page load
    const getWeatherData = async() => {
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
        try {
            // res is in string
                const res = await fetch(weatherApiUrl);
            // converting res to json object
                const data = await res.json();
            // destructuring data object
                const { main, name, weather, wind, sys, dt} = data;

            // getting city and country name
                cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
            // getting date and time
                //converting to ms
                dateTime.textContent = getDateTime(dt*1000);
            // getting weather forecast
                forecast.textContent = weather[0].main;
            // getting weather icon
                icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather Icon">`;
            // getting temperature
                temperature.innerHTML = `${Math.round(main.temp - 272.15).toFixed()}&#176`;
            // getting min temperature
                minTemp.innerHTML = `Min : ${Math.round(main.temp_min - 272.15).toFixed()}&#176`;
            // getting max temperature
                maxTemp.innerHTML = `Max : ${Math.round(main.temp_max - 272.15).toFixed()}&#176`;
            // getting feels like temperature
                feelsLike.innerHTML = `${Math.round(main.feels_like - 272.15).toFixed()}&#176`;
            // getting humidity
                humidity.innerHTML = `${main.humidity}%`;
            // getting wind speed
                windspeed.innerHTML = `${(wind.speed*3.6).toFixed(3)} km/hr`;
            // getting pressure
                pressure.innerHTML = `${main.pressure}hPa`;

            // changing background based on weather
                if(weather[0].main === 'Clouds') {
                    document.body.style.backgroundImage = "url('./images/clouds.webp')";
                } else if(weather[0].main === 'Clear') {
                    document.body.style.backgroundImage = "url('./images/clear-sky.webp')";
                } else if(weather[0].main === 'Haze' || weather[0].main === 'Mist' || weather[0].main === 'Fog') {
                    document.body.style.backgroundImage = "url('./images/fog.webp')";
                } else if(weather[0].main === 'Snow') {
                    document.body.style.backgroundImage = "url('./images/snow.webp')";
                } else if(weather[0].main === 'Thunderstorm') {
                    document.body.style.backgroundImage = "url('./images/thunderstorm.webp')";
                } else if(weather[0].main === 'Drizzle' || weather[0].main === 'Rain') {
                    document.body.style.backgroundImage = "url('./images/drizzle.webp";
                }
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundPosition = "center";
                document.body.style.backgroundRepeat = "no-repeat";
        } catch (error) {
            alert(error);
        }
    }

// load data on page load
    document.body.addEventListener('load', getWeatherData());