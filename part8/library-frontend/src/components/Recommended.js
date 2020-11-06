import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, BOOKS_BY_GENRE } from '../queries'

const Recommended = (props) => {
  const [books, setBooks] = useState([])
  const [getBooks, booksResult] = useLazyQuery(BOOKS_BY_GENRE)
  const meResult = useQuery(ME)

  useEffect(() => {
    if (meResult.data && meResult.data.me) {
      getBooks({ variables: { genre: meResult.data.me.favoriteGenre } })
    }
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks)
    }
  }, [meResult.data, booksResult.data, getBooks])

  if (!props.show) {
    return null
  }

  if (booksResult.loading || meResult.loading) {
    return <div>loading...</div>
  }

  if (books.length === 0) {
    return (
      <div>
        <h2>recommendations</h2>
        <div>no books in your favourite genre</div>
      </div>
    )
  }

  return (
    <div>
      <h2>recommendations</h2>

      <div>
        books in your favorite genre "<strong>{meResult.data.me.favoriteGenre}</strong>"
      </div>

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
    </div>
  )
}

export default Recommended
