import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

import { setUser, unsetUser } from './reducers/loggedUsedReducer'
import { initUsers } from './reducers/userReducer'
import { initBlogs, updateBlog, removeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import Navigation from './components/Navigation'

import loginService from './services/login'
import storage from './utils/storage'

import Container from '@material-ui/core/Container'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const loggedUser = useSelector(state => state.loggedUser)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
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
      storage.saveUser(user)
      history.push('/')
      notifyWith(`${user.name} welcome back!`)
    } catch (exception) {
      notifyWith('Wrong username/password', 'error')
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    dispatch(updateBlog(likedBlog))
    notifyWith(`Liked '${blogToLike.title}' by ${blogToLike.author}`)
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog '${blogToRemove.title}' by ${blogToRemove.author}?`)
    if (ok) {
      dispatch(removeBlog(id))
      history.push('/')
      notifyWith(`Removed '${blogToRemove.title}' by ${blogToRemove.author}.`)
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

  return (
    <Container>
      {!loggedUser ?
        <LoginForm
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
          notification={notification}
        /> :
        <div>
          <Navigation user={loggedUser} handleLogout={handleLogout} />

          <Notification notification={notification} />

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

              <BlogList blogs={blogs} />
            </Route>
          </Switch>
        </div>
      }
    </Container>
  )
}

export default App