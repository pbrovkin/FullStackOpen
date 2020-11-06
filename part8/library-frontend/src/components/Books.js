import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('all')

  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data && result.data.allBooks) {
      if (genre === 'all') {
        setBooks(result.data.allBooks)
      } else {
        setBooks(result.data.allBooks.filter(book => book.genres.includes(genre)))
      }
      const uniqueGenres = [...new Set(result.data.allBooks.map(book => book.genres).flat())]
      setGenres(uniqueGenres)
    }
  }, [result.data, genre])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(book =>
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre =>
        <button onClick={() => setGenre(genre)} key={genre}>
          {genre}
        </button>
      )}
      <button onClick={() => setGenre('all')} key={genre}>
        all genres
      </button>
    </div>
  )
}

export default Books
