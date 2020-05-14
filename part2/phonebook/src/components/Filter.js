import React from 'react'

const Filter = ({ setNewFilter }) => {
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <form>
            <div>
                filter by name: <input onChange={handleFilterChange} />
            </div>
        </form>
    )
}

export default Filter