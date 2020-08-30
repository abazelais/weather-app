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
   
   document.querySelector("#city").innerHTML = response.data.name;
   document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
   document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
   document.querySelector("#humidity").innerHTML = response.data.main.humidity;
   document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);

}
function searchCity(event) {
    event.preventDefault();

    let apiKey = "9806641a884960bc13a3323dc628066b";
    let cityName = document.querySelector("#city-search").value;
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

//function convertToFahrenheit(event) {
  //  event.preventDefault();
    //let temperatureElement = document.querySelector("#temperature");
    //temperatureElement.innerHTML = 85;
//}

//function convertToCelsius(event) {
  //  event.preventDefault();
    //let temperatureElement = document.querySelector("#temperature");
    //temperatureElement.innerHTML = 19;
//}

    


//display current weekday and time.
let current = new Date();
let currentDayTime = document.querySelector("#date");
currentDayTime.innerHTML = formattedDate(current);

//search engine
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

// Bonus Feature
//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);

//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", convertToCelsius);