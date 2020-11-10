import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import GenreButtons from './GenreButtons'

const Books = ({ show, byGenre }) => {
  const [genre, setGenre] = useState(null)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    setGenre(byGenre)
  }, [byGenre])

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
      <h4>{byGenre ? `in your favorite genre "${byGenre}"` : null}</h4>

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
      {byGenre ? null : <GenreButtons genres={genres} setGenre={setGenre} />}
    </div>
  )
}

export default Books
