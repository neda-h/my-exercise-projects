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
  let fullDate = ` ${day}  ${hour}:${minutes} `;
  return fullDate;
}
function setDate() {
  let date = document.querySelector("#date-span");
  date.innerHTML = formatDate(new Date());
}
setDate();

function showTempreture(response) {
  event.preventDefault();
  let currentDegree = document.querySelector("#temperature");
  console.log(response.data.country);
  console.log(response);
  console.log(response.data.daily[0].temperature.day);
  currentDegree.innerHTML = Math.round(response.data.daily[0].temperature.day);
  let city = document.querySelector("#city");
  let country = response.data.country;
  country = country.toString().split("(")[0];

  city.innerHTML = `${response.data.city},${country}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.daily[0].temperature.humidity;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = response.data.daily[0].wind.speed;
  let weatherDesc = document.querySelector("#weather-desc");
  weatherDesc.innerHTML = response.data.daily[0].condition.description;
  let icon = document.getElementById("icon");
  icon.src = response.data.daily[0].condition.icon_url;
}
let apiKey = "af253f0a8o48e8b1400ef66f4294tdf3";
let apiUrl = "https://api.shecodes.io/weather/v1/forecast?units=metric";

function showFirst() {
  axios.get(`${apiUrl}&query=sari&key=${apiKey}`).then(showTempreture);
}
showFirst();
