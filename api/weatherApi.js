import Weather from "../viewModels/weatherData"
import DateToString from "../utils/dateUtils";

class WeatherApi {
    longitude;
    latitude;
    startDate;
    endDate;
    BASE_WEATHER_URL = "https://api.open-meteo.com/v1/forecast?";

    async getWeather(latitude, longitude, startDate, endDate) {
        console.log("getting weather");
        console.log("getting weather start date1: " + startDate);
        console.log("getting weather end date1: " + endDate);
        startDateString = DateToString(startDate);
        endDateString = DateToString(endDate);
        console.log("getting weather start date: " + startDateString);
        console.log("getting weather end date: " + endDateString);
        const weatherUrl = `${this.BASE_WEATHER_URL}latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,rain_sum,showers_sum,snowfall_sum,windspeed_10m_max&current_weather=true&start_date=${startDateString}&end_date=${endDateString}&timezone=Europe%2FBerlin`;
        const response = await fetch(weatherUrl);
        const apiResponse = await response.json();

        return this.parseApiResponse(apiResponse, startDate, endDate);     
    }

    parseApiResponse(apiResponse, startDate, endDate) {
        const weatherData = [];
        console.log("parse response start date: " + DateToString(startDate));
        console.log("parse response end date: " + DateToString(endDate));
        let numberOfDays;

        if (startDate.getTime()==endDate.getTime()) {
            numberOfDays = 1;
        } else {
            numberOfDays = Math.floor(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))+2;
        }
        console.log(numberOfDays);

        for (let i = 0; i < numberOfDays; i++) {
            let weather = new Weather();
            weather.dateOfDay = apiResponse.daily.time[i];
            weather.temperatureMax = apiResponse.daily.temperature_2m_max[i];
            weather.tempreatureMin = apiResponse.daily.temperature_2m_min[i];
            weather.apparentTemperatureMax = apiResponse.daily.apparent_temperature_max[i];
            weather.apparentTempreatureMin = apiResponse.daily.apparent_temperature_min[i];
            weather.precipitationSum = apiResponse.daily.precipitation_sum[i];
            weather.rainSum = apiResponse.daily.rain_sum[i];
            weather.showersSum = apiResponse.daily.showers_sum[i];
            weather.snowfallSum = apiResponse.daily.snowfall_sum[i];
            weather.windspeedMax = apiResponse.daily.windspeed_10m_max[i];
            weatherData.push(weather);
        }

        return weatherData;
    }

}

export default WeatherApi;