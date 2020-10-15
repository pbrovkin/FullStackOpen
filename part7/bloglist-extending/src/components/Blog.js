import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, own }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const label = visible ? 'hide' : 'view'

  return (
    <div style={blogStyle} className='blog'>
      <div onClick={() => setVisible(!visible)}>
        <i><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></i> by {blog.author} 
        <button onClick={() => setVisible(!visible)}>{label}</button>
      </div>
      {visible && (
        <div>
          <div>
            <a href={blog.url} target='_blank' rel='noopener noreferrer'>
              {blog.url}
            </a>
          </div>
          <div>likes {blog.likes}
            <button onClick={() => handleLike(blog.id)}>like</button>
          </div>
          <div>added by {blog.user.name}</div>
          {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog