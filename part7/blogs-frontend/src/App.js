import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { setUser, unsetUser } from './reducers/loggedUsedReducer'
import { initUsers } from './reducers/userReducer'
import { initBlogs, likeBlog, removeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

import LoginForm from './components/LoginForm'
import BlogLink from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'

import loginService from './services/login'
import storage from './utils/storage'

const App = () => {
  const dispatch = useDispatch()

  const loggedUser = useSelector(state => state.loggedUser)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(setUser(user))
  }, [dispatch])

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
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
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeBlog(id))
    }
  }

  const handleLogout = () => {
    dispatch(unsetUser(null))
    storage.logoutUser()
  }

  const matchUser = useRouteMatch('/users/:id')
  const userById = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blogById = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <>
      {!loggedUser ?
        <LoginForm username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          notification={notification}
        /> :
        <div>
          <div>
            <h2>BlogsApp</h2>
            <Notification notification={notification} />
            <p>
              {loggedUser.name} logged in <button onClick={handleLogout}>logout</button>
            </p>
          </div>

          <Switch>
            <Route path='/blogs/:id'>
              <BlogView blog={blogById}
                handleLike={handleLike}
                handleRemove={handleRemove}
                user={loggedUser}
                notifyWith={notifyWith}
              />
            </Route>

            <Route path='/users/:id'>
              <User user={userById} />
            </Route>

            <Route path='/users'>
              <Users users={users} />
            </Route>

            <Route path='/'>
              <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <NewBlog notifyWith={notifyWith} />
              </Togglable>

              {blogs.sort(byLikes).map(blog =>
                <BlogLink
                  key={blog.id}
                  blog={blog}
                />
              )}
            </Route>
          </Switch>
        </div>
      }
    </>
  )
}

export default App