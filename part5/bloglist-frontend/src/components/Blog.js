import React, { useState } from 'react'

const Blog = ({ blog, user, addLike, removeBlog }) => {
  const [specs, setSpecs] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    marginLeft: 7
  }

  const handleAddLike = (event) => {
    event.preventDefault()
    addLike({
      ...blog,
      user: blog.user.id,
      likes: ++blog.likes
    })
  }

  const handleRemoveBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`remove '${blog.title}' by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  const Specs = () => (
    <>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>
        {blog.likes} likes
        <button onClick={handleAddLike} style={buttonStyle}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <p>
        {user.username === blog.user.username ?
          <button onClick={handleRemoveBlog}>remove</button> : null}
      </p>
    </>
  )

  return (
    <div className='blog' style={blogStyle}>
      <p onClick={() => setSpecs(!specs)}>
        {blog.title} / {blog.author}
        <button onClick={() => setSpecs(!specs)} style={buttonStyle}>
          {specs ? 'hide' : 'view'}
        </button>
      </p>
      {specs === false ? null : <Specs />}
    </div >
  )
}

export default Blog