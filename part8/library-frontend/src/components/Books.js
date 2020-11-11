import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import GenreButtons from './GenreButtons'

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (!genre) {
      getBooks()
    } else {
      getBooks({ variables: { genre: genre } })
    }
  }, [genre, getBooks])


  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const genres = [...new Set(result.data.allBooks.map(book => book.genres).flat())]

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
          {result.data.allBooks.map(book =>
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <GenreButtons genres={genres} setGenre={setGenre} />
    </div>
  )
}

export default Books