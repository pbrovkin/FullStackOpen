import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Switch, Route, Link, useRouteMatch, useHistory
} from 'react-router-dom'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog, removeBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeComments } from './reducers/commentReducer'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import loginService from './services/login'
import storage from './utils/storage'
import styled from 'styled-components'

const Navigation = styled.div`
  background: lightgray;
  padding: 1em;`

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(initializeComments())
  }, [dispatch])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const comments = useSelector(state => state.comments)

  const blogFormRef = React.createRef()

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(setUser(user))
  }, [dispatch])

  const history = useHistory()

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
      history.push('/')
      notifyWith(`You removed '${blogToRemove.title}' by ${blogToRemove.author}`)
    }
  }

  const handleLogout = () => {
    dispatch(setUser(null))
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

  const padding = {
    padding: 5
  }

  return (
    <div>
      {!user ?
        <LoginForm username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          notification={notification}
        /> :
        <div>
          <Navigation>
            <Link style={padding} to='/'>blogs</Link>
            <Link style={padding} to='/users'>users</Link>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </Navigation>

          <div>
            <h2>BlogsApp</h2>
            <Notification notification={notification} />
          </div>

          <Switch>
            <Route path='/blogs/:id'>
              <BlogView blog={blogById}
                handleLike={handleLike}
                handleRemove={handleRemove}
                user={user}
                comments={comments}
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
              <div>
                <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                  <NewBlog notifyWith={notifyWith} />
                </Togglable>
                {blogs.sort(byLikes).map(blog =>
                  <Blog
                    key={blog.id}
                    blog={blog}
                  />
                )}
              </div>
            </Route>
          </Switch>
        </div>
      }
    </div>
  )
}

export default App