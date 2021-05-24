/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosErrorHandler from '../../helpers/axiosErrorHandler';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [axiosLoading, setAxiosLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({});
  const [weatherLocation, setWeatherLocation] = useState('');
  const userStore = useSelector((state) => state.authReducer.user);

  const generateMonthString = (dt) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const date = new Date(dt * 1000);
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  const unixToTime = (unixString) => {
    const date = new Date(unixString * 1000);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    return `${hours}:${minutes}:${seconds}`;
  };

  const fetchWeather = async () => {
    setAxiosLoading(true);
    try {
      const firstResponse = await axios.get(
        `https://thingproxy.freeboard.io/fetch/http://api.openweathermap.org/data/2.5/weather?zip=${userStore.areaCode},IN&appid=b00970024df98c3df5ee2b743f195a9d&units=metric`
      );
      const { lon, lat } = firstResponse.data.coord;
      setWeatherLocation(firstResponse.data.name);

      const finalResponse = await axios.get(
        `https://thingproxy.freeboard.io/fetch/https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=b00970024df98c3df5ee2b743f195a9d&units=metric`
      );

      setWeatherData(finalResponse.data.daily);
      setAxiosLoading(false);
    } catch (error) {
      console.log(error);
      axiosErrorHandler(error);
    }
  };

  useEffect(() => {
    // fetch weather
    fetchWeather();
  }, []);
  return (
    <div className="weather-widget">
      {axiosLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <div className="ww-today">
            <div className="ww-today-temp-container">
              <p className="ww-today-temp">{weatherData[0].temp.day}&#176; c</p>
              <p className="ww-today-text">Tempreture</p>
              <div className="ww-today-temp-minmax-container">
                <div className="ww-today-temp-minmax">
                  <p className="ww-today-temp-minmax-text">Min: </p>
                  <p className="ww-today-temp-minmax-number">
                    {weatherData[0].temp.min}
                  </p>
                </div>
                <div className="ww-today-temp-minmax">
                  <p className="ww-today-temp-minmax-text">Max: </p>
                  <p className="ww-today-temp-minmax-number">
                    {weatherData[0].temp.max}
                  </p>
                </div>
              </div>
            </div>
            <div className="ww-today-info-container">
              <p className="ww-today-info-label">Humidity</p>
              <p className="ww-today-info">{weatherData[0].humidity} percent</p>
            </div>
            <div className="ww-today-info-container">
              <p className="ww-today-info-label">Wind Speed</p>
              <p className="ww-today-info">{weatherData[0].wind_speed} km/h</p>
            </div>
            <div className="ww-today-info-container">
              <p className="ww-today-info-label">Wind Gust</p>
              <p className="ww-today-info">{weatherData[0].wind_gust} km/h</p>
            </div>
            <div className="ww-today-info-container">
              <p className="ww-today-info-label">Sunrise</p>
              <p className="ww-today-info">
                {unixToTime(weatherData[0].sunrise)} am
              </p>
            </div>
            <div className="ww-today-info-container">
              <p className="ww-today-info-label">Sunset</p>
              <p className="ww-today-info">
                {unixToTime(weatherData[0].sunset)} am
              </p>
            </div>
            <div className="ww-today-info-container">
              <p className="ww-today-info-label">Location</p>
              <p className="ww-today-info">{weatherLocation}</p>
            </div>
          </div>
          <div className="ww-daily-container">
            {/* Daily */}
            {weatherData.slice(1).map((daily, index) => {
              if (index === 1) return;
              return (
                <div key={index} className="ww-daily">
                  <ww className="daily-date">
                    {generateMonthString(daily.dt)}
                  </ww>
                  <div className="ww-daily-stats-container">
                    <div className="ww-daily-stat">
                      <p className="ww-daily-stat-number">
                        {Math.round(daily.temp.day)}°c
                      </p>
                      <p className="ww-daily-stat-text">Temp</p>
                    </div>
                    <div className="ww-daily-stat">
                      <p className="ww-daily-stat-number">{daily.humidity}%</p>
                      <p className="ww-daily-stat-text">Humidity</p>
                    </div>
                    <div className="ww-daily-stat">
                      <p className="ww-daily-stat-number">
                        {Math.round(daily.wind_speed)} km/h
                      </p>
                      <p className="ww-daily-stat-text">Wind</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
