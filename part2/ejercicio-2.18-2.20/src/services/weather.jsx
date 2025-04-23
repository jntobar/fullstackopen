import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (city) => {
  const url = `${baseUrl}?q=${city}&units=metric&appid=${apiKey}`
  return axios.get(url).then(response => response.data)
}

export default { getWeather }