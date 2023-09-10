const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const cityInput = document.querySelector(".city-input");
const weatherCards = document.querySelector(".weather-cards");
const currentWeatherCard = document.querySelector(".current-weather");
const API_KEY ="e60f5cb54447854537c19bc5c0fa1688";
const loadingIcon = document.querySelectorAll("i");
let city;
const addCurrWeather = (weatherInfo)=>{
    return `<div class="details">
    <h2>${city}</h2>
    <h4>${(weatherInfo.main.temp - 273.15).toFixed(2)}°C</h4>
    <h4>${weatherInfo.wind.speed} M/S</h4>
    <h4>Humidity: ${weatherInfo.main.humidity}%</h4>
</div>
<div class="icon">
    <img src="https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png" alt="weather-icon">
    <h4>${weatherInfo.weather[0].description}</h4>
</div>`
}
const addWeatherDetails = (weatherInfo)=>{
return `<li class="card">
<h3>(${weatherInfo.dt_txt.split(" ")[0].split("-")[2]+"/"+ weatherInfo.dt_txt.split(" ")[0].split("-")[1]+"/"+weatherInfo.dt_txt.split(" ")[0].split("-")[0]})</h3>
<img src="https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png" alt="weather-icon">
<h4>Temperature : ${(weatherInfo.main.temp - 273.15).toFixed(2)}°C</h4>
<h4>Wind: ${weatherInfo.wind.speed} M/S</h4>
<h4>Humidity: ${weatherInfo.main.humidity}%</h4>
</li>` 
}
const getCityCoordinates = () =>{
    loadingIcon[0].setAttribute("class","fa fa-spinner fa-spin");
const cityName = cityInput.value.trim();
if(!cityName) return;
const GEOCODING_API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`;
fetch(GEOCODING_API_URL)
.then((res)=> res.json()).then(data=>{
    if(data.length==0){
       return alert(`Your City Name : ${cityName} is not valid.`);
    }
    else{
    const uniqueForecastDays = [];
const fiveDaysForecastDays = data.list.filter(forecast => {
const forecastDate = new Date (forecast.dt_txt).getDate();
if(!uniqueForecastDays.includes(forecastDate)) {
return uniqueForecastDays.push(forecastDate);
}
});
city=cityInput.value.trim();
cityInput.value = "";
cityInput.setAttribute("placeholder","Enter another city");
weatherCards.innerHTML="";
currentWeatherCard.innerHTML="";
fiveDaysForecastDays.forEach((weatherInfo,index) => {
    if(index==0)
    currentWeatherCard.insertAdjacentHTML("afterbegin",addCurrWeather(weatherInfo));
    else
    weatherCards.insertAdjacentHTML("beforeend",addWeatherDetails(weatherInfo));
});
loadingIcon[0].setAttribute("class","");
loadingIcon[1].setAttribute("class","");
    }
})
.catch(()=>{
    alert("An error occurred while fetching the coordinates!");
});
}
const getUserCoordinates = () => { 
    cityInput.value="";
    loadingIcon[1].setAttribute("class","fa fa-spinner fa-spin");
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude , longitude } = position.coords;
             const Reverse_Geocoding_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
             fetch(Reverse_Geocoding_URL)
             .then((res)=>{
                return res.json();
             })
             .then((data)=>{
               cityInput.value=data[0].name;
                getCityCoordinates();
             })
             .catch(()=>{
                alert("An error occured while fetching the city!");
             })
        },
        (error) => {
           if(error.code == 1){
            alert("Geolocation request denied. Please reset location permission to grant access again.");
           }
        }
    )
};

locationButton.addEventListener("click",getUserCoordinates);
searchButton.addEventListener("click",getCityCoordinates);
cityInput.addEventListener("keyup",(keyname)=>{
    if(keyname.key=="Enter")
        getCityCoordinates();
})