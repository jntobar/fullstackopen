const CountryList = ({ countries, handleShow }) => {
    if (countries.length > 10) {
      return <p>Demasiadas coincidencias, especifica otra búsqueda.</p>
    }
  
    if (countries.length > 1) {
      return (
        <ul>
          {countries.map(country => (
            <li key={country.name.common}>
              {country.name.common} <button onClick={() => handleShow(country.name.common)}>mostrar</button>
            </li>
          ))}
        </ul>
      )
    }
  
    return null
  }
  
  export default CountryList
  