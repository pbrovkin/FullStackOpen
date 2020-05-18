import React from 'react'

const Filter = ({ setFilter }) => {

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <form>
            <div>
                find countries: <input onChange={handleFilterChange} />
            </div>
        </form>
    )
}

export default Filter