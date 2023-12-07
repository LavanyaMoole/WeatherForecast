class WeatherService{

    baseUrl="https://api.weather.gov/"

    async getWeatherStation(lat,long){

        const stationLookupUrl=`${this.baseUrl}/points/${lat},${long}`

        let response=await fetch(stationLookupUrl);
        let data=await response.json();

        return data;

    }
    async getWeatherForecast(forecastURL){

        let response=await fetch(forecastURL);
        let weatherData=await response.json();

        return weatherData

    }
}