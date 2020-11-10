import React, { useState } from 'react'
import {
  useQuery, useSubscription, useApolloClient
} from '@apollo/client'
import { ALL_BOOKS, ME, BOOK_ADDED } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const meResult = useQuery(ME)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.title)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`'${addedBook.title}' added`)
      updateCacheWith(addedBook)
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button>
          : null}
        {token ?
          <>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={() => logout()}>logout</button>
          </>
          : <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === 'authors'} setError={notify} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={notify} setPage={setPage} />

      <Books
        show={page === 'recommended'}
        byGenre={meResult.data && meResult.data.me ? meResult.data.me.favoriteGenre : null}
      />

      <LoginForm
        show={page === 'login'}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App