function formatDate(timespan) {
  let date = new Date(timespan);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) hour = `0${hour}`;
  let minutes = date.getMinutes().toString();
  if (minutes < 10) minutes = `0${minutes}`;

  let fullDate = ` ${day}  ${hour}:${minutes} `;
  return fullDate;
}

function showTempreture(response) {
  event.preventDefault();
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let countryElement = response.data.country;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let descriptionElement = document.querySelector("#weather-desc");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date-span");
  temperatureElement.innerHTML = Math.round(
    response.data.daily[0].temperature.day
  );
  countryElement = countryElement.toString().split("(")[0];
  cityElement.innerHTML = `${response.data.city},${countryElement}`;
  humidityElement.innerHTML = response.data.daily[0].temperature.humidity;
  windElement.innerHTML = Math.round(response.data.daily[0].wind.speed);
  descriptionElement.innerHTML = response.data.daily[0].condition.description;
  iconElement.setAttribute("src", response.data.daily[0].condition.icon_url);
  iconElement.setAttribute("alt", response.data.daily[0].condition.description);
  dateElement.innerHTML = formatDate(response.data.daily[0].time * 1000);
}
let apiKey = "af253f0a8o48e8b1400ef66f4294tdf3";
let apiUrl = "https://api.shecodes.io/weather/v1/forecast?units=metric";

function showFirst() {
  axios.get(`${apiUrl}&query=paris&key=${apiKey}`).then(showTempreture);
}
showFirst();
