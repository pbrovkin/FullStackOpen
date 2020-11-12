import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import GenreButtons from './GenreButtons'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (genre) {
      getBooks({ variables: { genre: genre } })
    } else {
      getBooks()
    }
  }, [genre]) // eslint-disable-line

  if (!props.show) {
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
          {result.data.allBooks.map(b =>
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <GenreButtons genres={genres} setGenre={setGenre} />
    </div>
  )
}

export default Books