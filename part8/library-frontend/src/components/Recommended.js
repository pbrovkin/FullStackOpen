import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, USER } from '../queries'

const Recommended = (props) => {
  const [genre, setGenre] = useState(null)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const user = useQuery(USER)

  useEffect(() => {
    if (user.data && user.data.me) {
      const favGenre = user.data.me.favoriteGenre
      setGenre(favGenre)
    }
  }, [user.data])

  useEffect(() => {
    if (genre) {
      getBooks({ variables: { genre: genre } })
    }
  }, [genre]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  if (result.loading || !genre) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>in your favourite genre <strong>{genre}</strong></p>

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

    </div>
  )
}

export default Recommended