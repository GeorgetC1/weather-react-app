import React, { useEffect, useRef, useState } from 'react'
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
  const inputRef = useRef()

  const allIcons = {
    "01d": clear_icon,
    "02d": cloud_icon,
    "03d": drizzle_icon,
    "04d": cloud_icon,
    "09d": rain_icon,
    "10d": rain_icon,
  }
  const search = async (city) => {

    if(city === '') 
    {
      alert("Entrer une localisation");
      return;
    }
      
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}&lang=fr`
    
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if(!response.ok)
      {
        alert(data.message);
        return;
      }
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
      setWeatherData(false);
      console.log(error);
    }
  }

  useEffect(() => { search("Saint Pierre"); }, [])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder="Entrer votre localisation" />
            <img src={search_icon} alt=" " onClick={() => search(inputRef.current.value)}/>
        </div>
        {weatherData?
        <>
        <img src={weatherData.icon} alt="" className="weather-icon"/>
        <p className='description'>{weatherData.description}</p>
        <p className='temperature'>{weatherData.tempature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidité</span>
            </div>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed} m/s</p>
              <span>Vent</span>
            </div>
          </div>
        </div>
        </>
        :<></>}
    </div>
  )
}

export default Weather