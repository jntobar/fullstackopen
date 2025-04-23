const CountryDetails = ({ country, weather }) => {
  if (!country) return null

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Área: {country.area} km²</p>

      <h4>Idiomas:</h4>
      <ul>
        {Object.values(country.languages).map((lang, i) => (
          <li key={i}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`Bandera de ${country.name.common}`} width="150" />

      <h4>Weather in {country.capital}</h4>
      {weather ? (
        <div>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  )
}

export default CountryDetails
