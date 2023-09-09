const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");

const API_KEY ="e60f5cb54447854537c19bc5c0fa1688";

const getCityCoordinates = () =>{
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
console.log(fiveDaysForecastDays);
    }
}).catch(()=>{
    alert("An error occurred while fetching the coordinates!");
})
}

searchButton.addEventListener("click",getCityCoordinates);