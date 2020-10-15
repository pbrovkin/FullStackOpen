import React from 'react'

const BlogView = ({ blog, handleLike }) => {
  if (!blog) {
    return null
  }
  return (
    <div>
      <div>
        <h3>{blog.title}</h3>
      </div>
      <div>
        <a href={blog.url} target='_blank' rel='noopener noreferrer'>
          {blog.url}
        </a>
      </div>
      <div>likes {blog.likes}
        <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  )
}

export default BlogView