function formatDate(timestemp){
  let date = new Date(timestemp);
  let hours = date.getHours();
  if(hours <10){
    hours=`0${hours}`
  }
  let minutes =date.getMinutes();
  if(minutes <10){
    minutes=`0${minutes}`
  }
  let days=[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestemp){
  let date= new Date(timestemp * 1000);
  let day=date.getDay();
  let days=[
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
   
  ];
  return days[day];

}
function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement=document.querySelector("#forecast");
  let forecastHTML=`<div class="row">`
  forecast.forEach(function(forecastDay, index){
    if (index <6){
    forecastHTML=
    forecastHTML+
    `
  <div class="col-2">
    <div class="weather-forecast-date">
      ${formatDay(forecastDay.time)}
    </div>
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="" width="36">
    <div class="weather-forecast-temperature">      
      <span class="weather-forecast-temperature-max" >${Math.round(forecastDay.temperature.maximum)}°</span>
      <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}°</span>
    </div> 
  </div>`
;}
  });
  forecastHTML=forecastHTML+`</div>`;
  forecastElement.innerHTML=forecastHTML;
}

function getForecast(coordinates){
  let apiKey="a0c924feao2c9e30bt4b9f31c1337af3";
  let apiUrl=`https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);

}

function displayTemperature(response){
  let temperatureElement=document.querySelector("#temperature");
  let cityElement=document.querySelector("#city");
  let descriptionElement=document.querySelector("#description");
  let humidityElement=document.querySelector("#humidity");
  let windElement=document.querySelector("#wind");
  let dateElement=document.querySelector("#date");
  let iconElement=document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  


  temperatureElement.innerHTML=Math.round(celsiusTemperature);
  cityElement.innerHTML=response.data.name;
  descriptionElement.innerHTML=response.data.weather[0].description;
  humidityElement.innerHTML=response.data.main.humidity;
  windElement.innerHTML=Math.round(response.data.wind.speed);
  dateElement.innerHTML=formatDate(response.data.dt *1000);
  iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt",response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city){
  let apiKey="ab13aa3fe6d8d25130a60034078e4897";
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

}
function handlesubmit(event){
  event.preventDefault();
  let cityInputElement=document.querySelector("#city-input");
  search(cityInputElement.value);
}
function displayFahrenheitTemperature(event){
  event.preventDefault();
  let fahrenheitTemperature=(celsiusTemperature*9)/5+32;
  // remove the active class to the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement=document.querySelector("#temperature");
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#temperature");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");


}
let celsiusTemperature = null;


let form = document.querySelector("#search-form");
form.addEventListener("submit",handlesubmit);

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",displayCelsiusTemperature);

search("Tehran");