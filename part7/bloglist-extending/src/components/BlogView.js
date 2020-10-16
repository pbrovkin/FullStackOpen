import React from 'react'

const BlogView = ({ blog, handleLike, handleRemove, user, comments }) => {

  if (!blog) {
    return null
  }

  const currentComments = comments.filter(comment => comment.blog.id === blog.id)

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
      {user.username === blog.user.username &&
        <button onClick={() => handleRemove(blog.id)}>remove</button>}
      <div>
        <h3>comments:</h3>
        <ul>
          {currentComments.map(comment => <li key={comment.id}>{comment.content}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default BlogView