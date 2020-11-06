import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommended = (props) => {
  const resultBooks = useQuery(ALL_BOOKS)
  const resultMe = useQuery(ME)

  if (!props.show) {
    return null
  }

  if (resultBooks.loading || resultMe.loading) {
    return <div>loading...</div>
  }

  const favGenre = resultMe.data.me.favoriteGenre
  const books = resultBooks.data.allBooks.filter(book =>
    book.genres.includes(favGenre))

  if (!books) {
    return (
      <div>no books recommendations</div>
    )
  }

  return (
    <div>
      <h2>recommendations</h2>

      <div>books in your favorite genre "<strong>{favGenre}</strong>"</div>

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
