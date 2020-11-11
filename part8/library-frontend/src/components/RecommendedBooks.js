import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, USER } from '../queries'

const RecommendedBooks = ({ show }) => {
  const [genre, setGenre] = useState(null)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const user = useQuery(USER)

  useEffect(() => {
    if (user.data && user.data.me) {
      setGenre(user.data.me.favoriteGenre)
    }
  }, [user.data])

  useEffect(() => {
    if (genre) {
      getBooks({ variables: { genre: genre } })
    }
  }, [genre, getBooks])

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
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
          {result.data.allBooks.map(book =>
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

export default RecommendedBooks
