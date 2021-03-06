import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthor = ({ authors, setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    changeBorn({ variables: { name, born } })

    setBorn('')
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  return (
    <div>
      <h2>set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name
          <select onChange={handleNameChange} value={name}>
            {authors.map(author =>
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit' style={{ marginTop: 10 }}>update</button>
      </form>
    </div>
  )
}

export default EditAuthor