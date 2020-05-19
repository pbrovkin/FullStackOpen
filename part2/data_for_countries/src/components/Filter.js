import React from 'react'

const Filter = ({ setFilter }) => {

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <form>
                <div>
                    find countries: <input onChange={handleFilterChange} />
                </div>
            </form>
        </div>
    )
}

export default Filter