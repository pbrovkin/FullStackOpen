import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { initializeBlogs, likeBlog, removeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import loginService from './services/login'

import storage from './utils/storage'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)

  const blogFormRef = React.createRef()

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(setUser(user))
  }, [dispatch])

  const notifyWith = (message, type = 'success') => {
    dispatch(setNotification(message, type))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUsername('')
      setPassword('')
      dispatch(setUser(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch (exception) {
      notifyWith('Wrong username/password', 'error')
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    dispatch(likeBlog(likedBlog))
    notifyWith(`You liked '${blogToLike.title}' by ${blogToLike.author}`)
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeBlog(id))
      notifyWith(`You removed '${blogToRemove.title}' by ${blogToRemove.author}`)
    }
  }

  const handleLogout = () => {
    dispatch(setUser(null))
    storage.logoutUser()
  }

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog notifyWith={notifyWith} />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username === blog.user.username}
        />
      )}
    </div>
  )
}

export default App