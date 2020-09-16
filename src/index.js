//function to display current weekday and time
function formattedDate(date) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let today = days[current.getDay()];

    let hour = current.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let min = current.getMinutes();
    if (min < 10) {
        min = `0${min}`;
    }
    return `${today}, ${hour}:${min}`;
    
}
//function for search form.
function displayWeatherInfo(response) {
    let tempElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#weather-description");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");

    fahrenheitTemp = response.data.main.temp;
  
    tempElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].main;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  }

//function to display search results.
function searchCity(event) {
    event.preventDefault();
    let cityName = document.querySelector("#city-search").value;
  
    let apiKey = "9806641a884960bc13a3323dc628066b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeatherInfo);
  
}


// function to show temp for geolocation.

//function for current position.
function currentPosition(position) {
    
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "9806641a884960bc13a3323dc628066b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeatherInfo);
}

navigator.geolocation.getCurrentPosition(currentPosition);

//function displayFahrenheit(event) {
    //event.preventDefault();
    //let temperatureElement = document.querySelector("#temperature");
    //temperatureElement.innerHTML = 85;
//}

function displayCelsius(event) {
    event.preventDefault();
    let celsiusElement = (fahrenheitTemp - 32) * 5/9; 
    let temperatureElement = document.querySelector("#temperature");   
    temperatureElement.innerHTML = Math.round(celsiusElement);
}




//display current weekday and time.
let current = new Date();
let currentDayTime = document.querySelector("#date");
currentDayTime.innerHTML = formattedDate(current);

let fahrenheitTemp = null;

//search engine
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

// Bonus Feature
//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);