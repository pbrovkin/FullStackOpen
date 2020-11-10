import React from 'react'

const GenreButtons = ({ genres, setGenre }) => {
  return (
    <div>
      {genres.map(genre =>
        <button onClick={() => setGenre(genre)} key={genre}>
          {genre}
        </button>
      )}
      <button onClick={() => setGenre(null)}>
        all genres
      </button>
    </div>
  )
}

export default GenreButtons