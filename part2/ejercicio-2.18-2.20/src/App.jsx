import { useEffect, useState } from 'react'
import countryService from './services/contries'
import Search from './components/search'
import CountryList from './components/countryList'
import CountryDetails from './components/countryDetails'
import weatherService from './services/weather'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService.getAll().then(data => setCountries(data))
  }, [])

  const handleFilterChange = (event) => {
    const value = event.target.value
    setFilter(value)

    // Si hay un país que coincide exactamente, lo mostramos
    const matched = countries.filter(c =>
      c.name.common.toLowerCase().includes(value.toLowerCase())
    )

    if (matched.length === 1) {
      setSelectedCountry(matched[0])
    } else {
      setSelectedCountry(null)
    }
  }
  const fetchWeather = (country) => {
    const city = country.capital[0]
    weatherService.getWeather(city).then(data => setWeather(data))
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const handleShow = (countryName) => {
    const country = countries.find(c => c.name.common === countryName)
    setSelectedCountry(country)
    fetchWeather(country)
  }

  return (
    <div>
      <Search value={filter} onChange={handleFilterChange} />
      <CountryList countries={filteredCountries} handleShow={handleShow} />
      {selectedCountry && <CountryDetails country={selectedCountry} weather={weather}/>}
    </div>
  )
}

export default App
