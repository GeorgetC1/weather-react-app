import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {

  const [weatherData, setWeatherData] = useState(false)

  const allIcons = {
    "01d": clear_icon,
    "02d": cloud_icon,
    "03d": drizzle_icon,
    "04d": cloud_icon,
    "09d": rain_icon,
    "10d": rain_icon,
  }
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}&lang=fr`
    
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        tempature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
        description : data.weather[0].description,
      });

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { search("Saint Pierre"); }, [])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input type="text" placeholder="Search for a city..." />
            <img src={search_icon} alt=" "/>
        </div>
        <img src={weatherData.icon} alt="" className="weather-icon"/>
        <p className='description'>{weatherData.description}</p>
        <p className='temperature'>{weatherData.tempature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed} m/s</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Weather