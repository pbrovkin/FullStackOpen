import React, { useState, useEffect } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import Notify from './components/Notify'
import Authors from './components/Authors'
import Books from './components/Books'
import RecommendedBooks from './components/RecommendedBooks'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)

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
    }, 5000)
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

      <NewBook
        show={page === 'add'}
        setError={notify}
        setPage={setPage}
        updateCacheWith={updateCacheWith}
      />

      <RecommendedBooks
        show={page === 'recommended'}
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