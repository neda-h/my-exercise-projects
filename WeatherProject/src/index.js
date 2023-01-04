function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes().toString();
  if (minutes.length == 1) {
    minutes = "0" + minutes;
  }
  let fullDate = ` ${day} , ${hour}:${minutes} `;
  return fullDate;
}
function setDate() {
  let date = document.querySelector("#date-span");
  date.innerHTML = formatDate(new Date());
}
setDate();

function changeCity(event) {
  event.preventDefault();
  setDate();

  let searchInput = document.querySelector("#city-search");
  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  searchInput = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${searchInput}`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTempreture);
}
let searchForm = document.querySelector("#search-form");
console.log(searchForm);
if (searchForm) searchForm.addEventListener("submit", changeCity);

let currentIsCelsius = 1;
let oldtemp = 0;

function changetempToF(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-degree");
  if (currentTemp.innerHTML && currentIsCelsius === 1) {
    let toF = currentTemp.innerHTML * (9 / 5) + 32;
    oldtemp = toF;
    currentTemp.innerHTML = Math.round(toF);
    currentIsCelsius = 0;
  }
}
function changetempToC(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-degree");
  if (currentTemp.innerHTML && currentIsCelsius === 0) {
    let toC = Math.floor((5 / 9) * (oldtemp - 32));
    currentTemp.innerHTML = Math.round(toC);
    currentIsCelsius = 1;
  }
}
let linkC = document.querySelector("#celsius");
linkC.addEventListener("click", changetempToC);

let linkF = document.querySelector("#fahrenheit");
linkF.addEventListener("click", changetempToF);

function showTempreture(response) {
  let currentDegree = document.querySelector("#current-degree");
  console.log(response.data);
  currentDegree.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("#city");
  city.innerHTML = `${response.data.name},${response.data.sys.country}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = response.data.wind.speed;
  let weatherDesc = document.querySelector("#weather-desc");
  weatherDesc.innerHTML = response.data.weather[0].description;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);
  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTempreture);
}
function showFirst() {
  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=sari`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTempreture);
}
function setCurrent() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentBtn = document.querySelector("#current-location");
currentBtn.addEventListener("click", setCurrent);

showFirst();
