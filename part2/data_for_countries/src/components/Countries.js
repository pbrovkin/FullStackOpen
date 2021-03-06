import React from 'react'
import Weather from './Weather'

const Countries = ({ countries, setFilter }) => {
    
    if (countries.length > 10) {
        return (
            <div>too many matches, specify another filter</div>
        )
    } else if (countries.length === 1) {
        return (
            <div>
                {countries.map(country =>
                    <div key={country.name}>
                        <h2>{country.name}</h2>
                        <p>capital: {country.capital}</p>
                        <p>population: {country.population}</p>
                        <h3>Spoken languages: </h3>
                        <ul>
                            {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
                        </ul>
                        <img style={{ width: 100, height: 100 }} src={country.flag} alt='flag' />
                        <Weather city={country.capital} />
                    </div>
                )}
            </div>
        )
    }
    else {
        return (
            <div>
                {countries.map(country =>
                    <div key={country.name}>
                        <>{country.name}</>
                        <button onClick={() => setFilter(country.name)}>
                            show
                        </button>
                    </div>
                )}
            </div>
        )
    }
}

export default Countries