import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {

    const [weather, setWeather] = useState('')

    const api_key = process.env.REACT_APP_API_KEY

    const url = () => `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`

    useEffect(() => {
        let isOn = true
        axios
            .get(url())
            .then(response => {
                if (isOn) {
                    setWeather(response.data.current)
                }
            })
        return () => isOn = false
    })

    if (!weather) {
        return (
            <div>
                loading weather data...
            </div>
        )
    } else {
        return (
            <div>
                <h3>Weather in {city}</h3>
                <p>
                    <strong>temperature: </strong>
                    {weather.temperature} Celsius
                </p>
                <img src={weather.weather_icons} alt="icon" />
                <p>
                    <strong>wind: </strong> {weather.wind_speed} kph direction {weather.wind_dir}
                </p>
            </div>
        )
    }
}

export default Weather