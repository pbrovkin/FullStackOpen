import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import { v4 as uuidv4 } from 'uuid'

const BlogView = ({ blog, handleLike, handleRemove, user, notifyWith }) => {
  const dispatch = useDispatch()
  
  const [comment, setComment] = useState('')

  const handleComment = async (event) => {
    event.preventDefault()
    const commentedBlog = {
      ...blog,
      comments: [...blog.comments, comment],
      user: blog.user.id
    }
    dispatch(updateBlog(commentedBlog))
    notifyWith(`Added comment '${comment}' for '${blog.title}'`)
    setComment('')
  }

  const marginLeft = {
    marginLeft: 5
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <p>
        <a href={blog.url} target='_blank' rel='noopener noreferrer'>
          {blog.url}
        </a>
      </p>
      <p>likes {blog.likes}
        <button style={marginLeft} onClick={() => handleLike(blog.id)}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <p>
        {user.username === blog.user.username &&
          <button onClick={() => handleRemove(blog.id)}>remove</button>}
      </p>
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <input
          id='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => <li key={uuidv4()}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default BlogView