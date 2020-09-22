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
    const blog = await blogService.create(blogObject)
    setBlogs(blogs.concat(blog))
    setMessage(`new blog '${blog.title}' by ${blog.author} added`)
    delMessage()
  }

  const addLike = async (blogObject) => {
    const likedBlog = await blogService.update(blogObject.id, blogObject)
    setBlogs(blogs.map(b => b.id !== blogObject.id ? b : likedBlog))
    setMessage(`you liked the post '${likedBlog.title}' by ${likedBlog.author}`)
    delMessage()
  }

  const removeBlog = async (id) => {
    const deletedBlog = await blogService.remove(id)
    setBlogs(blogs.filter(b => b.id !== id))
    setMessage(`you removed the post '${deletedBlog.title}'`)
    delMessage()
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
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
      <div>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} addLike={addLike} removeBlog={removeBlog} />
        )}
      </div>
    </div>
  )
}

export default App