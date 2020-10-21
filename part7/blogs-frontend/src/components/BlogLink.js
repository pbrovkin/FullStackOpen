import React from 'react'
import { Link } from 'react-router-dom'

const BlogLink = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <Link to={`/blogs/${blog.id}`}><i>{blog.title}</i> by {blog.author}</Link>
      </div>
    </div>
  )
}

export default BlogLink