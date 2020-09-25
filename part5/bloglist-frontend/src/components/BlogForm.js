import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const blogFormStyle = {
    marginBottom: 5
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h3>create a new blog</h3>
        <div style={blogFormStyle}>
          title
          <input
            id='title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div style={blogFormStyle}>
          author
          <input
            id='author'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div style={blogFormStyle}>
          url
          <input
            id='url'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit" style={blogFormStyle}>save</button>
      </form>
    </div>
  )
}

export default BlogForm