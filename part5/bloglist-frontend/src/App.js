import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const delMessage = () => {
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogsAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage('error: ' + error.response.data.error)
      delMessage()
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogsAppUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    await blogService.create(blogObject)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
    setMessage(`added '${blogObject.title}' by ${blogObject.author} `)
    delMessage()
  }

  const addLike = async (blogObject) => {
    await blogService.update(blogObject.id, blogObject)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
    setMessage(`liked '${blogObject.title}' by ${blogObject.author}`)
    delMessage()
  }

  const removeBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)
    await blogService.remove(id)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
    setMessage(`removed '${blog.title}' by ${blog.author}`)
    delMessage()
  }

  const blogsDivStyle = {
    marginTop: 7
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <Togglable buttonLabel='login'>
          <LoginForm
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
            username={username}
            password={password}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <LogoutForm user={user} handleLogout={handleLogout} />
      <h2>blogs</h2>
      <Notification message={message} />
      <Togglable buttonLabel='new blog' ref={blogFormRef} >
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <div style={blogsDivStyle}>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} addLike={addLike} removeBlog={removeBlog} />
        )}
      </div>
    </div>
  )
}

export default App