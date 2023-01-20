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
function getDayName(timespan) {
  let date = new Date(timespan);
  let days = ["Sun", "Mo", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function showTempreture(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let countryElement = response.data.country;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let descriptionElement = document.querySelector("#weather-desc");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date-span");

  celsiusTemperature = response.data.daily[0].temperature.day;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  countryElement = countryElement.toString().split("(")[0];
  cityElement.innerHTML = `${response.data.city},${countryElement}`;
  humidityElement.innerHTML = response.data.daily[0].temperature.humidity;
  windElement.innerHTML = Math.round(response.data.daily[0].wind.speed);
  descriptionElement.innerHTML = response.data.daily[0].condition.description;
  iconElement.setAttribute("src", response.data.daily[0].condition.icon_url);
  iconElement.setAttribute("alt", response.data.daily[0].condition.description);
  dateElement.innerHTML = formatDate(response.data.daily[0].time * 1000);
  displayForecast(response.data);
}
function search(city) {
  let apiKey = "af253f0a8o48e8b1400ef66f4294tdf3";
  let apiUrl = "https://api.shecodes.io/weather/v1/forecast?units=metric";

  axios.get(`${apiUrl}&query=${city}&key=${apiKey}`).then(showTempreture);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text");
  city = city.value;
  search(city);
}
function changeToFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("disable-link");
  fahrenheitLink.classList.add("disable-link");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function changeToCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("disable-link");
  fahrenheitLink.classList.remove("disable-link");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function displayForecast(data) {
  let forecast = data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row" id="forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `<div class="col-2">
                  <div class="next-day">${getDayName(
                    forecastDay.time * 1000
                  )}</div>
                  <img src="${forecastDay.condition.icon_url}"  alt="${
        forecastDay.condition.description
      }" />
                  <div class="next-temp">
                    <span class="next-day-max" >${Math.round(
                      forecastDay.temperature.maximum
                    )}</span>
                    <span class="next-day-min" >${Math.round(
                      forecastDay.temperature.minimum
                    )}</span>
                  </div>
                </div>`;
    }
  });

  forecastHTML += "</div>";
  forecastElement.innerHTML = forecastHTML;
}
let input_element = document.querySelector("#search-text");
input_element.setAttribute("value", input_element.value);
input_element.addEventListener("keyup", () => {
  input_element.setAttribute("value", input_element.value);
});
let celsiusTemperature = null;

search("paris");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsiusTemperature);
