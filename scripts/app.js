let weatherService;
let selectCity;

document.addEventListener("DOMContentLoaded", () => {

   
    selectCity = document.getElementById("citySelect");

    populateCityValues();

    selectCity.addEventListener("change", weatherStationLookup)

}
)

function populateCityValues() {
    selectCity = document.getElementById("citySelect");

    for (let city of cities) {
        const option = new Option(city.name);
        selectCity.appendChild(option)
    }
}

async function weatherStationLookup() {
    let cityName = document.getElementById("citySelect").value;
    console.log(cityName)
    let city = cities.find(c => c.name == cityName);
    let lat = city.latitude;
    let long = city.longitude
    console.log(city);
    weatherService = new WeatherService();
    let weatherStation = await weatherService.getWeatherStation(lat, long);
    console.log(weatherStation.properties.forecast);
    let forecastURL = weatherStation.properties.forecast;
    weatherForecast(forecastURL);
}
async function weatherForecast(url) {

    let WeatherData = await weatherService.getWeatherForecast(url);
    console.log(WeatherData)
    console.log(WeatherData.properties.periods)
    displayWeatherDetails(WeatherData.properties.periods)
}

function displayWeatherDetails(data) {
    const table = document.getElementById('forecastTable');
    table.style.display=table;
    let name = document.getElementById("nameDisplay");
    let temperature = document.getElementById("temperatureDisplay");
    let windSpeed = document.getElementById("windspeedDisplay");
    let windDirection = document.getElementById("windDirectionDisplay");
    let forecast = document.getElementById("weatherForecastDisplay");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    // table.innerHTML = '';
    data.forEach(d => {
        const row = table.insertRow();
        row.insertCell(0).textContent = d.number;
        row.insertCell(1).textContent = d.name;
        row.insertCell(2).textContent = d.temperature + " " + d.temperatureUnit;
        row.insertCell(3).textContent = d.windSpeed;
        row.insertCell(4).textContent = d.windDirection;
        row.insertCell(5).textContent = d.shortForecast;
    });

}