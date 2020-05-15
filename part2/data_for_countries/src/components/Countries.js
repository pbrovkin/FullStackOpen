import React from 'react'

const Countries = ({ countries, filter }) => {
    if (filter === '') {
        return null
    } else if (countries.length > 10) {
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
                        <h3>languages: </h3>
                        <ul>
                            {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
                        </ul>
                        <img style={{ width: 100, height: 100 }} src={country.flag} alt='flag' />
                    </div>
                )}
            </div>
        )
    }
    else {
        return (
            <div>
                {countries.map(country => <div key={country.name}>{country.name}</div>)}
            </div>
        )
    }
}

export default Countries